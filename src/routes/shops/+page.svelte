<script lang="ts">
	import { tooltip } from '$lib';
	import Shop from '$lib/components/Shop.svelte';
	import SignedIn from '$lib/components/ui/SignedIn.svelte';
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
			<Shop {shop} />
		{/each}
	</div>
	<SignedIn let:currentUser>
		{#if currentUser.role === 'SELLER'}
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
