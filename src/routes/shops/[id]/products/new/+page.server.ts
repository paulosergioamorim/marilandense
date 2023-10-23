import { prisma } from '$lib/server';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import sharp from 'sharp';
import type { Product } from '@prisma/client';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const id = Number(params.id);

	if (isNaN(id)) throw error(404, 'ID inválido.');

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

	const updateId = Number(url.searchParams.get('update'));

	if (!updateId) return { shop };

	if (isNaN(updateId)) throw error(404, 'ID inválido.');

	const product = await prisma.product.findFirst({
		where: {
			id: updateId
		}
	});

	return { shop, product };
};

export const actions: Actions = {
	async default({ request, params, url }) {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = Number(formData.get('price'));
		const avaliable = Number(formData.get('avaliable'));
		const tagId = Number(formData.get('tag'));
		const photo = formData.get('photo') as File;
		const shopId = Number(params.id);
		const updateId = Number(url.searchParams.get('update'));

		let product: Product;

		if (updateId)
			product = await prisma.product.update({
				data: {
					name,
					description,
					price,
					avaliable,
					shopId,
					tagId
				},
				where: {
					id: updateId
				}
			});
		else
			product = await prisma.product.create({
				data: {
					name,
					description,
					price,
					avaliable,
					shopId,
					tagId
				}
			});

		if (photo.size === 0) return { success: true, message: 'Sucesso ao cadastrar produto' };

		try {
			const fileName = `${product.id}.jpg`;
			const imageUrl = `./static/products/${fileName}`;

			await sharp(await photo.arrayBuffer())
				.resize({ width: 256, height: 256 })
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

			return { success: true, message: 'Sucesso ao cadastrar produto.' };
		} catch (error) {
			console.error(error);
			return fail(500, { success: false, message: 'Erro ao salvar imagem.' });
		}
	}
};
