import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "blue" | "pink" | "green" | "yellow";

interface ThemeContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: "blue",
	setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("blue");

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
