import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { Client } from "@notionhq/client";
import { getNotionProperty } from "@scripts/notion-utils";
import type { TNotionData, TProject } from "@shared/notion";
import { NotionToMarkdown } from "notion-to-md";
import slugify from "react-slugify";

const OUTPUT_PATH = resolve(import.meta.dirname, "../data/notion-pages.json");

const ICONS_DIR = resolve(import.meta.dirname, "../public/images/projects");

const token = process.env.NOTION_API_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;
const dataSourceId = process.env.NOTION_DATA_SOURCE_ID || "";

if (!token || !databaseId) {
	console.error(
		"Missing required env vars: NOTION_API_TOKEN, NOTION_DATABASE_ID",
	);
	process.exit(1);
}

mkdirSync(ICONS_DIR, { recursive: true });

const notion = new Client({ auth: token });
const n2m = new NotionToMarkdown({ notionClient: notion });

const { results } = await notion.dataSources.query({
	data_source_id: dataSourceId,
});

const pages: TProject[] = [];

for (const page of results) {
	if (page.object !== "page" || !("properties" in page)) continue;

	const props = page.properties;

	const title = (getNotionProperty(props["Doc name"]) as string) || "";
	const titleSlug = slugify(title);

	console.log({ page, icon: page.icon });

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

	pages.push({
		title,
		slug: titleSlug,
		description: (getNotionProperty(props.Description) as string) || "",
		tags,
		color: (getNotionProperty(props.Color) as string) || "",
		iconPath,
		content: n2m.toMarkdownString(mdBlocks).parent,
		isFavorite: getNotionProperty(props.Favorites) === true,
	});
	console.log(`Fetched: ${title}`);
}

// Check if projects have changed before writing
if (existsSync(OUTPUT_PATH)) {
	const existing: TNotionData = JSON.parse(readFileSync(OUTPUT_PATH, "utf-8"));
	if (JSON.stringify(existing.projects) === JSON.stringify(pages)) {
		console.log("No changes to projects — skipping write.");
		process.exit(0);
	}
}

const output: TNotionData = {
	last_updated: new Date().toISOString(),
	projects: pages,
};

writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`Saved ${pages.length} pages to notion-pages.json`);
