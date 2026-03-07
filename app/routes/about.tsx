import { MapPin } from "lucide-react";

export function meta() {
	return [
		{ title: "About | Kevin Cunanan" },
		{ name: "description", content: "About Kevin Cunanan" },
		{
			property: "og:title",
			content: "Kevin Cunanan | Senior Software Engineer",
		},
		{ property: "og:description", content: "About Kevin Cunanan" },
		{
			property: "og:image",
			content: "https://cunanan.dev/images/og-image.png",
		},
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
	];
}

export default function About() {
	return (
		<main className="flex min-h-screen flex-col px-[2rem] py-[3rem] md:px-[4rem] md:py-[5rem]">
			<p className="max-w-[48rem] font-light text-[1.125rem] text-theme-text leading-relaxed md:text-[1.25rem]">
				Frontend engineer + Agentic Experience
			</p>

			<div className="max-w-[40rem]">
				<div className="mt-[4rem] flex flex-col gap-[2rem] sm:flex-row">
					<div className="flex items-center gap-[0.75rem]">
						<MapPin className="h-[2.5rem] w-[2.5rem] text-theme-text" />
						<span className="font-light text-[1.875rem] text-theme-text-light md:text-[2.25rem]">
							Bay Area, CA | Hybrid | Remote
						</span>
					</div>
				</div>

				<div className="mt-[4rem] max-w-[48rem] space-y-[1.5rem] font-light text-[1rem] text-theme-text leading-relaxed">
					<p>
						I have 6+ years of focused experience working in frontend
						engineering; sprinkled in there is regular work with CI pipelines,
						API development, and UI/UX.
					</p>
					<p>Please reach out if you'd like to chat!</p>
				</div>
			</div>
		</main>
	);
}
