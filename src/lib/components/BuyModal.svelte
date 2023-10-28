<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import type { CreateModalStoreType } from '$lib/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Modal from './Modal.svelte';
	import type Prisma from '@prisma/client';

	let amount = 1;

	const buyProductSubmit: SubmitFunction = () => async () => {
		modalStore.hideModal();
		await invalidate('products');
		await goto('/cart');
	};

	export let product: Prisma.Product | null;
	export let modalStore: CreateModalStoreType;
</script>

<Modal {modalStore}>
	<form action="?/buyProduct" method="post" class="row g-3" use:enhance={buyProductSubmit}>
		<h4>Comprar {product?.name}</h4>
		<input type="hidden" name="id" value={product?.id} />
		<div class="col-12">
			<label for="amount">Quantidade</label>
		</div>
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
		<div class="col-12">
			<button type="submit" class="button green">Comprar</button>
		</div>
	</form>
</Modal>
