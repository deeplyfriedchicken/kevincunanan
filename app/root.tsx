import Lottie from "lottie-react";
import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "~/context/ThemeContext";
import catBlue from "~/data/cat.json";
import catGreen from "~/data/cat-green.json";
import catPink from "~/data/cat-pink.json";
import catYellow from "~/data/cat-yellow.json";
import type { Route } from "./+types/root";
import "./app.css";

const catAnimations = {
	blue: catBlue,
	pink: catPink,
	green: catGreen,
	yellow: catYellow,
} as const;

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="blue">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="min-h-screen w-full">
				<ThemeProvider>
					{children}
					<ThemeSwitcher />
				</ThemeProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

function NotFoundPage() {
	const { theme } = useTheme();
	return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-[1.5rem]">
			<div className="w-[16rem]">
				<Lottie key={theme} animationData={catAnimations[theme]} loop />
			</div>
			<div className="text-center">
				<p className="text-theme-text-light font-light text-[5rem] leading-none">
					404
				</p>
				<p className="text-theme-text font-light text-[1.125rem] mt-[0.5rem]">
					not found
				</p>
			</div>
			<Link
				to="/"
				className="font-merriweather-sans text-[0.875rem] text-theme-text hover:opacity-70 transition-opacity mt-[0.5rem]"
			>
				go home
			</Link>
		</main>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error) && error.status === 404) {
		return <NotFoundPage />;
	}

	const details = isRouteErrorResponse(error)
		? error.statusText
		: import.meta.env.DEV && error instanceof Error
			? error.message
			: "An unexpected error occurred.";

	const stack =
		import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>Error</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
