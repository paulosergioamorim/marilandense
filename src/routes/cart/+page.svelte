<script lang="ts">
	import type { PageData } from './$types';
	import OrderCard from './OrderCard.svelte';

	export let data: PageData;

	$: cart = data.orders.filter((order) => order.status === 'PENDING');
	$: history = data.orders.filter((order) => order.status !== 'PENDING');
</script>

<svelte:head>
	<title>Marilandense | Carrinho</title>
</svelte:head>

<section class="container">
	<h2 class="text-center">Carrinho</h2>
	<div class="d-flex justify-content-center gap-5">
		{#each cart as order}
			<OrderCard {order} />
		{/each}
	</div>
	<h2 class="text-center">Histórico</h2>
	<div class="d-flex justify-content-center gap-5">
		{#each history as order}
			<OrderCard {order} />
		{/each}
	</div>
</section>
