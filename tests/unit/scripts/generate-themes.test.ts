import {
	extractLottieColors,
	extractPrimaryColor,
	hexToNormalized,
	isColorArray,
	normalizedToHex,
	recolorLottie,
	validateColorMap,
	validateCss,
	validateLottie,
} from "@scripts/theme-utils";

// ─── Color conversion ─────────────────────────────────────────────────────────

describe("normalizedToHex", () => {
	it("converts normalized RGB to a hex string", () => {
		expect(normalizedToHex(0, 0, 0)).toBe("#000000");
		expect(normalizedToHex(1, 1, 1)).toBe("#ffffff");
		expect(normalizedToHex(0.196, 0.216, 0.298)).toBe("#323737");
	});

	it("roundtrips through hexToNormalized within floating-point tolerance", () => {
		const original = "#32384c";
		const [r, g, b] = hexToNormalized(original);
		const back = normalizedToHex(r, g, b);
		expect(back).toBe(original);
	});
});

describe("isColorArray", () => {
	it("returns true for a 4-element array of 0–1 numbers", () => {
		expect(isColorArray([0.2, 0.22, 0.3, 1])).toBe(true);
		expect(isColorArray([0, 0, 0, 0])).toBe(true);
		expect(isColorArray([1, 1, 1, 1])).toBe(true);
	});

	it("returns false when length is not 4", () => {
		expect(isColorArray([0.2, 0.22, 0.3])).toBe(false);
		expect(isColorArray([0.2, 0.22, 0.3, 1, 0])).toBe(false);
	});

	it("returns false when any value is out of the 0–1 range", () => {
		expect(isColorArray([1.5, 0, 0, 1])).toBe(false);
		expect(isColorArray([-0.1, 0, 0, 1])).toBe(false);
	});

	it("returns false when values are not numbers", () => {
		expect(isColorArray(["0.2", 0, 0, 1] as unknown[])).toBe(false);
	});
});

// ─── Lottie color extraction ──────────────────────────────────────────────────

describe("extractLottieColors", () => {
	it("extracts unique hex colors from a nested Lottie structure", () => {
		const lottie = {
			layers: [
				{ it: [{ ty: "fl", c: { a: 0, k: [0.2, 0.22, 0.298, 1] } }] },
				{ it: [{ ty: "st", c: { a: 0, k: [1, 1, 1, 1] } }] },
				// Duplicate — should appear only once
				{ it: [{ ty: "fl", c: { a: 0, k: [0.2, 0.22, 0.298, 1] } }] },
			],
		};

		const colors = extractLottieColors(lottie);
		expect(colors.size).toBe(2);
		expect(colors.has("#333348")).toBe(true); // approx #32384c
		expect(colors.has("#ffffff")).toBe(true);
	});

	it("ignores objects whose k array is not exactly 4 elements between 0–1", () => {
		const lottie = {
			// Animated keyframe array — not a plain color value
			c: { a: 1, k: [{ t: 0, s: [0.2, 0.22, 0.298, 1] }] },
			// 3-element array — not a color
			x: { k: [0.5, 0.5, 0.5] },
		};

		const colors = extractLottieColors(lottie);
		expect(colors.size).toBe(0);
	});
});

// ─── Lottie recoloring ────────────────────────────────────────────────────────

describe("recolorLottie", () => {
	const ORIGINAL = { v: "5.0", assets: [], layers: [{ it: [{ ty: "fl", c: { a: 0, k: [0.2, 0.22, 0.298, 1] } }] }] };

	it("replaces matched color values using the color map", () => {
		const [r, g, b] = hexToNormalized(normalizedToHex(0.2, 0.22, 0.298));
		const srcHex = normalizedToHex(r, g, b);
		const colorMap = { [srcHex]: "#ff0000" };

		const result = recolorLottie(ORIGINAL, colorMap) as typeof ORIGINAL;
		const k = result.layers[0].it[0].c.k as number[];
		// Red channel should now be ~1, green and blue ~0
		expect(k[0]).toBeCloseTo(1, 2);
		expect(k[1]).toBeCloseTo(0, 2);
		expect(k[2]).toBeCloseTo(0, 2);
		expect(k[3]).toBe(1); // alpha preserved
	});

	it("leaves unmatched colors unchanged", () => {
		const colorMap = { "#aabbcc": "#ff0000" }; // won't match the layer color
		const result = recolorLottie(ORIGINAL, colorMap) as typeof ORIGINAL;
		const k = result.layers[0].it[0].c.k as number[];
		expect(k[0]).toBeCloseTo(0.2, 2);
	});

	it("does not mutate the original object", () => {
		const [r, g, b] = hexToNormalized(normalizedToHex(0.2, 0.22, 0.298));
		const colorMap = { [normalizedToHex(r, g, b)]: "#ff0000" };
		recolorLottie(ORIGINAL, colorMap);

		const originalK = ORIGINAL.layers[0].it[0].c.k;
		expect(originalK[0]).toBeCloseTo(0.2, 5);
	});
});

// ─── validateCss ─────────────────────────────────────────────────────────────

describe("validateCss", () => {
	const VALID_CSS = `[data-theme="test"] {
		--theme-primary: #000;
		--theme-text: #111;
		--theme-text-light: #222;
		--theme-button: #333;
		--theme-button-hover: #444;
		--theme-muted: #555;
		--theme-credit: #666;
		--theme-blob-opacity: 0.08;
	}`;

	it("passes without throwing when all required vars are present", () => {
		expect(() => validateCss(VALID_CSS, "test")).not.toThrow();
	});

	it("throws when a required CSS variable is missing", () => {
		const broken = VALID_CSS.replace("--theme-blob-opacity: 0.08;", "");
		expect(() => validateCss(broken, "test")).toThrow(
			'missing required variable: --theme-blob-opacity',
		);
	});
});

// ─── validateColorMap ─────────────────────────────────────────────────────────

describe("validateColorMap", () => {
	it("passes when all original hex keys are present in the map", () => {
		const map = { "#aabbcc": "#112233", "#ddeeff": "#445566" };
		expect(() =>
			validateColorMap(map, ["#aabbcc", "#ddeeff"], "test"),
		).not.toThrow();
	});

	it("throws when a hex is missing from the map", () => {
		const map = { "#aabbcc": "#112233" };
		expect(() =>
			validateColorMap(map, ["#aabbcc", "#ddeeff"], "test"),
		).toThrow('missing entry for hex: #ddeeff');
	});
});

// ─── validateLottie ───────────────────────────────────────────────────────────

describe("validateLottie", () => {
	it("passes for a minimal valid Lottie object", () => {
		expect(() =>
			validateLottie({ v: "5.4.2", layers: [], assets: [] }, "test"),
		).not.toThrow();
	});

	it("throws when v is missing", () => {
		expect(() =>
			validateLottie({ layers: [], assets: [] }, "test"),
		).toThrow('missing "v"');
	});

	it("throws when layers is not an array", () => {
		expect(() =>
			validateLottie({ v: "5.0", layers: null, assets: [] }, "test"),
		).toThrow('missing "layers"');
	});

	it("throws for a non-object input", () => {
		expect(() => validateLottie(null, "test")).toThrow("not an object");
		expect(() => validateLottie([], "test")).toThrow("not an object");
	});
});

// ─── extractPrimaryColor ──────────────────────────────────────────────────────

describe("extractPrimaryColor", () => {
	it("extracts the --theme-primary value from a CSS string", () => {
		const css = `[data-theme="x"] { --theme-primary: #2a7e8f; --theme-text: #111; }`;
		expect(extractPrimaryColor(css)).toBe("#2a7e8f");
	});

	it("returns the fallback color when the variable is not present", () => {
		expect(extractPrimaryColor("/* empty */")).toBe("#32384c");
	});
});
