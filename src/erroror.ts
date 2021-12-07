import { Ladder } from "./ladder";

export type ErrorOr<T> = BaseErrorOr<T> & ErrorOrUtil<T>;

export type BaseErrorOr<T> = { kind: "err"; value: Error } | { kind: "ok"; value: T };
export type ErrorOrCatchFn<T> = (error: Error) => BaseErrorOr<T>;
export interface ErrorOrUtil<T> {
	catch(fn: ErrorOrCatchFn<T>): this;
	expect(description: string): this;
}

export const Err = <E extends Error, T = unknown>(error: E): ErrorOr<T> => {
	return Ladder.from<T>({
		kind: "err",
		value: error,
	});
};

export const Ok = <T>(value: T): ErrorOr<T> => {
	return Ladder.from<T>({
		kind: "ok",
		value,
	});
};
