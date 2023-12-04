import { prisma } from '$lib/server';
import { error, fail } from '@sveltejs/kit';
import { lstat, mkdir } from 'fs/promises';
import sharp from 'sharp';
import type { Actions, PageServerLoad } from './$types';

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

	if (locals.user?.id !== shop?.userId) throw error(401, 'Não autorizado');

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
		const product = await prisma.product.upsert({
			create: {
				name,
				description,
				price,
				avaliable,
				tagId,
				shopId
			},
			update: {
				name,
				description,
				price,
				avaliable,
				tagId,
				shopId
			},
			where: {
				id: updateId
			}
		});

		if (photo.size === 0) return { success: true, message: 'Sucesso ao cadastrar produto' };

		try {
			const fileName = `${product.id}.jpg`;
			const imageUrl = `./static/products/${fileName}`;

			const dirStats = await lstat('./static/products');

			if (!dirStats.isDirectory()) mkdir('./static/products');

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
