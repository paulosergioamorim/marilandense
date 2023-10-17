import { writable } from 'svelte/store';

function showModalStore() {
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

export const profileShowModal = showModalStore();

export const buyProductShowModal = showModalStore();
