import {
	mkdirSync as _mkdirSync,
	writeFileSync as _writeFileSync,
} from "node:fs";
import { extname, resolve } from "node:path";

export interface FsDeps {
	mkdirSync: typeof _mkdirSync;
	writeFileSync: typeof _writeFileSync;
}

const defaultFs: FsDeps = {
	mkdirSync: _mkdirSync,
	writeFileSync: _writeFileSync,
};

export async function downloadContentImages(
	markdown: string,
	slug: string,
	contentImagesDir: string,
	fs: FsDeps = defaultFs,
): Promise<string> {
	const imageRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
	let result = markdown;
	let imageIndex = 0;

	for (const match of markdown.matchAll(imageRegex)) {
		const [fullMatch, altText, url] = match;
		try {
			const ext = extname(new URL(url).pathname) || ".png";
			const filename = `${slug}-${imageIndex}${ext}`;
			const slugDir = resolve(contentImagesDir, slug);
			fs.mkdirSync(slugDir, { recursive: true });

			const res = await fetch(url);
			if (!res.ok) {
				console.warn(`Failed to download image: ${url} (${res.status})`);
				imageIndex++;
				continue;
			}
			const buffer = Buffer.from(await res.arrayBuffer());
			fs.writeFileSync(resolve(slugDir, filename), buffer);

			const localPath = `/images/content/${slug}/${filename}`;
			result = result.replace(fullMatch, `![${altText}](${localPath})`);
			console.log(`  Downloaded content image: ${filename}`);
		} catch (err) {
			console.warn(`Failed to download image: ${url}`, err);
		}
		imageIndex++;
	}

	return result;
}
