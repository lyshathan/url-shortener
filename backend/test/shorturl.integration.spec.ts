import { ShortUrlService } from '../src/shortUrl/shorturl.service';
import { PrismaService } from '../src/prisma.service';


describe('ShortUrlService - Integration tests', () => {
	let service: ShortUrlService;
	let prisma: PrismaService;

	beforeAll(async () => {
		prisma = new PrismaService({
			get: (key: string) => process.env[key],
		} as any);
		
		service = new ShortUrlService(prisma);
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.shortUrl.deleteMany();
		await prisma.$disconnect();
	});

	describe('create', () => {

		it('should create a short url', async () => {
		const result = await service.create({
			initialUrl: 'https://lysha-than.fr',
			shortUrl: 'test-url',
		});
		expect(result.shortUrl).toBe('test-url');
		});

		it('should create a short url for a existing initialUrl', async () => {
		const result = await service.create({
			initialUrl: 'https://lysha-than.fr',
			shortUrl: 'test2-url',
		});
		expect(result.shortUrl).toBe('test2-url');
		});

		it('should throw conflict if shortUrl exists', async () => {
		await service.create({
			initialUrl: 'https://example.com',
			shortUrl: 'test-existing',
		});
		await expect(
			service.create({
			initialUrl: 'https://other.com',
			shortUrl: 'test-existing',
			})
		).rejects.toThrow('Url already exists');
		});

		it('should throw error if initialUrl is empty', async () => {
		await expect(
			service.create({
			initialUrl: '   ',
			shortUrl: 'empty',
			})
		).rejects.toThrow('Url cannot be empty');
		});

		it('should throw error if shortUrl is empty', async () => {
		await expect(
			service.create({
			initialUrl: 'https://example.com',
			shortUrl: '   ',
			})
		).rejects.toThrow('Url cannot be empty');
		});
	});

	describe('get', () => {
		it('should return all ShortUrl', async () => {
		const result = await service.getAll();
		expect(result.length).toEqual(3);
		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					initialUrl: 'https://lysha-than.fr',
					shortUrl: 'test-url',
				}),
				expect.objectContaining({
					initialUrl: 'https://lysha-than.fr',
					shortUrl: 'test2-url',
				}),
				expect.objectContaining({
					initialUrl: 'https://example.com',
					shortUrl: 'test-existing',
				}),
			])
		);
		})

		it('should get the correct initialUrl', async () => {
			const result = await service.getByShortUrl('test-url');
			expect(result!.initialUrl).toBe('https://lysha-than.fr');
		});
	});

		

	describe('update', () => {

		it('should update short url', async () => {
		const existing = await service.getByShortUrl('test-url');
		const result = await service.update(existing?.id!, {initialUrl: 'https://google.com', shortUrl: 'test3-url'});
		expect(result.initialUrl).toBe('https://google.com');
		expect(result.shortUrl).toBe('test3-url');
		});

		it('should throw error if initialUrl is empty', async () => {
		const existing = await service.getByShortUrl('test3-url');
		await expect(
			service.update(existing!.id!, {initialUrl: '    '})
		).rejects.toThrow('Url cannot be empty');
		});

		it('should throw error if shortUrl is empty', async () => {
		const existing = await service.getByShortUrl('test3-url');
		await expect(
			service.update(existing!.id!, {shortUrl: '    '})
		).rejects.toThrow('Url cannot be empty');
		});

		it('should throw conflict if shortUrl exists on update', async () => {
		const existing = await service.getByShortUrl('test3-url');
		await expect(
			service.update(existing!.id!, {shortUrl: 'test2-url'})
		).rejects.toThrow('Url already exists');
		});

	});
});