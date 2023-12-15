<script>
	export let data;
</script>

<ul class="nav container">
	<li class="nav-item"><a href="/my" class="nav-link">Conta</a></li>
	{#each data.shops as shop}
		<li class="nav-item"><a href="/my/{shop.id}" class="nav-link">{shop.name}</a></li>
	{/each}
</ul>

<section class="container">
	<slot />
</section>
