import { ErrorOr, Err, Ok } from "./erroror";

export function Catch<A extends any[], T>(
	base: (...args: A) => T,
): (...args: A) => ErrorOr<T> {
	return function (...args) {
		try {
			return Ok(base(...args));
		} catch (error) {
			return Err(error);
		}
	};
}

export function Try<T>(op: ErrorOr<T>) {
	if (op.kind === "err") {
		// @ts-expect-error - 2 new 4 TypeScript
		throw new Error("Failed Try", { cause: op.error });
	}

	return op.value;
}
