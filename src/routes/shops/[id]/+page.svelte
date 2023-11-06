<script lang="ts">
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { tooltip, createModalStore } from '$lib';
	import { BuyModal, IsNotOwner, IsOwner, ProductCard, OrderCard } from '$lib/components';
	import type { Product } from '@prisma/client';
	import StatusTile from '$lib/components/StatusTile.svelte';

	let product: Product | null = null;

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

<section class="container mb-3" id="products">
	<h2 class="text-center">
		<IsOwner>Meus produtos</IsOwner>
		<IsNotOwner>
			Produtos de {data.shop.name}
		</IsNotOwner>
	</h2>
	<br />
	<div class="flex-wrapper">
		{#each data.shop.products as product}
			<ProductCard {product} on:buy={buyProductHandle} />
		{/each}
	</div>
</section>

<IsOwner>
	<section class="container mb-3" id="sales">
		<h2 class="text-center">Minhas vendas</h2>
		<br />
		<div class="flex-wrapper">
			{#each data.orders ?? [] as order}
				<OrderCard {order} />
			{/each}
		</div>
	</section>

	<div id="status">
		<StatusTile status={data.shop.status} />
	</div>
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
	#status {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}

	.button-group {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
