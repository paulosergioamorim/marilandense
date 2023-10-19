import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, url }) => {
	depends('products');

	const take = 10;
	const skip = Number(url.searchParams.get('skip')) ?? 0;
	const tag = url.searchParams.get('tag') ?? undefined;

	const count = await prisma.product.count();

	const products = await prisma.product.findMany({
		include: {
			tag: true,
			orders: {
				select: {
					amount: true
				}
			}
		},
		where: {
			shop: {
				status: 'APPROVED'
			},
			tag: {
				title: tag
			}
		},
		skip,
		take
	});

	return {
		products,
		count
	};
};
