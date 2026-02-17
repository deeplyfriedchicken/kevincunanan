export interface Project {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	color: string;
}

export const projects: Project[] = [
	{
		slug: "floatcms",
		title: "FloatCMS",
		description:
			"Headless GraphQL / API Service for flexibly managing data for any number of web applications, static sites, or native applications.",
		tags: ["GraphQL", "Django", "React", "AWS", "EC2"],
		color: "#006d77",
	},
	{
		slug: "wspir",
		title: "Waiver Application Portal (WSPIR)",
		description:
			"Integrating project waivers into a single system / simple UI. Built while working fully remotely.",
		tags: ["Django", "React", "Kubernetes", "Drone", "Sentry"],
		color: "#2e3445",
	},
	{
		slug: "iads",
		title: "ITAR Ticket Dashboard (IADS)",
		description:
			"Unifying 4 JPL applications into a single metrics application to streamline ITAR verification of JPL documents and shipments.",
		tags: ["Django", "React", "Kubernetes", "Drone", "Sentry"],
		color: "#6ab4b1",
	},
];
