import { JWT_PRIVATE_KEY } from '$env/static/private';
import { prisma } from '$lib/server';
import type { Handle } from '@sveltejs/kit';
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

	if (!currentUser) {
		event.locals.currentUser = null;
		return resolve(event);
	}

	event.locals.currentUser = currentUser;

	return resolve(event);
};
