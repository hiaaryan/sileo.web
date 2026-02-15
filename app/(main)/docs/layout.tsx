"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLink = { href: string; label: string };
type NavGroup = { heading: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const NAV_ITEMS: NavItem[] = [
	{
		heading: "Basics",
		children: [{ href: "/docs", label: "Kickstart" }],
	},
	{
		heading: "API",
		children: [
			{ href: "/docs/api", label: "sileo" },
			{ href: "/docs/api/toaster", label: "Toaster" },
		],
	},
	{
		heading: "Guides",
		children: [{ href: "/docs/styling", label: "Styling" }],
	},
];

function flattenLinks(items: NavItem[]): NavLink[] {
	return items.flatMap((item) =>
		"heading" in item ? item.children : [item],
	);
}

function DocNavLink({
	href,
	label,
	isActive,
	className,
}: NavLink & { isActive: boolean; className?: string }) {
	return (
		<Link
			href={href}
			className={`text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors ${
				isActive
					? "text-foreground bg-accent"
					: "text-muted-foreground hover:text-foreground"
			} ${className ?? ""}`}
		>
			{label}
		</Link>
	);
}

export default function DocsLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex-1 flex flex-col md:flex-row pb-24">
			{/* Mobile docs nav */}
			<nav className="flex md:hidden gap-1.5 pt-4 overflow-x-auto scrollbar-none -ml-1">
				{flattenLinks(NAV_ITEMS).map((link) => (
					<DocNavLink
						key={link.href}
						{...link}
						isActive={pathname === link.href}
						className="shrink-0"
					/>
				))}
			</nav>

			{/* Desktop sidebar */}
			<aside className="hidden md:block w-44 shrink-0 pt-4 pr-8 overflow-visible">
				<nav className="sticky top-8 -ml-3 flex flex-col gap-0.5">
					{NAV_ITEMS.map((item) => {
						if ("heading" in item) {
							return (
								<div
									key={item.heading}
									className="mt-4 first:mt-0 flex flex-col gap-0.5"
								>
									<span className="text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 text-muted">
										{item.heading}
									</span>
									{item.children.map((child) => (
										<DocNavLink
											key={child.href}
											{...child}
											isActive={pathname === child.href}
										/>
									))}
								</div>
							);
						}
						return (
							<DocNavLink
								key={item.href}
								{...item}
								isActive={pathname === item.href}
							/>
						);
					})}
				</nav>
			</aside>

			{/* MDX Content */}
			<main className="flex-1 min-w-0 pt-4">{children}</main>
		</div>
	);
}
