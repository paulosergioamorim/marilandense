import { deleteAuthCookies } from '$lib/server/cookies';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('marilandense_auth_token');

	if (!token) return new Response();

	deleteAuthCookies(cookies);

	return new Response();
};
