import { MapPin, Briefcase } from "lucide-react";

export function meta() {
	return [
		{ title: "About | Kevin Cunanan" },
		{ name: "description", content: "About Kevin Cunanan" },
	];
}

export default function About() {
	return (
		<main className="px-[2rem] md:px-[4rem] py-[3rem] md:py-[5rem]">
			<p className="text-theme-text text-[1.125rem] md:text-[1.25rem] font-light leading-relaxed max-w-[48rem]">
				Frontend engineer, AI supervisor, Full-Stack Developer
			</p>

			<div className="flex flex-col sm:flex-row gap-[2rem] mt-[4rem]">
				<div className="flex items-center gap-[0.75rem]">
					<MapPin className="w-[2.5rem] h-[2.5rem] text-theme-text" />
					<span className="text-theme-text-light text-[1.875rem] md:text-[2.25rem] font-light">
						Bay Area, CA | Hybrid | Remote
					</span>
				</div>
				<div className="flex items-center gap-[0.75rem]">
					<Briefcase className="w-[2.5rem] h-[2.5rem] text-theme-text" />
					<span className="text-theme-text-light text-[1.875rem] md:text-[2.25rem] font-light">
						Sure
					</span>
				</div>
			</div>

			<div className="mt-[4rem] max-w-[48rem] space-y-[1.5rem] text-theme-text font-light leading-relaxed text-[1rem]">
				<p>
					While I am a full-stack developer at heart, I have 6+ years of focused experience working in frontend engineering; sprinkled in there is regular work with CI pipelines, API contracts, and UI/UX.</p>
				<p>
					Work is not everything though. I love sports 🏐, climbing 🧗🏽‍♂️, snow 🎿, and many games🕹️.
				</p>
				<p>If you couldn't tell, I like cats.</p>
				<p>Please reach out if you'd like to chat!</p>
			</div>
		</main>
	);
}
