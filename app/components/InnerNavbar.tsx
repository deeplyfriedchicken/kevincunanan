import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
	{ to: "/", label: "home" },
	{ to: "/about", label: "about" },
	{ to: "/projects", label: "projects" },
	{ to: "/resume", label: "resume" },
];

export function InnerNavbar({
	variant = "light",
}: {
	variant?: "light" | "dark";
}) {
	const [isOpen, setIsOpen] = useState(false);
	const textClass = variant === "dark" ? "text-white" : "text-theme-text";
	const borderClass = variant === "dark" ? "border-white" : "border-theme-text";
	const menuBg = variant === "dark" ? "bg-[#32384c]" : "bg-white";

	return (
		<nav className="relative py-[1.5rem] px-[2rem] md:px-[4rem]">
			<div className="flex items-center justify-between">
				<NavLink
					to="/"
					className={`text-[2.25rem] font-light ${textClass}`}
				></NavLink>

				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`md:hidden ${textClass}`}
					aria-label="Toggle menu"
				>
					{isOpen ? (
						<X className="w-[1.5rem] h-[1.5rem]" />
					) : (
						<Menu className="w-[1.5rem] h-[1.5rem]" />
					)}
				</button>

				<ul className="hidden md:flex gap-[0.25rem]">
					{navLinks.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`block py-[0.5rem] mx-[0.75rem] text-[1rem] ${textClass} hover:opacity-70 transition-opacity ${isActive ? `border-b-4 ${borderClass}` : ""}`
								}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			{isOpen && (
				<div
					className={`absolute top-full left-0 right-0 ${menuBg} shadow-lg z-50 md:hidden`}
				>
					<ul className="flex flex-col px-[2rem] py-[1rem]">
						{navLinks.map(({ to, label }) => (
							<li key={to}>
								<NavLink
									to={to}
									onClick={() => setIsOpen(false)}
									className={({ isActive }) =>
										`block py-[0.75rem] text-[1rem] ${textClass} hover:opacity-70 transition-opacity ${isActive ? `border-l-4 pl-[0.75rem] ${borderClass}` : ""}`
									}
								>
									{label}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
}
