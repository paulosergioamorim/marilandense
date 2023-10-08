<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import SignedIn from '$lib/components/SignedIn.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<img class="img-fluid rounded-4 mb-3" src="/banner.png" alt="" />

	<p class="fw-semibold text-center display-6 mb-3">
		Conheça os produtores locais de Marilândia <br />
		Compre direto com quem produz! <br />
		Em destaque para você!
	</p>

	<div class="d-flex justify-content-center flex-wrap gap-5">
		{#each data.products as product}
			<Product {product} />
		{/each}
	</div>
</section>
