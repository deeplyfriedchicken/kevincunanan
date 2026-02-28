import { getNotionProperty } from "../../../scripts/notion-utils";

describe("getNotionProperty", () => {
	it("extracts plain text from a title property", () => {
		const property = {
			type: "title",
			title: [{ plain_text: "My Project" }],
		} as any;

		expect(getNotionProperty(property)).toBe("My Project");
	});

	it("extracts names from a multi_select property", () => {
		const property = {
			type: "multi_select",
			multi_select: [{ name: "React" }, { name: "TypeScript" }],
		} as any;

		expect(getNotionProperty(property)).toEqual(["React", "TypeScript"]);
	});

	it("returns undefined for an empty array", () => {
		const property = {
			type: "title",
			title: [],
		} as any;

		expect(getNotionProperty(property)).toBeUndefined();
	});

	it("extracts rich_text plain_text", () => {
		const property = {
			type: "rich_text",
			rich_text: [{ plain_text: "A description" }],
		} as any;

		expect(getNotionProperty(property)).toBe("A description");
	});
});
