import { ICustomUrl } from "@/app/page";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getAllUrls() {
	const result = await fetch(`${NEXT_PUBLIC_API_URL}/shortUrl`);
	const data = await result.json();
	if (!result.ok)
		throw new Error(data.message || data.error || 'Failed to fetch all urls');
	return data;
}

async function getUrlById(id: string) {
	const result = await fetch(`${NEXT_PUBLIC_API_URL}/shortUrl/${id}`, {
		method: 'GET',
	});
	const data = await result.json();
	if (!result.ok) {
		throw new Error(data.message || data.error || result.statusText);
	}
	return data;
}

async function getUrlByShortUrl(shortUrl: string) {
	const result = await fetch(`${NEXT_PUBLIC_API_URL}/shortUrl/search?shortUrl=${encodeURIComponent(shortUrl)}`);
	const data = await result.json();
	if (!result.ok) {
		throw new Error(data.message || data.error || 'Failed to fetch url by short url');
	}
	return data;
}

async function createUrl(initialUrl: string, shortUrl: string) {
	new URL(initialUrl).hostname;
	const result = await fetch(`${NEXT_PUBLIC_API_URL}/shortUrl`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ initialUrl, shortUrl }),
	});
	const data = await result.json();
	if (!result.ok)
		throw new Error(data.message || data.error || 'Failed to create url');
	return data;
}

async function updateUrl(id: string, initialUrl: string, shortUrl: string) {
	const result = await fetch (`${NEXT_PUBLIC_API_URL}/shortUrl/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			initialUrl,
			shortUrl
		})
	});
	const data = await result.json();
	if (!result.ok)
		throw new Error(data.message || data.error || result.status)
	return data;
}

async function deleteUrl(id: number) {
	const result = await fetch(`${NEXT_PUBLIC_API_URL}/shortUrl/${id}`, {
		method: 'DELETE',
	});
	const data = await result.json();
	if (!result.ok)
		throw new Error(data.message || data.error || 'Failed to delete url');
	return data;
}

function generateShortUrl(initialUrl: string, customUrls: ICustomUrl[]): string {
	let count = 1;
	const extract = extractDomain(initialUrl);
	let generated = extract.split(".")[0].split('/')[0];
	while (customUrls.find((c) => ( c.shortUrl === (generated + count)))) {
		count++;
	}
	return (generated + count);
}

function extractDomain(url: string): string {
	const hostname = new URL(url).hostname;
	return hostname.replace(/^www\./, '');
}

export const UrlService = {
	getAllUrls,
	getUrlById,
	getUrlByShortUrl,
	createUrl,
	updateUrl,
	deleteUrl,
	generateShortUrl,
};