import LeftBlob from "~/assets/leftBlob.svg?react";
import RightBlob from "~/assets/rightBlob.svg?react";
import { LastUpdatedClock } from "~/components/LastUpdatedClock";

export function Footer() {
	return (
		<footer className="relative overflow-hidden bg-theme-primary px-[2rem] py-[6rem] md:px-[4rem]">
			<div className="pointer-events-none absolute bottom-0 left-[-175px] text-white opacity-[0.04]">
				<LeftBlob className="h-full w-full overflow-visible" />
			</div>
			<div className="pointer-events-none absolute right-[-500px] bottom-0 text-white opacity-[0.04]">
				<RightBlob className="h-full w-full overflow-visible" />
			</div>

			<div className="relative z-10 flex items-center justify-center">
				<a
					href="mailto:kevin.a.cunanan@gmail.com"
					className="rounded-full bg-white px-[3rem] py-[1rem] font-merriweather-sans text-[1rem] text-theme-text transition-opacity hover:opacity-90"
				>
					send me an email
				</a>
			</div>

			<div className="absolute bottom-[2rem] left-[2rem] z-10 md:left-[4rem]">
				<LastUpdatedClock variant="dark" />
			</div>
		</footer>
	);
}
