import { Welcome } from "../welcome/welcome";

export function meta() {
	return [
		{ title: "Kevin Cunanan | Portfolio" },
		{
			name: "description",
			content: "Come learn about me and my experience on the web",
		},
		{ property: "og:title", content: "Kevin Cunanan | Portfolio" },
		{
			property: "og:description",
			content: "Come learn about me and my experience on the web",
		},
		{
			property: "og:image",
			content: "https://cunanan.dev/images/og-image.png",
		},
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
	];
}

export default function Home() {
	return <Welcome />;
}
