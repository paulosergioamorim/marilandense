<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay } from '$lib/utils';
	import type { PageData, ActionData } from './$types';

	$: update = $page.url.searchParams.has('update');

	export let data: PageData;
	export let form: ActionData;
</script>

<section class="container">
	<h2>{update ? 'Atualizar' : 'Cadastrar'} produto</h2>
	<form
		method="post"
		enctype="multipart/form-data"
		use:enhance={() =>
			async ({ result }) => {
				await applyAction(result);
				if (result.type !== 'success') return;
				await delay(500);
				await invalidate('products');
				history.back();
			}}
	>
		<div class="form-group mb-2">
			<label for="name">Nome</label>
			<input
				type="text"
				name="name"
				id="name"
				class="form-control"
				value={data.product?.name ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="description">Descrição</label>
			<input
				type="text"
				name="description"
				id="description"
				class="form-control"
				value={data.product?.description ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="price">Preço</label>
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
		<div class="form-group mb-2">
			<label for="avaliable">Quantidade disponível para venda</label>
			<input
				type="text"
				name="avaliable"
				id="avaliable"
				class="form-control"
				value={data.product?.avaliable ?? ''}
			/>
		</div>
		<div class="form-group mb-2">
			<label for="tag">Categoria</label>
			<select name="tag" id="tag" class="form-control">
				{#each data.shop.tags as tag}
					<option selected={data.product?.tagId === tag.id} value={tag.id}>{tag.title}</option>
				{/each}
			</select>
		</div>
		<div class="form-group mb-2">
			<label for="photo">Foto do produto</label>
			<input type="file" accept="image/*" name="photo" id="photo" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<input type="submit" value="Enviar" class="button green" />
			<input type="button" value="Cancelar" class="button salmon" on:click={() => history.back()} />
		</div>
	</form>
	{#if form?.message}
		<hr />
		<div class="alert alert-{form.success ? 'success' : 'danger'}">
			{form.message}
		</div>
	{/if}
</section>
