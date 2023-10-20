<script lang="ts">
	import { enhance } from '$app/forms';
	import { shopStatusMap } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Marilandense | Administrador</title>
</svelte:head>

<section class="container">
	<h2 class="mb-3">Painél de Administrador</h2>
	<div class="accordion" id="accordionExample">
		<div class="accordion-item">
			<h2 class="accordion-header">
				<button
					class="accordion-button"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseOne"
					aria-expanded="true"
					aria-controls="collapseOne"
				>
					Categorias
				</button>
			</h2>
			<div
				id="collapseOne"
				class="accordion-collapse collapse show"
				data-bs-parent="#accordionExample"
			>
				<div class="accordion-body">
					<div class="row">
						<div class="col">
							<h5>Categorias</h5>
							<div class="row row-cols-3">
								{#each data.tags as tag}
									<div class="d-flex align-items-center">
										<form
											action="?/removeTag"
											method="post"
											use:enhance={({ formData }) => formData.append('id', tag.id)}
										>
											<button type="submit" class="btn btn-link link-danger">
												<i class="fa fa-trash" />
											</button>
										</form>
										{tag.title}
									</div>
								{/each}
							</div>
						</div>
						<div class="col">
							<h5>Adicionar Categoria</h5>
							<form action="?/addTag" method="post" use:enhance>
								<div class="form-group mb-2">
									<label for="tag">Categoria</label>
									<input type="text" name="tag" id="tag" class="form-control" />
								</div>
								<div class="form-group mb-2">
									<input type="submit" value="Adicionar" class="btn btn-primary" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h2 class="accordion-header">
				<button
					class="accordion-button"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseTwo"
					aria-expanded="true"
					aria-controls="collapseTwo"
				>
					Lojas
				</button>
			</h2>
			<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
				<div class="accordion-body">
					<table class="table">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Descrição</th>
								<th>Endereço</th>
								<th>Dono</th>
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
										<form
											action="?/toggleShopStatus"
											method="post"
											use:enhance={({ formData }) => formData.append('id', shop.id)}
										>
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
														<div class="col">
															<select name="status" id="status" class="form-control">
																{#each shopStatusMap as [key, status]}
																	<option value={key}>{status}</option>
																{/each}
															</select>
														</div>
														<div class="col-4">
															<button type="submit" class="btn btn-link link-success">
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
				</div>
			</div>
		</div>
	</div>
</section>
