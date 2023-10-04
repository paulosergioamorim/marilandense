import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const currentUser = locals.currentUser;

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
