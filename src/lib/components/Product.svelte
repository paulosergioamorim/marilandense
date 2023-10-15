<script lang="ts">
	import type Prisma from '@prisma/client';
	import SignedIn from './ui/SignedIn.svelte';
	import Tag from './Tag.svelte';
	import { createEventDispatcher } from 'svelte';
	import IsOwner from './ui/IsOwner.svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

	const dispatch = createEventDispatcher();

	function buyProduct() {
		dispatch('buy', { product });
	}

	export let product: Prisma.Product & { tag: Prisma.Tag };
</script>

<div class="product-card">
	<span class="rounded-circle">{product.avaliable}</span>
	<img src={product.imageUrl} alt={product.name} class="product-image" />
	<div class="product-content">
		<h5 class="product-name">{product.name}</h5>
		<p class="card-text">
			{product.description}
			{fmt.format(product.price)}
		</p>
		<div class="tag-group">
			<Tag tag={product.tag} />
		</div>
		<br />
		<div class="button-group">
			<SignedIn>
				<button on:click={buyProduct} class="button green">
					<i class="fa fa-cart-shopping" />
				</button>
			</SignedIn>
			<IsOwner>
				<a href="/shops/{product.shopId}/products/new?update={product.id}" class="button blue">
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
							await invalidate('products');
						};
					}}
				>
					<button formaction="?/deleteProduct" type="submit" class="button salmon">
						<i class="fa fa-trash" />
					</button>
				</form>
			</IsOwner>
		</div>
	</div>
</div>

<style>
	.product-card {
		display: flex;
		border: 4px var(--gray) solid;
		border-radius: 24px;
		overflow: visible;
		position: relative;
	}

	@media screen and (width <= 728px) {
		.product-card {
			flex-direction: column;
			width: calc(100% - 1rem);
		}

		.product-image {
			border-radius: 20px 20px 0 0 !important;
		}
	}

	.product-name {
		font-size: 20px;
		font-weight: 600;
	}

	.product-image {
		border-radius: 20px 0 0 20px;
	}

	.product-content {
		font-size: 14px;
		padding: 12px;
		max-width: 200px;
	}

	.product-card span {
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
	}
</style>
