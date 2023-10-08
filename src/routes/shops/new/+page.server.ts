import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.currentUser?.role !== 'SELLER')
		throw error(403, 'Essa página é permitida somente a vendedores.');

	const tags = await prisma.tag.findMany();

	return { tags };
};

export const actions: Actions = {
	async default({ locals, request }) {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const address = formData.get('address') as string;
		const tags = formData.getAll('tags') as string[];

		if (!locals.currentUser) return fail(400, { success: false, message: 'Não autorizado' });

		const shop = await prisma.shop.create({
			data: {
				name,
				description,
				address,
				tags: {
					connect: [...tags.map((tag) => ({ id: tag }))]
				},
				userId: locals.currentUser.id
			}
		});

		return {
			success: true,
			shopId: shop.id,
			message: 'Loja cadastrada com sucesso!'
		};
	}
};
