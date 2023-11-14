<script lang="ts">
	import type { PageData } from './$types';
	import OrderCard from './OrderCard.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Marilandense | Carrinho</title>
</svelte:head>

<section class="container">
	<h2 class="text-center">Carrinho</h2>
	<div class="d-flex justify-content-center gap-5">
		{#each data.orders as order}
			<OrderCard {order} />
		{/each}
	</div>
</section>
