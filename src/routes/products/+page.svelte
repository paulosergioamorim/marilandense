<script lang="ts">
	import { goto } from '$app/navigation';
	import Product from '$lib/components/Product.svelte';
	import type { PageData } from './$types';

	async function buyProductHandle(e: CustomEvent) {
		await goto(`/shops/${e.detail.product.shopId}`);
	}

	export let data: PageData;

	const limit = 10;
	const pagesCount = Math.ceil(data.count / limit);
</script>

<section class="container">
	<h1 class="text-center">Produtos</h1>
	<br>
	<nav>
		{#if pagesCount > 1}
			<ul class="pagination">
				{#each Array(pagesCount) as _, i}
					<li class="page-item">
						<a href="/products?skip={i * limit}" class="page-link">{i + 1}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</nav>
	<div class="flex-wrapper">
		{#each data.products as product}
			<Product on:buy={buyProductHandle} {product} />
		{/each}
	</div>
</section>
