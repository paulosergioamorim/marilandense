<script lang="ts">
	import { Navbar } from '$lib/components';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => import('bootstrap'));
</script>

<header>
	<Navbar />
</header>

<main>
	<slot />
</main>
