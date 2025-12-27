import { useLottie } from "lottie-react";
import { Link } from "react-router";
import { Navbar } from "~/components/Navbar";
import catJson from "../data/cat.json";

export function Welcome() {
	const options = {
		animationData: catJson,
		loop: true,
	};

	const { View: Cat } = useLottie(options);

	return (
		<main className="flex items-center justify-center h-full w-full">
			<div className="grid grid-cols-3 grid-rows-3 gap-4 grow">
				<div className="flex flex-col items-left justify-center">
					<h1 className="text-dark-blue-900 opacity-75 font-light mb-4 text-4xl md:text-6xl lg:text-7xl text-wrap">
						kevin cunanan
					</h1>
					<p className="text-dark-blue-900 font-extralight text-md">
						senior software engineer
					</p>
				</div>
				<div>2</div>
				<Navbar
					navItems={[
						{ to: "/", children: "home" },
						{ to: "/about", children: "about" },
						{ to: "/projects", children: "projects" },
						{ to: "/resume", children: "resume" },
					]}
				/>
				<div className="row-start-2 col-span-3 flex items-center justify-center">
					{Cat}
				</div>
				<div className="row-start-3 flex">
					<p className="text-[#2E3445] opacity-25 font-semibold mt-auto">
						designed by cory
					</p>
				</div>
				<div className="row-start-3 flex flex-col items-center justify-center pt-8">
					<p className="font-merriweather-sans text-[#CFCFDF] uppercase basis-1/3 tracking-widest">
						Bay Area
					</p>
					<div className="basis-2/3">
						<Link
							to="/projects"
							className="bg-dark-blue-900 hover:bg-dark-blue-950 px-16 py-4 text-white rounded-full"
						>
							check out my work
						</Link>
					</div>
				</div>
				<div className="row-start-3">9</div>
			</div>
		</main>
	);
}
