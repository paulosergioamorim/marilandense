<script lang="ts">
	import Shop from '$lib/components/Shop.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<div class="d-flex justify-content-center gap-5">
		{#each data.shops as shop}
			<Shop {shop} />
		{/each}
	</div>
</section>
