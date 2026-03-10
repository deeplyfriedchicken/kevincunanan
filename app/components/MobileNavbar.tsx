import clsx from "clsx";
import { NavLink } from "react-router";
import { githubUrl, navLinks } from "~/data/nav-links";
import { useTestId } from "~/hooks/useTestId";

type TMobileNavbar = {
	closeNavbar: () => void;
};

export function MobileNavbar({ closeNavbar }: TMobileNavbar) {
	const { buildTestId } = useTestId("MobileNavbar");
	return (
		<>
			<button
				type="button"
				className="fixed inset-0 z-20 animate-nav-overlay cursor-default appearance-none border-none bg-theme-primary/85 p-0 md:hidden"
				onClick={closeNavbar}
				aria-label="Close navigation"
				data-testid={buildTestId("overlay")}
			/>
			<div className="fixed top-0 right-0 left-0 z-30 flex h-[12.4375rem] animate-nav-slide items-end bg-white/95 px-[2.25rem] pb-[1.5rem] backdrop-blur-[10px] md:hidden">
				<p className="font-light text-[1.5rem] text-theme-text italic">
					kevin cunanan
				</p>
				<nav className="ml-auto">
					<ul className="flex flex-col items-end gap-[0.625rem]">
						{navLinks.map(({ to, label, external }) => (
							<li key={to}>
								{external ? (
									<a
										href={to}
										target="_blank"
										rel="noopener noreferrer"
										className="font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50 transition-opacity hover:opacity-100"
									>
										{label}
									</a>
								) : (
									<NavLink
										to={to}
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
								onClick={closeNavbar}
								className="flex items-center gap-[0.375rem] font-bold font-merriweather-sans text-[0.875rem] text-theme-text opacity-50 transition-opacity hover:opacity-100"
							>
								github
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}
