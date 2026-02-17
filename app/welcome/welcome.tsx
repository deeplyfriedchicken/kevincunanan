import Lottie from "lottie-react";
import { Link } from "react-router";
import { Navbar } from "~/components/Navbar";
import { useTheme } from "~/context/ThemeContext";
import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
import catBlue from "~/data/cat.json";
import catPink from "~/data/cat-pink.json";
import catGreen from "~/data/cat-green.json";
import catYellow from "~/data/cat-yellow.json";

const catAnimations = {
	blue: catBlue,
	pink: catPink,
	green: catGreen,
	yellow: catYellow,
} as const;

export function Welcome() {
	const { theme } = useTheme();

	return (
		<main className="relative flex items-center justify-center h-screen w-full p-[2rem] md:p-[4rem] -mt-[10px]">
			<div className="hidden md:flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
				style={{ bottom: "calc(50% + 125px)" }}
			>
				<div className="flex-1 w-[10px] bg-theme-text-light opacity-100 rounded-full" />
				<div className="w-[48px] h-[48px] rounded-full bg-theme-text-light opacity-100 shrink-0 -mt-[10px]" />
			</div>

			<div className="fixed inset-0 pointer-events-none z-0">
				<div
					className="absolute left-[-175px] bottom-0 text-theme-primary"
					style={{ opacity: "var(--theme-blob-opacity)" }}
				>
					<LeftBlob className="w-full h-full" style={{ overflow: "visible" }} />
				</div>
				<div
					className="absolute right-[-500px] bottom-0 text-theme-primary"
					style={{ opacity: "var(--theme-blob-opacity)" }}
				>
					<RightBlob className="w-full h-full" style={{ overflow: "visible" }} />
				</div>
			</div>

			<div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-[1rem] grow h-full">
				<div className="flex flex-col items-left justify-center col-span-2 md:col-span-1">
					<h1 className="text-theme-text-light font-light mb-[1rem] text-[2.5rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight">
						kevin cunanan
					</h1>
					<p className="text-theme-text font-extralight text-[1rem]">
						senior software engineer
					</p>
				</div>

				<div className="hidden md:flex items-start justify-center">
					<p className="text-theme-text-light font-light text-[1.125rem] mt-[2rem]">
						full stack developer
					</p>
				</div>

				<Navbar
					navItems={[
						{ to: "/", children: "home" },
						{ to: "/about", children: "about" },
						{ to: "/projects", children: "projects" },
						{ to: "/resume", children: "resume" },
					]}
				/>

				<div className="hidden md:flex items-center justify-start">
					<p className="text-theme-text-light font-light text-[1.125rem] writing-vertical-lr rotate-180">
						react subject matter expert
					</p>
				</div>

				<div className="row-start-2 col-start-1 md:col-start-2 col-span-3 md:col-span-1 flex items-center justify-center">
					<Lottie
						key={theme}
						animationData={catAnimations[theme]}
						loop
					/>
				</div>

				<div className="hidden md:flex items-center justify-end">
					<p className="text-theme-text-light font-light text-[1.125rem]">
						verified cat enthusiast
					</p>
				</div>

				<div className="row-start-3 flex">
					<p className="text-theme-credit opacity-25 font-semibold mt-auto text-[0.875rem]">
						designed by cory
					</p>
				</div>

				<div className="row-start-3 flex flex-col items-center justify-center pt-[2rem]">
					<p className="font-merriweather-sans text-theme-muted uppercase basis-1/3 tracking-widest text-[0.875rem]">
						Los Angeles
					</p>
					<div className="basis-2/3">
						<Link
							to="/projects"
							className="bg-theme-button hover:bg-theme-button-hover px-[3rem] py-[1rem] text-white rounded-full transition-colors text-[1rem] whitespace-nowrap"
						>
							check out my work
						</Link>
					</div>
				</div>

				<div className="row-start-3 hidden md:flex items-end justify-end">
					<p className="text-theme-text-light font-light text-[1.125rem]">
						maker of cool things
					</p>
				</div>
			</div>
		</main>
	);
}
