export function TechTag({ label }: { label: string }) {
	return (
		<span className="inline-block border border-theme-text text-theme-text px-[1rem] py-[0.25rem] rounded-full text-[0.875rem] font-merriweather-sans">
			{label}
		</span>
	);
}
