<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { User } from '@prisma/client';

	async function signOut() {
		const res = await fetch('/logout', { method: 'post' });
		if (res.ok) await goto('/', { invalidateAll: true });
	}

	interface $$Slots {
		default: {
			currentUser: User;
			signOut(): Promise<void>;
		};
	}
</script>

{#if $page.data.currentUser}
	<slot currentUser={$page.data.currentUser} {signOut} />
{/if}
