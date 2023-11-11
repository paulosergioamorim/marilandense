import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived, writable } from 'svelte/store';

export type ModalStoreType = ReturnType<typeof createModalStore>;

export function createModalStore() {
	const { set, subscribe } = writable(false);

	function showModal() {
		set(true);
	}

	function hideModal() {
		set(false);
	}

	return {
		subscribe,
		showModal,
		hideModal
	};
}

export function createUserStore() {
	const { subscribe } = derived(page, ($page) => $page.data.user);

	async function signOut() {
		const res = await fetch('/sign-out', { method: 'post' });
		if (res.ok) await goto('/', { invalidateAll: true });
	}

	return { subscribe, signOut };
}
