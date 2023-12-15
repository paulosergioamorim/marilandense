<script lang="ts">
	import { enhance } from '$app/forms';
	import { fmt, orderStatusMap, tooltip } from '$lib';
	import type { Order, Product, Tag, User } from '@prisma/client';

	export let order: Order & { buyer: User; product: Product & { tag: Tag } };
</script>

<div class="order-wrapper">
	<span use:tooltip={{ text: 'Quantidade' }} class="order-amount">{order.amount}</span>
	<div class="img-wrapper">
		<img src={order.product.imageUrl} alt={order.product.name} />
	</div>
	<div class="order-body">
		<div class="order-name">{order.product.name}</div>
		<p class="card-description">
			{fmt.format(order.product.price * order.amount)} <br />
			Comprador: {order.buyer.name} <br />
			Endereço de Entrega: {order.buyer.address} <br />
			Contato: {order.buyer.phone}
		</p>
		<div class="tag-group">
			<span class="tag">#{order.product.tag.title}</span>
			<span class="tag">{orderStatusMap.get(order.status)}</span>
		</div>
		{#if order.status !== 'CANCELED'}
			<form method="post" action="?/updateOrder" class="row g-3" use:enhance>
				<input type="hidden" name="id" value={order.id} />
				<div class="col-7">
					<select name="status" id="status" class="form-control">
						{#each orderStatusMap as [key, name]}
							{#if key !== 'PENDING' && key !== 'CANCELED'}
								<option value={key}>{name}</option>
							{/if}
						{/each}
					</select>
				</div>
				<div class="col">
					<input type="submit" value="Atualizar" class="button green" />
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.order-wrapper {
		display: flex;
		border: 4px var(--gray) solid;
		border-radius: 24px;
		overflow: visible;
		position: relative;
	}

	.img-wrapper {
		height: 100%;
	}

	.img-wrapper img {
		border-radius: 20px 0 0 20px;
	}

	.order-body {
		display: flex;
		flex-direction: column;
		padding: 12px;
	}

	.order-name {
		font-size: 24px;
		font-weight: 600;
	}

	.order-amount {
		background-color: #000;
		position: absolute;
		top: -0.75rem;
		right: -0.75rem;
		color: white;
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
</style>
