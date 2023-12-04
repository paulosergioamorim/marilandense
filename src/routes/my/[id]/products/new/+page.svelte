<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay } from '$lib';
	import type { PageData, ActionData, SubmitFunction } from './$types';

	$: update = $page.url.searchParams.has('update');

	const createProductSubmit: SubmitFunction = async () => {
		return async ({ result }) => {
			await applyAction(result);
			if (result.type !== 'success') return;
			await delay(500);
			await invalidate('products');
			await goto('/my/' + $page.params.id);
		};
	};

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Marilandense | Adicionar produto</title>
</svelte:head>

<section class="container">
	<h2>{update ? 'Atualizar' : 'Cadastrar'} produto</h2>
	<form
		method="post"
		enctype="multipart/form-data"
		class="row g-3"
		use:enhance={createProductSubmit}
	>
		<div class="col-12">
			<label for="name">Nome</label>
			<input
				type="text"
				name="name"
				id="name"
				class="form-control"
				value={data.product?.name ?? ''}
			/>
		</div>
		<div class="col-12">
			<label for="description">Descrição</label>
			<input
				type="text"
				name="description"
				id="description"
				class="form-control"
				placeholder="Fala um pouco sobre seu produto..."
				value={data.product?.description ?? ''}
			/>
		</div>
		<div class="col-6">
			<label for="price">Preço (por unidade ou por quilo)</label>
			<div class="input-group">
				<span class="input-group-text">R$</span>
				<input
					type="text"
					name="price"
					id="price"
					class="form-control"
					value={data.product?.price ?? ''}
				/>
			</div>
		</div>
		<div class="col-6">
			<label for="avaliable">Quantidade disponível para venda (unidades)</label>
			<input
				type="text"
				name="avaliable"
				id="avaliable"
				class="form-control"
				value={data.product?.avaliable ?? ''}
			/>
		</div>
		<div class="col-6">
			<label for="tag">Categoria</label>
			<select name="tag" id="tag" class="form-control">
				{#each data.shop.tags as tag}
					<option selected={data.product?.tagId === tag.id} value={tag.id}>{tag.title}</option>
				{/each}
			</select>
		</div>
		<div class="col-6">
			<label for="photo">Foto do produto</label>
			<input type="file" accept="image/*" name="photo" id="photo" class="form-control" />
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
