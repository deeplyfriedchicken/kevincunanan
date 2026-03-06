import generatedThemesData from "@palettes/themes.json";
import clsx from "clsx";
import Lottie from "lottie-react";
import { Github } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import ArrowSvg from "~/assets/arrow.svg?react";
import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
import { LastUpdatedClock } from "~/components/LastUpdatedClock";
import { Navbar } from "~/components/Navbar";
import { githubUrl, navLinks } from "~/components/nav-links";
import { useTheme } from "~/context/ThemeContext";
import blueCatJson from "~/data/cat-blue.json";

const catModules = import.meta.glob<{ default: object }>(
	"../../generatedPalettes/cat-*.json",
	{
		eager: true,
	},
);
const catAnimations: Record<string, object> = {};
for (const [path, mod] of Object.entries(catModules)) {
	const slug = path.match(/cat-(.+)\.json$/)?.[1];
	if (slug) catAnimations[slug] = mod.default;
}
catAnimations.blue = blueCatJson;

type ThemeEntry = { slug: string; title: string; primaryColor: string };
const generatedThemes = generatedThemesData as ThemeEntry[];

// Build a slug → CTA mapping. Blue is the hardcoded default.
const ctaByTheme: Record<string, { text: string; href: string }> = {
	blue: { text: "check out my work", href: "/projects" },
};
for (const { slug, title } of generatedThemes) {
	ctaByTheme[slug] = {
		text: `check out ${title.toLowerCase()}`,
		href: `/projects/${slug}`,
	};
}

const navItems = navLinks.map(({ to, label }) => ({ to, children: label }));

function DesignedByCory() {
	return (
		<p className="font-semibold text-[0.875rem] text-theme-credit opacity-25">
			designed by{" "}
			<a
				className="underline"
				href="https://www.linkedin.com/in/findingcory/"
				target="_blank"
				rel="noopener noreferrer"
			>
				cory
			</a>
		</p>
	);
}

function EngineeredByKevin() {
	return (
		<p className="flex items-center font-semibold text-[0.875rem] text-theme-credit opacity-25">
			<span className="pr-[0.25rem]">
				<Link className="underline" to="/projects/porfolio">
					engineered
				</Link>{" "}
				by kevin
			</span>
			<LastUpdatedClock variant="light" />
		</p>
	);
}

export function Welcome() {
	const { theme } = useTheme();
	const [navOpen, setNavOpen] = useState(false);
	const [desktopSway, setDesktopSway] = useState(false);
	// Track whether ball has ever been opened so closing gets the up animation (not bounce)
	const [ballHasOpened, setBallHasOpened] = useState(false);

	const cta = ctaByTheme[theme] ?? ctaByTheme.blue;
	const [ctaAnimating, setCtaAnimating] = useState(false);
	const prevThemeRef = useRef(theme);

	useEffect(() => {
		if (prevThemeRef.current === theme) return;
		prevThemeRef.current = theme;
		setCtaAnimating(false);
		requestAnimationFrame(() => setCtaAnimating(true));
		// Reset after animation so the class can be cleanly reapplied on the next change
		const t = setTimeout(() => setCtaAnimating(false), 400);
		return () => clearTimeout(t);
	}, [theme]);

	const handleDesktopBallClick = useCallback(() => {
		setDesktopSway(false);
		// Force reflow to restart animation
		requestAnimationFrame(() => setDesktopSway(true));
		setTimeout(() => setDesktopSway(false), 2000);
	}, []);

	const handleMobileBallClick = useCallback(() => {
		if (!navOpen) {
			setBallHasOpened(true);
		}
		setNavOpen((prev) => !prev);
	}, [navOpen]);

	return (
		<>
			{/* Mobile layout */}
			<div className="grid h-dvh grid-cols-[1fr_auto] grid-rows-[auto_1fr] overflow-hidden bg-white md:hidden">
				{/* Top-left: title, subtitles, CTA */}
				<div className="col-start-1 row-start-1 px-[2.25rem] pt-[clamp(1.5rem,4dvh,3rem)]">
					<h1 className="font-light text-[3.5rem] text-theme-text-light leading-tight">
						kevin cunanan
					</h1>

					<ul className="mt-[clamp(1.5rem,5dvh,4rem)] space-y-[clamp(0.5rem,1.5dvh,1rem)] font-light text-[1.0625rem] text-theme-text">
						<li>senior software engineer</li>
						<li>agentic engineer</li>
						<li>pipeline tinkerer</li>
						<li>cat whisperer</li>
					</ul>

					<Link
						to={cta.href}
						className={clsx(
							"mt-[clamp(1.5rem,5dvh,4rem)] inline-block whitespace-nowrap rounded-full bg-theme-button px-[1.75rem] py-[0.75rem] font-bold text-[0.875rem] text-white",
							ctaAnimating && "animate-cta-pop",
						)}
					>
						{cta.text}
					</Link>
				</div>

				{/* Top-right: string + ball */}
				<div
					className={clsx(
						"z-10 col-start-2 row-start-1 flex flex-col items-center pr-[7.72rem]",
						navOpen
							? "animate-bounce-drop"
							: ballHasOpened && "animate-bounce-drop-up",
					)}
				>
					{/* String */}
					<div
						className={clsx(
							"-mt-[12rem] h-[32rem] w-[0.625rem] rounded-b-full bg-theme-text-light",
							!navOpen && "animate-ball-rattle",
						)}
					/>
					{/* Ball (nav trigger) */}
					<button
						type="button"
						onClick={handleMobileBallClick}
						className={clsx(
							"-mt-[0.5rem] h-[3.9375rem] w-[3.9375rem] shrink-0 cursor-pointer rounded-full bg-theme-text-light",
							!navOpen && "animate-ball-rattle",
						)}
						aria-label="Toggle navigation"
					/>
				</div>

				{/* Bottom-right: cat */}
				<div className="col-span-2 col-start-1 row-start-2 mr-[-3rem] mb-[-3rem] w-[30rem] self-end justify-self-end">
					<Lottie key={theme} animationData={catAnimations[theme]} loop />
				</div>

				{/* Bottom-left: credits */}
				<div className="col-span-1 col-start-1 row-start-2 self-end justify-self-start px-[2.25rem] py-[2.25rem]">
					<DesignedByCory />
					<EngineeredByKevin />
				</div>

				{/* Nav overlay */}
				{navOpen && (
					<>
						{/* Dark overlay */}
						<button
							type="button"
							className="fixed inset-0 z-20 animate-nav-overlay cursor-default appearance-none border-none bg-theme-primary/85 p-0"
							onClick={() => setNavOpen(false)}
							aria-label="Close navigation"
						/>
						{/* White nav header */}
						<div className="fixed top-0 right-0 left-0 z-30 flex h-[12.4375rem] animate-nav-slide items-end bg-white/95 px-[2.25rem] pb-[1.5rem] backdrop-blur-[10px]">
							{/* Logo */}
							<p className="font-light text-[1.5rem] text-theme-text italic">
								kevin cunanan
							</p>
							{/* Nav links */}
							<nav className="ml-auto">
								<ul className="flex flex-col items-end gap-[0.625rem]">
									{navItems.map(({ to, children }) => (
										<li key={to}>
											<NavLink
												to={to}
												onClick={() => setNavOpen(false)}
												className={({ isActive }) =>
													clsx(
														"font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50",
														isActive && "opacity-100",
													)
												}
											>
												{children}
											</NavLink>
										</li>
									))}
									<li>
										<a
											href={githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => setNavOpen(false)}
											className="flex items-center gap-[0.375rem] font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50 transition-opacity hover:opacity-100"
										>
											<Github className="h-[0.875rem] w-[0.875rem]" />
											github
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</>
				)}
			</div>

			{/* Desktop layout */}
			<main className="relative -mt-[10px] hidden h-dvh w-full items-center justify-center overflow-hidden p-[2rem] md:flex md:p-[4rem]">
				<div
					className={clsx(
						"desktop-ball absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center",
						desktopSway && "animate-pendulum",
					)}
				>
					<div className="w-[10px] flex-1 rounded-full bg-theme-text-light opacity-100" />
					<button
						type="button"
						onClick={handleDesktopBallClick}
						className="-mt-[10px] h-[48px] w-[48px] shrink-0 cursor-pointer rounded-full bg-theme-text-light opacity-100"
						aria-label="Sway animation"
					/>
					<p className="absolute top-[calc(50%+25px)] right-[2.5rem] w-full rotate-270 whitespace-nowrap font-light text-[1rem] text-theme-text-light">
						pipeline tinkerer
					</p>
					<p className="absolute bottom-3 left-[calc(50%+2.5rem)] whitespace-nowrap font-light text-[1rem] text-theme-text-light">
						agentic engineer
					</p>
				</div>

				<div className="pointer-events-none fixed inset-0 z-0">
					<div
						className="absolute bottom-0 left-[-175px] text-theme-primary"
						style={{ opacity: "var(--theme-blob-opacity)" }}
					>
						<LeftBlob className="h-full w-full overflow-visible" />
					</div>
					<div
						className="absolute right-[-500px] bottom-0 text-theme-primary"
						style={{ opacity: "var(--theme-blob-opacity)" }}
					>
						<RightBlob className="h-full w-full overflow-visible" />
					</div>
				</div>

				<div className="relative z-10 grid h-full grow grid-cols-3 grid-rows-3 gap-[1rem]">
					<div className="items-left col-span-1 flex flex-col justify-center">
						<h1 className="mb-[1rem] font-light text-[3.75rem] text-theme-text-light leading-tight lg:text-[4.5rem]">
							kevin cunanan
						</h1>
						<p className="font-extralight text-[1rem] text-theme-text">
							senior software engineer
						</p>
					</div>

					<div />

					<Navbar navItems={navItems} />

					<div className="flex items-center justify-start">
						<p className="writing-vertical-lr mt-[8rem] font-light text-[1.125rem] text-theme-text-light">
							cat whisperer
						</p>
					</div>

					<div className="col-span-1 col-start-2 flex items-center justify-center">
						<Lottie key={theme} animationData={catAnimations[theme]} loop />
					</div>

					<div className="row-start-3 flex flex-col justify-end gap-[0.5rem]">
						<DesignedByCory />
						<EngineeredByKevin />
					</div>

					<ArrowSvg
						aria-hidden="true"
						preserveAspectRatio="none"
						className="pointer-events-none absolute top-[calc(50%)] left-[calc(5%)] h-[calc(25%)] w-[calc(35%)] opacity-50"
					/>

					<div className="row-start-3 flex flex-col items-center justify-center pt-[2rem]">
						<p className="basis-1/3 font-merriweather-sans text-[0.875rem] text-theme-text uppercase tracking-widest">
							Los Angeles
						</p>
						<div className="basis-2/3">
							<Link
								to={cta.href}
								className={clsx(
									"inline-block whitespace-nowrap rounded-full bg-theme-button px-[3rem] py-[1rem] text-[1rem] text-white transition-colors hover:bg-theme-button-hover",
									ctaAnimating && "animate-cta-pop",
								)}
							>
								{cta.text}
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
