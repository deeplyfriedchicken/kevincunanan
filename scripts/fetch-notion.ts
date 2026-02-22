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

function getNotionPlainTextProperty(
	property: PageObjectResponse["properties"]["string"],
) {
	if (property.type === "title" && property[property.type].length > 0) {
		return property[property.type][0].plain_text;
	}
	if (property.type === "rich_text" && property[property.type].length > 0) {
		return property[property.type][0].plain_text;
	}
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

	const title = getNotionPlainTextProperty(props["Doc name"]) || "";
	const titleSlug = title
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]/g, "");

	// Download cover icon
	let iconPath = "";
	const coverProp = props["Cover icon"];
	if (coverProp?.type === "files" && coverProp.files.length > 0) {
		const file = coverProp.files[0];
		const url = (
			file.type === "external" ? file.external.url : file.file.url
		) as string;
		const urlPathname = new URL(url).pathname;
		const ext = extname(urlPathname) || ".png";
		const filename = `${titleSlug}${ext}`;

		const res = await fetch(url);
		const buffer = Buffer.from(await res.arrayBuffer());
		writeFileSync(resolve(ICONS_DIR, filename), buffer);
		iconPath = `/images/projects/${filename}`;
		console.log(`Downloaded icon: ${filename}`);
	}

	const mdBlocks = await n2m.pageToMarkdown(page.id);
	let tags: string[] = [];
	if (props.Tags.type === "multi_select") {
		tags = props.Tags.multi_select.map((tag) => tag.name);
	}

	pages.push({
		title,
		description: getNotionPlainTextProperty(props.Description) || "",
		tags,
		color: getNotionPlainTextProperty(props.Color) || "",
		iconPath,
		content: n2m.toMarkdownString(mdBlocks).parent,
	});
	console.log(`Fetched: ${title}`);
}

writeFileSync(OUTPUT_PATH, JSON.stringify(pages, null, 2));
console.log(`Saved ${pages.length} pages to notion-pages.json`);
