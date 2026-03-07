import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@tests/helpers/render";
import { InnerNavbar } from "~/components/InnerNavbar";

describe("InnerNavbar", () => {
	it("renders desktop nav links", () => {
		renderWithTheme(<InnerNavbar />);

		expect(screen.getByRole("link", { name: "home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "about" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "projects" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "resume" })).toBeInTheDocument();
	});

	it("hamburger opens mobile dropdown", async () => {
		const user = userEvent.setup();
		renderWithTheme(<InnerNavbar />);

		const hamburgerButton = screen.getByTestId("InnerNavbar_burger");
		await user.click(hamburgerButton);

		const overlay = screen.getByTestId("InnerNavbar_overlay");
		await user.click(overlay);
	});

	it("link click closes dropdown", async () => {
		const user = userEvent.setup();
		renderWithTheme(<InnerNavbar />);

		const hamburgerButton = screen.getByTestId("InnerNavbar_burger");
		await user.click(hamburgerButton);

		const overlayButton = screen.getByTestId("InnerNavbar_overlay");
		await user.click(overlayButton);

		// Click a mobile nav link
		const aboutLinks = screen.getAllByRole("link", { name: "about" });
		const mobileAboutLink = aboutLinks[aboutLinks.length - 1];
		await user.click(mobileAboutLink);

		// Dropdown should be gone — back to just desktop links
		const remainingAboutLinks = screen.getAllByRole("link", {
			name: "about",
		});
		expect(remainingAboutLinks).toHaveLength(1);
	});

	it("GitHub link has correct href and target", () => {
		renderWithTheme(<InnerNavbar />);

		const githubLink = screen.getByLabelText("GitHub repository");
		expect(githubLink).toHaveAttribute(
			"href",
			"https://github.com/deeplyfriedchicken/kevincunanan",
		);
		expect(githubLink).toHaveAttribute("target", "_blank");
	});

	it("variant dark applies text-white", () => {
		renderWithTheme(<InnerNavbar variant="dark" />);

		const homeLink = screen.getByRole("link", { name: "home" });
		expect(homeLink.className).toContain("text-white");
	});

	it("variant light applies text-theme-text", () => {
		renderWithTheme(<InnerNavbar variant="light" />);

		const homeLink = screen.getByRole("link", { name: "home" });
		expect(homeLink.className).toContain("text-theme-text");
	});
});
