<script lang="ts">
	import { tooltip } from '$lib';
	import { ShopCard, SignedIn } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Marilandense | Lojas</title>
</svelte:head>

<section class="container">
	<h2 class="text-center">Lojas</h2>
	<br />
	<div class="flex-wrapper">
		{#each data.shops as shop}
			<ShopCard {shop} />
		{/each}
	</div>
	<SignedIn let:user>
		{#if user.role === 'SELLER'}
			<a href="/shops/new" use:tooltip={{ text: 'Adicionar Loja' }} class="button blue">
				<i class="fa fa-add" />
			</a>
		{/if}
	</SignedIn>
</section>

<style>
	.button.blue {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
