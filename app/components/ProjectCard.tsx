import { Link } from "react-router";
import { TechTag } from "~/components/TechTag";
import { assetUrl } from "~/services/assetUrl";

type TProjectCard = {
	title: string;
	slug: string;
	description: string;
	tags: string[];
	color: string;
	iconPath?: string;
};

export function ProjectCard({
	title,
	slug,
	description,
	tags,
	iconPath,
}: TProjectCard) {
	return (
		<div className="flex flex-col md:flex-row gap-[1.5rem] md:gap-[2.5rem]">
			<div className="w-full md:w-[20rem] h-[15rem] md:h-[20rem] flex items-center justify-center shrink-0 overflow-hidden">
				{iconPath && (
					<img
						src={assetUrl(iconPath)}
						alt={title}
						className="w-full h-full object-contain p-[2.5rem]"
					/>
				)}
			</div>
			<div className="flex flex-col justify-center gap-[1rem]">
				<h3 className="text-theme-text text-[1.5rem] md:text-[2.25rem] font-light">
					{title}
				</h3>
				<p className="text-theme-text font-light leading-relaxed text-[1rem]">
					{description}
				</p>
				<div className="flex flex-wrap gap-[0.5rem]">
					{tags.map((tag) => (
						<TechTag key={tag} label={tag} />
					))}
				</div>
				<Link
					to={`/projects/${slug}`}
					className="text-theme-text font-merriweather-sans text-[0.875rem] hover:opacity-70 transition-opacity mt-[0.5rem]"
				>
					READ MORE +
				</Link>
			</div>
		</div>
	);
}
