import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@tests/helpers/render";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import generatedThemesData from "~/data/themes.json";

type ThemeEntry = { slug: string; primaryColor: string };
const generatedThemes = generatedThemesData as ThemeEntry[];

describe("ThemeSwitcher", () => {
	it("always renders the blue theme button", () => {
		renderWithTheme(<ThemeSwitcher />);

		expect(screen.getByLabelText("Switch to blue theme")).toBeInTheDocument();
	});

	it("active button has ring class on the default blue theme", () => {
		renderWithTheme(<ThemeSwitcher />);

		const blueButton = screen.getByLabelText("Switch to blue theme");
		expect(blueButton.className).toContain("ring-2");
	});

	it("click on blue button activates blue theme", async () => {
		const user = userEvent.setup();
		renderWithTheme(<ThemeSwitcher />);

		const blueButton = screen.getByLabelText("Switch to blue theme");
		await user.click(blueButton);

		expect(blueButton.className).toContain("ring-2");
		expect(document.documentElement.dataset.theme).toBe("blue");
	});

	it("renders a button for every generated theme in themes.json", () => {
		renderWithTheme(<ThemeSwitcher />);

		for (const { slug } of generatedThemes) {
			expect(
				screen.getByLabelText(`Switch to ${slug} theme`),
			).toBeInTheDocument();
		}
	});

	it("renders the correct swatch color for each generated theme", () => {
		renderWithTheme(<ThemeSwitcher />);

		for (const { slug, primaryColor } of generatedThemes) {
			const btn = screen.getByLabelText(`Switch to ${slug} theme`);
			// jsdom normalises hex → rgb(r, g, b)
			const hex = primaryColor.replace("#", "");
			const r = Number.parseInt(hex.slice(0, 2), 16);
			const g = Number.parseInt(hex.slice(2, 4), 16);
			const b = Number.parseInt(hex.slice(4, 6), 16);
			expect(btn).toHaveStyle(`background-color: rgb(${r}, ${g}, ${b})`);
		}
	});

	it("clicking a generated theme button activates it and updates data-theme", async () => {
		if (generatedThemes.length === 0) return; // nothing to test if themes.json is empty

		const user = userEvent.setup();
		renderWithTheme(<ThemeSwitcher />);

		const { slug } = generatedThemes[0];
		const btn = screen.getByLabelText(`Switch to ${slug} theme`);
		await user.click(btn);

		expect(btn.className).toContain("ring-2");
		expect(document.documentElement.dataset.theme).toBe(slug);
	});

	it("only the active theme button has the ring class", async () => {
		if (generatedThemes.length === 0) return;

		const user = userEvent.setup();
		renderWithTheme(<ThemeSwitcher />);

		const { slug } = generatedThemes[0];
		await user.click(screen.getByLabelText(`Switch to ${slug} theme`));

		// Blue should no longer be active
		expect(
			screen.getByLabelText("Switch to blue theme").className,
		).not.toContain("ring-2");
	});
});
