"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { SileoPosition } from "sileo";

import { Button } from "@/components/button";
import { fireToast, PLAYGROUND_BUTTONS } from "@/lib/toast-demos";

const POSITIONS: SileoPosition[] = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Playground() {
	const [position, setPosition] = useState<SileoPosition>("top-right");

	return (
		<>
			{/* Center */}
			<main className="flex-1 flex flex-col items-center justify-center -mt-10">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease }}
					className="text-4xl sm:text-5xl font-semibold tracking-tighter"
				>
					Playground<span className="text-neutral-300">.</span>
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.08, ease }}
					className="mt-4 text-[15px] text-neutral-400 text-center max-w-sm leading-relaxed"
				>
					Pick a position, click any type to fire it live.
				</motion.p>
			</main>

			{/* Bottom controls */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.25 }}
				className="flex flex-col items-center gap-3 pb-8"
			>
				{/* Position picker */}
				<div className="flex flex-wrap items-center justify-center gap-1.5">
					{POSITIONS.map((pos) => (
						<Button
							key={pos}
							onClick={() => setPosition(pos)}
							className={
								position === pos
									? "bg-foreground text-background hover:bg-foreground hover:text-background"
									: ""
							}
						>
							{pos}
						</Button>
					))}
				</div>

				{/* Toast buttons */}
				<div className="flex flex-wrap items-center justify-center gap-2 px-6">
					{PLAYGROUND_BUTTONS.map((btn) => (
						<Button
							key={btn.type}
							onClick={() => fireToast(btn.type, position)}
						>
							{btn.label}
						</Button>
					))}
				</div>
			</motion.div>
		</>
	);
}
