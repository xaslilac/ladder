import { BaseErrorOr, ErrorOr, ErrorOrCatchFn, ErrorOrUtil } from "./erroror";
import { Err } from "./erroror";

export class Ladder<T> implements ErrorOrUtil<T> {
	#index: number = 0;
	#catches: Array<ErrorOrCatchFn<T>> = [];

	private result: BaseErrorOr<T>;
	constructor(private readonly context: BaseErrorOr<T>) {
		this.result = context;
	}

	static from<T>(context: BaseErrorOr<T>) {
		if (context instanceof Ladder) {
			return context as ErrorOr<T>;
		}

		return new Ladder(context) as ErrorOr<T>;
	}

	evaluate() {
		for (; this.#index < this.#catches.length; this.#index++) {
			if (this.result.kind !== "err") {
				break;
			}

			this.result = this.#catches[this.#index](this.result.value);
		}
	}

	get kind() {
		this.evaluate();
		return this.result.kind;
	}

	get value() {
		this.evaluate();
		return this.result.value;
	}

	catch(fn: ErrorOrCatchFn<T>) {
		this.#catches.push(fn);
		return this;
	}

	expect(description: string) {
		this.catch((error) =>
			// @ts-expect-error - 2 new 4 TypeScript
			Err(new Error(`Failed to meet condition: ${description}`, { cause })),
		);
		return this;
	}
}
