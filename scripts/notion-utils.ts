import type { PageObjectResponse } from "@notionhq/client";

export function getNotionProperty(
	property: PageObjectResponse["properties"][string],
): string | string[] | boolean | undefined {
	const value = property[property.type as keyof typeof property];

	if (typeof value === "boolean") return value;

	if (!Array.isArray(value) || value.length === 0) return;

	const notionValue = value[0];

	if ("plain_text" in notionValue) return notionValue.plain_text as string;
	if ("file" in notionValue) {
		const { file } = notionValue;
		const isExternalUrl = file.type === "external" || file.type === "file";
		return isExternalUrl ? file.external?.url : file.url;
	}
	if ("multi_select" in property) return value.map((v) => v.name);
}
