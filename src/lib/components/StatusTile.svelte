<script lang="ts">
	import type Prisma from '@prisma/client';

	type StatusType = Prisma.ShopStatus | Prisma.OrderStatus;

	export let status: StatusType;
</script>

<span>{status}</span>
