<script lang="ts">
	import { ProductCard } from '$lib/components';
	import type { PageData } from './$types';
	import type { Product } from '@prisma/client';

	export let data: PageData;
</script>

<svelte:head><title>Marilandense</title></svelte:head>

<section class="container">
	<img class="img-fluid rounded-4 mb-3" src="/banner.png" alt="" />

	<p class="fw-semibold text-center display-6 mb-3">
		Conheça os produtores locais de Marilândia <br />
		Compre direto com quem produz! <br />
		Em destaque para você!
	</p>

	<div class="flex-wrapper">
		{#each data.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>
