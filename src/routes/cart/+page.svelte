<script lang="ts">
	import Sale from '$lib/components/Sale.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<div class="d-flex justify-content-center gap-5">
		{#each data.sales as sale}
			<Sale {sale} />
		{/each}
	</div>
</section>
