// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { IDatabase } from "pg-promise";

declare global {
    var __pgPromiseDb: IDatabase<IExtensions>;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
