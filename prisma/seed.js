import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const tags = ['Carne vermelha', 'Carne branca', 'Legume', 'Leite', 'Queijo', 'Folha', 'Fruta'];

async function main() {
	// await prisma.tag.createMany({
	// 	data: tags.map((tag) => ({ title: tag }))
	// });
}

main()
	.then(() => prisma.$disconnect())
	.catch((e) => {
		console.error(e);
		prisma.$disconnect();
		process.exit(1);
	});
