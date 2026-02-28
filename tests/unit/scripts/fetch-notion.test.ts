import type { PageObjectResponse } from "@notionhq/client";
import { getNotionProperty } from "@scripts/notion-utils";

type NotionProperty = PageObjectResponse["properties"][string];

describe("getNotionProperty", () => {
	it("extracts plain text from a title property", () => {
		const property = {
			type: "title",
			title: [{ plain_text: "My Project" }],
		} as unknown as NotionProperty;

		expect(getNotionProperty(property)).toBe("My Project");
	});

	it("extracts names from a multi_select property", () => {
		const property = {
			type: "multi_select",
			multi_select: [{ name: "React" }, { name: "TypeScript" }],
		} as unknown as NotionProperty;

		expect(getNotionProperty(property)).toEqual(["React", "TypeScript"]);
	});

	it("returns undefined for an empty array", () => {
		const property = {
			type: "title",
			title: [],
		} as unknown as NotionProperty;

		expect(getNotionProperty(property)).toBeUndefined();
	});

	it("extracts rich_text plain_text", () => {
		const property = {
			type: "rich_text",
			rich_text: [{ plain_text: "A description" }],
		} as unknown as NotionProperty;

		expect(getNotionProperty(property)).toBe("A description");
	});
});
