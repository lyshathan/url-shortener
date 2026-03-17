import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function Welcome({handleStart}: {handleStart: () => void}) {
	return (
		<div className="flex flex-col justify-center items-center h-screen gap-10">
			<motion.h1 
				className="text-4xl text-white font-semibold"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				Welcome to URL shortener
			</motion.h1>
			<Button onClick={handleStart} variant="outline">Let's start</Button>
		</div>
	)
}

export default Welcome