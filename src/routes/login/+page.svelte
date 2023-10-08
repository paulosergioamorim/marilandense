<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay } from '$lib/utils';
	import type { ActionData } from './$types';

	$: redirectTo = $page.url.searchParams.get('redirectTo') ?? '/';

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
				await goto(redirectTo, { invalidateAll: true });
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
		<div class="form-group mb-2">
			<input type="submit" value="Enviar" class="btn btn-primary" />
			<a href={redirectTo} class="btn btn-outline-danger">Cancelar</a>
		</div>
	</form>
	<hr />
	{#if form?.message}
		<div class="alert alert-{form.success ? 'success' : 'danger'}">
			{form.message}
		</div>
	{/if}
</section>
