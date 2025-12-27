import { Welcome } from "../welcome/welcome";

export function meta() {
	return [
		{ title: "Kevin Cunanan | Portfolio" },
		{ name: "description", content: "Come get some!!" },
	];
}

export default function Home() {
	return <Welcome />;
}
