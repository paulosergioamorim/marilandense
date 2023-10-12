<script lang="ts">
	let el: HTMLDialogElement | null = null;

	$: if (showModal) el?.showModal();

	export let showModal = false;
</script>

<dialog on:close bind:this={el} class="border-0 p-lg-5 shadow-sm rounded-2 overflow-visible">
	<button
		on:click={() => el?.close()}
		class="btn btn-sm rounded-pill btn-danger position-absolute"
		style="top: -.5rem; right: -.5rem;"
	>
		<i class="fa fa-x" />
	</button>
	<slot />
</dialog>
