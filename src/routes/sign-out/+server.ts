import { deleteAuthCookies } from '$lib/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	const token = cookies.get('marilandense_auth_token');

	if (!locals.user || !token) return json({ message: 'Usuário não encontrado' }, { status: 404 });

	deleteAuthCookies(cookies);

	return new Response();
};
