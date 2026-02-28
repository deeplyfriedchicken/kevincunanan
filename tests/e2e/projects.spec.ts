import { expect, test } from "@playwright/test";

test.describe("Projects page", () => {
	test("projects heading is visible", async ({ page }) => {
		await page.goto("/projects");
		await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
	});

	test("at least one project card is rendered", async ({ page }) => {
		await page.goto("/projects");
		const readMoreLinks = page.getByText("READ MORE +");
		await expect(readMoreLinks.first()).toBeVisible();
	});

	test("project tags are rendered", async ({ page }) => {
		await page.goto("/projects");
		// At least one tag span should be visible
		const tags = page.locator(".rounded-full");
		await expect(tags.first()).toBeVisible();
	});
});
