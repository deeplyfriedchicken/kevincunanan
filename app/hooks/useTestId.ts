import { useCallback } from "react";

type TestIdPart = string | number | boolean;

export function useTestId(prefix: string, separator: string = "_") {
	const buildTestId = useCallback(
		(...parts: TestIdPart[]): string => {
			if (!prefix && parts.length === 0) return "";
			return [prefix, ...parts].map(String).filter(Boolean).join(separator);
		},
		[prefix, separator],
	);

	return { buildTestId };
}
