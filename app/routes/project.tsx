import ReactMarkdown from "react-markdown";
import { data } from "react-router";
import { InnerNavbar } from "~/components/InnerNavbar";
import { getPortfolioItem } from "~/data/portfolio";
import { assetUrl } from "~/services/assetUrl";
import type { Route } from "./+types/project";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const project = getPortfolioItem(params.slug ?? "");
	if (!project) {
		throw data(null, { status: 404 });
	}
	return { project };
}

export function meta({ loaderData }: Route.MetaArgs) {
	const project = loaderData?.project;
	return [
		{
			title: project
				? `${project.title} | Kevin Cunanan`
				: "Project Not Found | Kevin Cunanan",
		},
		{ name: "description", content: project?.description ?? "" },
	];
}

type TOCItem = { level: 2 | 3; text: string; id: string };

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]/g, "");
}

function extractTOC(markdown: string): TOCItem[] {
	return markdown.split("\n").reduce<TOCItem[]>((acc, line) => {
		if (line.startsWith("# "))
			acc.push({ level: 2, text: line.slice(2), id: slugify(line.slice(2)) });
		else if (line.startsWith("## "))
			acc.push({ level: 2, text: line.slice(3), id: slugify(line.slice(3)) });
		else if (line.startsWith("### "))
			acc.push({ level: 3, text: line.slice(4), id: slugify(line.slice(4)) });
		return acc;
	}, []);
}

export default function Project({ loaderData }: Route.ComponentProps) {
	const { project } = loaderData;
	const markdown = project.content;
	const toc = extractTOC(markdown);

	return (
		<div className="min-h-screen flex flex-col">
			{/* HERO */}
			<section style={{ backgroundColor: project.color }} className="relative">
				<InnerNavbar variant="dark" color={project.color} />
				<div className="px-[2rem] md:px-[4rem] pb-[5rem]">
					<h1 className="text-white text-[3rem] md:text-[4rem] font-light mb-[1rem]">
						{project.title}
					</h1>
					<p className="text-white/80 text-[1.125rem] font-light max-w-[40rem]">
						{project.description}
					</p>
				</div>
			</section>

			{/* CONTENT AREA */}
			<div className="flex-1 bg-white px-[2rem] md:px-[4rem] py-[3rem]">
				<div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-[2rem] md:gap-[4rem]">
					{/* LEFT COLUMN: app icon + TOC */}
					<div>
						{/* App icon — negative margin pulls it up over the hero boundary */}
						<div className="relative z-10 -mt-[6rem] mb-[2rem] w-[8rem] h-[8rem] overflow-hidden flex items-center justify-center">
							{project.iconPath && (
								<img
									src={assetUrl(project.iconPath)}
									alt={project.title}
									className="w-full h-full object-contain p-[1rem]"
								/>
							)}
						</div>

						{/* TOC */}
						{toc.length > 0 && (
							<nav className="space-y-[0.125rem]">
								{toc.map((item) =>
									item.level === 2 ? (
										<a
											key={item.id}
											href={`#${item.id}`}
											className="block py-[0.5rem] text-theme-text font-merriweather-sans text-[0.875rem] hover:opacity-70 transition-opacity"
										>
											{item.text}
										</a>
									) : (
										<a
											key={item.id}
											href={`#${item.id}`}
											className="block pl-[1rem] py-[0.375rem] border-l-2 border-theme-text/40 text-theme-text font-merriweather-sans text-[0.875rem] hover:opacity-70 transition-opacity"
										>
											{item.text}
										</a>
									),
								)}
							</nav>
						)}
					</div>

					{/* RIGHT COLUMN: article */}
					<article className="space-y-[1rem]">
						<ReactMarkdown
							components={{
								h1({ children }) {
									const text = String(children);
									return (
										<h1
											id={slugify(text)}
											className="text-theme-text text-[1.75rem] font-light mt-[2rem] mb-[0.75rem] first:mt-0"
										>
											{children}
										</h1>
									);
								},
								h2({ children }) {
									const text = String(children);
									return (
										<h2
											id={slugify(text)}
											className="text-theme-text text-[1.75rem] font-light mt-[2rem] mb-[0.75rem] first:mt-0"
										>
											{children}
										</h2>
									);
								},
								h3({ children }) {
									const text = String(children);
									return (
										<h3
											id={slugify(text)}
											className="uppercase tracking-widest text-theme-text text-[0.75rem] font-semibold mt-[2rem] mb-[0.5rem]"
										>
											{children}
										</h3>
									);
								},
								p({ children }) {
									return (
										<p className="text-theme-text font-light leading-relaxed">
											{children}
										</p>
									);
								},
								ul({ children }) {
									return (
										<ul className="list-disc list-inside space-y-[0.375rem]">
											{children}
										</ul>
									);
								},
								li({ children }) {
									return (
										<li className="text-theme-text font-light">{children}</li>
									);
								},
								a({ href, children }) {
									return (
										<a
											href={href}
											className="text-theme-button underline hover:opacity-70 transition-opacity"
											target="_blank"
											rel="noopener noreferrer"
										>
											{children}
										</a>
									);
								},
								code({ children }) {
									return (
										<code className="bg-theme-primary/10 text-theme-text text-[0.875em] px-[0.25rem] py-[0.125rem] rounded">
											{children}
										</code>
									);
								},
							}}
						>
							{markdown}
						</ReactMarkdown>
					</article>
				</div>
			</div>
		</div>
	);
}
