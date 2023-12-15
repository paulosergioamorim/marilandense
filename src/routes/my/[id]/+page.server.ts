import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server';
import { rm } from 'fs/promises';
import type { $Enums } from '@prisma/client';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends('products');
	const id = Number(params.id);

	if (isNaN(id)) throw error(404, 'ID inválido.');

	// this call gets the information of thy shop, all thy products and all orders of thy products
	const shop = await prisma.shop.findFirst({
		where: {
			id
		},
		include: {
			owner: true,
			products: {
				include: {
					tag: true,
					orders: {
						where: {
							status: {
								not: 'PENDING'
							}
						},
						include: {
							buyer: true
						}
					}
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
		const id = Number(formData.get('id'));

		try {
			const product = await prisma.product.delete({
				where: {
					id
				}
			});

			await rm(`./static/${product.imageUrl}`);
		} catch (error) {
			console.error(error);
			return fail(500, { success: false, message: 'Erro ao excluir produto.' });
		}

		return {
			success: true
		};
	},
	async updateOrder({ request }) {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const status = formData.get('status') as $Enums.OrderStatus;

		await prisma.order.update({
			where: { id },
			data: {
				status
			}
		});
	}
};
