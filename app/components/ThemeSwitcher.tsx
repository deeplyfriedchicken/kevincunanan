import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTheme } from "~/context/ThemeContext";
import generatedThemesData from "~/data/themes.json";

type ThemeEntry = { slug: string; primaryColor: string };

const generatedThemes = generatedThemesData as ThemeEntry[];

const BLUE_THEME: ThemeEntry = { slug: "blue", primaryColor: "#32384c" };

const themes: ThemeEntry[] = [BLUE_THEME, ...generatedThemes];

type PickerState = "collapsed" | "peeking" | "expanded";

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const { pathname } = useLocation();
	const isHomePage = pathname === "/";
	const containerRef = useRef<HTMLFieldSetElement>(null);

	const [pickerState, setPickerState] = useState<PickerState>("expanded");

	// Reset state on route changes
	useEffect(() => {
		setPickerState(isHomePage ? "expanded" : "collapsed");
	}, [isHomePage]);

	// Click-outside listener to collapse when expanded on non-home pages
	useEffect(() => {
		if (isHomePage || pickerState !== "expanded") return;

		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setPickerState("collapsed");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [isHomePage, pickerState]);

	if (!isHomePage) return null;

	const handleContainerClick = () => {
		if (!isHomePage && pickerState !== "expanded") {
			setPickerState("expanded");
		}
	};

	const handleMouseEnter = () => {
		if (!isHomePage && pickerState === "collapsed") {
			setPickerState("peeking");
		}
	};

	const handleMouseLeave = () => {
		if (!isHomePage && pickerState === "peeking") {
			setPickerState("collapsed");
		}
	};

	return (
		<fieldset
			ref={containerRef}
			data-picker-state={pickerState}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleContainerClick}
			onKeyDown={handleContainerClick}
			className="fixed bottom-[100px] left-[31.5px] z-50 m-0 flex flex-col justify-center gap-[15px] border-none p-0 md:right-8 md:bottom-8 md:left-auto md:flex-col md:items-center md:gap-3"
			style={{ "--dot-count": themes.length } as React.CSSProperties}
		>
			{themes.map(({ slug, primaryColor }, index) => (
				<button
					key={slug}
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						if (!isHomePage && pickerState !== "expanded") {
							setPickerState("expanded");
							return;
						}
						setTheme(slug);
					}}
					className={clsx(
						"theme-dot z-0 h-[25px] w-[25px] rounded-full md:h-10 md:w-10",
						{
							"z-10 scale-110 ring-2 ring-theme-text ring-offset-2":
								theme === slug,
						},
					)}
					style={
						{
							backgroundColor: primaryColor,
							"--dot-index": index,
						} as React.CSSProperties
					}
					aria-label={`Switch to ${slug} theme`}
				/>
			))}
		</fieldset>
	);
}
