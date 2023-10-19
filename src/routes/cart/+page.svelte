<script lang="ts">
	import Order from '$lib/components/Order.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<div class="d-flex justify-content-center gap-5">
		{#each data.orders as order}
			<Order {order} />
		{/each}
	</div>
</section>
