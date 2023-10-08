<script lang="ts">
	let el: HTMLDialogElement | null = null;

	$: if (show) el?.showModal();
	else el?.close();

	export let show = false;
</script>

<dialog bind:this={el} class="border-0 p-lg-5 shadow rounded-4 overflow-visible">
	<button
		on:click={() => (show = false)}
		class="btn btn-danger rounded-pill position-absolute"
		style="top: -.75rem; right: -.75rem;"
	>
		<i class="fa fa-x" />
	</button>
	<slot />
</dialog>
