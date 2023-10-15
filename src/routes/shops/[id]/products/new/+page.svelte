<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { delay } from '$lib/utils';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<section class="container">
	<h1>Adicionar produto</h1>
	<form
		method="post"
		enctype="multipart/form-data"
		use:enhance={() =>
			async ({ result }) => {
				await applyAction(result);
				if (result.type !== 'success') return;
				await delay(500);
				await goto(`/shops/${$page.params.id}`, { replaceState: true });
			}}
	>
		<div class="form-group mb-2">
			<label for="name">Nome</label>
			<input type="text" name="name" id="name" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<label for="description">Descrição</label>
			<input type="text" name="description" id="description" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<label for="price">Preço</label>
			<div class="input-group">
				<span class="input-group-text">R$</span>
				<input type="text" name="price" id="price" class="form-control" />
			</div>
		</div>
		<div class="form-group mb-2">
			<label for="avaliable">Quantidade disponível para venda</label>
			<input type="text" name="avaliable" id="avaliable" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<label for="tag">Categoria</label>
			<select name="tag" id="tag" class="form-control">
				{#each data.shop.tags as tag}
					<option value={tag.id}>{tag.title}</option>
				{/each}
			</select>
		</div>
		<div class="form-group mb-2">
			<label for="photo">Foto do produto</label>
			<input type="file" accept="image/*" name="photo" id="photo" class="form-control" />
		</div>
		<div class="form-group mb-2">
			<div class="form-group mb-2">
				<input type="submit" value="Enviar" class="btn btn-primary" />
				<a href="/shops/{$page.params.id}" class="btn btn-outline-danger">Cancelar</a>
			</div>
		</div>
	</form>
	<hr />
	{#if form?.message}
		<div class="alert alert-{form.success ? 'success' : 'danger'}">
			{form.message}
		</div>
	{/if}
</section>
