import { prisma } from '$lib/server';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(301, '/login');

	const orders = await prisma.order.findMany({
		where: {
			userId: locals.user?.id
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
		const id = Number(formData.get('id'));

		if (!locals.user) return fail(403, { success: false, message: 'Não autorizado' });

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
		const id = Number(formData.get('id'));

		if (!locals.user) return fail(403, { success: false, message: 'Não autorizado' });

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
		const id = Number(formData.get('id'));

		if (!locals.user) return fail(403, { success: false, message: 'Não autorizado' });

		const order = await prisma.order.delete({
			where: {
				id
			}
		});

		if (order.status === 'PENDING') return;

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
	},
	async confirmOrder({ request }) {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		const [product, order] = await prisma.$transaction([
			prisma.product.findFirst({
				where: {
					orders: {
						some: {
							id
						}
					}
				}
			}),
			prisma.order.findFirst({
				where: {
					id
				}
			})
		]);

		if (!product || !order) return fail(404, { success: false, message: 'Produto não encontrado' });

		if (product.avaliable < order.amount)
			return fail(400, { success: false, message: 'Falta no estoque!' });

		await prisma.$transaction([
			prisma.order.update({
				data: {
					status: 'CONFIRMED'
				},
				where: {
					id
				}
			}),
			prisma.product.update({
				data: {
					avaliable: {
						decrement: order.amount
					}
				},
				where: {
					id: product.id
				}
			})
		]);

		return { success: true, message: 'Compra confirmada com sucesso!' };
	}
};
