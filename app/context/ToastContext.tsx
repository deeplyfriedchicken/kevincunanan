import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface Toast {
	id: string;
	message: string;
	icon?: React.ReactNode;
	duration: number;
	exiting: boolean;
}

interface ToastOptions {
	icon?: React.ReactNode;
	duration?: number;
}

interface ToastContextValue {
	toasts: Toast[];
	addToast: (message: string, options?: ToastOptions) => void;
	dismissToast: (id: string) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
	toasts: [],
	addToast: () => {},
	dismissToast: () => {},
	removeToast: () => {},
});

const MAX_TOASTS = 2;
const DEFAULT_DURATION = 3000;

let toastCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
		new Map(),
	);

	const removeToast = useCallback((id: string) => {
		const timer = timersRef.current.get(id);
		if (timer) {
			clearTimeout(timer);
			timersRef.current.delete(id);
		}
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const dismissToast = useCallback((id: string) => {
		setToasts((prev) =>
			prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
		);
	}, []);

	const addToast = useCallback(
		(message: string, options?: ToastOptions) => {
			const id = `toast-${++toastCounter}`;
			const duration = options?.duration ?? DEFAULT_DURATION;

			const newToast: Toast = {
				id,
				message,
				icon: options?.icon,
				duration,
				exiting: false,
			};

			setToasts((prev) => {
				const next = [...prev, newToast];
				// If exceeding cap, mark oldest for exit
				if (next.length > MAX_TOASTS) {
					const oldest = next.find((t) => !t.exiting);
					if (oldest) {
						oldest.exiting = true;
					}
				}
				return next;
			});

			// Auto-dismiss after duration
			const timer = setTimeout(() => {
				dismissToast(id);
			}, duration);
			timersRef.current.set(id, timer);
		},
		[dismissToast],
	);

	// Cleanup all timers on unmount
	useEffect(() => {
		const timers = timersRef.current;
		return () => {
			for (const timer of timers.values()) {
				clearTimeout(timer);
			}
		};
	}, []);

	return (
		<ToastContext.Provider
			value={{ toasts, addToast, dismissToast, removeToast }}
		>
			{children}
		</ToastContext.Provider>
	);
}

export function useToast() {
	return useContext(ToastContext);
}

export type { Toast };
