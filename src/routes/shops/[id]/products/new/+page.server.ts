import { prisma } from '$lib/server/prisma';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { writeFile } from 'fs/promises';
import sharp from 'sharp';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { id } = params;

	const shop = await prisma.shop.findFirst({
		where: {
			id
		},
		include: {
			tags: true
		}
	});

	if (!shop) throw error(404, 'Loja não encontrada');

	if (locals.currentUser?.id !== shop?.userId) throw error(401, 'Não autorizado');

	return {
		shop
	};
};

export const actions: Actions = {
	async default({ request, params }) {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = Number(formData.get('price'));
		const avaliable = Number(formData.get('avaliable'));
		const tagId = formData.get('tag') as string;
		const photo = formData.get('photo') as File;
		const shopId = params.id;

		const product = await prisma.product.create({
			data: {
				name,
				description,
				price,
				avaliable,
				shopId,
				tagId
			}
		});

		try {
			const fileName = `${product.id}.jpg`;
			const imageUrl = `./static/products/${fileName}`;

			await sharp(await photo.arrayBuffer())
				.resize({ width: 200, height: 200, fit: 'fill' })
				.toFormat('jpg')
				.toFile(imageUrl);

			await prisma.product.update({
				data: {
					imageUrl: `/products/${fileName}`
				},
				where: {
					id: product.id
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { success: false, message: 'Erro ao salvar imagem.' });
		}
	}
};
