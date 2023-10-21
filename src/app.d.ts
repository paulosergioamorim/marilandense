// See https://kit.svelte.dev/docs/types#app

import type { User } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			currentUser: User | null;
		}
		interface PageData {
			currentUser: User | null;
		}
		// interface Platform {}
	}
}

export {};
