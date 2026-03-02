import {
	downloadContentImages,
	type FsDeps,
} from "@scripts/download-content-images";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockFs: FsDeps = {
	mkdirSync: vi.fn(),
	writeFileSync: vi.fn(),
};

beforeEach(() => {
	vi.clearAllMocks();
});

function download(md: string, slug = "slug", dir = "/tmp") {
	return downloadContentImages(md, slug, dir, mockFs);
}

describe("downloadContentImages", () => {
	it("replaces image URLs with local paths", async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
		});

		const md =
			"![alt text](https://example.com/path/to/image.png)\n\nSome text.";
		const result = await download(md, "my-project", "/tmp/imgs");

		expect(result).toBe(
			"![alt text](/images/content/my-project/my-project-0.png)\n\nSome text.",
		);
	});

	it("downloads and writes images to the correct path", async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
		});

		const md = "![screenshot](https://cdn.example.com/shot.jpg)";
		await download(md, "test-slug", "/out/content");

		expect(mockFs.mkdirSync).toHaveBeenCalledWith(
			expect.stringContaining("test-slug"),
			{ recursive: true },
		);
		expect(mockFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining("test-slug-0.jpg"),
			expect.any(Buffer),
		);
	});

	it("handles multiple images with incrementing indices", async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
		});

		const md = [
			"![first](https://example.com/a.png)",
			"![second](https://example.com/b.jpg)",
		].join("\n");

		const result = await download(md);

		expect(result).toContain("slug-0.png");
		expect(result).toContain("slug-1.jpg");
		expect(mockFetch).toHaveBeenCalledTimes(2);
	});

	it("skips image on fetch failure but continues processing", async () => {
		mockFetch
			.mockResolvedValueOnce({ ok: false, status: 404 })
			.mockResolvedValueOnce({
				ok: true,
				arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
			});

		const md = [
			"![broken](https://example.com/missing.png)",
			"![working](https://example.com/good.jpg)",
		].join("\n");

		const result = await download(md);

		expect(result).toContain("https://example.com/missing.png");
		expect(result).toContain("/images/content/slug/slug-1.jpg");
		expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
	});

	it("returns markdown unchanged when there are no images", async () => {
		const md = "# Hello\n\nJust text, no images.";
		const result = await download(md);

		expect(result).toBe(md);
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it("defaults to .png when URL has no extension", async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
		});

		const md = "![img](https://example.com/image)";
		const result = await download(md);

		expect(result).toContain("slug-0.png");
	});

	it("preserves alt text in replaced markdown", async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
		});

		const md = "![Landing page for a user](https://example.com/shot.png)";
		const result = await download(md);

		expect(result).toBe(
			"![Landing page for a user](/images/content/slug/slug-0.png)",
		);
	});
});
