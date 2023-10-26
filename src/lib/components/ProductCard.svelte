<script lang="ts">
	import type { Product, Tag } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { fmt, tooltip } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { IsOwner, SignedIn, TagTile } from '.';

	const dispatch = createEventDispatcher();

	function buyClick() {
		dispatch('buy', { product });
	}

	const deleteProductSubmit: SubmitFunction = ({ cancel }) => {
		if (!confirm('Tem certeza que deseja excluir esse produto?')) return cancel();
		return async () => await invalidate('products');
	};

	export let product: Product & { tag: Tag };
</script>

<div class="product-card">
	<span class="product-avaliable">{product.avaliable}</span>
	<img src={product.imageUrl} alt={product.name} class="product-image" />
	<div class="product-body">
		<h5 class="product-name">{product.name}</h5>
		<p class="product-description">{product.description}</p>
		<div class="product-price">{fmt.format(product.price)}</div>
		<div class="tag-group">
			<TagTile tag={product.tag} />
		</div>
		<div class="button-group">
			<SignedIn>
				{#if product.avaliable > 0}
					<button
						use:tooltip={{ text: 'Adicionar ao carrinho' }}
						on:click={buyClick}
						class="button green"><i class="fa fa-cart-shopping" /></button
					>
				{/if}
			</SignedIn>
			<IsOwner>
				<a
					href="/shops/{product.shopId}/products/new?update={product.id}"
					use:tooltip={{ text: 'Editar produto' }}
					class="button blue"
				>
					<i class="fa fa-edit" />
				</a>
				<form
					action="?/deleteProduct"
					method="post"
					class="d-inline"
					use:enhance={deleteProductSubmit}
				>
					<input type="hidden" name="id" value={product.id} />
					<button
						use:tooltip={{ text: 'Excluir produto' }}
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
	.product-card {
		display: flex;
		flex-direction: column;
		border: 4px var(--gray) solid;
		border-radius: 24px;
		overflow: visible;
		position: relative;
		width: 250px;
		height: 500px;
	}

	@media screen and (width <= 578px) {
		.product-card {
			width: calc(100% - 1rem);
		}
	}

	.product-image {
		border-radius: 20px 20px 0 0;
	}

	.product-body {
		display: flex;
		flex-direction: column;
		padding: 12px;
		height: 100%;
	}

	.product-description {
		font-size: 0.8rem;
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
