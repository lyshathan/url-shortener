import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export interface IshortUrl {
	id: number;
	initialUrl: string;
	shortUrl: string;
	createdAt: string;
	updatedAt: string;
	expiresAt: string;
}

export class IcreateDTO {
	@IsUrl()
	@IsNotEmpty()
	initialUrl: string;

	@IsString()
	@IsNotEmpty()
	shortUrl: string;
};

export class IupdateDTO {
	@IsOptional()
	@IsUrl()
	initialUrl?: string;

	@IsOptional()
	@IsUrl()
	shortUrl?: string;
};
