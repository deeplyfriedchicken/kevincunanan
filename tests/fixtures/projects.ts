import type { TProject } from "@shared/notion";
import { Factory } from "rosie";

export const ProjectFactory = new Factory<TProject>()
	.sequence("title", (i) => `Project ${i}`)
	.attr("description", () => "A sample project description.")
	.attr("tags", () => ["React", "TypeScript"])
	.attr("color", () => "#32384c")
	.attr("iconPath", () => "/images/projects/sample.png")
	.attr("content", () => "# Overview\n\nSample project content.");

export const sampleProject = ProjectFactory.build({
	title: "Portfolio Site",
	description: "Personal portfolio built with React Router 7.",
	tags: ["React", "TypeScript", "Tailwind"],
	color: "#32384c",
	iconPath: "/images/projects/portfolio.png",
});

export const projectWithoutIcon = ProjectFactory.build({
	title: "CLI Tool",
	description: "A command-line utility.",
	tags: ["Node.js"],
	color: "#adbca5",
	iconPath: "",
});

export const projectsList = ProjectFactory.buildList(3);
