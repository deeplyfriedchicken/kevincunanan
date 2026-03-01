import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
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
		<main className="relative px-[2rem] md:px-[4rem] py-[3rem] md:py-[5rem]">
			<div className="fixed inset-0 pointer-events-none z-0">
				<div
					className="absolute left-[-175px] bottom-0 text-theme-primary"
					style={{ opacity: "var(--theme-blob-opacity)" }}
				>
					<LeftBlob className="w-full h-full" style={{ overflow: "visible" }} />
				</div>
				<div
					className="absolute right-[-500px] bottom-0 text-theme-primary"
					style={{ opacity: "var(--theme-blob-opacity)" }}
				>
					<RightBlob
						className="w-full h-full"
						style={{ overflow: "visible" }}
					/>
				</div>
			</div>

			<div className="relative z-10 max-w-[64rem] mx-auto">
				<h1 className="text-center text-theme-text-light text-[3rem] md:text-[5rem] font-light mb-[1.5rem]">
					Projects
				</h1>
				<p className="text-center italic text-theme-text font-light text-[1.125rem] leading-relaxed max-w-[32rem] mx-auto mb-[4rem]">
					My experience in software engineering has mainly focused on internal
					tools that speed up daily activities.
				</p>

				<div className="space-y-[4rem]">
					{projects.map((project) => (
						<ProjectCard
							key={project.title}
							title={project.title}
							slug={project.slug}
							description={project.description}
							tags={project.tags}
							iconPath={project.iconPath}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
