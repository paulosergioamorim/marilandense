import type { UserRole, ShopStatus, OrderStatus } from "@prisma/client";

export const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const status = {
	role: new Map<UserRole, string>([
		['ADMIN', 'Administrador'],
		['CUSTOMER', 'Cliente'],
		['SELLER', 'Vendedor']
	]),
	shop: new Map<ShopStatus, string>([
		['APPROVED', 'Aprovada'],
		['NOT_APPROVED', 'Não aprovada'],
		['PENDING', 'Pendente de aprovação']
	]),
	order: new Map<OrderStatus, string>([
		['CONFIRMED', 'Confirmado'],
		['APPROVED', 'Aprovada'],
		['CANCELED', 'Cancelada'],
		['DELIVERED', 'Enviado'],
		['PENDING', 'Pendente'],
		['SENT', 'Entregue']
	])
} as const;