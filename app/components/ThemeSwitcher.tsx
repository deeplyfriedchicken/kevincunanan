import { type Theme, useTheme } from "~/context/ThemeContext";

const themes: { name: Theme; color: string }[] = [
	{ name: "blue", color: "#32384c" },
	{ name: "pink", color: "#e8b9ab" },
	{ name: "green", color: "#adbca5" },
	{ name: "yellow", color: "#f6d8ae" },
];

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-center gap-2 md:gap-3 z-50">
			{themes.map(({ name, color }) => (
				<button
					key={name}
					type="button"
					onClick={() => setTheme(name)}
					className={`w-8 h-8 md:w-10 md:h-10 rounded-full hover:scale-110 ${
						theme === name
							? "ring-2 ring-offset-2 ring-gray-400 scale-110"
							: ""
					}`}
					style={{ backgroundColor: color }}
					aria-label={`Switch to ${name} theme`}
				/>
			))}
		</div>
	);
}
