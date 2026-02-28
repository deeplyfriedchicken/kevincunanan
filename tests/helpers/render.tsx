import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "~/context/ThemeContext";

interface ThemeRenderOptions extends Omit<RenderOptions, "wrapper"> {
	initialEntries?: string[];
}

export function renderWithTheme(
	ui: ReactElement,
	{ initialEntries = ["/"], ...options }: ThemeRenderOptions = {},
) {
	return render(ui, {
		wrapper: ({ children }) => (
			<MemoryRouter initialEntries={initialEntries}>
				<ThemeProvider>{children}</ThemeProvider>
			</MemoryRouter>
		),
		...options,
	});
}
