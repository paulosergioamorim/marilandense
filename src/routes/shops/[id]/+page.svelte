<script lang="ts">
	import type { PageData } from './$types';
	import { ProductCard } from '$lib/components';

	export let data: PageData;
</script>

<svelte:head>
	<title>Marilandense | Fazenda {data.shop.name}</title>
</svelte:head>

<section class="container mb-3" id="products">
	<h2 class="text-center">
		Produtos de {data.shop.name}
	</h2>
	<br />
	<div class="flex-wrapper">
		{#each data.shop.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>
