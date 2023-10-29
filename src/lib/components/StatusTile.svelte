<script lang="ts">
	import { shopStatusMap, orderStatusMap } from '$lib';
	import type { OrderStatus, ShopStatus } from '@prisma/client';

	const statusMap = new Map([...shopStatusMap.entries(), ...orderStatusMap.entries()]);

	export let status: ShopStatus | OrderStatus;
</script>

<span class="status">{statusMap.get(status)}</span>

<style>
	.status {
		display: flex;
		width: fit-content;
		padding: 0 8px;
		height: 24px;
		background-color: var(--gray);
		color: var(--black);
		border-radius: 12px;
		font-size: 12px;
		justify-content: center;
		align-items: center;
		font-weight: 600;
	}
</style>
