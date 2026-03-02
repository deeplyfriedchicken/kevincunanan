import ReactMarkdown from "react-markdown";
import { data } from "react-router";
import slugify from "react-slugify";
import { HeadingAnchor } from "~/components/HeadingAnchor";
import { InnerNavbar } from "~/components/InnerNavbar";
import { TableOfContents, type TOCItem } from "~/components/TableOfContents";
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

function stripMarkdownLinks(text: string): string {
	return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function extractTOC(markdown: string): TOCItem[] {
	return markdown.split("\n").reduce<TOCItem[]>((acc, line) => {
		let raw = "";
		if (line.startsWith("# ") && !line.startsWith("## ")) {
			raw = line.slice(2);
			acc.push({ level: 1, text: stripMarkdownLinks(raw), id: slugify(raw) });
		} else if (line.startsWith("## ") && !line.startsWith("### ")) {
			raw = line.slice(3);
			acc.push({ level: 2, text: stripMarkdownLinks(raw), id: slugify(raw) });
		} else if (line.startsWith("### ")) {
			raw = line.slice(4);
			acc.push({ level: 3, text: stripMarkdownLinks(raw), id: slugify(raw) });
		}
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
						{toc.length > 0 && <TableOfContents items={toc} />}
					</div>

					{/* RIGHT COLUMN: article */}
					<article className="space-y-[1rem] max-w-[40rem]">
						<ReactMarkdown
							components={{
								h1({ children }) {
									const text = String(children);
									const id = slugify(text);
									const url = `${window.location.origin}${window.location.pathname}#${id}`;
									return (
										<h1
											id={id}
											className="text-theme-text text-[1.75rem] font-light mb-[0.75rem] mt-[2rem] first:mt-0"
										>
											<a href={url}>{children}</a>
											<HeadingAnchor id={id} />
										</h1>
									);
								},
								h2({ children }) {
									const text = String(children);
									const id = slugify(text);
									const url = `${window.location.origin}${window.location.pathname}#${id}`;
									return (
										<h2
											id={id}
											className="text-theme-text text-[1.75rem] font-light mb-[0.75rem] mt-[2rem] first:mt-0"
										>
											<a href={url}>{children}</a>
											<HeadingAnchor id={id} />
										</h2>
									);
								},
								h3({ children }) {
									const text = String(children);
									const id = slugify(text);
									const url = `${window.location.origin}${window.location.pathname}#${id}`;
									return (
										<h3
											id={id}
											className="uppercase tracking-widest text-theme-text text-[1.25rem] font-semibold"
										>
											<a href={url}>{children}</a>
											<HeadingAnchor id={id} />
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
								img({ src, alt }) {
									return (
										<div className="w-full flex flex-col items-center justify-center">
											<div className="max-w-[30rem]">
												<img
													src={src ? assetUrl(src) : src}
													alt={alt ?? ""}
													className="w-full rounded my-[1rem]"
												/>
												<p className="text-theme-text opacity-75 font-light text-[0.875rem] text-center">
													{alt}
												</p>
											</div>
										</div>
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
