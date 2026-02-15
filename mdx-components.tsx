import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { tokenize } from "sugar-high";

import { TOKEN_COLORS } from "@/lib/token-colors";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="text-2xl font-semibold tracking-tight mt-0 mb-6">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-lg font-semibold tracking-tight mt-12 mb-4 first:mt-0">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-sm font-semibold tracking-tight mt-8 mb-3">
				{children}
			</h3>
		),
		p: ({ children }) => (
			<p className="text-[14px] text-prose leading-relaxed mb-4 transition-colors duration-150">
				{children}
			</p>
		),
		a: ({ href, children }) => {
			const isExternal = href?.startsWith("http");
			if (isExternal) {
				return (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground underline underline-offset-2 decoration-muted hover:decoration-foreground transition-colors duration-150"
					>
						{children}
					</a>
				);
			}
			return (
				<Link
					href={href ?? "#"}
					className="text-foreground underline underline-offset-2 decoration-muted hover:decoration-foreground transition-colors duration-150"
				>
					{children}
				</Link>
			);
		},
		ul: ({ children }) => (
			<ul className="text-[14px] text-prose leading-relaxed mb-4 list-disc pl-5 space-y-1.5 transition-colors duration-150">
				{children}
			</ul>
		),
		ol: ({ children }) => (
			<ol className="text-[14px] text-prose leading-relaxed mb-4 list-decimal pl-5 space-y-1.5 transition-colors duration-150">
				{children}
			</ol>
		),
		li: ({ children }) => <li>{children}</li>,
		code: ({ children, className }) => {
			const isBlock = className?.includes("language-");
			if (isBlock && typeof children === "string") {
				const tokens = tokenize(children);
				return (
					<code>
						{tokens.map(([type, value], i) => {
							const color = TOKEN_COLORS[type];
							if (!color) return value;
							return (
								// eslint-disable-next-line react/no-array-index-key
								<span key={i} style={{ color }}>
									{value}
								</span>
							);
						})}
					</code>
				);
			}
			return (
				<code className="text-[13px] font-mono bg-accent text-prose px-1.5 py-0.5 rounded-md transition-colors duration-150">
					{children}
				</code>
			);
		},
		pre: ({ children }) => (
			<div className="mb-6 rounded-xl border border-border overflow-hidden transition-colors duration-150">
				<pre className="p-4 text-[13px] leading-relaxed font-mono overflow-x-auto">
					{children}
				</pre>
			</div>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-2 border-border pl-4 mb-4 text-muted-foreground italic transition-colors duration-150">
				{children}
			</blockquote>
		),
		hr: () => <hr className="border-border my-10 transition-colors duration-150" />,
		strong: ({ children }) => (
			<strong className="font-semibold text-foreground transition-colors duration-150">{children}</strong>
		),
		table: ({ children }) => (
			<div className="mb-6 rounded-xl border border-border overflow-x-auto transition-colors duration-150">
				<table className="w-full text-[13px]">{children}</table>
			</div>
		),
		thead: ({ children }) => (
			<thead className="bg-accent text-foreground transition-colors duration-150">
				{children}
			</thead>
		),
		th: ({ children }) => (
			<th className="text-left font-semibold px-4 py-2.5 border-b border-border transition-colors duration-150">
				{children}
			</th>
		),
		td: ({ children }) => (
			<td className="px-4 py-2.5 text-prose border-b border-border last:border-b-0 transition-colors duration-150">
				{children}
			</td>
		),
		tr: ({ children }) => (
			<tr className="last:*:border-b-0">{children}</tr>
		),
		...components,
	};
}
