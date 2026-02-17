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
				I'm a software engineer, that affirms in team-driven development
				and a desire to continuously find and implement the best
				practices.
			</p>

			<div className="flex flex-col sm:flex-row gap-[2rem] mt-[4rem]">
				<div className="flex items-center gap-[0.75rem]">
					<MapPin className="w-[2.5rem] h-[2.5rem] text-theme-text" />
					<span className="text-theme-text-light text-[1.875rem] md:text-[2.25rem] font-light">
						Los Angeles
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
					I believe that the most important skill for a developer is
					the ability to learn while also having the willingness to
					adapt. When developing an application, I don't mindlessly
					develop; instead, I code and build features that make sense
					and discuss with others on those features that don't.
				</p>
				<p>
					While the majority of my knowledge has been centered around
					traditional web development, I'm currently trying personal
					projects on mobile and desktop platforms using frameworks
					like Swift and React Native in conjunction with GraphQL.
				</p>
				<p>
					However, my life extends beyond software engineering and at
					the end of the day I look for ways to bond with others
					through activities like competing in super smash bros
					parties, playing volleyball, or rock climbing; I think having
					that activity and engagement is super important part of
					work-life balance.
				</p>
				<p>I'm also a huge fan cats and other fluffy animals.</p>
			</div>
		</main>
	);
}
