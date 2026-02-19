import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { PortfolioData } from "../app/data/types";

const JSON_PATH = resolve(
	import.meta.dirname,
	"../app/data/portfolio-items.json",
);

function validate(data: PortfolioData): void {
	if (!Array.isArray(data.items)) {
		throw new Error("Missing items array");
	}
	if (!data.lastUpdated) {
		throw new Error("Missing lastUpdated timestamp");
	}

	for (const item of data.items) {
		const required = ["slug", "title", "description", "content", "tags", "color"] as const;
		for (const field of required) {
			if (!item[field]) {
				throw new Error(`Item "${item.slug || "(unknown)"}" missing required field: ${field}`);
			}
		}
		if (!Array.isArray(item.tags)) {
			throw new Error(`Item "${item.slug}" tags must be an array`);
		}
	}
}

const token = process.env.CAPACITIES_API_TOKEN;

if (token) {
	// Future: fetch from Capacities API and write JSON
	console.log("CAPACITIES_API_TOKEN detected — API fetching not yet implemented.");
	console.log("Falling back to validation of existing JSON.");
}

const raw = readFileSync(JSON_PATH, "utf-8");
const data = JSON.parse(raw) as PortfolioData;
validate(data);

const published = data.items.filter((i) => i.published);
console.log(`Validated ${published.length} portfolio items.`);
