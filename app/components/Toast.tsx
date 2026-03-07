import { type Toast as ToastType, useToast } from "~/context/ToastContext";
import { useTestId } from "~/hooks/useTestId";

function ToastItem({
	toast,
	"data-testid": dataTestId,
}: {
	toast: ToastType;
	"data-testid": string;
}) {
	const { buildTestId } = useTestId(`${dataTestId}_ToastItem`);
	const { removeToast } = useToast();

	return (
		<div
			data-testid={buildTestId("container")}
			className={`flex items-center gap-[0.75rem] rounded-[0.5rem] border border-theme-text/10 bg-white px-[1rem] py-[0.75rem] shadow-lg ${
				toast.exiting ? "animate-toast-out" : "animate-toast-in"
			}`}
			onAnimationEnd={() => {
				if (toast.exiting) {
					removeToast(toast.id);
				}
			}}
		>
			{toast.icon && (
				<span className="flex-shrink-0 text-theme-button">{toast.icon}</span>
			)}
			<p
				data-testid={buildTestId("message")}
				className="font-merriweather-sans text-[0.875rem] text-theme-text"
			>
				{toast.message}
			</p>
		</div>
	);
}

export function Toast() {
	const { buildTestId } = useTestId("Toast");
	const { toasts } = useToast();

	if (toasts.length === 0) return null;

	return (
		<div
			data-testid={buildTestId()}
			className="fixed top-[2rem] right-0 left-0 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] flex-col gap-[0.5rem]"
		>
			{toasts.map((toast) => (
				<ToastItem
					key={toast.id}
					toast={toast}
					data-testid={buildTestId(toast.id)}
				/>
			))}
		</div>
	);
}
