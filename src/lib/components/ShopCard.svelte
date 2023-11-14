<script lang="ts">
	import type { Shop, Tag } from '@prisma/client';
	import { page } from '$app/stores';

	export let shop: Shop & { tags: Tag[] };
</script>

<div class="shop-card">
	<div class="shop-name">{shop.name}</div>
	<p class="card-text">
		Descrição: {shop.description} <br />
		Endereço: {shop.address} <br />
	</p>
	<div class="tag-group">
		{#each shop.tags as tag}
			<span class="tag">#{tag.title}</span>
		{/each}
	</div>
	<br />
	<a href="/shops/{shop.id}" class="see-products"
		>Ver {$page.data.currentUser?.id === shop.userId ? 'meus ' : ''} produtos</a
	>
</div>

<style>
	.shop-card {
		border: 4px var(--gray) solid;
		padding: 24px;
		border-radius: 24px;
		overflow: visible;
		max-width: 300px;
	}

	.shop-name {
		font-size: 20px;
		font-weight: 600;
	}

	.see-products {
		color: white;
		background-color: var(--blue);
		text-decoration: none;
		padding: 6px 12px;
		border-radius: 20px;
		font-weight: 600;
	}
</style>
