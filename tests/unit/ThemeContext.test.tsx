import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { ThemeProvider, useTheme } from "~/context/ThemeContext";

function wrapper({ children }: { children: ReactNode }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}

describe("ThemeContext", () => {
	it("defaults to blue theme", () => {
		const { result } = renderHook(() => useTheme(), { wrapper });
		expect(result.current.theme).toBe("blue");
	});

	it("updates theme and document dataset", () => {
		const { result } = renderHook(() => useTheme(), { wrapper });

		act(() => {
			result.current.setTheme("pink");
		});

		expect(result.current.theme).toBe("pink");
		expect(document.documentElement.dataset.theme).toBe("pink");
	});

	it("returns defaults when used outside provider", () => {
		const { result } = renderHook(() => useTheme());
		expect(result.current.theme).toBe("blue");
		expect(typeof result.current.setTheme).toBe("function");
	});
});
