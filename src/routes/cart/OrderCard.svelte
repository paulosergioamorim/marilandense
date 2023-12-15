<script lang="ts">
	import { enhance } from '$app/forms';
	import { fmt, orderStatusMap, tooltip } from '$lib';
	import type { Order, Product, Tag } from '@prisma/client';

	export let order: Order & { product: Product & { tag: Tag } };
</script>

<div class="order-wrapper">
	<span use:tooltip={{ text: 'Quantidade' }} class="order-amount">{order.amount}</span>
	<div class="img-wrapper">
		<img src={order.product.imageUrl} alt={order.product.name} />
	</div>
	<div class="order-body">
		<div class="order-name">{order.product.name}</div>
		<p>{fmt.format(order.product.price * order.amount)}</p>
		<div class="tag-group">
			<span class="tag">#{order.product.tag.title}</span>
			<span class="tag">{orderStatusMap.get(order.status)}</span>
		</div>
		<div class="button-group">
			<form method="post" use:enhance>
				<input type="hidden" name="id" value={order.id} />
				{#if order.status === 'PENDING'}
					<button
						disabled={order.amount === 1}
						formaction="?/decreaseAmount"
						type="submit"
						class="button salmon"
					>
						<i class="fa fa-minus" />
					</button>
					<button
						disabled={order.amount === order.product.avaliable}
						formaction="?/increaseAmount"
						type="submit"
						class="button blue"
					>
						<i class="fa fa-plus" />
					</button>
					<button
						formaction="?/confirmOrder"
						type="submit"
						class="button green"
						use:tooltip={{ text: 'Confirmar' }}
					>
						<i class="fa fa-shopping-bag" />
					</button>
				{/if}
				{#if order.status !== 'CANCELED'}
					<button
						formaction="?/{order.status === 'PENDING' ? 'deleteOrder' : 'cancelOrder'}"
						type="submit"
						class="button salmon"
						use:tooltip={{ text: 'Cancelar' }}
					>
						<i class="fa fa-{order.status === 'PENDING' ? 'trash' : 'x'}" />
					</button>
				{/if}
			</form>
		</div>
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
