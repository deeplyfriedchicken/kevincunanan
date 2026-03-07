import { renderHook } from "@testing-library/react";
import { useTestId } from "~/hooks/useTestId";

describe("useTestId", () => {
	it("returns a buildTestId function", () => {
		const { result } = renderHook(() => useTestId("component"));
		expect(typeof result.current.buildTestId).toBe("function");
	});

	it("returns the prefix alone when buildTestId is called with no args", () => {
		const { result } = renderHook(() => useTestId("navbar"));
		expect(result.current.buildTestId()).toBe("navbar");
	});

	it("combines prefix with a single part", () => {
		const { result } = renderHook(() => useTestId("navbar"));
		expect(result.current.buildTestId("link")).toBe("navbar_link");
	});

	it("combines prefix with multiple parts", () => {
		const { result } = renderHook(() => useTestId("navbar"));
		expect(result.current.buildTestId("link", "icon", "home")).toBe(
			"navbar_link_icon_home",
		);
	});

	it("handles number parts", () => {
		const { result } = renderHook(() => useTestId("item"));
		expect(result.current.buildTestId("row", 3)).toBe("item_row_3");
	});

	it("handles boolean parts", () => {
		const { result } = renderHook(() => useTestId("toggle"));
		expect(result.current.buildTestId("active", true)).toBe(
			"toggle_active_true",
		);
	});

	it("handles mixed string, number, and boolean parts", () => {
		const { result } = renderHook(() => useTestId("card"));
		expect(result.current.buildTestId("item", 5, "selected", false)).toBe(
			"card_item_5_selected_false",
		);
	});

	describe("edge cases", () => {
		it("uses empty string as prefix when no string is passed", () => {
			const { result } = renderHook(() => useTestId(""));
			expect(result.current.buildTestId("child")).toBe("child");
		});

		it("returns empty string when prefix is empty and no args passed", () => {
			const { result } = renderHook(() => useTestId(""));
			expect(result.current.buildTestId()).toBe("");
		});
	});
});
