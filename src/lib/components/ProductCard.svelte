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

<div class="card p-3 border-5 rounded-5" style="max-width: 540px;">
	<div class="row g-0">
		<div class="col-md-4">
			<img src={product.imageUrl} alt={product.name} class="img-fluid rounded-start" />
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title fw-bold">{product.name}</h5>
				<p class="card-text">{product.description}</p>
				<p class="card-text">
					{fmt.format(product.price)}
					<br />
				</p>
				<div class="tag-group">
					<span class="tag">#{product.tag.title}</span>
				</div>
				<SignedIn>
					<div>
						{#if state === ProductState.BUYING}
							<form
								action="/shops/{product.shopId}/buy"
								method="post"
								class="row g-3"
								use:enhance={() => async () => await goto('/cart')}
							>
								<input type="hidden" name="id" value={product.id} />
								<div class="col-6">
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
								<div class="col-4">
									<button type="submit" class="button green" use:tooltip={{ text: 'Confirmar' }}>
										<i class="fa fa-cart-shopping" />
									</button>
									<button
										class="button salmon"
										on:click={() => (state = ProductState.VIEWING)}
										use:tooltip={{ text: 'Cancelar' }}
									>
										<i class="fa fa-cancel" />
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
	</div>
</div>
