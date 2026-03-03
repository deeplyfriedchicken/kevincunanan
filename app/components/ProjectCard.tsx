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
		<div className="flex flex-col gap-[1rem] md:flex-row md:gap-[2rem]">
			<div className="flex h-[11rem] w-full shrink-0 items-center justify-center overflow-hidden md:h-[15rem] md:w-[15rem]">
				{iconPath && (
					<img
						src={assetUrl(iconPath)}
						alt={title}
						className="h-full w-full object-contain p-[2rem]"
					/>
				)}
			</div>
			<div className="flex flex-col justify-center gap-[0.5rem]">
				<Link to={`/projects/${slug}`}>
					<h3 className="font-light text-[1.125rem] text-theme-text-light transition-opacity hover:opacity-70 md:text-[1.5rem]">
						{title}
					</h3>
				</Link>
				<p className="font-light text-[0.875rem] text-theme-text leading-relaxed">
					{description}
				</p>
				<p
					data-testid="tags"
					className="font-bold text-[0.75rem] text-theme-text"
				>
					{tags.join(", ")} ...
				</p>
				<Link
					to={`/projects/${slug}`}
					className="mt-[0.375rem] font-merriweather-sans text-[0.75rem] text-theme-text transition-opacity hover:opacity-70"
				>
					READ MORE +
				</Link>
			</div>
		</div>
	);
}
