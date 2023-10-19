import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const orders = await prisma.order.findMany({
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

	return { orders };
};

export const actions: Actions = {
	async increaseAmount({ locals, request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		const [order, product] = await prisma.$transaction([
			prisma.order.findFirst({ where: { id } }),
			prisma.product.findFirst({
				where: {
					orders: {
						some: {
							id
						}
					}
				}
			})
		]);

		if (!order || !product) return;

		if (order.amount === product.avaliable)
			return fail(400, { success: false, message: 'Estoque esgotado' });

		await prisma.order.update({
			data: {
				amount: {
					increment: 1
				}
			},
			where: {
				id
			}
		});
	},
	async decreaseAmount({ locals, request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		const order = await prisma.order.findFirst({ where: { id } });

		if (!order) return;

		if (order.amount === 1) return fail(400, { success: false, message: 'Mínimo alcançado' });

		await prisma.order.update({
			data: {
				amount: {
					decrement: 1
				}
			},
			where: {
				id
			}
		});
	},
	async deleteOrder({ locals, request }) {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

		const order = await prisma.order.delete({
			where: {
				id
			}
		});

		await prisma.product.update({
			data: {
				avaliable: {
					increment: order.amount
				}
			},
			where: {
				id: order.productId
			}
		});
	}
};
