// Pure utility functions shared between generate-themes.ts and tests.

export const REQUIRED_CSS_VARS = [
	"--theme-primary",
	"--theme-text",
	"--theme-text-light",
	"--theme-button",
	"--theme-button-hover",
	"--theme-muted",
	"--theme-credit",
	"--theme-blob-opacity",
];

// ─── Color helpers ────────────────────────────────────────────────────────────

export function normalizedToHex(r: number, g: number, b: number): string {
	const toHex = (n: number) =>
		Math.round(n * 255)
			.toString(16)
			.padStart(2, "0");
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToNormalized(hex: string): [number, number, number] {
	const clean = hex.replace("#", "");
	const r = Number.parseInt(clean.slice(0, 2), 16) / 255;
	const g = Number.parseInt(clean.slice(2, 4), 16) / 255;
	const b = Number.parseInt(clean.slice(4, 6), 16) / 255;
	return [r, g, b];
}

export function isColorArray(arr: unknown[]): arr is number[] {
	return (
		arr.length === 4 &&
		arr.every((v) => typeof v === "number" && v >= 0 && v <= 1)
	);
}

// ─── Lottie color extraction ──────────────────────────────────────────────────

export function extractLottieColors(
	obj: unknown,
	colors = new Set<string>(),
): Set<string> {
	if (!obj || typeof obj !== "object") return colors;

	if (Array.isArray(obj)) {
		for (const item of obj) extractLottieColors(item, colors);
		return colors;
	}

	const o = obj as Record<string, unknown>;

	// A non-animated Lottie color property has: { a: 0, k: [r, g, b, a] }
	if ("k" in o && Array.isArray(o.k) && isColorArray(o.k)) {
		const [r, g, b] = o.k;
		colors.add(normalizedToHex(r, g, b));
	}

	for (const val of Object.values(o)) {
		extractLottieColors(val, colors);
	}

	return colors;
}

// ─── Lottie recoloring ────────────────────────────────────────────────────────

export function recolorLottie(
	obj: unknown,
	colorMap: Record<string, string>,
): unknown {
	if (!obj || typeof obj !== "object") return obj;

	if (Array.isArray(obj)) {
		return obj.map((item) => recolorLottie(item, colorMap));
	}

	const o = obj as Record<string, unknown>;

	if ("k" in o && Array.isArray(o.k) && isColorArray(o.k)) {
		const [r, g, b, a] = o.k;
		const hex = normalizedToHex(r, g, b);
		const newHex = colorMap[hex];
		if (newHex) {
			const [nr, ng, nb] = hexToNormalized(newHex);
			return { ...o, k: [nr, ng, nb, a] };
		}
	}

	const result: Record<string, unknown> = {};
	for (const [key, val] of Object.entries(o)) {
		result[key] = recolorLottie(val, colorMap);
	}
	return result;
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateCss(css: string, slug: string): void {
	for (const varName of REQUIRED_CSS_VARS) {
		if (!css.includes(varName)) {
			throw new Error(
				`Generated CSS for "${slug}" is missing required variable: ${varName}`,
			);
		}
	}
}

export function validateColorMap(
	colorMap: Record<string, string>,
	catHexList: string[],
	slug: string,
): void {
	for (const hex of catHexList) {
		if (!(hex in colorMap)) {
			throw new Error(
				`catColorMap for "${slug}" is missing entry for hex: ${hex}`,
			);
		}
	}
}

export function validateLottie(lottie: unknown, slug: string): void {
	if (!lottie || typeof lottie !== "object" || Array.isArray(lottie)) {
		throw new Error(`Invalid Lottie JSON for "${slug}": not an object`);
	}
	const l = lottie as Record<string, unknown>;
	if (typeof l.v !== "string") {
		throw new Error(`Invalid Lottie JSON for "${slug}": missing "v" (version)`);
	}
	if (!Array.isArray(l.layers)) {
		throw new Error(
			`Invalid Lottie JSON for "${slug}": missing "layers" array`,
		);
	}
	if (!Array.isArray(l.assets)) {
		throw new Error(
			`Invalid Lottie JSON for "${slug}": missing "assets" array`,
		);
	}
}

// ─── CSS variable extraction ──────────────────────────────────────────────────

export function extractPrimaryColor(css: string): string {
	const match = css.match(/--theme-primary:\s*([^;]+);/);
	return match?.[1]?.trim() ?? "#32384c";
}
