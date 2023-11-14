import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server';

export const POST: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData();
	const productId = Number(formData.get('id'));
	const amount = Number(formData.get('amount'));

	if (!locals.user) return json({ message: 'Não autorizado' }, { status: 403 });

	try {
		const product = await prisma.product.findFirst({ where: { id: productId } });

		if (!product) return json({ message: 'Produto não encontrado.' }, { status: 404 });

		if (product.avaliable < amount)
			return json({ message: 'Quantidade acima do estoque do vendedor.' }, { status: 400 });

		await prisma.order.create({
			data: {
				productId,
				amount,
				userId: locals.user?.id
			}
		});

		return json({ message: 'Compra realizada com sucesso!' }, { status: 200 });
	} catch (e) {
		return json({ message: 'Falha ao comprar produto.' }, { status: 500 });
	}
};
