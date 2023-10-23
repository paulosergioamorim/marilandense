import { fail, type Action } from '@sveltejs/kit';
import { prisma } from './prisma';

export const buyProduct: Action = async ({ locals, request }) => {
	const formData = await request.formData();
	const productId = Number(formData.get('id'));
	const amount = Number(formData.get('amount'));

	if (!locals.currentUser) return fail(403, { success: false, message: 'Não autorizado' });

	const product = await prisma.product.findFirst({ where: { id: productId } });

	if (!product) return fail(404, { success: false, message: 'Produto não encontrado.' });

	if (product.avaliable < amount)
		return fail(400, { success: false, message: 'Quantidade acima do estoque do vendedor.' });

	await prisma.order.create({
		data: {
			productId,
			amount,
			userId: locals.currentUser?.id
		}
	});

	return { success: true, message: 'Compra realizada com sucesso!' };
};
