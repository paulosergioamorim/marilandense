<script lang="ts">
	import { enhance } from '$app/forms';
	import { shopStatusMap } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Marilandense | Administrador</title>
</svelte:head>

<section class="container">
	<h2>Painél de Administrador</h2>
	<nav class="nav">
		<li class="nav-item"><a href="#tags" class="nav-link">Categorias</a></li>
		<li class="nav-item"><a href="#shops" class="nav-link">Lojas</a></li>
	</nav>
</section>

<section class="container" id="tags">
	<h3>Categorias</h3>
	<table class="table">
		<thead>
			<th>Categoria</th>
			<th>Ações</th>
		</thead>
		<tbody>
			{#each data.tags as tag}
				<tr>
					<td>{tag.title}</td>
					<td>
						<form action="?/removeTag" method="post" use:enhance>
							<input type="hidden" name="id" value={tag.id} />
							<button type="submit" class="button salmon">
								<i class="fa fa-trash" />
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<form action="?/addTag" method="post" class="row g-3" use:enhance>
		<div class="col-2">
			<input type="text" name="tag" id="tag" class="form-control" placeholder="Categoria" />
		</div>
		<div class="col-2">
			<input type="submit" value="Adicionar" class="button green" />
		</div>
	</form>
</section>

<section class="container" id="shops">
	<h3>Lojas</h3>
	<table class="table">
		<thead>
			<tr>
				<th>Nome</th>
				<th>Descrição</th>
				<th>Endereço</th>
				<th>Dono(a)</th>
				<th>Estado</th>
			</tr>
		</thead>
		<tbody>
			{#each data.shops as shop}
				<tr>
					<td>{shop.name}</td>
					<td>{shop.description}</td>
					<td>{shop.address}</td>
					<td>{shop.owner.name}</td>
					<td>
						<form action="?/toggleShopStatus" method="post" use:enhance>
							<input type="hidden" name="id" value={shop.id} />
							<div class="row">
								<div class="col-4">
									<input
										disabled
										type="text"
										value={shopStatusMap.get(shop.status)}
										class="form-control"
									/>
								</div>
								<div class="col">
									<div class="row">
										<div class="col-6">
											<select name="status" id="status" class="form-control">
												{#each shopStatusMap as [key, status]}
													<option value={key}>{status}</option>
												{/each}
											</select>
										</div>
										<div class="col-4">
											<button type="submit" class="button green">
												<i class="fa fa-edit" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	#tags, #shops {
		scroll-margin-top: 70px;
		margin-top: 20px;
		min-height: 100vh;
	}
</style>