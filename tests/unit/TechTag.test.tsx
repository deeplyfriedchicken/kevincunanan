import { render, screen } from "@testing-library/react";
import { TechTag } from "~/components/TechTag";

describe("TechTag", () => {
	it("renders label text", () => {
		render(<TechTag label="React" />);
		expect(screen.getByText("React")).toBeInTheDocument();
	});

	it("is a span element", () => {
		render(<TechTag label="TypeScript" />);
		const tag = screen.getByText("TypeScript");
		expect(tag.tagName).toBe("SPAN");
	});

	it("has rounded-full class", () => {
		render(<TechTag label="Tailwind" />);
		const tag = screen.getByText("Tailwind");
		expect(tag.className).toContain("rounded-full");
	});
});
