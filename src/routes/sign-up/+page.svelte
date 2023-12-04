<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { createUserStore, delay, rolesMap } from '$lib';
	import type { ActionData, SubmitFunction } from './$types';
	import { UserRole } from '@prisma/client';

	const user = createUserStore();

	const registerSubmit: SubmitFunction =
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
	<title>Marilandense | {$user ? 'Atualizar' : 'Cadastrar'}</title>
</svelte:head>

<section class="container">
	<h2>{$user ? 'Atualizar' : 'Cadastrar'}</h2>
	<form method="post" class="row g-3" use:enhance={registerSubmit}>
		<div class="col-6">
			<label for="email">Email</label>
			<input type="text" name="email" id="email" class="form-control" value={$user?.email ?? ''} />
		</div>
		<div class="col-6">
			<label for="name">Nome</label>
			<input type="text" name="name" id="name" class="form-control" value={$user?.name ?? ''} />
		</div>
		<div class="col-6">
			<label for="phone">Telefone</label>
			<input type="tel" name="phone" id="phone" class="form-control" value={$user?.phone ?? ''} />
		</div>
		<div class="col-6">
			<label for="role">Função</label>
			<select name="role" id="role" class="form-control" value={$user?.role ?? UserRole.CUSTOMER}>
				{#each rolesMap as [key, name]}
					<option value={key} disabled={key === 'ADMIN'}>{name}</option>
				{/each}
			</select>
		</div>
		<div class="col-12">
			<label for="email">Endereço</label>
			<input
				type="text"
				name="address"
				id="address"
				class="form-control"
				value={$user?.address ?? ''}
			/>
		</div>
		{#if $user}
			<div class="col-12">
				<div class="alert alert-danger">
					Caso não queira atualizar sua senha, deixe os próximos dois campos em branco!
				</div>
			</div>
		{/if}
		<div class="col-6">
			<label for="password">Senha</label>
			<input type="password" name="password" id="password" class="form-control" />
		</div>
		<div class="col-6">
			<label for="password">Confirmar senha</label>
			<input type="password" name="confirmPassword" id="confirmPassword" class="form-control" />
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
