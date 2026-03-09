import { Github } from "lucide-react";
import { NavItem } from "~/components/NavItem";
import { githubUrl } from "~/components/nav-links";

export function Navbar({
	navItems = [],
}: {
	navItems: { to: string; children: React.ReactNode; external?: boolean }[];
}) {
	return (
		<nav>
			<div className="w-full md:w-auto" id="navbar-default">
				<ul className="mt-4 flex flex-row flex-wrap items-center justify-end gap-y-[0.25rem] p-4 font-medium md:p-0">
					{navItems.map(({ to, children, external }) =>
						external ? (
							<li key={to}>
								<a
									href={to}
									target="_blank"
									rel="noopener noreferrer"
									className="mx-[0.375rem] block py-[0.5rem] text-[1rem] text-theme-text transition-opacity hover:opacity-70 lg:mx-[0.75rem]"
								>
									{children}
								</a>
							</li>
						) : (
							<NavItem key={to} to={to}>
								{children}
							</NavItem>
						),
					)}
					<li>
						<a
							href={githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub repository"
							className="mx-[0.375rem] block py-[0.5rem] text-theme-text transition-opacity hover:opacity-70 lg:mx-[0.75rem]"
						>
							<Github className="h-[1.25rem] w-[1.25rem]" />
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
