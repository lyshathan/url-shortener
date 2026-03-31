'use client'

import { useState, useEffect } from "react";

import Welcome from "@/components/Welcome";
import CustomUrlTable from "@/components/CustomUrlTable";
import { Button } from "@/components/ui/button";
import AddUrlDialog from "@/components/AddUrlDialog";
import { IUpdateUrlDto, UrlService } from "@/lib/services/urlServce";

export interface ICustomUrl {
	id: number;
	initialUrl: string;
	shortUrl: string;
	createdAt: string;
	updatedAt: string;
	expiresAt: string;
	count: number;
}

export interface IAddNewUrlData {
	initialUrl: string;
	shortUrl: string
}

export default function Home() {

	const [showTable, setShowTable] = useState(false);
	const [customUrls, setCustomUrls] = useState<ICustomUrl[]>([]);

	async function fetchCustomUrls() {
		try {
			setCustomUrls(await UrlService.getAllUrls());
		} catch (error) {
			console.error('Error fetching URLs:', error);
		}
	}

	async function addNewUrl(initialUrl: string, shortUrl: string): Promise<void> {
		await UrlService.createUrl(initialUrl, shortUrl);
		await fetchCustomUrls();
	}

	async function deleteUrl(id: number) {
		await UrlService.deleteUrl(id);
		await fetchCustomUrls();
	}

	async function updateUrl(dto: IUpdateUrlDto) {
		await UrlService.updateUrl(dto);
		await fetchCustomUrls();
	}

	useEffect(() => {
		fetchCustomUrls();
	}, []);

	function handleStart(): void {
		setShowTable(true);
	}

	return (
		<>
			{!showTable && <Welcome handleStart={handleStart}/>}
			{showTable &&
				<div className="h-screen w-screen flex flex-col justify-center items-center gap-10">
					<h1 className="text-3xl text-white font-semibold text-center">Your custom urls</h1>
					<AddUrlDialog customUrls={customUrls} addNewUrl={addNewUrl}/>
					<CustomUrlTable customUrls={customUrls} deleteUrl={deleteUrl} updateUrl={updateUrl}/>
				</div>
			}
		</>
	);
}
