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
			screen.getByTitle("Click to copy section link to clipboard"),
		).toBeInTheDocument();
	});

	it("copies the full URL with anchor to clipboard on click", async () => {
		const user = setupUser();
		renderWithTheme(<HeadingAnchor id="tech-stack" />);

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(screen.getByTitle("Copy success")).toBeInTheDocument();
		});

		expect(writeText).toHaveBeenCalledWith(
			expect.stringContaining("#tech-stack"),
		);
	});

	it("shows checkmark icon after clicking", async () => {
		const user = setupUser();
		renderWithTheme(<HeadingAnchor id="results" />);

		await user.click(screen.getByRole("button"));

		expect(screen.getByTitle("Copy success")).toBeInTheDocument();
		expect(
			screen.queryByTitle("Click to copy section link to clipboard"),
		).not.toBeInTheDocument();
	});

	it("reverts to link icon after timeout", async () => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		setupClipboardMock();
		renderWithTheme(<HeadingAnchor id="intro" />);

		await user.click(screen.getByRole("button"));
		expect(screen.getByTitle("Copy success")).toBeInTheDocument();

		vi.advanceTimersByTime(1500);

		await waitFor(() => {
			expect(
				screen.getByTitle("Click to copy section link to clipboard"),
			).toBeInTheDocument();
		});

		vi.useRealTimers();
	});

	it("starts with reduced opacity and full opacity on hover", () => {
		renderWithTheme(<HeadingAnchor id="test" />);
		const button = screen.getByRole("button");
		expect(button.className).toContain("hover:opacity-100");
		expect(button.className).toMatch(/opacity-\d+/);
	});
});
