import { writable } from 'svelte/store';

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
