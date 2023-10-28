import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived, writable } from 'svelte/store';

export type CreateModalStoreType = ReturnType<typeof createModalStore>;

export function createModalStore() {
	const { set, subscribe, update } = writable(false);

	function showModal() {
		set(true);
	}

	function hideModal() {
		set(false);
	}

	function toggleModal() {
		update((show) => !show);
	}

	return {
		subscribe,
		showModal,
		hideModal,
		toggleModal
	};
}

export function createUserStore() {
	const { subscribe } = derived(page, ($page) => $page.data.user);

	async function signOut() {
		const res = await fetch('/logout', { method: 'post' });
		if (res.ok) await goto('/', { invalidateAll: true });
	}

	return { subscribe, signOut };
}
