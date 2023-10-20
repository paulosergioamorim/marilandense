<script lang="ts">
	import Shop from '$lib/components/Shop.svelte';
	import SignedIn from '$lib/components/ui/SignedIn.svelte';
	import { link, tooltip } from '$lib/utils';
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
			<button use:link={'/shops/new'} use:tooltip={'Adicionar loja'} class="button blue">
				<i class="fa fa-add"></i>
			</button>
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
