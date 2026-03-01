import { useTheme } from "~/context/ThemeContext";
import generatedThemesData from "~/data/themes.json";

type ThemeEntry = { slug: string; primaryColor: string };

const generatedThemes = generatedThemesData as ThemeEntry[];

const BLUE_THEME: ThemeEntry = { slug: "blue", primaryColor: "#32384c" };

const themes: ThemeEntry[] = [BLUE_THEME, ...generatedThemes];

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="fixed bottom-10 left-1/3 flex-row gap-[15px] md:bottom-8 md:right-8 md:left-auto md:flex-col md:items-center md:gap-3 flex z-50">
			{themes.map(({ slug, primaryColor }) => (
				<button
					key={slug}
					type="button"
					onClick={() => setTheme(slug)}
					className={`w-[25px] h-[25px] md:w-10 md:h-10 rounded-full hover:scale-110 ${
						theme === slug
							? "ring-2 ring-offset-2 ring-theme-text scale-110"
							: ""
					}`}
					style={{ backgroundColor: primaryColor }}
					aria-label={`Switch to ${slug} theme`}
				/>
			))}
		</div>
	);
}
