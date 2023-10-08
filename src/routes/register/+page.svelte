<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay, rolesMap } from '$lib/utils';
	import type { ActionData } from './$types';

	$: currentUser = $page.data.currentUser;
	$: redirectTo = $page.url.searchParams.get('redirectTo') ?? '/';
	$: update = $page.url.searchParams.has('update');

	export let form: ActionData;
</script>

<section class="container">
	<h1>{update ? 'Atualizar' : 'Registrar'}</h1>
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
			<input
				type="text"
				name="email"
				id="email"
				class="form-control"
				value={currentUser?.email ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="name">Nome</label>
			<input
				type="text"
				name="name"
				id="name"
				class="form-control"
				value={currentUser?.name ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="phone">Telefone</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				class="form-control"
				value={currentUser?.phone ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="email">Endereço</label>
			<input
				type="text"
				name="address"
				id="address"
				class="form-control"
				value={currentUser?.address ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="role">Função</label>
			<select name="role" id="role" class="form-control" value={currentUser?.role}>
				{#each rolesMap as [key, name]}
					<option value={key} disabled={key === 'ADMIN'}>{name}</option>
				{/each}
			</select>
		</div>
		<div class="form-group mb-2">
			<label for="password">Senha</label>
			<input type="password" name="password" id="password" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<label for="password">Confirmar senha</label>
			<input type="password" name="confirmPassword" id="confirmPassword" class="form-control" />
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
