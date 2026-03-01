export type TProject = {
	title: string;
	slug: string;
	description: string;
	content: string;
	tags: string[];
	color: string;
	iconPath: string;
	isFavorite: boolean;
};

export type TNotionData = {
	last_updated: string;
	projects: TProject[];
};
