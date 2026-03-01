import rawData from "@data/notion-pages.json";
import type { TNotionData, TProject } from "./types";

const data = rawData as TNotionData;

export function getPortfolioItems(): TProject[] {
	return data.projects;
}

export function getPortfolioItem(slug: string): TProject | undefined {
	return data.projects.find((item) => item.slug === slug);
}

export function getLastUpdated(): string {
	return data.last_updated;
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	for (const item of getPortfolioItems()) {
		for (const tag of item.tags) tags.add(tag);
	}
	return [...tags].sort();
}
