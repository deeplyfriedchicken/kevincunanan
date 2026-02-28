import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("", "routes/inner-layout.tsx", [
		route("about", "routes/about.tsx"),
		route("projects", "routes/projects.tsx"),
	]),
	route("projects/:slug", "routes/project.tsx"),
] satisfies RouteConfig;
