<script lang="ts">
	import { createUserStore } from '$lib/stores';
	import type { User } from '@prisma/client';

	interface $$Slots {
		default: {
			user: User;
			signOut(): Promise<void>;
		};
	}

	const user = createUserStore();
</script>

{#if $user}
	<slot user={$user} signOut={user.signOut} />
{/if}
