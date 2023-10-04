// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			currentUser: import("@prisma/client").User | null;
		}
		interface PageData {
			currentUser: import("@prisma/client").User | null;
		}
		// interface Platform {}
	}
}

export {};
