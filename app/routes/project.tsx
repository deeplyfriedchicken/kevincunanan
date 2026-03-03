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
	const title = project
		? `${project.title} | Kevin Cunanan`
		: "Project Not Found | Kevin Cunanan";
	const description = project?.description ?? "";
	return [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{
			property: "og:image",
			content: "https://cunanan.dev/images/og-image.png",
		},
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
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
		<div className="flex min-h-screen flex-col">
			{/* HERO */}
			<section style={{ backgroundColor: project.color }} className="relative">
				<InnerNavbar variant="dark" color={project.color} />
				<div className="px-[2rem] pb-[5rem] md:px-[4rem]">
					<h1 className="mb-[1rem] font-light text-[3rem] text-white md:text-[4rem]">
						{project.title}
					</h1>
					<p className="max-w-[40rem] font-light text-[1.125rem] text-white/80">
						{project.description}
					</p>
				</div>
			</section>

			{/* CONTENT AREA */}
			<div className="flex-1 bg-white px-[2rem] py-[3rem] md:px-[4rem]">
				<div className="grid grid-cols-1 gap-[2rem] md:grid-cols-[16rem_1fr] md:gap-[4rem]">
					{/* LEFT COLUMN: app icon + TOC */}
					<div>
						{/* App icon — negative margin pulls it up over the hero boundary */}
						<div className="relative z-10 -mt-[6rem] mb-[2rem] flex h-[8rem] w-[8rem] items-center justify-center overflow-hidden">
							{project.iconPath && (
								<img
									src={assetUrl(project.iconPath)}
									alt={project.title}
									className="h-full w-full object-contain p-[1rem]"
								/>
							)}
						</div>

						{/* TOC */}
						{toc.length > 0 && <TableOfContents items={toc} />}
					</div>

					{/* RIGHT COLUMN: article */}
					<article className="max-w-[40rem] space-y-[1rem]">
						<ReactMarkdown
							components={{
								h1({ children }) {
									const text = String(children);
									const id = slugify(text);
									const url = `${window.location.origin}${window.location.pathname}#${id}`;
									return (
										<h1
											id={id}
											className="mt-[2rem] mb-[0.75rem] font-light text-[1.75rem] text-theme-text first:mt-0"
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
											className="mt-[2rem] mb-[0.75rem] font-light text-[1.75rem] text-theme-text first:mt-0"
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
											className="font-semibold text-[1.25rem] text-theme-text uppercase tracking-widest"
										>
											<a href={url}>{children}</a>
											<HeadingAnchor id={id} />
										</h3>
									);
								},
								p({ children }) {
									return (
										<p className="font-light text-theme-text leading-relaxed">
											{children}
										</p>
									);
								},
								ul({ children }) {
									return (
										<ul className="list-inside list-disc space-y-[0.375rem]">
											{children}
										</ul>
									);
								},
								li({ children }) {
									return (
										<li className="font-light text-theme-text">{children}</li>
									);
								},
								a({ href, children }) {
									return (
										<a
											href={href}
											className="text-theme-button underline transition-opacity hover:opacity-70"
											target="_blank"
											rel="noopener noreferrer"
										>
											{children}
										</a>
									);
								},
								img({ src, alt }) {
									return (
										<div className="flex w-full flex-col items-center justify-center">
											<div className="max-w-[30rem]">
												<img
													src={src ? assetUrl(src) : src}
													alt={alt ?? ""}
													className="my-[1rem] w-full rounded"
												/>
												<p className="text-center font-light text-[0.875rem] text-theme-text opacity-75">
													{alt}
												</p>
											</div>
										</div>
									);
								},
								code({ children }) {
									return (
										<code className="rounded bg-theme-primary/10 px-[0.25rem] py-[0.125rem] text-[0.875em] text-theme-text">
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
