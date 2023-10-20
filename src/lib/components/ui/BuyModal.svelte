<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import Modal from './Modal.svelte';
	import type Prisma from '@prisma/client';

	let amount = 1;

	export let product: Prisma.Product | null;
	export let showModal = false;
</script>

<Modal let:hideModal bind:showModal>
	<form
		action="?/buyProduct"
		method="post"
		use:enhance={({ formData }) => {
			formData.append('id', String(product?.id));
			return async () => {
				hideModal();
				await invalidate('products');
				await goto('/cart');
			};
		}}
	>
		<h2>Comprar {product?.name}</h2>
		<div class="form-group mb-2">
			<label for="amount">Quantidade</label>
			<div class="button-group mt-2">
				<button
					disabled={amount === 1}
					type="button"
					class="button salmon"
					value="&minus;"
					on:click={() => amount--}
				>
					<i class="fa fa-minus" />
				</button>
				<input
					type="text"
					name="amount"
					id="amount"
					readonly
					class="form-control-plaintext text-center"
					style="width: 2rem"
					value={amount}
				/>
				<button
					disabled={amount >= Number(product?.avaliable)}
					type="button"
					class="button blue"
					on:click={() => amount++}
				>
					<i class="fa fa-plus" />
				</button>
			</div>
		</div>
		<div class="form-group mb-2">
			<button type="submit" class="button green">Comprar</button>
		</div>
	</form>
</Modal>
