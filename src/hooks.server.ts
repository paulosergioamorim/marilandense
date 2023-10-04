import { JWT_PRIVATE_KEY } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { redirect, type Handle } from '@sveltejs/kit';
import { verify, type JwtPayload } from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('marilandense_auth_token');

	if (!token) {
		event.locals.currentUser = null;
		return resolve(event);
	}

	const payload = verify(token, JWT_PRIVATE_KEY) as JwtPayload;

	const currentUser = await prisma.user.findFirst({
		where: {
			id: payload.id
		}
	});

	event.locals.currentUser = currentUser;

	if (event.url.pathname === '/dashboard' && !currentUser)
		throw redirect(301, '/login?redirectTo=/dashboard');

	if (event.url.pathname === '/register' && event.url.searchParams.has('update') && !currentUser)
		event.url.searchParams.delete('update');

	return resolve(event);
};
