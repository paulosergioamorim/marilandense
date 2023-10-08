<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '@fontsource/montserrat';
	import '../app.css';

	// @ts-ignore
	onMount(() => import('bootstrap/dist/js/bootstrap.bundle'));
</script>

<header>
	<Navbar />
</header>
<main>
	<slot />
</main>
