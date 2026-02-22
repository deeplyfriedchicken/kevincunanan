import { Client } from "@notionhq/client"
import { resolve } from "node:path";

const OUTPUT_PATH = resolve(
	import.meta.dirname,
	"../app/data/notion-document-hub.json",
);

const token = process.env.NOTION_API_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID || '';

const notion = new Client({ auth: token });

async function queryDataSource(dataSourceId: string) {
	const result = await notion.databases.retrieve({
    database_id: dataSourceId,
  })

  // Print filtered results
  console.log(JSON.stringify(result, null, 2))
  return result;
}

async function main() {
	const projects: any[] = [];
	queryDataSource(databaseId);

	const dataSource = await notion.dataSources.query({
		data_source_id: '30c8054a-3b8c-8021-837d-000be2c90e96',
	});

	console.log({ dataSource });
	await dataSource.results.forEach(async (page) => {
		const pageData = await notion.pages.retrieve({
			page_id: page.id
		});

		const blocks = await notion.blocks.children.list({
			block_id: page.id
		});

		blocks.results.forEach((block) => {
			console.log(JSON.stringify(block, null, 2));
		});

		projects.push(pageData)
});
}

main();