import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { ICustomUrl } from "@/app/page"
import Link from "next/link"

// const APP_URL = 'http://localhost';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost';

function Row({customUrl, deleteUrl}: 
	{
		customUrl: ICustomUrl,
		deleteUrl: (id: number) => Promise<void>
	}) {

	async function handleDelete() {
		try {
			await deleteUrl(customUrl.id)
		} catch(error) {

		}
	}

	async function handleCopyUrl() {
		const urlToCopy = `${APP_URL}/${customUrl.shortUrl}`;
		try {
			await navigator.clipboard.writeText(urlToCopy);
		} catch(error) {
			console.error("Failed to copy:", error);
		}
	}

	return (
		<TableRow>
			<TableCell className="max-w-50 truncate font-semibold">{customUrl.initialUrl}</TableCell>
			<TableCell 
				onClick={handleCopyUrl}
				className="max-w-50 truncate text-center cursor-pointer hover:bg-gray-100 transition-colors"
				title="Click to copy"
			>
				{APP_URL}/{customUrl.shortUrl}
			</TableCell>
			<TableCell className="text-center text-sm text-gray-400">{new Date(customUrl.createdAt).toLocaleDateString('fr-FR')}</TableCell>
			<TableCell className="text-center text-sm text-gray-400">{new Date(customUrl.expiresAt).toLocaleDateString('fr-FR')}</TableCell>
			<TableCell className="text-right">
				<div className="flex gap-2 justify-end">
					<Button variant="outline" asChild>
						<Link href={customUrl.initialUrl} target="_blank">visit</Link>
					</Button>
					<Button onClick={handleDelete} variant="destructive">delete</Button>
				</div>
				
			</TableCell>
		</TableRow>
	)
}

function CustomUrlTable({customUrls, deleteUrl}: 
	{
		customUrls: ICustomUrl[], 
		deleteUrl: (id: number) => Promise<void>,
	}) {
	return (
		<div className="m-3 w-9/10 p-10 rounded-xl shadow-sm/30 bg-white">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Initial url</TableHead>
						<TableHead className="text-center">Custom short url</TableHead>
						<TableHead className="text-center">Created at</TableHead>
						<TableHead className="text-center w-25">Expires at</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customUrls.length > 0 && customUrls.map((customUrl) => (
						<Row key={customUrl.id} customUrl={customUrl} deleteUrl={deleteUrl}/>
					))}
				</TableBody>
			</Table>
			{customUrls.length === 0 && 
				<p className="text-center mt-10 italic">You don't have any custom short url yet.</p>
			}
		</div>
	)
}

export default CustomUrlTable