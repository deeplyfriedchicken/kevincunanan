export interface PortfolioItem {
	slug: string;
	title: string;
	description: string;
	content: string;
	tags: string[];
	color: string;
	imageUrl?: string;
	externalUrl?: string;
	date?: string;
	published: boolean;
}

export interface PortfolioData {
	items: PortfolioItem[];
	lastUpdated: string;
}
