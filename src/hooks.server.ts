import { error, redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { deleteAuthCookies, prisma } from '$lib/server';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('marilandense_auth_token');

	if (!token) {
		event.locals.user = null;
	} else {
		try {
			const payload = jwt.verify(token, env.JWT_SECRET_KEY) as jwt.JwtPayload;
			const user = await prisma.user.findFirst({
				where: {
					id: payload.id
				}
			});
			event.locals.user = user;
		} catch (e) {
			deleteAuthCookies(event.cookies);
		}
	}

	if (event.url.pathname === '/admin' && event.locals.user?.role !== 'ADMIN')
		throw error(403, { message: 'Você não pode acessar essa página!' });

	if (event.url.pathname === '/my' && !event.locals.user) throw redirect(303, '/sign-in');

	return resolve(event);
};
