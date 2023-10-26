<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { User } from '@prisma/client';

	async function signOut() {
		const res = await fetch('/logout', { method: 'post' });

		if (res.ok) await goto('/', { invalidateAll: true });
	}

	async function deleteUser() {
		if (!confirm('Tem certeza que deseja excluir sua conta?')) return false;

		const res = await fetch('/logout', { method: 'delete' });

		if (res.ok) await goto('/', { invalidateAll: true });
		else {
			// in the future, this will be an main alert message
			const { message } = await res.json();
			alert(message);
		}

		return res.ok;
	}

	interface $$Slots {
		default: {
			currentUser: User;
			signOut(): Promise<void>;
			deleteUser(): Promise<boolean>;
		};
	}
</script>

{#if $page.data.currentUser}
	<slot currentUser={$page.data.currentUser} {signOut} {deleteUser} />
{/if}
