import Lottie from "lottie-react";
import { Github } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
import { LastUpdatedClock } from "~/components/LastUpdatedClock";
import { Navbar } from "~/components/Navbar";
import { githubUrl, navLinks } from "~/components/nav-links";
import { useTheme } from "~/context/ThemeContext";
import generatedThemesData from "~/data/themes.json";

const catModules = import.meta.glob<{ default: object }>("../data/cat-*.json", {
	eager: true,
});
const catAnimations: Record<string, object> = {};
for (const [path, mod] of Object.entries(catModules)) {
	const slug = path.match(/cat-(.+)\.json$/)?.[1];
	if (slug) catAnimations[slug] = mod.default;
}

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
			<div className="md:hidden bg-white min-h-screen grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] overflow-hidden">
				{/* Top-left: title, subtitles, CTA */}
				<div className="col-start-1 row-start-1 px-[2.25rem] pt-[3rem]">
					<h1 className="text-theme-text-light font-light text-[3.5rem] leading-tight">
						kevin cunanan
					</h1>

					<ul className="text-theme-text font-light text-[1.0625rem] mt-[4rem] space-y-[1rem]">
						<li>full stack developer</li>
						<li>verified cat enthusiast</li>
						<li>maker of cool things</li>
						<li>react subject matter expert</li>
					</ul>

					<Link
						to={cta.href}
						className={`inline-block mt-[4rem] bg-theme-button text-white px-[1.75rem] py-[0.75rem] rounded-full font-bold text-[0.875rem] whitespace-nowrap ${ctaAnimating ? "animate-cta-pop" : ""}`}
					>
						{cta.text}
					</Link>
				</div>

				{/* Top-right: string + ball */}
				<div
					className={`col-start-2 row-start-1 flex flex-col items-center pr-[7.72rem] z-10 ${
						navOpen
							? "animate-bounce-drop"
							: ballHasOpened
								? "animate-bounce-drop-up"
								: ""
					}`}
				>
					{/* String */}
					<div className="w-[0.625rem] h-[11.4375rem] bg-theme-text-light rounded-full" />
					{/* Ball (nav trigger) */}
					<button
						type="button"
						onClick={handleMobileBallClick}
						className="w-[3.9375rem] h-[3.9375rem] rounded-full bg-theme-text-light shrink-0 -mt-[0.5rem] cursor-pointer"
						aria-label="Toggle navigation"
					/>
				</div>

				{/* Bottom-right: cat */}
				<div className="col-start-1 col-span-2 row-start-2 self-end justify-self-end w-[30rem] mr-[-85px] mb-[-60px]">
					<Lottie key={theme} animationData={catAnimations[theme]} loop />
				</div>

				{/* Nav overlay */}
				{navOpen && (
					<>
						{/* Dark overlay */}
						<button
							type="button"
							className="fixed inset-0 bg-theme-primary/85 z-20 animate-nav-overlay appearance-none border-none p-0 cursor-default"
							onClick={() => setNavOpen(false)}
							aria-label="Close navigation"
						/>
						{/* White nav header */}
						<div className="fixed top-0 left-0 right-0 h-[11.4375rem] bg-white/95 backdrop-blur-[10px] z-30 flex items-end px-[2.25rem] pb-[1.5rem] animate-nav-slide">
							{/* Logo */}
							<p className="text-theme-text font-light italic text-[1.5rem]">
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
													`font-merriweather-sans font-bold text-[0.875rem] text-theme-text ${isActive ? "opacity-100" : "opacity-50"}`
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
											className="font-merriweather-sans font-bold text-[0.875rem] text-theme-text opacity-50 flex items-center gap-[0.375rem] hover:opacity-100 transition-opacity"
										>
											<Github className="w-[0.875rem] h-[0.875rem]" />
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
			<main className="relative hidden md:flex items-center justify-center h-screen w-full p-[2rem] md:p-[4rem] -mt-[10px]">
				<div
					className={`flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 z-20 ${desktopSway ? "animate-pendulum" : ""}`}
					style={{ bottom: "calc(50% + 125px)" }}
				>
					<div className="flex-1 w-[10px] bg-theme-text-light opacity-100 rounded-full" />
					<button
						type="button"
						onClick={handleDesktopBallClick}
						className="w-[48px] h-[48px] rounded-full bg-theme-text-light opacity-100 shrink-0 -mt-[10px] cursor-pointer"
						aria-label="Sway animation"
					/>
				</div>

				<div className="fixed inset-0 pointer-events-none z-0">
					<div
						className="absolute left-[-175px] bottom-0 text-theme-primary"
						style={{ opacity: "var(--theme-blob-opacity)" }}
					>
						<LeftBlob
							className="w-full h-full"
							style={{ overflow: "visible" }}
						/>
					</div>
					<div
						className="absolute right-[-500px] bottom-0 text-theme-primary"
						style={{ opacity: "var(--theme-blob-opacity)" }}
					>
						<RightBlob
							className="w-full h-full"
							style={{ overflow: "visible" }}
						/>
					</div>
				</div>

				<div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-[1rem] grow h-full">
					<div className="flex flex-col items-left justify-center col-span-1">
						<h1 className="text-theme-text-light font-light mb-[1rem] text-[3.75rem] lg:text-[4.5rem] leading-tight">
							kevin cunanan
						</h1>
						<p className="text-theme-text font-extralight text-[1rem]">
							senior software engineer
						</p>
					</div>

					<div className="flex items-start justify-center">
						<p className="text-theme-text-light font-light text-[1.125rem] mt-[2rem]">
							full stack developer
						</p>
					</div>

					<Navbar navItems={navItems} />

					<div className="flex items-center justify-start">
						<p className="text-theme-text-light font-light text-[1.125rem] writing-vertical-lr rotate-180">
							react subject matter expert
						</p>
					</div>

					<div className="col-start-2 col-span-1 flex items-center justify-center">
						<Lottie key={theme} animationData={catAnimations[theme]} loop />
					</div>

					<div className="flex items-center justify-end">
						<p className="text-theme-text-light font-light text-[1.125rem]">
							verified cat enthusiast
						</p>
					</div>

					<div className="row-start-3 flex flex-col justify-end gap-[0.5rem]">
						<p className="text-theme-credit opacity-25 font-semibold text-[0.875rem]">
							designed by cory
						</p>
						<LastUpdatedClock variant="light" />
					</div>

					<div className="row-start-3 flex flex-col items-center justify-center pt-[2rem]">
						<p className="font-merriweather-sans text-theme-text uppercase basis-1/3 tracking-widest text-[0.875rem]">
							Los Angeles
						</p>
						<div className="basis-2/3">
							<Link
								to={cta.href}
								className={`inline-block bg-theme-button hover:bg-theme-button-hover px-[3rem] py-[1rem] text-white rounded-full transition-colors text-[1rem] whitespace-nowrap ${ctaAnimating ? "animate-cta-pop" : ""}`}
							>
								{cta.text}
							</Link>
						</div>
					</div>

					<div className="row-start-3 flex items-end justify-end">
						<p className="text-theme-text-light font-light text-[1.125rem]">
							maker of cool things
						</p>
					</div>
				</div>
			</main>
		</>
	);
}
