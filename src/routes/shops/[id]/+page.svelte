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

	let buyingProduct: Prisma.Product | null = null;
	let buyingAmount = 1;

	function buyProductHandle(e: CustomEvent) {
		buyingProduct = e.detail.product;
		buyingAmount = 1;
		if (buyingProduct) showBuyModal = true;
	}

	let showBuyModal = false;

	export let data: PageData;

	setContext('shop', data.shop);
</script>

<Modal let:hideModal on:close={() => (showBuyModal = false)} showModal={showBuyModal}>
	<form
		action="?/buyProduct"
		method="post"
		use:enhance={({ formData }) => {
			formData.append('id', String(buyingProduct?.id));
			return async () => {
				hideModal();
				await invalidate('products');
			};
		}}
	>
		<h2>Comprar {buyingProduct?.name}</h2>
		<div class="form-group mb-2">
			<label for="amount">Quantidade</label>
			<div class="button-group mt-2">
				<button
					disabled={buyingAmount === 1}
					type="button"
					class="button salmon"
					value="&minus;"
					on:click={() => buyingAmount--}
				>
					<i class="fa fa-minus" />
				</button>
				<input
					type="text"
					name="amount"
					id="amount"
					readonly
					class="form-control-plaintext text-center"
					style="width: 2rem"
					value={buyingAmount}
				/>
				<button
					disabled={buyingAmount >= Number(buyingProduct?.avaliable)}
					type="button"
					class="button blue"
					on:click={() => buyingAmount++}
				>
					<i class="fa fa-plus" />
				</button>
			</div>
		</div>
		<div class="form-group my-2">
			<button type="submit" class="button green">Comprar</button>
		</div>
	</form>
</Modal>

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
		<a href="/shops/{data.shop.id}/products/new" class="button pink">Adicionar produto</a>
		<a href="/shops/new?update={data.shop.id}" class="button pink">Atualizar loja</a>
	</div>
</IsOwner>

<style>
	.button-group {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
