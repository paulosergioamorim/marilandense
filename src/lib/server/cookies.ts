import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export function setAuthCookies(cookies: Cookies, userId: string) {
	const token = jwt.sign({ id: userId }, env.JWT_SECRET_KEY, { expiresIn: '1d' });
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
