<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay } from '$lib/utils';
	import type { ActionData, PageData } from './$types';

	$: update = $page.url.searchParams.has('update');

	export let data: PageData;
	export let form: ActionData;
</script>

<section class="container">
	<h1>{update ? 'Atualizar' : 'Cadastrar'} loja</h1>
	<form
		method="post"
		use:enhance={() =>
			async ({ result }) => {
				await applyAction(result);
				if (result.type !== 'success') return;
				await delay(500);
				await goto(`/shops/${form?.shopId}`);
			}}
	>
		<div class="form-group mb-2">
			<label for="name">Nome</label>
			<input type="text" name="name" id="name" class="form-control" value={data.shop?.name ?? ''} />
		</div>
		<div class="form-group mb-2">
			<label for="description">Descrição</label>
			<input
				type="text"
				name="description"
				id="description"
				class="form-control"
				value={data.shop?.description ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="address">Endereço</label>
			<input
				type="text"
				name="address"
				id="address"
				class="form-control"
				value={data.shop?.address ?? data.currentUser?.address ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			{#each data.tags as tag}
				<div class="form-check">
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
		<div class="form-group mb-2">
			<input type="submit" value="Enviar" class="btn btn-primary" />
			<a href="/shops" class="btn btn-outline-danger">Cancelar</a>
		</div>
	</form>
	<hr />
	{#if form?.message}
		<div class="alert alert-{form.success ? 'success' : 'danger'}">
			{form.message}
		</div>
	{/if}
</section>
