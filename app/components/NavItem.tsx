import clsx from "clsx";
import { NavLink } from "react-router";

type TNavItem = {
	to: string;
	children: React.ReactNode;
	className?: string;
	activeClassName?: string;
};

export function NavItem({
	to,
	children,
	className = "",
	activeClassName = "border-theme-text border-b-4",
}: TNavItem) {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					clsx(className, isActive && activeClassName)
				}
			>
				{children}
			</NavLink>
		</li>
	);
}
