<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import BuyModal from '$lib/components/ui/BuyModal.svelte';
	import { showModalStore } from '$lib/stores';
	import type { PageData } from './$types';
	import type Prisma from '@prisma/client';

	let product: Prisma.Product | null = null;

	function buyProductHandle(e: CustomEvent) {
		product = e.detail.product;
		if (product) modalStore.showModal();
	}

	const modalStore = showModalStore();

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
			<Product on:buy={buyProductHandle} {product} />
		{/each}
	</div>
</section>
