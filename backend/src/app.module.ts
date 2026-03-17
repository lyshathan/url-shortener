import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortUrlModule } from './shortUrl/shorturl.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
		}),
		ShortUrlModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
