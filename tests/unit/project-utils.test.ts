import { extractTOC } from "~/routes/project";

describe("extractTOC", () => {
	it("extracts h1 as level 1", () => {
		const result = extractTOC("# Summary");
		expect(result).toEqual([{ level: 1, text: "Summary", id: "summary" }]);
	});

	it("extracts h2 as level 2", () => {
		const result = extractTOC("## Tech Stack");
		expect(result).toEqual([
			{ level: 2, text: "Tech Stack", id: "tech-stack" },
		]);
	});

	it("extracts h3 as level 3", () => {
		const result = extractTOC("### Why React");
		expect(result).toEqual([{ level: 3, text: "Why React", id: "why-react" }]);
	});

	it("extracts all three levels from mixed markdown", () => {
		const md = [
			"# Summary",
			"",
			"Some text.",
			"",
			"## Original Concept",
			"",
			"### Why",
			"### How",
			"",
			"## Key Features",
			"",
			"# Results",
		].join("\n");

		const result = extractTOC(md);
		expect(result).toEqual([
			{ level: 1, text: "Summary", id: "summary" },
			{ level: 2, text: "Original Concept", id: "original-concept" },
			{ level: 3, text: "Why", id: "why" },
			{ level: 3, text: "How", id: "how" },
			{ level: 2, text: "Key Features", id: "key-features" },
			{ level: 1, text: "Results", id: "results" },
		]);
	});

	it("does not treat ## as # (level disambiguation)", () => {
		const result = extractTOC("## Only H2");
		expect(result).toEqual([{ level: 2, text: "Only H2", id: "only-h2" }]);
		expect(result[0].level).not.toBe(1);
	});

	it("does not treat ### as ## (level disambiguation)", () => {
		const result = extractTOC("### Only H3");
		expect(result).toEqual([{ level: 3, text: "Only H3", id: "only-h3" }]);
		expect(result[0].level).not.toBe(2);
	});

	it("returns empty array for markdown with no headings", () => {
		expect(extractTOC("Just a paragraph.\n\nAnother paragraph.")).toEqual([]);
	});

	it("ignores h4 and deeper headings", () => {
		expect(extractTOC("#### Deep Heading")).toEqual([]);
	});
});
