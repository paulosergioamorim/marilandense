<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Product from '$lib/components/Product.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
	import type Prisma from '@prisma/client';
	import type { PageData } from './$types';

	let buyModal: HTMLDialogElement;
	let buyingProduct: Prisma.Product | null = null;
	let buyingAmount = 1;

	function buy(productId: string) {
		buyingProduct = data.shop.products.find((product) => product.id === productId) ?? null;
		if (buyingProduct) buyModal.showModal();
	}

	export let data: PageData;
</script>

<dialog bind:this={buyModal}>
	<form
		action="?/buyProduct"
		method="post"
		use:enhance={({ formData }) => {
			formData.append('id', String(buyingProduct?.id));
		}}
	>
		<div class="form-group mb-2">
			<button disabled={buyingAmount === 1} type="button" class="btn btn-link link-danger" on:click={() => buyingAmount--}>
				<i class="fa fa-minus" />
			</button>
			<span class="mx-3">{buyingAmount}</span>
			<button disabled={buyingAmount >= Number(buyingProduct?.avaliable)} type="button" class="btn btn-link link-success" on:click={() => buyingAmount++}>
				<i class="fa fa-plus" />
			</button>
		</div>
		<div class="form-group mb-2">
			<button type="submit" class="btn btn-success">Comprar</button>
		</div>
	</form>
</dialog>

<section class="container mb-3">
	<h2 class="mb-3">Informações da loja</h2>

	Descrição: {data.shop.description} <br />
	Endereço: {data.shop.address} <br />
	Categorias:
	{#each data.shop.tags as tag}
		<span class="badge bg-primary mx-1">{tag.title}</span>
	{/each}
</section>

<section class="container mb-3">
	<h2 class="mb-3">Informações do vendedor</h2>

	Nome: {data.shop.owner.name} <br />
	Telefone: {data.shop.owner.phone} <br />
	Email {data.shop.owner.email}
</section>

<SignedIn let:currentUser>
	{#if data.shop.userId === currentUser.id}
		<section class="container mb-3">
			<h2 class="mb-3">Administração da loja</h2>

			<a href="/shops/{data.shop.id}/products/new" class="btn btn-primary">Adicionar produto</a>
		</section>
	{/if}
</SignedIn>

<section class="container mb-3">
	<h2 class="mb-3">Produtos</h2>

	<div class="d-flex justify-content-center gap-5">
		{#each data.shop.products as product}
			<Product {product} on:click={() => buy(product.id)}>
				<SignedIn let:currentUser>
					{#if data.shop.userId === currentUser.id}
						<a
							href="/shops/{data.shop.id}/products/new?update={product.id}"
							class="btn btn-link link-secondary"
						>
							<i class="fa fa-edit" />
						</a>
						<form
							action="?/deleteProduct"
							method="post"
							class="d-inline"
							use:enhance={({ formData, cancel }) => {
								if (!confirm('Tem certeza que deseja excluir esse produto?')) return cancel();

								formData.append('id', product.id);

								return async () => {
									await invalidate($page.url.pathname);
								};
							}}
						>
							<button type="submit" class="btn btn-link link-danger">
								<i class="fa fa-trash" />
							</button>
						</form>
					{/if}
				</SignedIn>
			</Product>
		{:else}
			Essa loja não tem produtos
		{/each}
	</div>
</section>
