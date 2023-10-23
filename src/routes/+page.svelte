<script lang="ts">
	import { BuyModal, ProductCard } from '$lib/components';
	import { createModalStore } from '$lib/stores';
	import type { PageData } from './$types';
	import type { Product } from '@prisma/client';

	let product: Product | null = null;

	function buyProductHandle(e: CustomEvent) {
		product = e.detail.product;
		if (product) modalStore.showModal();
	}

	const modalStore = createModalStore();

	export let data: PageData;
</script>

<svelte:head><title>Marilandense</title></svelte:head>

<BuyModal {modalStore} {product} />

<section class="container">
	<img class="img-fluid rounded-4 mb-3" src="/banner.png" alt="" />

	<p class="fw-semibold text-center display-6 mb-3">
		Conheça os produtores locais de Marilândia <br />
		Compre direto com quem produz! <br />
		Em destaque para você!
	</p>

	<div class="flex-wrapper">
		{#each data.products as product}
			<ProductCard on:buy={buyProductHandle} {product} />
		{/each}
	</div>
</section>
