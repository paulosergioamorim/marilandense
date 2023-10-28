<script lang="ts">
	import { createUserStore } from '$lib/stores';
	import type { User } from '@prisma/client';

	const user = createUserStore();

	interface $$Slots {
		default: {
			user: User;
			signOut(): Promise<void>;
		};
	}
</script>

{#if $user}
	<slot user={$user} signOut={user.signOut} />
{/if}
