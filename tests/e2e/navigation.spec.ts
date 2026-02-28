import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
	test("desktop nav links navigate to /projects", async ({ page }) => {
		await page.goto("/about");
		await page.setViewportSize({ width: 1280, height: 720 });

		await page.getByRole("link", { name: "projects" }).first().click();
		await expect(page).toHaveURL(/\/projects/);
	});

	test("desktop nav links navigate to /about", async ({ page }) => {
		await page.goto("/projects");
		await page.setViewportSize({ width: 1280, height: 720 });

		await page.getByRole("link", { name: "about" }).first().click();
		await expect(page).toHaveURL(/\/about/);
	});

	test("mobile hamburger opens dropdown and link navigates", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto("/about");

		const hamburger = page.getByLabel("Toggle menu");
		await hamburger.click();

		const projectsLink = page
			.getByRole("link", { name: "projects" })
			.last();
		await projectsLink.click();
		await expect(page).toHaveURL(/\/projects/);
	});

	test("GitHub link has correct href and opens in new tab", async ({
		page,
	}) => {
		await page.goto("/about");
		await page.setViewportSize({ width: 1280, height: 720 });

		const githubLink = page.getByLabel("GitHub repository");
		await expect(githubLink).toHaveAttribute(
			"href",
			"https://github.com/deeplyfriedchicken/kevincunanan",
		);
		await expect(githubLink).toHaveAttribute("target", "_blank");
	});
});
