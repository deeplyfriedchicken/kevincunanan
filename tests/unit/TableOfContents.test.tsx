import { screen } from "@testing-library/react";
import { renderWithTheme } from "@tests/helpers/render";
import { TableOfContents, type TOCItem } from "~/components/TableOfContents";

const threeLevel: TOCItem[] = [
	{ level: 1, text: "Summary", id: "summary" },
	{ level: 2, text: "Original Concept", id: "original-concept" },
	{ level: 3, text: "Why", id: "why" },
	{ level: 3, text: "How", id: "how" },
	{ level: 2, text: "Key Features", id: "key-features" },
	{ level: 1, text: "Results", id: "results" },
];

describe("TableOfContents", () => {
	it("renders all items as links", () => {
		renderWithTheme(<TableOfContents items={threeLevel} />);

		for (const item of threeLevel) {
			const link = screen.getByText(item.text);
			expect(link).toBeInTheDocument();
			expect(link.closest("a")).toHaveAttribute("href", `#${item.id}`);
		}
	});

	it("renders a nav element", () => {
		renderWithTheme(<TableOfContents items={threeLevel} />);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("applies bold styling to level-1 items", () => {
		renderWithTheme(<TableOfContents items={threeLevel} />);
		const link = screen.getByText("Summary").closest("a");
		expect(link?.className).toContain("font-bold");
	});

	it("applies left border and indent to level-2 items", () => {
		renderWithTheme(<TableOfContents items={threeLevel} />);
		const link = screen.getByText("Original Concept").closest("a");
		expect(link?.className).toContain("pl-[1rem]");
		expect(link?.className).toContain("border-l-2");
	});

	it("applies deeper indent and lighter border to level-3 items", () => {
		renderWithTheme(<TableOfContents items={threeLevel} />);
		const link = screen.getByText("Why").closest("a");
		expect(link?.className).toContain("pl-[2rem]");
		expect(link?.className).toContain("font-light");
		expect(link?.className).toContain("border-theme-text/20");
	});

	it("renders nothing inside nav when items is empty", () => {
		renderWithTheme(<TableOfContents items={[]} />);
		const nav = screen.getByRole("navigation");
		expect(nav.children).toHaveLength(0);
	});
});
