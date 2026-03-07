import type { TProject } from "./types";

const modules = import.meta.glob<{ default: TProject }>(
	"../../data/projects/*.json",
	{ eager: true },
);
const allProjects = Object.values(modules).map((m) => m.default);

export function getPortfolioItems(): TProject[] {
	return allProjects;
}

export function getPortfolioItem(slug: string): TProject | undefined {
	return allProjects.find((item) => item.slug === slug);
}

export function getLastUpdated(): string {
	return allProjects.reduce(
		(latest, p) => (p.last_updated > latest ? p.last_updated : latest),
		"",
	);
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	for (const item of allProjects) {
		for (const tag of item.tags) tags.add(tag);
	}
	return [...tags].sort();
}
