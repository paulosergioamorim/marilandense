<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay } from '$lib/utils';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<section class="container">
	<h1>Entrar</h1>
	<form
		method="post"
		use:enhance={() =>
			async ({ result }) => {
				await applyAction(result);
				if (result.type !== 'success') return;
				await delay(500);
				await invalidateAll();
				history.back();
			}}
	>
		<div class="form-group mb-2">
			<label for="email">Email</label>
			<input type="text" name="email" id="email" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<label for="password">Senha</label>
			<input type="password" name="password" id="password" class="form-control" />
		</div>
		<div class="button-group mb-2">
			<input type="submit" value="Enviar" class="button green" />
			<input
				type="button"
				value="Cancelar"
				class="button salmon"
				on:click={() => history.back()}
			/>
		</div>
	</form>
	{#if form?.message}
		<hr />
		<div class="alert alert-{form.success ? 'success' : 'danger'}">
			{form.message}
		</div>
	{/if}
</section>
