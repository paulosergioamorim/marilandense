<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import IsOwner from '$lib/components/ui/IsOwner.svelte';
	import type Prisma from '@prisma/client';
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import IsNotOwner from '$lib/components/ui/IsNotOwner.svelte';
	import BuyModal from '$lib/components/ui/BuyModal.svelte';
	import { createModalStore } from '$lib/stores';
	import { tooltip } from '$lib';

	let product: Prisma.Product | null = null;

	function buyProductHandle(e: CustomEvent) {
		product = e.detail.product;
		if (product) modalStore.showModal();
	}

	const modalStore = createModalStore();

	export let data: PageData;

	setContext('shop', data.shop);
</script>

<svelte:head>
	<title>Marilandense | Fazenda {data.shop.name}</title>
</svelte:head>

<BuyModal {modalStore} {product} />

<section class="container mb-3">
	<h2 class="text-center">
		<IsOwner>Meus produtos</IsOwner>
		<IsNotOwner>
			Produtos de {data.shop.name}
		</IsNotOwner>
	</h2>
	<br />
	<div class="flex-wrapper">
		{#each data.shop.products as product}
			<Product {product} on:buy={buyProductHandle} />
		{/each}
	</div>
</section>

<IsOwner>
	<div class="button-group">
		<a
			use:tooltip={{ text: 'Adicionar produto' }}
			href="/shops/{data.shop.id}/products/new"
			class="button blue"
		>
			<i class="fa fa-add" />
		</a>
		<a
			use:tooltip={{ text: 'Editar loja' }}
			href="/shops/new?update={data.shop.id}"
			class="button green"
		>
			<i class="fa fa-edit" />
		</a>
	</div>
</IsOwner>

<style>
	.button-group {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
