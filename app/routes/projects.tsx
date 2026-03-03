import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
import { ProjectCard } from "~/components/ProjectCard";
import { getPortfolioItems } from "~/data/portfolio";

export function meta() {
	return [
		{ title: "Projects | Kevin Cunanan" },
		{ name: "description", content: "Kevin Cunanan's projects" },
		{ property: "og:title", content: "Projects | Kevin Cunanan" },
		{
			property: "og:description",
			content: "Kevin Cunanan's projects",
		},
		{
			property: "og:image",
			content: "https://cunanan.dev/images/og-image.png",
		},
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
	];
}

export default function Projects() {
	const projects = getPortfolioItems();

	return (
		<main className="relative px-[2rem] py-[3rem] md:px-[4rem] md:py-[5rem]">
			<div className="pointer-events-none fixed inset-0 z-0">
				<div
					className="absolute bottom-0 left-[-175px] text-theme-primary"
					style={{ opacity: "var(--theme-blob-opacity)" }}
				>
					<LeftBlob className="h-full w-full overflow-visible" />
				</div>
				<div
					className="absolute right-[-500px] bottom-0 text-theme-primary"
					style={{ opacity: "var(--theme-blob-opacity)" }}
				>
					<RightBlob className="h-full w-full overflow-visible" />
				</div>
			</div>

			<div className="relative z-10 mx-auto max-w-[64rem]">
				<h1 className="mb-[1.5rem] text-center font-light text-[3rem] text-theme-text-light md:text-[5rem]">
					Projects
				</h1>
				<p className="mx-auto mb-[4rem] max-w-[32rem] text-center font-light text-[1.125rem] text-theme-text italic leading-relaxed">
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
