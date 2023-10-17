<script lang="ts">
	import type { Tag } from '@prisma/client';

	export let tag: Tag;
</script>

<span class="tag">#{tag.title}</span>

<style>
	.tag {
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

	:global(.tag-group) {
		display: flex;
		flex-wrap: wrap;
		gap: .5rem;
		margin: 1rem 0;
	}
</style>
