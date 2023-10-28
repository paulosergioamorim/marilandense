import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma, setAuthCookies } from '$lib/server';
import { hash } from 'bcryptjs';
import type { UserRole } from '@prisma/client';

export const actions: Actions = {
	async default({ locals, cookies, request }) {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const phone = formData.get('phone') as string;
		const address = formData.get('address') as string;
		const role = formData.get('role') as UserRole;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		let user = locals.user;

		if (role === 'ADMIN')
			return fail(400, {
				success: false,
				message: 'Não é possível registrar-se como administrador.'
			});

		if (
			!email ||
			!name ||
			!phone ||
			!address ||
			!role ||
			(!user && (!password || !confirmPassword))
		)
			return fail(400, { success: false, message: 'Informações faltam.' });

		if (password && password !== confirmPassword)
			return fail(404, { success: false, message: 'Senhas não coincidem.' });

		let passwordHash = user?.passwordHash ?? (await hash(password, 10));

		user = await prisma.user.upsert({
			create: {
				email,
				name,
				phone,
				address,
				passwordHash,
				role,
				refreshToken: crypto.randomUUID()
			},
			update: {
				email,
				name,
				phone,
				address,
				passwordHash,
				role,
				refreshToken: crypto.randomUUID()
			},
			where: {
				id: user?.id ?? ''
			}
		});

		if (!user) return fail(404, { success: false, message: 'Falha ao realizar cadastro.' });

		setAuthCookies(cookies, user.id);

		return { success: true, message: 'Cadastro realizado com sucesso!' };
	}
};
