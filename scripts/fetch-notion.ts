import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { Client } from "@notionhq/client";
import { downloadContentImages } from "@scripts/download-content-images";
import { getNotionProperty } from "@scripts/notion-utils";
import type { TProject } from "@shared/notion";
import { NotionToMarkdown } from "notion-to-md";
import slugify from "react-slugify";

const PROJECTS_DIR = resolve(import.meta.dirname, "../data/projects");

const ICONS_DIR = resolve(import.meta.dirname, "../public/images/projects");
const CONTENT_IMAGES_DIR = resolve(
	import.meta.dirname,
	"../public/images/content",
);

const token = process.env.NOTION_API_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;
const dataSourceId = process.env.NOTION_DATA_SOURCE_ID || "";

if (!token || !databaseId) {
	console.error(
		"Missing required env vars: NOTION_API_TOKEN, NOTION_DATABASE_ID",
	);
	process.exit(1);
}

mkdirSync(PROJECTS_DIR, { recursive: true });
mkdirSync(ICONS_DIR, { recursive: true });
mkdirSync(CONTENT_IMAGES_DIR, { recursive: true });

const notion = new Client({ auth: token });
const n2m = new NotionToMarkdown({ notionClient: notion });

const { results } = await notion.dataSources.query({
	data_source_id: dataSourceId,
});

let savedCount = 0;

for (const page of results) {
	if (page.object !== "page" || !("properties" in page)) continue;

	const props = page.properties;

	const title = (getNotionProperty(props["Project Name"]) as string) || "";
	const titleSlug = slugify(title);

	console.log({ titleSlug });

	// Download cover icon
	let iconPath = "";
	let coverUrl = "";
	if ("icon" in page && page.icon) {
		if ("file" in page.icon) {
			coverUrl = page.icon.file.url;
		}
		if ("custom_emoji" in page.icon) {
			coverUrl = page.icon.custom_emoji.url;
		}
	}
	if (coverUrl) {
		const ext = extname(new URL(coverUrl).pathname) || ".png";
		const filename = `${titleSlug}${ext}`;

		const res = await fetch(coverUrl);
		const buffer = Buffer.from(await res.arrayBuffer());
		writeFileSync(resolve(ICONS_DIR, filename), buffer);
		iconPath = `/images/projects/${filename}`;
		console.log(`Downloaded icon: ${filename}`);
	}

	const mdBlocks = await n2m.pageToMarkdown(page.id);
	const tags = (getNotionProperty(props.Tags) as string[]) || [];
	const rawContent = n2m.toMarkdownString(mdBlocks).parent;
	const content = await downloadContentImages(
		rawContent,
		titleSlug,
		CONTENT_IMAGES_DIR,
	);

	const lastUpdated =
		"last_edited_time" in page && typeof page.last_edited_time === "string"
			? page.last_edited_time
			: new Date().toISOString();

	const project: TProject = {
		title,
		slug: titleSlug,
		description: (getNotionProperty(props.Description) as string) || "",
		tags,
		color: (getNotionProperty(props.Color) as string) || "",
		iconPath,
		content,
		isFavorite: getNotionProperty(props.Favorites) === true,
		last_updated: lastUpdated,
	};

	const outputPath = resolve(PROJECTS_DIR, `${titleSlug}.json`);
	const serialized = JSON.stringify(project, null, 2);

	if (
		existsSync(outputPath) &&
		readFileSync(outputPath, "utf-8") === serialized
	) {
		console.log(`No changes: ${title}`);
	} else {
		writeFileSync(outputPath, serialized);
		savedCount++;
		console.log(`Saved: ${titleSlug}.json`);
	}
}

console.log(`Done. ${savedCount} file(s) written to data/projects/`);
