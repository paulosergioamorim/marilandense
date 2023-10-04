import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { compare } from 'bcryptjs';
import { setAuthCookies } from '$lib/server/cookies';

export const actions: Actions = {
	async default({ cookies, request }) {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const user = await prisma.user.findFirst({
			where: {
				email
			}
		});

		if (!user) return fail(404, { success: false, message: 'Usuário não encontrado.' });

		const passwordMatches = await compare(password, user.passwordHash);

		if (!passwordMatches) return fail(404, { success: false, message: 'Senha inválida.' });

		setAuthCookies(cookies, user.id);

		return {
			success: true,
			message: 'Login realizado com sucesso!'
		};
	}
};
