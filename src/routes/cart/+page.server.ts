import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const sales = await prisma.sale.findMany({
		where: {
			userId: locals.currentUser?.id
		},
		include: {
			product: {
				include: {
					tag: true
				}
			}
		}
	});

	return { sales };
};

export const actions: Actions = {
	async changeAmount({ locals, request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const amount = Number(formData.get('amount'));

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		await prisma.sale.update({
			data: {
				amount
			},
			where: {
				id
			}
		});
	},
	async delete({ locals, request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		const sale = await prisma.sale.delete({
			where: {
				id
			}
		});

		await prisma.product.update({
			data: {
				avaliable: {
					increment: sale.amount
				}
			},
			where: {
				id: sale.productId
			}
		});
	}
};
