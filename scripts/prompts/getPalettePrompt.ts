import type { TProject } from "@shared/notion";
export const getPalettePrompt = ({
	project,
	catHexListStr,
}: {
	project: TProject;
	catHexListStr: string;
}) => `You are a color palette designer. Analyze this project icon and generate a cohesive CSS theme for slug "${project.slug}". Please note, the background color for the site is always #fff, so ensure --theme-text and --theme-text-light need to pass color accessibility and readabilty.

Return ONLY a JSON object with two keys:
1. "css" — the full [data-theme="${project.slug}"] { ... } block containing exactly these 8 variables: --theme-primary, --theme-text, --theme-text-light, --theme-button, --theme-button-hover, --theme-muted, --theme-credit, --theme-blob-opacity (0.03–0.15 float).
2. "catColorMap" — an object mapping each of these existing cat hex colors ${catHexListStr} to its closest equivalent in your generated palette. Every original hex must appear as a key.

Do not include any explanation, markdown, or code fences — output raw JSON only.`;
