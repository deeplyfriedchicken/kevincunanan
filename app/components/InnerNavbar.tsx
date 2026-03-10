import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { MobileNavbar } from "~/components/MobileNavbar";
import { useTestId } from "~/hooks/useTestId";
import { NavItems } from "./NavItems";

export function InnerNavbar({ color }: { color?: string }) {
	const { buildTestId } = useTestId("InnerNavbar");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className="relative px-[2rem] py-[1.5rem] md:px-[4rem]"
			{...(color
				? { style: { "--nav-color": color } as React.CSSProperties }
				: {})}
		>
			<div className="flex items-center justify-between">
				<NavLink
					to="/"
					className="font-light text-[2.25rem text-theme-text"
				></NavLink>

				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="text-theme-text md:hidden"
					aria-label="Open menu"
					data-testid={buildTestId("burger")}
				>
					<Menu className="h-[1.5rem] w-[1.5rem]" />
				</button>
				<NavItems
					classNames={{
						ul: "hidden items-center gap-[0.25rem] md:flex",
						link: "mx-[0.75rem] block py-[0.5rem] text-[1rem] transition-opacity hover:opacity-70 text-theme-text",
					}}
				/>
			</div>

			{isOpen && <MobileNavbar closeNavbar={() => setIsOpen(false)} />}
		</div>
	);
}
