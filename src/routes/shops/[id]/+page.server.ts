import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { rm } from 'fs/promises';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const shop = await prisma.shop.findFirst({
		where: {
			id
		},
		include: {
			owner: true,
			products: {
				include: {
					sales: {
						select: {
							amount: true
						}
					},
					tag: true
				}
			},
			tags: true
		}
	});

	if (!shop) throw error(404, 'Loja não encontrada');

	return { shop };
};

export const actions: Actions = {
	async deleteProduct({ request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		const product = await prisma.product.delete({
			where: {
				id
			}
		});

		await rm(`./static${product.imageUrl}`);

		return {
			success: true
		};
	},
	async buyProduct({ request }) {
		console.log('a');
	}
};
