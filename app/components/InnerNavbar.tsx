import clsx from "clsx";
import { Github, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { githubUrl, navLinks } from "~/components/nav-links";
import { useTestId } from "~/hooks/useTestId";

export function InnerNavbar({
	variant = "light",
	color,
}: {
	variant?: "light" | "dark";
	color?: string;
}) {
	const { buildTestId } = useTestId("InnerNavbar");
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
					onClick={() => setIsOpen(true)}
					className={clsx("md:hidden", textClass)}
					aria-label="Open menu"
					data-testid={buildTestId("burger")}
				>
					<Menu className="h-[1.5rem] w-[1.5rem]" />
				</button>

				<ul className="hidden items-center gap-[0.25rem] md:flex">
					{navLinks.map(({ to, label, external }) => (
						<li key={to}>
							{external ? (
								<a
									href={to}
									target="_blank"
									rel="noopener noreferrer"
									className={clsx(
										"mx-[0.75rem] block py-[0.5rem] text-[1rem] transition-opacity hover:opacity-70",
										textClass,
									)}
								>
									{label}
								</a>
							) : (
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
							)}
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

			{/* Mobile nav overlay */}
			{isOpen && (
				<>
					{/* Dark overlay */}
					<button
						type="button"
						className="fixed inset-0 z-20 animate-nav-overlay cursor-default appearance-none border-none bg-theme-primary/85 p-0"
						onClick={() => setIsOpen(false)}
						aria-label="Close navigation"
						data-testid={buildTestId("overlay")}
					/>
					{/* White nav header */}
					<div className="fixed top-0 right-0 left-0 z-30 flex h-[12.4375rem] animate-nav-slide items-end bg-white/95 px-[2.25rem] pb-[1.5rem] backdrop-blur-[10px] md:hidden">
						{/* Logo */}
						<p className="font-light text-[1.5rem] text-theme-text italic">
							kevin cunanan
						</p>
						{/* Nav links */}
						<div className="ml-auto">
							<ul className="flex flex-col items-end gap-[0.625rem]">
								{navLinks.map(({ to, label, external }) => (
									<li key={to}>
										{external ? (
											<a
												href={to}
												target="_blank"
												rel="noopener noreferrer"
												onClick={() => setIsOpen(false)}
												className="font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50 transition-opacity hover:opacity-100"
											>
												{label}
											</a>
										) : (
											<NavLink
												to={to}
												onClick={() => setIsOpen(false)}
												className={({ isActive }) =>
													clsx(
														"font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50",
														isActive && "opacity-100",
													)
												}
											>
												{label}
											</NavLink>
										)}
									</li>
								))}
								<li>
									<a
										href={githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => setIsOpen(false)}
										className="flex items-center gap-[0.375rem] font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50 transition-opacity hover:opacity-100"
									>
										<Github className="h-[0.875rem] w-[0.875rem]" />
										github
									</a>
								</li>
							</ul>
						</div>
					</div>
				</>
			)}
		</nav>
	);
}
