import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
import { LastUpdatedClock } from "~/components/LastUpdatedClock";

export function Footer() {
	return (
		<footer className="relative bg-theme-primary overflow-hidden py-[6rem] px-[2rem] md:px-[4rem]">
			<div className="absolute left-[-175px] bottom-0 text-white opacity-[0.04] pointer-events-none">
				<LeftBlob className="w-full h-full" style={{ overflow: "visible" }} />
			</div>
			<div className="absolute right-[-500px] bottom-0 text-white opacity-[0.04] pointer-events-none">
				<RightBlob className="w-full h-full" style={{ overflow: "visible" }} />
			</div>

			<div className="relative z-10 flex items-center justify-center">
				<a
					href="mailto:kevin.a.cunanan@gmail.com"
					className="bg-white text-theme-text px-[3rem] py-[1rem] rounded-full hover:opacity-90 transition-opacity font-merriweather-sans text-[1rem]"
				>
					send me an email
				</a>
			</div>

			<div className="absolute bottom-[2rem] left-[2rem] md:left-[4rem] z-10">
				<LastUpdatedClock variant="dark" />
			</div>
		</footer>
	);
}
