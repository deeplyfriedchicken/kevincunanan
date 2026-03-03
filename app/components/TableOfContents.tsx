import clsx from "clsx";

export type TOCItem = { level: 1 | 2 | 3; text: string; id: string };

export function TableOfContents({ items }: { items: TOCItem[] }) {
	return (
		<nav className="space-y-[0.125rem]">
			{items.map((item) => (
				<a
					key={item.id}
					href={`#${item.id}`}
					className={clsx(
						"block font-merriweather-sans text-theme-text transition-opacity hover:opacity-70",
						levelStyles[item.level],
					)}
				>
					{item.text}
				</a>
			))}
		</nav>
	);
}

const levelStyles: Record<TOCItem["level"], string> = {
	1: "py-[0.5rem] text-[0.875rem] font-bold",
	2: "py-[0.375rem] pl-[1rem] text-[0.875rem] border-l-2 border-theme-text/40",
	3: "py-[0.375rem] pl-[2rem] text-[0.8125rem] font-light border-l-2 border-theme-text/20",
};
