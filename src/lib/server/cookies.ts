import { dev } from '$app/environment';
import { JWT_AUTH_KEY } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';

const { sign } = require('jsonwebtoken');

export function setAuthCookies(cookies: Cookies, userId: string) {
	const token = sign({ id: userId }, JWT_AUTH_KEY, { expiresIn: '1d' });
	const refreshToken = crypto.randomUUID();

	cookies.set('marilandense_auth_token', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24
	});

	cookies.set('marilandense_auth_refresh_token', refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24
	});
}

export function deleteAuthCookies(cookies: Cookies) {
	cookies.delete('marilandense_auth_token');
	cookies.delete('marilandense_auth_refresh_token');
}
