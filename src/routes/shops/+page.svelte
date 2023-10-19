<script lang="ts">
	import Shop from '$lib/components/Shop.svelte';
	import SignedIn from '$lib/components/ui/SignedIn.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<h2 class="text-center">Lojas</h2>
	<br>
	<div class="flex-wrapper">
		{#each data.shops as shop}
			<Shop {shop} />
		{/each}
	</div>
	<SignedIn let:currentUser>
		{#if currentUser.role === 'SELLER'}
			<a href="/shops/new" class="button pink">Criar loja</a>
		{/if}
	</SignedIn>
</section>

<style>
	a[href='/shops/new'] {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
