import { prisma } from '$lib/server';
import type { ShopStatus } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const tags = await prisma.tag.findMany();
	const shops = await prisma.shop.findMany({
		include: {
			owner: true
		},
		orderBy: {
			name: 'asc'
		}
	});

	return { tags, shops };
};

export const actions: Actions = {
	async addTag({ request }) {
		const formData = await request.formData();
		const title = formData.get('tag') as string;

		await prisma.tag.create({
			data: {
				title
			}
		});
	},
	async removeTag({ request }) {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		await prisma.tag.delete({
			where: {
				id
			}
		});
	},
	async toggleShopStatus({ request }) {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const status = formData.get('status') as ShopStatus;

		await prisma.shop.update({
			data: {
				status
			},
			where: {
				id
			}
		});
	}
};
