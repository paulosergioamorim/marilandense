<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import Product from '$lib/components/Product.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import IsOwner from '$lib/components/ui/IsOwner.svelte';
	import type Prisma from '@prisma/client';
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import IsNotOwner from '$lib/components/ui/IsNotOwner.svelte';
	import { link, tooltip } from '$lib/utils';
	import BuyModal from '$lib/components/ui/BuyModal.svelte';

	let product: Prisma.Product | null = null;

	function buyProductHandle(e: CustomEvent) {
		product = e.detail.product;
		if (product) showModal = true;
	}

	let showModal = false;

	export let data: PageData;

	setContext('shop', data.shop);
</script>

<BuyModal bind:showModal {product} />

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
		<button
			use:tooltip={'Adicionar produto'}
			use:link={`/shops/${data.shop.id}/products/new`}
			class="button blue"
		>
			<i class="fa fa-add" />
		</button>
		<button
			use:tooltip={'Editar loja'}
			use:link={`/shops/new?update=${data.shop.id}`}
			class="button green"
		>
			<i class="fa fa-edit" />
		</button>
	</div>
</IsOwner>

<style>
	.button-group {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
