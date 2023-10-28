<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { delay } from '$lib';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	$: update = $page.url.searchParams.has('update');

	const createShopSubmit: SubmitFunction = async () => {
		return async ({ result }) => {
			await applyAction(result);
			if (result.type !== 'success') return;
			await delay(500);
			history.back();
		};
	};

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Marilandense | Cadastrar loja</title>
</svelte:head>

<section class="container">
	<h2>{update ? 'Atualizar' : 'Cadastrar'} loja</h2>
	<form method="post" class="row g-3" use:enhance={createShopSubmit}>
		<div class="col-6">
			<label for="name">Nome</label>
			<input type="text" name="name" id="name" class="form-control" value={data.shop?.name ?? ''} />
		</div>
		<div class="col-6">
			<label for="description">Descrição</label>
			<input
				type="text"
				name="description"
				id="description"
				class="form-control"
				value={data.shop?.description ?? ''}
			/>
		</div>
		<div class="col-12">
			<label for="address">Endereço</label>
			<input
				type="text"
				name="address"
				id="address"
				class="form-control"
				value={data.shop?.address ?? data.user?.address ?? ''}
			/>
		</div>
		<div class="col-12">
			{#each data.tags as tag}
				<div class="form-check form-check-inline">
					<input
						type="checkbox"
						name="tags"
						class="form-check-input"
						checked={data.shop?.tags.some((t) => t.id === tag.id)}
						value={tag.id}
					/>
					<label for="tags">{tag.title}</label>
				</div>
			{/each}
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
