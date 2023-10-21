<script lang="ts">
	import type Prisma from '@prisma/client';
	import SignedIn from './ui/SignedIn.svelte';
	import Tag from './Tag.svelte';
	import IsOwner from './ui/IsOwner.svelte';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { tooltip } from '$lib/utils';

	const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

	const dispatch = createEventDispatcher();

	function buyClick() {
		dispatch('buy', { product });
	}

	export let product: Prisma.Product & { tag: Prisma.Tag };
</script>

<div class="product">
	<span class="product-avaliable">{product.avaliable}</span>
	<img src={product.imageUrl} alt={product.name} class="product-image" />
	<div class="product-body">
		<h5 class="product-name">{product.name}</h5>
		<p class="product-description">{product.description}</p>
		<p class="product-price">{fmt.format(product.price)}</p>
		<div class="tag-group">
			<Tag tag={product.tag} />
		</div>
		<div class="button-group">
			<SignedIn>
				{#if product.avaliable > 0}
					<button use:tooltip={'Adicionar ao carrinho'} on:click={buyClick} class="button green"
						><i class="fa fa-cart-shopping" /></button
					>
				{/if}
			</SignedIn>
			<IsOwner>
				<a
					href="/shops/{product.shopId}/products/new?update=${product.id}"
					use:tooltip={'Editar produto'}
					class="button blue"
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
						return async () => await invalidate('products');
					}}
				>
					<button
						use:tooltip={'Excluir produto'}
						formaction="?/deleteProduct"
						type="submit"
						class="button salmon"><i class="fa fa-trash" /></button
					>
				</form>
			</IsOwner>
		</div>
	</div>
</div>

<style>
	.product {
		display: flex;
		flex-direction: column;
		border: 4px var(--gray) solid;
		border-radius: 24px;
		overflow: visible;
		position: relative;
		width: clamp(25%, 300px, 100% - 1rem);
	}

	.product-image {
		border-radius: 20px 20px 0 0;
	}

	.product-body {
		display: flex;
		flex-direction: column;
		padding: 12px;
	}

	.product-name {
		font-size: 20px;
		font-weight: 600;
	}

	.product-avaliable {
		background-color: #000;
		position: absolute;
		top: -0.75rem;
		right: -0.75rem;
		color: white;
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}

	.button-group {
		margin-top: auto;
	}
</style>
