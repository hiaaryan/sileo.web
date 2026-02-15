"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { sileo } from "sileo";

import { Button } from "@/components/button";
import { fireToast, HOMEPAGE_BUTTONS } from "@/lib/toast-demos";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Home() {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText("npm install sileo");
		setCopied(true);
		sileo.success({ title: "Copied to clipboard" });
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			{/* Hero */}
			<main className="flex-1 flex flex-col items-center justify-center -mt-10">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease }}
					className="text-7xl sm:text-8xl font-semibold tracking-tighter"
				>
					Sileo<span className="text-neutral-300">.</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.08, ease }}
					className="mt-5 text-[15px] text-neutral-400 text-center max-w-md leading-relaxed"
				>
					An opinionated toast component for React. Gooey SVG morphing, spring
					physics, and a minimal API — beautiful by default.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.16, ease }}
					className="flex flex-col items-center gap-5 mt-8"
				>
					{/* Install */}
					<button
						type="button"
						onClick={handleCopy}
						className="h-10 pl-4 pr-3 rounded-xl text-sm font-medium bg-accent active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer group"
					>
						<span className="font-mono text-muted-foreground select-none">
							$
						</span>
						<span className="font-mono text-[13px] text-foreground">
							npm install sileo
						</span>
						<span className="size-6 rounded-lg bg-accent text-muted-foreground flex items-center justify-center group-hover:bg-accent-hover transition-colors">
							{copied ? (
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<title>Copied</title>
									<polyline points="20 6 9 17 4 12" />
								</svg>
							) : (
								<svg
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<title>Copy</title>
									<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
									<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
								</svg>
							)}
						</span>
					</button>

					{/* Links */}
					<div className="flex items-center gap-5">
						<Link
							href="/play"
							className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
						>
							Playground
							<ArrowRight className="size-3" />
						</Link>
						<Link
							href="/docs"
							className="text-xs font-medium text-foreground hover:text-foreground-hover transition-colors"
						>
							Documentation
						</Link>
					</div>
				</motion.div>
			</main>

			{/* Bottom — interactive demo */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.35 }}
				className="flex flex-col items-center gap-3 pb-8"
			>
				<p className="text-[11px] text-neutral-300 tracking-widest uppercase font-medium">
					Try it
				</p>
				<div className="flex flex-wrap items-center justify-center gap-2 px-6">
					{HOMEPAGE_BUTTONS.map((btn) => (
						<Button key={btn.type} onClick={() => fireToast(btn.type)}>
							{btn.label}
						</Button>
					))}
				</div>
			</motion.div>
		</>
	);
}
