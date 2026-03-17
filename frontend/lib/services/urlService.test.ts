import { UrlService } from './urlServce';
import type { ICustomUrl } from '@/app/page';
import { describe, it, expect } from '@jest/globals';

describe('UrlService', () => {
	describe('generateShortUrl', () => {
		it('should generate a short url', () => {
			const initialUrl = 'https://github.com/lyshathan';
			const customUrls: ICustomUrl[] = [];
			
			const result = UrlService.generateShortUrl(initialUrl, customUrls);
			
			expect(result).toBe('github1');
		});

		it('should generate a short url for an already existing iitialUrl', () => {
			const initialUrl = 'https://github.com/lyshathan';
			const customUrls: ICustomUrl[] = [
				{ 
					id: 1, 
					initialUrl: 'https://google.com', 
					shortUrl: 'github1', 
					createdAt: new Date().toISOString(), 
					updatedAt: new Date().toISOString(), 
					expiresAt: new Date().toISOString()
				}
			];
			
			const result = UrlService.generateShortUrl(initialUrl, customUrls);
			
			expect(result).toBe('github2');
		});

		it('should handle www prefix', () => {
			const initialUrl = 'https://www.linkedin.com/in/ly-sha-than';
			const customUrls: ICustomUrl[] = [];
			
			const result = UrlService.generateShortUrl(initialUrl, customUrls);
			
			expect(result).toBe('linkedin1');
		});
	});
});
