import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortUrlController } from '../shortUrl/shorturl.controller';
import { ShortUrlService } from '../shortUrl/shorturl.service';
import { PrismaService } from '../prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
		}),
	],
	controllers: [ShortUrlController],
	providers: [PrismaService, ShortUrlService],
})
export class ShortUrlModule {}
