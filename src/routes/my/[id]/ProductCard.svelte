<script lang="ts">
	import { enhance } from '$app/forms';
	import { fmt, tooltip } from '$lib';
	import type { Product, Tag } from '@prisma/client';

	export let product: Product & { tag: Tag };
</script>

<div class="product-wrapper">
	<span use:tooltip={{ text: 'Estoque' }} class="product-avaliable">{product.avaliable}</span>
	<div class="img-wrapper">
		<img src={product.imageUrl} alt={product.name} />
	</div>
	<div class="product-body">
		<div class="product-name">{product.name}</div>
		<p>{product.description} <br /> {fmt.format(product.price)}</p>
		<div class="tag-group"><span class="tag">#{product.tag.title}</span></div>
		<div class="button-group">
			<a
				href="/my/{product.shopId}/products/new?update={product.id}"
				class="button green"
				use:tooltip={{ text: 'Atualizar produto' }}
			>
				<i class="fa fa-edit" />
			</a>
			<form action="?/deleteProduct" method="post" use:enhance>
				<input type="hidden" name="id" value={product.id} />
				<button type="submit" class="button salmon">
					<i class="fa fa-trash" />
				</button>
			</form>
		</div>
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
