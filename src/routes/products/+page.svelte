<script lang="ts">
	import { ProductCard } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;

	const limit = 10;
	const pagesCount = Math.ceil(data.count / limit);
</script>

<svelte:head>
	<title>Marilandense | Produtos</title>
</svelte:head>

<section class="container">
	<h2 class="text-center">Produtos</h2>
	<div class="row">
		<div class="col-4">
			<form action="/products" method="get" class="row g-3">
				<div class="col">
					<input type="text" name="tag" id="tag" class="form-control" placeholder="Categoria" />
				</div>
				<div class="col">
					<input type="submit" value="Filtrar" class="button green" />
				</div>
			</form>
		</div>
		<nav class="col">
			<ul class="pagination">
				{#each Array(pagesCount) as _, i}
					<li class="page-item">
						<a href="/products?skip={i * limit}" class="page-link">{i + 1}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="flex-wrapper">
		{#each data.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>
