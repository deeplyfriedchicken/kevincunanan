import { Github } from "lucide-react";
import { githubUrl } from "~/components/nav-links";
import { NavItem } from "~/components/NavItem";

export function Navbar({
	navItems = [],
}: {
	navItems: { to: string; children: React.ReactNode }[];
}) {
	return (
		<nav>
			<div className="w-full md:w-auto" id="navbar-default">
				<ul className="font-medium flex p-4 md:p-0 mt-4 flex-row items-center">
					{navItems.map(({ to, children }) => (
						<NavItem key={to} to={to}>
							{children}
						</NavItem>
					))}
					<li>
						<a
							href={githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub repository"
							className="block py-[0.5rem] mx-[0.75rem] text-theme-text hover:opacity-70 transition-opacity"
						>
							<Github className="w-[1.25rem] h-[1.25rem]" />
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
