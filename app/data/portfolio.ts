import rawData from "@data/notion-pages.json";
import type { TProject } from "./types";

const data = rawData as TProject[];

export function getPortfolioItems() {
	return data;
}

export function getPortfolioItem(encodedName: string): TProject | undefined {
	return data.find((item) => item.title === decodeURI(encodedName));
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	for (const item of getPortfolioItems()) {
		for (const tag of item.tags) tags.add(tag);
	}
	return [...tags].sort();
}
