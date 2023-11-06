import { error, type Handle } from '@sveltejs/kit';
import { JWT_AUTH_KEY } from '$env/static/private';
import { prisma } from '$lib/server';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('marilandense_auth_token');

	if (!token) {
		event.locals.user = null;
	} else {
		const payload = jwt.verify(token, JWT_AUTH_KEY) as jwt.JwtPayload;
		const currentUser = await prisma.user.findFirst({
			where: {
				id: payload.id
			}
		});
		event.locals.user = currentUser;
	}

	if (event.url.pathname === '/admin' && event.locals.user?.role !== 'ADMIN')
		throw error(403, { message: 'Você não pode acessar essa página!' });

	return resolve(event);
};
