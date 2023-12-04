<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { delay } from '$lib';
	import type { ActionData, SubmitFunction } from './$types';

	const loginSubmit: SubmitFunction =
		() =>
		async ({ result }) => {
			await applyAction(result);
			if (result.type !== 'success') return;
			await delay(500);
			await goto('/', { invalidateAll: true });
		};

	export let form: ActionData;
</script>

<svelte:head>
	<title>Marilandense | Entrar</title>
</svelte:head>

<section class="container">
	<h2>Entrar</h2>
	<form method="post" class="row g-3" use:enhance={loginSubmit}>
		<div class="col-12">
			<label for="email">Email</label>
			<input type="text" name="email" id="email" class="form-control" />
		</div>
		<div class="col-12">
			<label for="password">Senha</label>
			<input type="password" name="password" id="password" class="form-control" />
		</div>
		<div class="col-12">
			<div class="button-group">
				<input type="submit" value="Enviar" class="button green" />
				<input
					type="button"
					value="Cancelar"
					class="button salmon"
					on:click={() => history.back()}
				/>
			</div>
		</div>
	</form>
	{#if form?.message}
		<hr />
		<div class="alert alert-{form.success ? 'success' : 'danger'}">
			{form.message}
		</div>
	{/if}
</section>
