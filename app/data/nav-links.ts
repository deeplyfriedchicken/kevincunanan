export type TNavLink = {
	to: string;
	label: React.ReactNode;
	external?: boolean;
};

export const navLinks: TNavLink[] = [
	{ to: "/", label: "home" },
	{ to: "/about", label: "about" },
	{ to: "/projects", label: "projects" },
	{ to: "/Kevin_Cunanan_Resume_2026.pdf", label: "resume", external: true },
];

export const githubUrl = "https://github.com/deeplyfriedchicken/kevincunanan";
