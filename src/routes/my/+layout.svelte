<script>
	import { tooltip } from '$lib';
	import SignedIn from '$lib/components/SignedIn.svelte';

	export let data;
</script>

<ul class="nav container">
	<li class="nav-item"><a href="/my" class="nav-link">Conta</a></li>
	{#each data.shops as shop}
		<li class="nav-item"><a href="/my/{shop.id}" class="nav-link">{shop.name}</a></li>
	{/each}
	<SignedIn let:user>
		{#if user.role === 'SELLER'}
			<a href="/shops/new" use:tooltip={{ text: 'Adicionar Loja' }} class="button blue">
				<i class="fa fa-add" />
			</a>
		{/if}
	</SignedIn>
</ul>

<section class="container">
	<slot />
</section>
