<script>
	import { enhance } from '$app/forms';
	import { fmt, shopStatusMap, tooltip } from '$lib';
	import OrderCard from './OrderCard.svelte';
	import ProductCard from './ProductCard.svelte';

	export let data;
</script>

<section class="container mb-3" id="products">
	<h2 class="text-center">Meus produtos</h2>
	<br />
	<div class="flex-wrapper">
		{#each data.shop.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<section class="container mb-3" id="sales">
	<h2 class="text-center">Minhas vendas</h2>
	<br />
	<div class="flex-wrapper">
		{#each data.shop.products as product}
			{#each product.orders as order}
				<OrderCard order={{ product, ...order }} />
			{/each}
		{/each}
	</div>
</section>

<div id="status">
	<span class="tag">{shopStatusMap.get(data.shop.status)}</span>
</div>

<div class="button-group">
	<a
		use:tooltip={{ text: 'Adicionar produto' }}
		href="/my/{data.shop.id}/products/new"
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
