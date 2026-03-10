import { Github } from "lucide-react";
import { githubUrl, navLinks } from "~/data/nav-links";
import { NavItem } from "./NavItem";

type TNavItems = {
	classNames: { ul: string; link: string };
}

export function NavItems({
	classNames: { ul, link },
}: TNavItems) {
	return (
		<ul className={ul}>
			{navLinks.map(({ to, label, external }) =>
				external ? (
					<li key={to}>
						<a
							href={to}
							target="_blank"
							rel="noopener noreferrer"
							className={link}
						>
							{label}
						</a>
					</li>
				) : (
					<NavItem key={to} to={to} className={link}>
						{label}
					</NavItem>
				),
			)}
			<li>
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub repository"
					className={link}
				>
					<Github className="h-[1.25rem] w-[1.25rem]" />
				</a>
			</li>
		</ul>
	);
}
