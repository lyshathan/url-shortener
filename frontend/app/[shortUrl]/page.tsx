'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { UrlService } from "@/lib/services/urlServce";
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button";
import Link from "next/link"

function Redirect({params}: {params: Promise<{shortUrl: string}>}) {
	const router = useRouter();
	const {shortUrl} = use(params);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {

		async function redirect() {
			try {
				const url = await UrlService.getUrlByShortUrl(shortUrl);
				if (new Date(url.expiresAt) < new Date()) {
					setLoading(false);
					setError('Custom url has expired, please refresh');
					return;
				}
				await UrlService.updateUrl({
					...url, count: url.count + 1
				})
				setLoading(false);
				window.location.href = url.initialUrl;
			} catch(error) {
				setLoading(false);
				setError('Wrong url');
			}
		};

		redirect();
	}, [])

	return (
		<>
		<div className=''>
			{loading && 
				<div className="flex flex-col h-screen w-screen m-auto items-center justify-center gap-5">
					<p className="font-semibold text-xl text-center text-white">Redirecting...</p>
					<Spinner className="size-8 text-blue-500 text-center" />
				</div>
			}
			{error && 
				<div className="flex flex-col h-screen w-screen m-auto items-center justify-center gap-5">
					<p className="text-center text-white text-xl">{error}</p>
					<Button variant={"outline"}>
						<Link href="/">Back to custom urls list</Link>
					</Button>
				</div>
			}
		</div>
		</>
	)
}

export default Redirect