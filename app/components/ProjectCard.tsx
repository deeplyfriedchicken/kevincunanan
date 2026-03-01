import { Link } from "react-router";
import { assetUrl } from "~/services/assetUrl";

type TProjectCard = {
	title: string;
	slug: string;
	description: string;
	tags: string[];
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
		<div className="flex flex-col md:flex-row gap-[1rem] md:gap-[2rem]">
			<div className="w-full md:w-[15rem] h-[11rem] md:h-[15rem] flex items-center justify-center shrink-0 overflow-hidden">
				{iconPath && (
					<img
						src={assetUrl(iconPath)}
						alt={title}
						className="w-full h-full object-contain p-[2rem]"
					/>
				)}
			</div>
			<div className="flex flex-col justify-center gap-[0.5rem]">
				<Link to={`/projects/${slug}`}>
					<h3 className="text-theme-text-light text-[1.125rem] md:text-[1.5rem] font-light hover:opacity-70 transition-opacity">
						{title}
					</h3>
				</Link>
				<p className="text-theme-text font-light leading-relaxed text-[0.875rem]">
					{description}
				</p>
				<p
					data-testid="tags"
					className="text-theme-text font-bold text-[0.75rem]"
				>
					{tags.join(", ")} ...
				</p>
				<Link
					to={`/projects/${slug}`}
					className="text-theme-text font-merriweather-sans text-[0.75rem] hover:opacity-70 transition-opacity mt-[0.375rem]"
				>
					READ MORE +
				</Link>
			</div>
		</div>
	);
}
