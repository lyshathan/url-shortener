import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"

import { ICustomUrl } from "@/app/page"
import { UrlService } from "@/lib/services/urlServce"

function AddUrlDialog({customUrls, addNewUrl}: {customUrls: ICustomUrl[], addNewUrl: (initialUrl: string, shortUrl: string)=>Promise<void>}) {
	const formRef = useRef<HTMLFormElement>(null);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [initialUrl, setInitialUrl] = useState('');
	const [shortUrl, setShortUrl] = useState('');

	async function handleSubmit(e: any) {
		e.preventDefault();
		setError(null);
		
		if (!formRef.current) return;
		
		try {
			const formData = new FormData(formRef.current);
			const initialUrl = formData.get('initialUrl') as string;
			const shortUrl = formData.get('custom') as string;
			
			await addNewUrl(initialUrl, shortUrl);
			formRef.current.reset();
			setShortUrl('');
			setOpen(false);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Une erreur est survenue';
			setError(message);
		}
	}

	function handleChangeInitialUrl(e: React.ChangeEvent<HTMLInputElement >){
		const value = e.target.value;
		setInitialUrl(value);
	}


	function handleChangeShortlUrl(e: React.ChangeEvent<HTMLInputElement >){
		const value = e.target.value;
		setShortUrl(value);
	}

	function handleGenerate() {
		try {
			const generated = UrlService.generateShortUrl(initialUrl, customUrls);
			setShortUrl(generated);
			setError(null);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed generate short url';
			setError(errorMessage);
		}
	}

	function handleOpenChange() {
		setOpen(!open);
		setShortUrl('');
		setInitialUrl('');
		if (!open)
			setError(null);
	}

	return (
		<>
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="default" className="bg-blue-700 hover:bg-blue-800">Add new url</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-sm">
				<form ref={formRef} onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Create your new custom URL</DialogTitle>
						<DialogDescription className='mb-10'>
						Here you can create your own special url or generate one.
						</DialogDescription>
					</DialogHeader>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded">
							{error}
						</div>
					)}

					<FieldGroup>
						<Field>
							<Label htmlFor="initial-url">Initial url</Label>
							<Input onChange={handleChangeInitialUrl} className="placeholder:text-gray-300" id="initial-url" name="initialUrl" placeholder="https://example.com/" value={initialUrl}/>
						</Field>

						<Field>
							<Label htmlFor="custom">Custom url</Label>
							<Input onChange={handleChangeShortlUrl} className="placeholder:text-gray-300" id="custom" name="custom" placeholder="myurl" value={shortUrl}/>
							<Button variant='default'type="button" onClick={handleGenerate} className="mb-5 bg-blue-700 hover:bg-blue-800">Generate</Button>
						</Field>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
							
						<Button type="submit">Add</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
		</>
	)
}

export default AddUrlDialog