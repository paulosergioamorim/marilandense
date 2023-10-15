import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { Shop } from '@prisma/client';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.currentUser?.role !== 'SELLER')
		throw error(403, 'Essa página é permitida somente a vendedores.');

	const tags = await prisma.tag.findMany();

	const updateId = url.searchParams.get('update');

	if (!updateId) return { tags };

	const shop = await prisma.shop.findFirst({
		where: {
			id: updateId
		},
		include: {
			tags: true
		}
	});

	return {
		shop,
		tags
	};
};

export const actions: Actions = {
	async default({ locals, request, url }) {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const address = formData.get('address') as string;
		const tags = formData.getAll('tags') as string[];
		const updateId = url.searchParams.get('update');

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		let shop: Shop;

		if (updateId)
			shop = await prisma.shop.update({
				data: {
					name,
					description,
					address,
					tags: {
						set: tags.map((tag) => ({ id: tag }))
					},
					userId: locals.currentUser.id
				},
				where: {
					id: updateId
				}
			});
		else
			shop = await prisma.shop.create({
				data: {
					name,
					description,
					address,
					tags: {
						connect: tags.map((tag) => ({ id: tag }))
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
