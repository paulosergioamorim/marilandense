import { prisma, buyProductAction } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('products');

	const products = await prisma.product.findMany({
		take: 3,
		orderBy: {
			price: 'asc'
		},
		where: {
			shop: {
				status: 'APPROVED'
			}
		},
		include: {
			orders: {
				select: {
					amount: true
				}
			},
			tag: true
		}
	});

	return { products };
};

export const actions: Actions = {
	buyProduct: buyProductAction
};
