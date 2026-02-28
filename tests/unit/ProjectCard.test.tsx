import { screen } from "@testing-library/react";
import { ProjectCard } from "~/components/ProjectCard";
import { projectWithoutIcon, sampleProject } from "../fixtures/projects";
import { renderWithTheme } from "../helpers/render";

describe("ProjectCard", () => {
	it("renders title, description, and tags", () => {
		renderWithTheme(<ProjectCard {...sampleProject} />);

		expect(screen.getByText("Portfolio Site")).toBeInTheDocument();
		expect(
			screen.getByText("Personal portfolio built with React Router 7."),
		).toBeInTheDocument();
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Tailwind")).toBeInTheDocument();
	});

	it("READ MORE link has correct href", () => {
		renderWithTheme(<ProjectCard {...sampleProject} />);

		const link = screen.getByText("READ MORE +");
		expect(link).toHaveAttribute(
			"href",
			`/projects/${encodeURI("Portfolio Site")}`,
		);
	});

	it("renders image when iconPath is present", () => {
		renderWithTheme(<ProjectCard {...sampleProject} />);

		const img = screen.getByAltText("Portfolio Site");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "/images/projects/portfolio.png");
	});

	it("does not render image when iconPath is empty", () => {
		renderWithTheme(<ProjectCard {...projectWithoutIcon} />);

		expect(screen.queryByAltText("CLI Tool")).not.toBeInTheDocument();
	});
});
