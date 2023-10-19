<script lang="ts">
	import type Prisma from '@prisma/client';
	import { getContext } from 'svelte';
	import SignedIn from './SignedIn.svelte';
	import SignedOut from './SignedOut.svelte';

	const shop = getContext<Prisma.Shop | null>('shop');
</script>

<SignedIn let:currentUser>
	{#if currentUser.id !== shop?.userId}
		<slot />
	{/if}
</SignedIn>

<SignedOut>
	<slot />
</SignedOut>
