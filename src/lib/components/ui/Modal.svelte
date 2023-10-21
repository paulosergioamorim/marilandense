<script lang="ts">
	import type { CreateModalStoreType } from '$lib/stores';
	import { delay } from '$lib/utils';

	let el: HTMLDialogElement | null = null;

	$: if ($modalStore) {
		el?.showModal();
		el?.classList.remove('hide');
	} else {
		el?.classList.add('hide');
		delay(500).then(() => el?.close());
	}

	export let modalStore: CreateModalStoreType;
</script>

<dialog bind:this={el} class="marilandense-modal hide">
	<button on:click={modalStore.hideModal} class="button salmon">
		<i class="fa fa-x" />
	</button>
	<slot hideModal={modalStore.hideModal} />
</dialog>

<style>
	.marilandense-modal {
		border: 4px var(--gray) solid;
		border-radius: 24px;
		width: clamp(200px, 50%, 400px);
		overflow: visible;
		transition: translate 0.5s ease;
		translate: 0 -250%;
	}

	.marilandense-modal[open] {
		translate: 0;
	}

	.marilandense-modal[open]::backdrop {
		background-color: transparent;
		backdrop-filter: blur(4px);
	}

	.marilandense-modal.hide {
		translate: 0 -250%;
	}

	.marilandense-modal.hide::backdrop {
		backdrop-filter: blur(4px) opacity(0);
	}

	.marilandense-modal .button {
		position: absolute;
		top: -1rem;
		right: -1rem;
	}
</style>
