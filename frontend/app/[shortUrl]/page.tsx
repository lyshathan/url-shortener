'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { use } from "react";
import { UrlService } from "@/lib/services/urlServce";
import { Spinner } from "@/components/ui/spinner"

function Redirect({params}: {params: Promise<{shortUrl: string}>}) {
	const router = useRouter();
	const {shortUrl} = use(params);

	useEffect(() => {

		async function redirect() {
			try {
				const url = await UrlService.getUrlByShortUrl(shortUrl);
				window.location.href = url.initialUrl;
			} catch(error) {
				router.push('/');
			}
		};

		redirect();
	}, [])

	return (
		<>
		<div className='flex flex-col h-screen w-screen m-auto items-center justify-center gap-5'>
			<p className="font-semibold text-xl text-center">Redirecting...</p>
			<Spinner className="size-8" />
		</div>
		</>
	)
}

export default Redirect