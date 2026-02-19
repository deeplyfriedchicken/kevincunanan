import type { PortfolioData, PortfolioItem } from "./types";
import rawData from "./portfolio-items.json";

const data = rawData as PortfolioData;

export function getPortfolioItems(): PortfolioItem[] {
	return data.items
		.filter((item) => item.published)
		.sort((a, b) => {
			if (!a.date || !b.date) return 0;
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
}

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
	return data.items.find((item) => item.slug === slug && item.published);
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	for (const item of getPortfolioItems()) {
		for (const tag of item.tags) tags.add(tag);
	}
	return [...tags].sort();
}
