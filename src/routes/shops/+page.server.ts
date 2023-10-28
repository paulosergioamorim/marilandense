import { prisma } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const currentUser = locals.user;

	const shops = await prisma.shop.findMany({
		include: {
			tags: true
		},
		orderBy: {
			name: 'asc'
		},
		where: {
			OR: [
				{
					status: 'APPROVED'
				},
				{
					userId: currentUser?.id
				}
			]
		}
	});

	return {
		shops
	};
};
