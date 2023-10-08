import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await prisma.product.findMany({
		take: 6,
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
