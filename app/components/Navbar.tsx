import { NavItem } from "~/components/NavItem";

export function Navbar({
	navItems = [],
}: {
	navItems: { to: string; children: React.ReactNode }[];
}) {
	return (
		<nav>
			<div className="hidden w-full md:block md:w-auto" id="navbar-default">
				<ul className="font-medium flex p-4 md:p-0 mt-4 flex-row">
					{navItems.map(({ to, children }) => (
						<NavItem key={to} to={to}>
							{children}
						</NavItem>
					))}
				</ul>
			</div>
		</nav>
	);
}
