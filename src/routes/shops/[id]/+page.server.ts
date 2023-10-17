import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { rm } from 'fs/promises';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends('products');
	const { id } = params;

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
	async deleteProduct({ request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;

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
	},
	async buyProduct({ locals, request }) {
		const formData = await request.formData();
		const productId = formData.get('id') as string;
		const amount = Number(formData.get('amount'));

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		const product = await prisma.product.findFirst({ where: { id: productId } });

		if (!product) return fail(404, { success: false, message: 'Produto não encontrado.' });

		if (product.avaliable < amount)
			return fail(400, { success: false, message: 'Quantidade acima do estoque do vendedor.' });

		await prisma.$transaction([
			prisma.sale.create({
				data: {
					productId,
					amount,
					userId: locals.currentUser?.id
				}
			}),
			prisma.product.update({
				data: {
					avaliable: {
						decrement: amount
					}
				},
				where: {
					id: productId
				}
			})
		]);
	}
};
