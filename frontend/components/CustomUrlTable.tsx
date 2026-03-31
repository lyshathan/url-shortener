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
import UpdateUrlDialog from "./UpdateUrlDialog"
import { IUpdateUrlDto, UrlService } from "@/lib/services/urlServce"

// const APP_URL = 'http://localhost';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost';

function Row({customUrl, deleteUrl, updateUrl}: 
	{
		customUrl: ICustomUrl,
		deleteUrl: (id: number) => Promise<void>,
		updateUrl: (dto: IUpdateUrlDto) => Promise<void>
	}) {

	const { id, initialUrl, shortUrl, count, createdAt, expiresAt } = customUrl;
	const isExpired = new Date(expiresAt) < new Date();

	async function handleDelete() {
		try {
			await deleteUrl(id)
		} catch(error) {

		}
	}

	async function handleCopyUrl() {
		const urlToCopy = `${APP_URL}/${shortUrl}`;
		try {
			await navigator.clipboard.writeText(urlToCopy);
		} catch(error) {
			console.error("Failed to copy:", error);
		}
	}

	return (
		<TableRow>
			<TableCell className="max-w-50 truncate font-semibold">{initialUrl}</TableCell>
			<TableCell 
				onClick={handleCopyUrl}
				className="max-w-50 truncate text-center cursor-pointer hover:bg-gray-100 transition-colors"
				title="Click to copy"
			>
				{APP_URL}/{shortUrl}
			</TableCell>
			<TableCell className="text-center text-sm text-gray-400">{new Date(createdAt).toLocaleDateString('fr-FR')}</TableCell>
			<TableCell className="text-center text-sm text-gray-400">{new Date(expiresAt).toLocaleDateString('fr-FR')}</TableCell>
			<TableCell className="text-center text-sm text-gray-400">{count}</TableCell>
			<TableCell className="text-right">
				<div className="flex gap-2 justify-end">
					<Button
						variant={isExpired ? "outline" : "secondary"}
						asChild
						disabled={isExpired}
						onClick={() => updateUrl({
							id: id.toString(),
							initialUrl,
							shortUrl,
							count: count + 1,
						})}
					>
						<Link href={customUrl.initialUrl} target="_blank">visit</Link>
					</Button>

					<Button variant="outline" 
						onClick={() => updateUrl({
							id: id.toString(),
							initialUrl,
							shortUrl,
							count
						})}
					>
						refresh
					</Button>

					<UpdateUrlDialog currentCustomUrl={customUrl} updateNewUrl={updateUrl}/>

					<Button onClick={handleDelete} variant="destructive">delete</Button>
				</div>
			</TableCell>
		</TableRow>
	)
}

function CustomUrlTable({customUrls, deleteUrl, updateUrl}: 
	{
		customUrls: ICustomUrl[], 
		deleteUrl: (id: number) => Promise<void>,
		updateUrl: (dto: IUpdateUrlDto) => Promise<void>,
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
						<TableHead className="text-center w-25">N. of visit</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customUrls.length > 0 && customUrls.map((customUrl) => (
						<Row key={customUrl.id} customUrl={customUrl} deleteUrl={deleteUrl} updateUrl={updateUrl}/>
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