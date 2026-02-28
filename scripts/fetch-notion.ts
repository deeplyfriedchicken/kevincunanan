import { Client, type PageObjectResponse } from "@notionhq/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { NotionToMarkdown } from "notion-to-md";

type TProject = {
	title: string;
	description: string;
	content: string;
	tags: string[];
	color: string;
	iconPath: string;
};

const OUTPUT_PATH = resolve(
	import.meta.dirname,
	"../app/data/notion-pages.json",
);

function getNotionProperty(
	property: PageObjectResponse["properties"][string],
): string | string[] | undefined {
	const value = property[property.type as keyof typeof property];
	if (!Array.isArray(value) || value.length === 0) return;

	const notionValue = value[0];

	if ("plain_text" in notionValue) return notionValue.plain_text as string;
	if ("file" in notionValue) {
		console.log({ notionValue });
		const { file } = notionValue;
		const isExternalUrl = file.type === "external" || file.type === "file";
		return isExternalUrl ? file.external?.url : file.url;
	}
	if ("multi_select" in property) return value.map((v) => v.name);
}

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
	const titleSlug = title
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]/g, "");

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
		description: (getNotionProperty(props.Description) as string) || "",
		tags,
		color: (getNotionProperty(props.Color) as string) || "",
		iconPath,
		content: n2m.toMarkdownString(mdBlocks).parent,
	});
	console.log(`Fetched: ${title}`);
}

writeFileSync(OUTPUT_PATH, JSON.stringify(pages, null, 2));
console.log(`Saved ${pages.length} pages to notion-pages.json`);
