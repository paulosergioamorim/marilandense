<script lang="ts">
	import Product from "$lib/components/Product.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<section class="container">
	<div class="d-flex justify-content-center gap-5">
		{#each data.products as product}
			<Product {product} />
		{/each}
	</div>
</section>