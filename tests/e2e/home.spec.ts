import { expect, test } from "@playwright/test";
import themes from "../fixtures/themes.json" with { type: "json" };

type ThemeEntry = { slug: string; primaryColor: string };
const generatedThemes = themes as ThemeEntry[];

test.describe("Home page", () => {
	test("page loads successfully", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/Kevin Cunanan/);
	});

	test("blue theme switcher button is always visible", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByLabel("Switch to blue theme")).toBeVisible();
	});

	test("clicking blue theme button sets data-theme to blue", async ({
		page,
	}) => {
		await page.goto("/");
		await page.getByLabel("Switch to blue theme").click();

		const theme = await page.locator("html").getAttribute("data-theme");
		expect(theme).toBe("blue");
	});
});

test.describe("Generated theme switcher", () => {
	test("all generated theme buttons are visible on the home page", async ({
		page,
	}) => {
		test.skip(
			generatedThemes.length === 0,
			"No generated themes in themes.json",
		);

		await page.goto("/");

		for (const { slug } of generatedThemes) {
			await expect(page.getByLabel(`Switch to ${slug} theme`)).toBeVisible();
		}
	});

	test("clicking a generated theme updates data-theme attribute", async ({
		page,
	}) => {
		test.skip(
			generatedThemes.length === 0,
			"No generated themes in themes.json",
		);

		await page.goto("/");

		const { slug } = generatedThemes[1];
		await page.getByLabel(`Switch to ${slug} theme`).click();

		const theme = await page.locator("html").getAttribute("data-theme");
		expect(theme).toBe(slug);
		const link = await page.getByRole("link", { name: `check out ${slug}` });
		expect(link).toBeVisible();
	});

	test("active theme button has a visible ring style", async ({ page }) => {
		test.skip(
			generatedThemes.length === 0,
			"No generated themes in themes.json",
		);

		await page.goto("/");

		const { slug } = generatedThemes[0];
		const btn = page.getByLabel(`Switch to ${slug} theme`);
		await btn.click();

		// ring class is applied — check via computed class attribute
		const className = await btn.getAttribute("class");
		expect(className).toContain("ring-2");
	});

	test("switching themes updates CSS variables on the document root", async ({
		page,
	}) => {
		test.skip(
			generatedThemes.length === 0,
			"No generated themes in themes.json",
		);

		await page.goto("/");

		const { slug, primaryColor } = generatedThemes[0];
		await page.getByLabel(`Switch to ${slug} theme`).click();

		// The CSS variable --theme-primary should match the theme's primaryColor
		const computedPrimary = await page.evaluate(() =>
			getComputedStyle(document.documentElement)
				.getPropertyValue("--theme-primary")
				.trim(),
		);

		expect(computedPrimary.toLowerCase()).toBe(primaryColor.toLowerCase());
	});
});
