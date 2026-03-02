import { useState } from "react";

export function HeadingAnchor({ id }: { id: string }) {
	const [copied, setCopied] = useState(false);

	function handleClick() {
		const url = `${window.location.origin}${window.location.pathname}#${id}`;
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className="cursor-pointer inline-flex items-center ml-[0.5rem] h-full opacity-25 hover:opacity-100 transition-opacity align-middle"
			aria-label={`Copy link to ${id}`}
		>
			{copied ? (
				<svg
					data-testid="copy-success-icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-[1em] h-[1em] text-theme-button"
				>
					<title>Copy success</title>
					<path
						fillRule="evenodd"
						d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
						clipRule="evenodd"
					/>
				</svg>
			) : (
				<svg
					data-testid="copy-icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-[1em] h-[1em] text-theme-text"
				>
					<title>Click to copy section link to clipboard</title>
					<path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
					<path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
				</svg>
			)}
		</button>
	);
}
