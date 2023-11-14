import { prisma } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		const shops = await prisma.shop.findMany({
			where: {
				userId: locals.user?.id
			},
			select: {
				id: true,
				name: true
			}
		});

		return { shops };
	} catch (e) {
		throw error(500, { message: 'Falha ao carregar sua página.' });
	}
};
