import clsx from "clsx";
import { Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { githubUrl, navLinks } from "~/components/nav-links";

export function InnerNavbar({
	variant = "light",
	color,
}: {
	variant?: "light" | "dark";
	color?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const textClass =
		variant === "dark"
			? "text-white"
			: color
				? "text-[var(--nav-color)]"
				: "text-theme-text";
	const borderClass =
		variant === "dark"
			? "border-white"
			: color
				? "border-[var(--nav-color)]"
				: "border-theme-text";
	const menuBg =
		variant === "dark" && color
			? "bg-[var(--nav-color)]"
			: variant === "dark"
				? "bg-theme-text"
				: "bg-white";

	return (
		<nav
			className="relative px-[2rem] py-[1.5rem] md:px-[4rem]"
			{...(color
				? { style: { "--nav-color": color } as React.CSSProperties }
				: {})}
		>
			<div className="flex items-center justify-between">
				<NavLink
					to="/"
					className={clsx("font-light text-[2.25rem]", textClass)}
				></NavLink>

				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={clsx("md:hidden", textClass)}
					aria-label="Toggle menu"
				>
					{isOpen ? (
						<X className="h-[1.5rem] w-[1.5rem]" />
					) : (
						<Menu className="h-[1.5rem] w-[1.5rem]" />
					)}
				</button>

				<ul className="hidden items-center gap-[0.25rem] md:flex">
					{navLinks.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									clsx(
										"mx-[0.75rem] block py-[0.5rem] text-[1rem] transition-opacity hover:opacity-70",
										textClass,
										isActive && ["border-b-4", borderClass],
									)
								}
							>
								{label}
							</NavLink>
						</li>
					))}
					<li>
						<a
							href={githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub repository"
							className={`mx-[0.75rem] block py-[0.5rem] ${textClass} transition-opacity hover:opacity-70`}
						>
							<Github className="h-[1.25rem] w-[1.25rem]" />
						</a>
					</li>
				</ul>
			</div>

			{isOpen && (
				<div
					className={`absolute top-full right-0 left-0 ${menuBg} z-50 shadow-lg md:hidden`}
				>
					<ul className="flex flex-col px-[2rem] py-[1rem]">
						{navLinks.map(({ to, label }) => (
							<li key={to}>
								<NavLink
									to={to}
									onClick={() => setIsOpen(false)}
									className={({ isActive }) =>
										`block py-[0.75rem] text-[1rem] ${textClass} transition-opacity hover:opacity-70 ${isActive ? `border-l-4 pl-[0.75rem] ${borderClass}` : ""}`
									}
								>
									{label}
								</NavLink>
							</li>
						))}
						<li>
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setIsOpen(false)}
								className={`flex items-center gap-[0.5rem] py-[0.75rem] text-[1rem] ${textClass} transition-opacity hover:opacity-70`}
							>
								<Github className="h-[1.25rem] w-[1.25rem]" />
								github
							</a>
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
}
