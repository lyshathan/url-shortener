import { PrismaClient, Prisma } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const urlData: Prisma.ShortUrlCreateInput[] = [
	{
		initialUrl: 'lysha-than.fr',
		shortUrl: 'portfolio',
	},
	{
		initialUrl: 'linkedin.com/in/ly-sha-than/',
		shortUrl: 'linkedin',
	},
	{
		initialUrl: 'github.com/lyshathan',
		shortUrl: 'github',
	},
];

async function main() {
	console.log(`Start seeding ...`);

	// Clear existing data
	await prisma.shortUrl.deleteMany();

	for (const u of urlData) {
		const shortUrl = await prisma.shortUrl.create({
			data: u,
		});
		console.log(`Created url with id: ${shortUrl.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
.then(async () => {
	await prisma.$disconnect();
})
.catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1);
});