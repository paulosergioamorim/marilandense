<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import BuyModal from '$lib/components/ui/BuyModal.svelte';
	import type { PageData } from './$types';
	import type Prisma from '@prisma/client';

	let product: Prisma.Product | null = null;

	function buyProductHandle(e: CustomEvent) {
		product = e.detail.product;
		if (product) showModal = true;
	}

	let showModal = false;

	export let data: PageData;

	const limit = 10;
	const pagesCount = Math.ceil(data.count / limit);
</script>

<BuyModal bind:showModal {product} />

<section class="container">
	<h2 class="text-center">Produtos</h2>
	<br />
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
