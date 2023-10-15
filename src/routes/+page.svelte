<script lang="ts">
	import { goto } from '$app/navigation';
	import Product from '$lib/components/Product.svelte';
	import type { PageData } from './$types';

	async function buyProductHandle(e: CustomEvent) {
		await goto(`/shops/${e.detail.product.shopId}`);
	}

	export let data: PageData;
</script>

<section class="container">
	<img class="img-fluid rounded-4 mb-3" src="/banner.png" alt="" />

	<p class="fw-semibold text-center display-6 mb-3">
		Conheça os produtores locais de Marilândia <br />
		Compre direto com quem produz! <br />
		Em destaque para você!
	</p>

	<div class="flex-wrapper">
		{#each data.products as product}
			<Product on:buy={buyProductHandle} {product} />
		{/each}
	</div>
</section>
