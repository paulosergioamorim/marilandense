import type { UserRole } from "@prisma/client";

export const rolesMap = new Map<UserRole, string>([
    ['ADMIN', 'Administrador'],
    ['CUSTOMER', 'Cliente'],
    ['SELLER', 'Vendedor']
])

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
