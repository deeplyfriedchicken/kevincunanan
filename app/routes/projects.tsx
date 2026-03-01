import { ProjectCard } from "~/components/ProjectCard";
import { getPortfolioItems } from "~/data/portfolio";

export function meta() {
	return [
		{ title: "Projects | Kevin Cunanan" },
		{ name: "description", content: "Kevin Cunanan's projects" },
	];
}

export default function Projects() {
	const projects = getPortfolioItems();

	return (
		<main className="px-[2rem] md:px-[4rem] py-[3rem] md:py-[5rem]">
			<h1 className="text-theme-text-light text-[3rem] md:text-[5rem] font-light mb-[1.5rem]">
				Projects
			</h1>
			<p className="text-theme-text font-light text-[1.125rem] leading-relaxed max-w-[48rem] mb-[4rem]">
				My experience in software engineering has mainly focused on internal
				tools that speed up daily activities.
			</p>

			<div className="space-y-[4rem]">
				{projects.map((project) => {
					return (
						<ProjectCard
							key={project.title}
							title={project.title}
							slug={project.slug}
							description={project.description}
							tags={project.tags}
							color={project.color}
							iconPath={project.iconPath}
						/>
					);
				})}
			</div>
		</main>
	);
}
