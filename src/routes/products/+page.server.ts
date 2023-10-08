import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await prisma.product.findMany({
		include: {
			tag: true,
			sales: {
				select: {
					amount: true
				}
			}
		},
		where: {
			shop: {
				status: 'APPROVED'
			}
		}
	});

	return {
		products
	};
};
