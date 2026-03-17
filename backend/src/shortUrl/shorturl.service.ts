import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ShortUrl } from '../../prisma/generated/client';
import { HttpException, HttpStatus } from '@nestjs/common';

import type { IcreateDTO, IupdateDTO } from './shorturl.types';

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

@Injectable()
export class ShortUrlService {
	constructor(
		private prisma: PrismaService,
	) {}

	async getById(id: number): Promise<ShortUrl | null> {
		return this.prisma.shortUrl.findUnique({
			where: { id }
		});
	}

	async getByShortUrl(url: string): Promise<ShortUrl | null> {
		return this.prisma.shortUrl.findUnique({
			where: { shortUrl: url}
		});
	}

	async getAll(): Promise<ShortUrl[]> {
		return this.prisma.shortUrl.findMany();
	}

	async create(data: IcreateDTO): Promise<ShortUrl> {
		const {initialUrl, shortUrl} = data;
		let existing = await this.getByShortUrl(shortUrl);
		if (existing) {
			throw new HttpException('Url already exists', HttpStatus.CONFLICT);
		}
		if (!initialUrl?.trim() || !shortUrl?.trim()) {
			throw new HttpException('Url cannot be empty', HttpStatus.BAD_REQUEST);
		}
		return this.prisma.shortUrl.create({
			data: {
				initialUrl: initialUrl.trim(),
				shortUrl: shortUrl.trim(),
				expiresAt: new Date(Date.now() + TEN_DAYS_MS),
			}
		});
	}

	async update(id: number, data: IupdateDTO): Promise<ShortUrl> {
		const {initialUrl, shortUrl} = data;
		
		const existing = await this.getById(id);
		if (!existing)
			throw new HttpException('This short url does not exist', HttpStatus.NOT_FOUND);
		
		if ((initialUrl !== undefined && !initialUrl?.trim()) || 
			(shortUrl !== undefined && !shortUrl?.trim())) {
			throw new HttpException('Url cannot be empty', HttpStatus.BAD_REQUEST);
		}
		
		if (shortUrl?.trim()) {
			const existingShortUrl = await this.getByShortUrl(shortUrl.trim());
			if (existingShortUrl && existingShortUrl.id !== id) {
				throw new HttpException('Url already exists', HttpStatus.CONFLICT);
			}
		}
		
		const updateData: any = {};
		if (initialUrl !== undefined) {
			updateData.initialUrl = initialUrl.trim();
		}
		if (shortUrl !== undefined) {
			updateData.shortUrl = shortUrl.trim();
		}
		
		if (Object.keys(updateData).length > 0) {
			updateData.expiresAt = new Date(Date.now() + TEN_DAYS_MS);
		}
		
		return this.prisma.shortUrl.update({
			where: {id},
			data: updateData
		});
	}

	async delete(id: number): Promise<ShortUrl> {
		let existing = await this.getById(id);
		if (!existing)
			throw new HttpException('This short url does not exist', HttpStatus.NOT_FOUND);
		return this.prisma.shortUrl.delete({
			where: {id}
		});
	}
}