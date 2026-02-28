import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { renderWithTheme } from "../helpers/render";

describe("ThemeSwitcher", () => {
	it("renders 4 theme buttons with aria-labels", () => {
		renderWithTheme(<ThemeSwitcher />);

		expect(
			screen.getByLabelText("Switch to blue theme"),
		).toBeInTheDocument();
		expect(
			screen.getByLabelText("Switch to pink theme"),
		).toBeInTheDocument();
		expect(
			screen.getByLabelText("Switch to green theme"),
		).toBeInTheDocument();
		expect(
			screen.getByLabelText("Switch to yellow theme"),
		).toBeInTheDocument();
	});

	it("active button has ring class", () => {
		renderWithTheme(<ThemeSwitcher />);

		const blueButton = screen.getByLabelText("Switch to blue theme");
		expect(blueButton.className).toContain("ring-2");
	});

	it("click changes theme and updates document dataset", async () => {
		const user = userEvent.setup();
		renderWithTheme(<ThemeSwitcher />);

		const pinkButton = screen.getByLabelText("Switch to pink theme");
		await user.click(pinkButton);

		expect(pinkButton.className).toContain("ring-2");
		expect(document.documentElement.dataset.theme).toBe("pink");
	});
});
