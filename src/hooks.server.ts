import { JWT_AUTH_KEY } from '$env/static/private';
import { prisma } from '$lib/server';
import type { Handle } from '@sveltejs/kit';
import type { JwtPayload } from 'jsonwebtoken';

const { verify } = require('jsonwebtoken');

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('marilandense_auth_token');

	if (!token) {
		event.locals.user = null;
		return resolve(event);
	}

	const payload = verify(token, JWT_AUTH_KEY) as JwtPayload;
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
