import { LucideCheck, LucideCopy } from "lucide-react";
import { useState } from "react";
import { useToast } from "~/context/ToastContext";
import { useTestId } from "~/hooks/useTestId";

export function HeadingAnchor({ id }: { id: string }) {
	const { buildTestId } = useTestId(`HeadingAnchor_${id}`);
	const { addToast } = useToast();
	const [copied, setCopied] = useState(false);

	function handleClick() {
		const url = `${window.location.origin}${window.location.pathname}#${id}`;
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);
		addToast("Copied to clipboard!", { icon: <LucideCheck /> });
	}

	return (
		<button
			data-testid={buildTestId("button")}
			type="button"
			onClick={handleClick}
			className="ml-[0.5rem] inline-flex h-full cursor-pointer items-center align-middle"
			aria-label={`Copy link to ${id}`}
		>
			{/* TOOD we need to add the checkmark back and probably use Lucide */}
			{copied ? (
				<LucideCheck
					size={16}
					color="green"
					data-testid={buildTestId("icon", "copySuccess")}
				/>
			) : (
				<LucideCopy
					size={16}
					className="opacity-25 transition-opacity hover:opacity-100"
					data-testid={buildTestId("icon", "copy")}
				/>
			)}
		</button>
	);
}
