// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			status?: number
		}
		// interface Locals {}
		interface PageData { }
		interface PageState { isNewChat?: boolean }
		// interface Platform {}
	}
}

export { };
