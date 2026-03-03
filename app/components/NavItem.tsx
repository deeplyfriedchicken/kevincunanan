import clsx from "clsx";
import { NavLink } from "react-router";

type TNavItem = {
	to: string;
	children: React.ReactNode;
	className?: string;
};

export function NavItem({ to, children, className = "" }: TNavItem) {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					clsx(
						"mx-[0.375rem] block py-[0.5rem] text-[1rem] text-theme-text transition-opacity hover:opacity-70 lg:mx-[0.75rem]",
						isActive && ["border-theme-text", "border-b-4"],
						className,
					)
				}
			>
				{children}
			</NavLink>
		</li>
	);
}
