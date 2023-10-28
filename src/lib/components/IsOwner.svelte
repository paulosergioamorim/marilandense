<script lang="ts">
	import type { Shop } from '@prisma/client';
	import { getContext } from 'svelte';
	import SignedIn from './SignedIn.svelte';

	const shop = getContext<Shop | null>('shop');
</script>

<SignedIn let:user>
	{#if user.id === shop?.userId}
		<slot />
	{/if}
</SignedIn>
