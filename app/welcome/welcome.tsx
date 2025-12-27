import { useLottie } from "lottie-react";
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
				<div>
					<nav>
						<div
							className="hidden w-full md:block md:w-auto"
							id="navbar-default"
						>
							<ul className="font-medium flex p-4 md:p-0 mt-4 flex-row">
								<li>
									<a
										href="#"
										className="block py-2 mx-3 text-dark-blue-900 border-b-4"
										aria-current="page"
									>
										home
									</a>
								</li>
								<li>
									<a href="#" className="block py-2 mx-3 text-dark-blue-900">
										about
									</a>
								</li>
								<li>
									<a href="#" className="block py-2 mx-3 text-dark-blue-900">
										projects
									</a>
								</li>
								<li>
									<a href="#" className="block py-2 mx-3 text-dark-blue-900">
										contact
									</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
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
						<button
							type="button"
							className="bg-dark-blue-900 px-16 py-4 text-white rounded-full"
						>
							check out my work
						</button>
					</div>
				</div>
				<div className="row-start-3">9</div>
			</div>
		</main>
	);
}
