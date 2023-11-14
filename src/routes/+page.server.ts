import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';

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
