<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if !$page.data.user}
	<slot />
{/if}
