<script lang="ts">
	import SignedIn from '$lib/components/SignedIn.svelte';
</script>

<SignedIn let:currentUser>
	<h2>Olá, {currentUser?.name}</h2>
</SignedIn>
