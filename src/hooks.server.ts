import type { Handle } from '@sveltejs/kit';
import { JWT_AUTH_KEY } from '$env/static/private';
import { prisma } from '$lib/server';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('marilandense_auth_token');

	if (!token) {
		event.locals.user = null;
		return resolve(event);
	}

	const payload = jwt.verify(token, JWT_AUTH_KEY) as jwt.JwtPayload;
	const currentUser = await prisma.user.findFirst({
		where: {
			id: payload.id
		}
	});

	if (!currentUser) {
		event.locals.user = null;
		return resolve(event);
	}

	event.locals.user = currentUser;

	return resolve(event);
};
