import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server';

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
