import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived } from 'svelte/store';

export function createUserStore() {
	const { subscribe } = derived(page, ($page) => $page.data.user);

	async function signOut() {
		const res = await fetch('/sign-out', { method: 'post' });
		if (res.ok) await goto('/', { invalidateAll: true });
	}

	return { subscribe, signOut };
}
