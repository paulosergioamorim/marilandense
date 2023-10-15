<script lang="ts">
	import { enhance } from '$app/forms';
	import { saleStatusMap } from '$lib/utils';
	import type { Product, Sale, Tag } from '@prisma/client';

	const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

	export let sale: Sale & { product: Product & { tag: Tag } };
</script>

<div class="card">
	<span class="rounded-circle bg-dark">{sale.amount}</span>
	<img src={sale.product.imageUrl} alt={sale.product.name} class="card-img-top" />
	<div class="card-body">
		<h5 class="card-title">{sale.product.name}</h5>
		<p class="card-text">
			{fmt.format(sale.product.price * sale.amount)} <br />
			<span class="badge bg-primary">{sale.product.tag.title}</span> <br />
			<span class="badge bg-success">{saleStatusMap.get(sale.status)}</span>
		</p>
		<div class="card-footer">
			<form
				action="?/delete"
				method="post"
				use:enhance={({ formData }) => formData.append('id', sale.id)}
			>
				<button type="submit" class="btn bnt-link link-danger">
					<i class="fa fa-trash" />
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.card {
		max-width: 300px;
	}

	.card span:first-child {
		position: absolute;
		top: -0.75rem;
		right: -0.75rem;
		color: white;
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
