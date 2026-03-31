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
import { IUpdateUrlDto, UrlService } from "@/lib/services/urlServce"

function UpdateUrlDialog({currentCustomUrl, updateNewUrl}: 
	{
		currentCustomUrl: ICustomUrl,
		updateNewUrl: (dto: IUpdateUrlDto)=>Promise<void>
	}) {
	const formRef = useRef<HTMLFormElement>(null);
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [initialUrl, setInitialUrl] = useState(currentCustomUrl.initialUrl);
	const [shortUrl, setShortUrl] = useState(currentCustomUrl.shortUrl);

	async function handleSubmit(e: any) {
		e.preventDefault();
		setError(null);
		
		if (!formRef.current) return;
		
		try {
			const formData = new FormData(formRef.current);
			const initialUrl = formData.get('initialUrl') as string;
			const shortUrl = formData.get('custom') as string;
			
			await updateNewUrl({
				id: currentCustomUrl.id.toString(), 
				initialUrl, 
				shortUrl,
				count: currentCustomUrl.count + 1
			});
			formRef.current.reset();
			setShortUrl('');
			setOpen(false);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Failed to update custom Url';
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
				<Button variant="default" className="bg-blue-700 hover:bg-blue-800">update</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-sm">
				<form ref={formRef} onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle className="mb-10">Update your new custom URL</DialogTitle>
					</DialogHeader>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded">
							{error}
						</div>
					)}

					<FieldGroup className="mb-10">
						<Field>
							<Label htmlFor="update-initial-url">Initial url</Label>
							<Input onChange={handleChangeInitialUrl} className="placeholder:text-gray-300" id="update-initial-url" name="initialUrl" defaultValue={currentCustomUrl.initialUrl}/>
						</Field>

						<Field>
							<Label htmlFor="update-custom">Custom url</Label>
							<Input onChange={handleChangeShortlUrl} className="placeholder:text-gray-300" id="update-custom" name="custom" defaultValue={currentCustomUrl.shortUrl}/>
						</Field>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>						
						<Button type="submit">Update</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
		</>
	)
}

export default UpdateUrlDialog