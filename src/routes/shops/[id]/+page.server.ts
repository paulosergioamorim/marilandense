import { prisma, buyProduct } from '$lib/server';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { rm } from 'fs/promises';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends('products');
	const id = Number(params.id);

	if (isNaN(id)) throw error(404, 'ID inválido.');

	const shop = await prisma.shop.findFirst({
		where: {
			id
		},
		include: {
			owner: true,
			products: {
				include: {
					tag: true
				}
			},
			tags: true
		}
	});

	if (!shop) throw error(404, 'Loja não encontrada');

	return { shop };
};

export const actions: Actions = {
	buyProduct,
	async deleteProduct({ request }) {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		try {
			const product = await prisma.product.delete({
				where: {
					id
				}
			});

			await rm(`./static${product.imageUrl}`);
		} catch (error) {
			console.error(error);
			return fail(500, { success: false, message: 'Erro ao excluir produto.' });
		}

		return {
			success: true
		};
	}
};
