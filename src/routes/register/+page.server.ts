import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma, setAuthCookies } from '$lib/server';
import { hash } from 'bcryptjs';
import type { UserRole } from '@prisma/client';

export const actions: Actions = {
	async default({ locals, cookies, request, url }) {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const phone = formData.get('phone') as string;
		const address = formData.get('address') as string;
		const role = formData.get('role') as UserRole;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		const update = url.searchParams.has('update');

		if (role === 'ADMIN')
			return fail(400, {
				success: false,
				message: 'Não é possível registrar-se como administrador.'
			});

		if (password !== '' && password !== confirmPassword)
			return fail(404, { success: false, message: 'Senhas não coincidem.' });

		if (
			!email ||
			!name ||
			!phone ||
			!address ||
			(!update && (!password || !confirmPassword)) ||
			!role
		)
			return fail(400, { success: false, message: 'Informações faltam.' });

		if (update && locals.currentUser) {
			if (password !== '') {
				const passwordHash = await hash(password, 10);
				await prisma.user.update({ data: { passwordHash }, where: { id: locals.currentUser.id } });
			}

			await prisma.user.update({
				data: {
					email,
					name,
					phone,
					address,
					role
				},
				where: {
					id: locals.currentUser.id
				}
			});

			return { success: true, message: 'Usuário atualizado com sucesso!' };
		}

		const passwordHash = await hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				phone,
				address,
				passwordHash,
				role,
				refreshToken: crypto.randomUUID()
			}
		});

		if (!user) return fail(404, { success: false, message: 'Falha ao realizar cadastro.' });

		setAuthCookies(cookies, user.id);

		return { success: true, message: 'Cadastro realizado com sucesso!' };
	}
};
