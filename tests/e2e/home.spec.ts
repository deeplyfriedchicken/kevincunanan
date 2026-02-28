import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
	test("page loads successfully", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/Kevin Cunanan/);
	});

	test("theme switcher is visible", async ({ page }) => {
		await page.goto("/");
		const switcher = page.getByLabel("Switch to blue theme");
		await expect(switcher).toBeVisible();
	});

	test("clicking theme switcher changes data-theme", async ({ page }) => {
		await page.goto("/");
		const pinkButton = page.getByLabel("Switch to pink theme");
		await pinkButton.click();

		const theme = await page.locator("html").getAttribute("data-theme");
		expect(theme).toBe("pink");
	});
});
