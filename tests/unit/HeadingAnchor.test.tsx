import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "@tests/helpers/render";
import { HeadingAnchor } from "~/components/HeadingAnchor";

const writeText = vi.fn().mockResolvedValue(undefined);

function setupClipboardMock() {
	Object.defineProperty(navigator, "clipboard", {
		value: { writeText },
		writable: true,
		configurable: true,
	});
}

beforeEach(() => {
	writeText.mockClear();
	setupClipboardMock();
});

function setupUser() {
	const user = userEvent.setup();
	// Re-apply mock after userEvent.setup() which replaces navigator.clipboard
	setupClipboardMock();
	return user;
}

describe("HeadingAnchor", () => {
	it("renders a button with accessible label", () => {
		renderWithTheme(<HeadingAnchor id="summary" />);
		expect(
			screen.getByRole("button", { name: "Copy link to summary" }),
		).toBeInTheDocument();
	});

	it("shows link icon by default", () => {
		renderWithTheme(<HeadingAnchor id="overview" />);
		expect(
			screen.getByTestId("HeadingAnchor_overview_button"),
		).toBeInTheDocument();
	});

	it("copies the full URL with anchor to clipboard on click", async () => {
		const user = setupUser();
		renderWithTheme(<HeadingAnchor id="tech-stack" />);

		await user.click(screen.getByRole("button"));

		// TODO check toast instead

		expect(writeText).toHaveBeenCalledWith(
			expect.stringContaining("#tech-stack"),
		);
	});

	it("shows checkmark icon after clicking", async () => {
		const user = setupUser();
		renderWithTheme(<HeadingAnchor id="results" />);

		await user.click(screen.getByRole("button"));

		// TODO check it toast
	});

	it("reverts to link icon after timeout", async () => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		setupClipboardMock();
		renderWithTheme(<HeadingAnchor id="intro" />);

		await user.click(screen.getByRole("button"));

		await expect(screen.getByTestId("HeadingAnchor_intro_icon_copySuccess"));

		vi.advanceTimersByTime(3001);

		await waitFor(() => {
			expect(
				screen.getByTestId("HeadingAnchor_intro_icon_copy"),
			).toBeInTheDocument();
		});

		vi.useRealTimers();
	});
});
