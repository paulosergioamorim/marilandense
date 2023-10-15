<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if !$page.data.currentUser}
	<slot />
{/if}
