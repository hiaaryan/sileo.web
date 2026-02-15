"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, easeOut, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
	{ href: "https://github.com", label: "GitHub", external: true },
	{ href: "/docs", label: "Docs", external: false },
	{ href: "/play", label: "Playground", external: false },
] as const;

interface NavProps {
	className?: string;
	dark?: boolean;
	onToggleDark?: () => void;
}

export function Nav({ className, dark, onToggleDark }: NavProps) {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	// Lock body scroll when open
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<nav
				className={`flex items-center justify-between py-6 ${className ?? ""}`}
			>
				<Link
					href="/"
					className="flex items-center gap-2.5 hover:opacity-70 transition-opacity"
				>
					<span className="text-sm font-semibold tracking-tight">Sileo</span>
				</Link>

				{/* Desktop links */}
				<div className="hidden sm:flex items-center gap-1">
					{NAV_LINKS.map((link) =>
						link.external ? (
							<a
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="h-8 px-3 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center"
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.href}
								href={link.href}
								className="h-8 px-3 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center"
							>
								{link.label}
							</Link>
						),
					)}
					{onToggleDark && (
						<button
							type="button"
							onClick={onToggleDark}
							className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer active:scale-95"
						>
							{dark ? (
								<Sun className="size-3.5" />
							) : (
								<Moon className="size-3.5" />
							)}
						</button>
					)}
				</div>

				{/* Mobile menu button */}
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="sm:hidden h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
				>
					<Menu className="size-4" />
				</button>
			</nav>

			{/* Mobile sidebar */}
			<AnimatePresence>
				{open && (
					<>
						{/* Backdrop */}
						<motion.button
							type="button"
							aria-label="Close menu"
							className="fixed inset-0 z-50 bg-black/40 sm:hidden"
							onClick={close}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4, ease: easeOut }}
						/>

						{/* Panel */}
						<motion.div
							className="fixed top-2 right-2 bottom-2 z-50 w-64 bg-background border border-border rounded-2xl p-2 flex flex-col gap-6 shadow-xl sm:hidden"
							initial={{ opacity: 0, x: "50%" }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: "50%" }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="flex flex-col gap-1">
								{NAV_LINKS.map((link) =>
									link.external ? (
										<a
											key={link.href}
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="h-8 px-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center"
										>
											{link.label}
										</a>
									) : (
										<Link
											key={link.href}
											href={link.href}
											onClick={close}
											className="h-8 px-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center"
										>
											{link.label}
										</Link>
									),
								)}
							</div>

							{onToggleDark && (
								<button
									type="button"
									onClick={onToggleDark}
									className="h-10 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-2 cursor-pointer"
								>
									{dark ? (
										<>
											<Sun className="size-3.5" /> Light mode
										</>
									) : (
										<>
											<Moon className="size-3.5" /> Dark mode
										</>
									)}
								</button>
							)}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
