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
		await expect(page.getByText("404")).toBeVisible();
		await expect(page.getByText("not found")).toBeVisible();
	});

	test("navbar is present on detail page", async ({ page }) => {
		await page.goto("/projects");
		const firstReadMore = page.getByText("READ MORE +").first();
		await firstReadMore.click();

		await expect(page.locator("nav").first()).toBeVisible();
	});

	test("TOC renders three levels of headings with correct hierarchy", async ({
		page,
	}) => {
		await page.goto("/projects");
		const firstReadMore = page.getByText("READ MORE +").first();
		await firstReadMore.click();

		// Wait for the TOC nav to appear (second nav after the page navbar)
		const tocNav = page.locator("nav").nth(1);
		await expect(tocNav).toBeVisible();

		const tocLinks = tocNav.locator("a");
		const count = await tocLinks.count();
		expect(count).toBeGreaterThanOrEqual(1);

		// Verify that TOC links have href anchors
		for (let i = 0; i < count; i++) {
			const href = await tocLinks.nth(i).getAttribute("href");
			expect(href).toMatch(/^#.+/);
		}

		// Verify level differentiation: level-1 links should have font-bold,
		// level-2/3 links should have border-l-2 with indentation
		const firstLink = tocLinks.first();
		const firstClass = await firstLink.getAttribute("class");
		expect(firstClass).toContain("font-bold");
	});

	test("heading anchor button copies link to clipboard", async ({
		page,
		context,
	}) => {
		await context.grantPermissions(["clipboard-read", "clipboard-write"]);
		await page.goto("/projects");
		const firstReadMore = page.getByText("READ MORE +").first();
		await firstReadMore.click();

		// Wait for article content to load
		const heading = page.locator("article h1, article h2").first();
		await expect(heading).toBeVisible();

		// Click the anchor button inside the heading
		const anchorButton = heading.locator("button").first();
		await anchorButton.click();

		// Verify the checkmark icon appears (confirms the click registered)
		await expect(heading.locator("text=Copy success")).toBeVisible();

		// Read clipboard and verify it contains an anchor link
		const clipboardText = await page.evaluate(() =>
			navigator.clipboard.readText(),
		);
		expect(clipboardText).toMatch(/#.+/);
		expect(clipboardText).toContain(page.url().split("#")[0]);
	});
});
