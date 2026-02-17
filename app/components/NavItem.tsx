import { NavLink } from "react-router";

type TNavItem = {
	to: string;
	children: React.ReactNode;
	className?: string;
}

export function NavItem({
	to,
	children,
	className = "",
}: TNavItem) {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`block py-[0.5rem] mx-[0.75rem] text-theme-text text-[1rem] hover:opacity-70 transition-opacity ${isActive ? "border-b-4 border-theme-text" : ""} ${className}`
				}
			>
				{children}
			</NavLink>
		</li>
	);
}
