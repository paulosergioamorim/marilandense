<script lang="ts">
	import { enhance } from '$app/forms';
	import { fmt, tooltip } from '$lib';
	import type { Order, Product, Tag } from '@prisma/client';
	
	export let order: Order & { product: Product & { tag: Tag } };
</script>

<div class="order">
	<span class="order-amount">{order.amount}</span>
	<img src={order.product.imageUrl} alt={order.product.name} class="order-image" />
	<div class="order-body">
		<h5 class="order-name">{order.product.name}</h5>
		<p class="card-description">
			{fmt.format(order.product.price * order.amount)} <br />
		</p>
		<div class="tag-group">
			<span class="tag">#{order.product.tag.title}</span>
			<span class="tag">{order.status}</span>
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
				<button
					formaction="?/deleteOrder"
					type="submit"
					class="button salmon"
					use:tooltip={{ text: 'Excluir' }}
				>
					<i class="fa fa-trash" />
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.order {
		display: flex;
		flex-direction: column;
		border: 4px var(--gray) solid;
		border-radius: 24px;
		overflow: visible;
		position: relative;
		width: clamp(25%, 300px, 100% - 1rem);
	}

	.order-image {
		border-radius: 20px 20px 0 0;
	}

	.order-body {
		display: flex;
		flex-direction: column;
		padding: 12px;
	}

	.order-name {
		font-size: 20px;
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

	.button-group {
		margin-top: auto;
	}
</style>
