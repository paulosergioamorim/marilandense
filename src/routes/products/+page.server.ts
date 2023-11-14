import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, url }) => {
	depends('products');

	const take = 10;
	const skip = Number(url.searchParams.get('skip')) ?? 0;
	const tag = url.searchParams.get('tag');

	const count = await prisma.product.count();

	let products = await prisma.product.findMany({
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
			}
		},
		skip,
		take
	});

	if (tag)
		products = products.filter((product) =>
			new RegExp(tag.toLowerCase()).test(product.tag.title.toLowerCase())
		);

	return {
		products,
		count
	};
};
