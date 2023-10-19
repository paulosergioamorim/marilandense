import type { OrderStatus, ShopStatus, UserRole } from '@prisma/client';

export const rolesMap = new Map<UserRole, string>([
	['ADMIN', 'Administrador'],
	['CUSTOMER', 'Cliente'],
	['SELLER', 'Vendedor']
]);

export const shopStatusMap = new Map<ShopStatus, string>([
	['APPROVED', 'Aprovada'],
	['NOT_APPROVED', 'Não aprovada'],
	['PENDING', 'Pendente de aprovação']
]);

export const saleStatusMap = new Map<OrderStatus, string>([
	['CONFIRMED', 'Confirmado'],
	['APPROVED', 'Aprovada'],
	['CANCELED', 'Cancelada'],
	['DELIVERED', 'Enviado'],
	['PENDING', 'Pendente'],
	['SENT', 'Entregue']
]);

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useTooltip(node: HTMLElement, { tooltip = ''}) {

}
