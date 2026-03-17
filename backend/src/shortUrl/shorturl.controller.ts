import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ShortUrlService } from '../shortUrl/shorturl.service';
import { ShortUrl } from '../../prisma/generated/client';
import type { IcreateDTO, IupdateDTO } from './shorturl.types';
import { ValidationPipe } from '@nestjs/common';

@Controller('shortUrl')
export class ShortUrlController {
	constructor(
		private readonly shortUrlService: ShortUrlService,
	) {}

	@Get()
	async getAll(): Promise<ShortUrl[]> {
		return this.shortUrlService.getAll();
	}

	@Get('search')
	async getByShortUrl(@Query('shortUrl') shortUrl: string): Promise<ShortUrl | null> {
		if (!shortUrl) {
			return null;
		}
		return this.shortUrlService.getByShortUrl(shortUrl);
	}

	@Get(':id')
	async getById(@Param('id') id: string): Promise<ShortUrl | null> {
		return this.shortUrlService.getById(+id);
	}

	@Post()
	async create(@Body(new ValidationPipe()) data: IcreateDTO) {
		return this.shortUrlService.create(data);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body(new ValidationPipe()) data: IupdateDTO): Promise<ShortUrl> {
		return this.shortUrlService.update(+id, data);
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<ShortUrl> {
		return this.shortUrlService.delete(+id);
	}
}