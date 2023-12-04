<script lang="ts">
	import { enhance } from '$app/forms';
	import { fmt, tooltip } from '$lib';
	import type { Product, Tag } from '@prisma/client';

	export let product: Product & { tag: Tag };
</script>

<div class="card p-3 border-5 rounded-5" style="max-width: 540px;">
	<div class="row g-0">
		<div class="col-md-4">
			<img src={product.imageUrl} alt={product.name} class="img-fluid rounded-start" />
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title fw-bold">{product.name}</h5>
				<p class="card-text">{product.description}</p>
				<p class="card-text">
					{fmt.format(product.price)}
					<br />
					Restam {product.avaliable} unidades
				</p>
				<div class="tag-group">
					<span class="tag">#{product.tag.title}</span>
				</div>
				<div class="button-group">
                    <a href="/my/{product.shopId}/products/new?update={product.id}" class="button green" use:tooltip={{ text: 'Atualizar produto'}}>
                        <i class="fa fa-edit"></i>
                    </a>
                    <form action="?/deleteProduct" method="post" use:enhance>
                        <input type="hidden" name="id" value={product.id}>
                        <button type="submit" class="button salmon">
                            <i class="fa fa-trash"></i>
                        </button>
                    </form>
                </div>
			</div>
		</div>
	</div>
</div>
