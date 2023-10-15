<script lang="ts">
	import { goto } from '$app/navigation';
	import Product from '$lib/components/Product.svelte';
	import type { PageData } from './$types';

	async function buyProductHandle(e: CustomEvent) {
		await goto(`/shops/${e.detail.product.shopId}`);
	}

	const limit = 10;

	export let data: PageData;
</script>

<section class="container">
	<h2 class="text-center fw-bold">Produtos</h2>
	<nav>
		<ul class="pagination">
			{#each Array(Math.ceil(data.count / limit)) as _, i}
				<li class="page-item">
					<a href="/products?skip={i * limit}" class="page-link">{i + 1}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="flex-wrapper">
		{#each data.products as product}
			<Product on:buy={buyProductHandle} {product} />
		{/each}
	</div>
</section>
