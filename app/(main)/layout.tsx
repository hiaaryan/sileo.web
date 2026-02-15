"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { Toaster } from "sileo";

import { Nav } from "@/components/nav";

export default function MainLayout({ children }: { children: ReactNode }) {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem("sileo-docs-theme");
		if (saved === "dark") setDark(true);
	}, []);

	useEffect(() => {
		localStorage.setItem("sileo-docs-theme", dark ? "dark" : "light");
	}, [dark]);

	return (
		<div
			className={`min-h-dvh w-full flex flex-col bg-background text-foreground transition-colors duration-150 ${dark ? "dark" : ""}`}
		>
			<Toaster
				position="top-center"
				offset={8}
				options={{
					fill: dark ? "#ffffff" : "#171717",
					styles: {
						description: dark ? "text-black/60!" : "text-white/75!",
					},
				}}
			/>

			<div className="max-w-4xl w-full mx-auto px-6 flex-1 flex flex-col">
				<Nav dark={dark} onToggleDark={() => setDark((d) => !d)} />

				<div className="flex-1 flex flex-col">{children}</div>

				<footer className="py-6 flex items-center justify-between border-t border-border transition-colors duration-150">
					<span className="text-xs text-muted-foreground">
						Sileo — MIT License
					</span>
					<Link
						href="/play"
						className="text-xs text-muted-foreground hover:text-foreground transition-colors"
					>
						Playground →
					</Link>
				</footer>
			</div>
		</div>
	);
}
