<script lang="ts">
	import type { Product, Tag } from '@prisma/client';
	import SignedIn from './SignedIn.svelte';
	import { page } from '$app/stores';
	import SignedOut from './SignedOut.svelte';

	const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

	export let product: Product & { tag: Tag; sales: { amount: number }[] };
</script>

<div class="card">
	<span class="rounded-circle bg-dark"
		>{product.avaliable - product.sales.reduce((acc, cur) => acc + cur.amount, 0)}</span
	>
	<img src={product.imageUrl} alt={product.name} class="card-img-top" />
	<div class="card-body">
		<h5 class="card-title">{product.name}</h5>
		<p class="card-text">
			{product.description} <br />
			{fmt.format(product.price)} <br />
			<span class="badge bg-primary">{product.tag.title}</span>
		</p>
	</div>
	<div class="card-footer">
		<SignedIn>
			{#if $page.url.pathname === `/shops/${product.shopId}`}
				<button on:click class="btn btn-link link-success">
					<i class="fa fa-cart-shopping" />
				</button>
			{:else}
				<a href="/shops/{product.shopId}" class="btn bnt-link link-success">
					<i class="fa fa-shop" />
				</a>
			{/if}
		</SignedIn>
		<slot />
		<SignedOut>
			<strong class="text-center">Faça <a href="/login">login</a> para comprar!</strong>
		</SignedOut>
	</div>
</div>

<style>
	.card {
		max-width: 300px;
	}

	.card span:first-child {
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
