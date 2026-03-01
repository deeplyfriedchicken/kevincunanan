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

		await expect(page.locator("html")).toHaveAttribute("data-theme", "blue");
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

		const { slug } = generatedThemes[0];
		await page.getByLabel(`Switch to ${slug} theme`).click();

		await expect(page.locator("html")).toHaveAttribute("data-theme", slug);
	});

	test("clicking a generated theme updates the CTA link", async ({
		page,
	}) => {
		test.skip(
			generatedThemes.length === 0,
			"No generated themes in themes.json",
		);

		await page.goto("/");

		const { slug } = generatedThemes[0];
		await page.getByLabel(`Switch to ${slug} theme`).click();

		// CTA should link to the project page for this theme (mobile + desktop both render one)
		const ctaLinks = page.locator(`a[href*="/projects/${slug}"]`);
		await expect(ctaLinks).toHaveCount(2);
		await expect(ctaLinks.last()).toBeVisible();
	});

	test("active theme button has a visible ring", async ({ page }) => {
		test.skip(
			generatedThemes.length === 0,
			"No generated themes in themes.json",
		);

		await page.goto("/");

		const { slug } = generatedThemes[0];
		const btn = page.getByLabel(`Switch to ${slug} theme`);
		await btn.click();

		// Check computed outline via box-shadow (Tailwind ring compiles to box-shadow)
		await expect(btn).toHaveCSS("box-shadow", /rgb/);
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

		// Wait for data-theme to update before checking CSS variables
		await expect(page.locator("html")).toHaveAttribute("data-theme", slug);

		const computedPrimary = await page.evaluate(() =>
			getComputedStyle(document.documentElement)
				.getPropertyValue("--theme-primary")
				.trim(),
		);

		expect(computedPrimary.toLowerCase()).toBe(primaryColor.toLowerCase());
	});
});
