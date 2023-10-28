import { prisma, deleteAuthCookies } from '$lib/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	const token = cookies.get('marilandense_auth_token');

	if (!locals.user || !token) return json({ message: 'Usuário não encontrado' }, { status: 404 });

	deleteAuthCookies(cookies);

	return new Response();
};

export const DELETE: RequestHandler = async ({ locals, cookies }) => {
	const token = cookies.get('marilandense_auth_token');

	if (!locals.user || !token) return json({ message: 'Usuário não encontrado' }, { status: 404 });

	const someShops = await prisma.shop.findMany({
		where: {
			userId: locals.user.id
		}
	});

	if (someShops.length >= 1)
		return json(
			{ message: 'Para excluir sua conta, você precisa primeiramente excluir suas lojas' },
			{ status: 400 }
		);

	await prisma.user.delete({
		where: {
			id: locals.user.id
		}
	});

	deleteAuthCookies(cookies);

	return new Response();
};
