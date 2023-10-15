import { prisma } from '$lib/server/prisma';
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
			sales: {
				select: {
					amount: true
				}
			},
			tag: true
		}
	});

	return { products };
};
