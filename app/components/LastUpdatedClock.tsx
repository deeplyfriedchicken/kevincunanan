import { Clock } from "lucide-react";
import { githubUrl } from "~/components/nav-links";
import { getLastUpdated } from "~/data/portfolio";
import { formatISOString } from "~/services/formatISOString";

type Props = {
	variant?: "dark" | "light";
};

export function LastUpdatedClock({ variant = "dark" }: Props) {
	const lastUpdated = formatISOString(getLastUpdated());

	const anchorClass =
		variant === "dark"
			? "text-white/30 hover:text-white/60"
			: "text-theme-credit/25 hover:text-theme-credit/50";

	const tooltipClass =
		variant === "dark"
			? "bg-white/10 text-white/80"
			: "bg-[#2e3445]/90 text-white/90";

	return (
		<a
			href={githubUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={`group relative flex items-center transition-colors ${anchorClass}`}
		>
			<Clock size={14} />
			<span
				className={`absolute bottom-full left-0 mb-[0.5rem] px-[0.75rem] py-[0.375rem] ${tooltipClass} font-merriweather-sans text-[0.75rem] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
			>
				Last Updated: {lastUpdated}
			</span>
		</a>
	);
}
