<script lang="ts">
	import type { Shop, Tag } from '@prisma/client';

	export let shop: Shop & { tags: Tag[] };
</script>

<div class="card">
    <div class="card-body">
        <h4 class="card-title">{shop.name}</h4>
        <p class="card-text">
            Descrição: {shop.description} <br>
            Endereço: {shop.address} <br>
            {#each shop.tags as tag}
                <span class="badge bg-primary mx-1">{tag.title}</span>
            {/each}
        </p>
    </div>
</div>
