"use client";

import { Rocket } from "lucide-react";
import { useState } from "react";
import { sileo } from "sileo";
import { tokenize } from "sugar-high";

import { Button } from "@/components/button";
import { TOKEN_COLORS } from "@/lib/token-colors";

/* --------------------------------- Demos ---------------------------------- */

const DEMOS: Record<string, () => void> = {
	success: () => sileo.success({ title: "Changes saved" }),
	error: () =>
		sileo.error({
			title: "Something went wrong",
			description: "Please try again later.",
		}),
	warning: () => sileo.warning({ title: "Storage almost full" }),
	info: () => sileo.info({ title: "New update available" }),
	action: () =>
		sileo.action({
			title: "File uploaded",
			description: "Share it with your team?",
			button: {
				title: "Share",
				onClick: () => {},
			},
		}),
	promise: () => {
		sileo.promise(new Promise((r) => setTimeout(r, 2000)), {
			loading: { title: "Loading..." },
			success: { title: "Done!" },
			error: { title: "Failed" },
		});
	},
	"fill-accent": () => sileo.success({ title: "Saved", fill: "#171717" }),
	"fill-dark": () =>
		sileo.success({
			title: "Booking confirmed",
			fill: "black",
			styles: { title: "text-white!", description: "text-white/75!" },
		}),
	"style-override": () =>
		sileo.action({
			title: "New Sale",
			fill: "black",
			styles: {
				title: "text-white!",
				description: "text-white/75!",
				badge: "bg-white/20!",
				button: "bg-white/10! hover:bg-white/15!",
			},
		}),
	"custom-icon": () =>
		sileo.success({
			title: "Deployed",
			icon: <Rocket className="size-3.5" />,
		}),
	"custom-description": () =>
		sileo.success({
			title: "Payment received",
			description: (
				<span className="text-green-500/50! font-medium!">
					We received your payment of $49.00.
				</span>
			),
		}),
	roundness: () => sileo.success({ title: "Sharp corners", roundness: 8 }),
	"autopilot-off": () =>
		sileo.success({
			title: "Manual only",
			description: "Expand and collapse are disabled.",
			autopilot: false,
		}),
	"autopilot-custom": () =>
		sileo.success({
			title: "Custom timing",
			description: "Expand after 500ms, collapse after 3s.",
			autopilot: { expand: 500, collapse: 3000 },
		}),
};

/* -------------------------------- Component ------------------------------- */

interface CodePreviewProps {
	code: string;
	actions: { label: string; id: string }[];
}

export function CodePreview({ code, actions }: CodePreviewProps) {
	const [tab, setTab] = useState<"preview" | "code">("preview");
	const tokens = tokenize(code);

	return (
		<div className="mb-6 rounded-xl border border-border overflow-hidden transition-colors duration-150">
			{/* Tabs */}
			<div className="flex items-center bg-accent/40 border-b border-border transition-colors duration-150">
				{(["preview", "code"] as const).map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => setTab(t)}
						className={`px-4 h-10 text-[12px] font-medium transition-colors duration-150 cursor-pointer border-b-2 -mb-px ${
							tab === t
								? "text-foreground border-foreground"
								: "text-muted-foreground border-transparent hover:text-foreground"
						}`}
					>
						{t === "preview" ? "Preview" : "Code"}
					</button>
				))}
			</div>

			{/* Content */}
			{tab === "preview" ? (
				<div className="flex items-center justify-center gap-2 flex-wrap px-6 py-10">
					{actions.map((action) => (
						<Button key={action.id} onClick={() => DEMOS[action.id]?.()}>
							{action.label}
						</Button>
					))}
				</div>
			) : (
				<pre className="p-4 text-[13px] leading-relaxed font-mono overflow-x-auto">
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
				</pre>
			)}
		</div>
	);
}
