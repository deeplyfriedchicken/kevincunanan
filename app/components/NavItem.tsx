import { NavLink } from "react-router";

export function NavItem({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`block py-2 mx-3 text-dark-blue-900 hover:text-dark-blue-600 ${isActive ? "border-b-4" : ""}`
				}
			>
				{children}
			</NavLink>
		</li>
	);
}
