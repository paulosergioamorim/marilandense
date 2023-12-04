import { prisma } from '$lib/server';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { rm } from 'fs/promises';

export const load: PageServerLoad = async ({ locals, params, depends }) => {
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

	if (locals.user?.id !== shop.userId) return { shop };

	const orders = await prisma.order.findMany({
		where: {
			product: {
				shopId: id
			},
			status: {
				not: 'PENDING'
			}
		},
		include: {
			product: {
				include: {
					tag: true
				}
			},
			buyer: true
		}
	});

	return { shop, orders };
};
