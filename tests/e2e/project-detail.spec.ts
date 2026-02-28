import { expect, test } from "@playwright/test";

test.describe("Project detail page", () => {
	test("clicking READ MORE navigates to detail page with h1", async ({
		page,
	}) => {
		await page.goto("/projects");
		const firstReadMore = page.getByText("READ MORE +").first();
		await firstReadMore.click();

		await expect(page.locator("h1").first()).toBeVisible();
	});

	test("invalid slug shows not found message", async ({ page }) => {
		await page.goto("/projects/nonexistent-project-slug");
		await expect(page.getByText("Project not found.")).toBeVisible();
	});

	test("navbar is present on detail page", async ({ page }) => {
		await page.goto("/projects");
		const firstReadMore = page.getByText("READ MORE +").first();
		await firstReadMore.click();

		await expect(page.locator("nav").first()).toBeVisible();
	});
});
