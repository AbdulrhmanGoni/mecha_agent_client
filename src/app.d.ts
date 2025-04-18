// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData { user: User, error: string }
		interface PageState { isNewChat?: boolean }
		// interface Platform {}
	}
}

export { };
