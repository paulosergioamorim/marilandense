<script lang="ts">
	import type { Product, Tag } from '@prisma/client';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { fmt, tooltip } from '$lib';
	import { SignedIn } from '.';

	enum ProductState {
		VIEWING,
		BUYING
	}

	let state = ProductState.VIEWING;

	export let product: Product & { tag: Tag };
</script>

<div class="product-wrapper">
	<span use:tooltip={{ text: 'Estoque' }} class="product-avaliable">{product.avaliable}</span>
	<div class="img-wrapper">
		<img src={product.imageUrl} alt={product.name} />
	</div>
	<div class="product-body">
		<div class="product-name">{product.name}</div>
		<div>{product.description} <br /> {fmt.format(product.price)}</div>
		<div class="tag-group"><span class="tag">#{product.tag.title}</span></div>
		<SignedIn>
			<div class="button-group">
				{#if state === ProductState.BUYING}
					<form
						action="/shops/{product.shopId}/buy"
						method="post"
						class="row g-3"
						use:enhance={() => async () => await goto('/cart')}
					>
						<input type="hidden" name="id" value={product.id} />
						<div class="col-5">
							<input
								type="number"
								name="amount"
								id="amount"
								class="form-control"
								min="1"
								max={product.avaliable}
								value="1"
							/>
						</div>
						<div class="col-5">
							<button type="submit" class="button green" use:tooltip={{ text: 'Confirmar' }}>
								<i class="fa fa-cart-shopping" />
							</button>
							<button
								class="button salmon"
								on:click={() => (state = ProductState.VIEWING)}
								use:tooltip={{ text: 'Cancelar' }}
							>
								<i class="fa fa-x" />
							</button>
						</div>
					</form>
				{:else}
					<button
						class="button green"
						on:click={() => (state = ProductState.BUYING)}
						use:tooltip={{ text: 'Adicionar ao carrinho' }}
					>
						<i class="fa fa-cart-shopping" />
					</button>
				{/if}
			</div>
		</SignedIn>
	</div>
</div>

<style>
	.product-wrapper {
		display: flex;
		border: 4px var(--gray) solid;
		border-radius: 24px;
		overflow: visible;
		position: relative;
		max-width: 540px;
	}

	.img-wrapper img {
		border-radius: 20px 0 0 20px;
	}

	.product-body {
		display: flex;
		flex-direction: column;
		padding: 12px;
	}

	.product-name {
		font-size: 24px;
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
</style>
