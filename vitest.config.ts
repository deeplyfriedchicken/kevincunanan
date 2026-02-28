import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr()],
	test: {
		environment: "jsdom",
		globals: true,
		css: false,
		setupFiles: ["./tests/setup.ts"],
		include: ["tests/unit/**/*.test.{ts,tsx}"],
	},
});
