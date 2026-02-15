import {
	Armchair,
	ArrowRight,
	ArrowUp,
	Bell,
	File,
	Rocket,
	Star,
} from "lucide-react";
import type { ReactNode } from "react";
import type { SileoPosition } from "sileo";
import { sileo } from "sileo";

/* ----------------------------- Toast types -------------------------------- */

export type ToastType =
	| "success"
	| "error"
	| "warning"
	| "info"
	| "action"
	| "description"
	| "promise"
	| "promise-success"
	| "promise-error"
	| "custom-icon"
	| "custom-flighty";

export interface ToastButton {
	label: string;
	type: ToastType;
}

/* ----------------------------- Button sets -------------------------------- */

export const HOMEPAGE_BUTTONS: ToastButton[] = [
	{ label: "Success", type: "success" },
	{ label: "Error", type: "error" },
	{ label: "Warning", type: "warning" },
	{ label: "Info", type: "info" },
	{ label: "Action", type: "action" },
	{ label: "Promise", type: "promise" },
	{ label: "Icon", type: "custom-icon" },
];

export const PLAYGROUND_BUTTONS: ToastButton[] = [
	{ label: "Success", type: "success" },
	{ label: "Error", type: "error" },
	{ label: "Warning", type: "warning" },
	{ label: "Info", type: "info" },
	{ label: "Action", type: "action" },
	{ label: "Description", type: "description" },
	{ label: "Icon", type: "custom-icon" },
	{ label: "Promise", type: "promise-success" },
	{ label: "Promise Error", type: "promise-error" },
	{ label: "Flighty", type: "custom-flighty" },
];

/* -------------------------- Shared toast JSX ------------------------------ */

const DARK_STYLES = {
	title: "text-white!",
	description: "text-white/75!",
	badge: "bg-white/20! text-white!",
	button: "text-white! bg-white/10! hover:bg-white/15!",
} as const;

function FlightToast(): ReactNode {
	return (
		<div className="flex flex-col gap-4 -mt-1.5 text-white">
			<div className="flex items-center -mb-4 justify-between">
				{/* biome-ignore lint: external logo used in demo toast */}
				<img
					className="h-7.5 -ml-1.5 w-auto"
					src="https://united.mediaroom.com/images/white_logo.png"
					width={72}
					height={30}
					decoding="async"
					alt="United Airlines"
				/>
				<div className="text-sm opacity-50 font-medium tracking-tight leading-none">
					UA13A
				</div>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-2xl font-medium mt-6 tracking-tight leading-none">
					DEL
				</span>
				<div
					className="flex-1 mx-3 relative flex items-center"
					style={{ height: 40 }}
				>
					<svg
						viewBox="0 0 200 36"
						fill="none"
						className="absolute inset-0 -mt-2 w-full h-full overflow-visible mask-x-to-90% mask-x-from-80%"
					>
						<title>Flight path</title>
						<path
							d="M 10 34 Q 100 -20 190 34"
							stroke="#22c55e"
							strokeWidth="2"
							strokeDasharray="6 4"
							strokeOpacity="0.5"
							fill="none"
							vectorEffect="non-scaling-stroke"
							shapeRendering="geometricPrecision"
						/>
					</svg>
					<div className="absolute left-0 bottom-0 size-5 rounded-full bg-green-500/30 flex items-center justify-center z-10">
						<ArrowRight className="size-4 -rotate-40 text-green-500" />
					</div>
					<div className="absolute right-0 bottom-0 size-5 rounded-full bg-green-500/30 flex items-center justify-center z-10">
						<ArrowRight className="size-4 rotate-40 text-green-500" />
					</div>
				</div>
				<span className="text-2xl mt-6 font-medium tracking-tight leading-none">
					SFO
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex flex-col">
					<span className="text-green-400 text-sm font-semibold">On Time</span>
					<p className="text-white/50 text-xs">
						PNR <span className="text-white">EC2QW4</span>
					</p>
				</div>
				<div className="flex items-center gap-1.5 bg-amber-500 rounded-xl px-2.25 py-1.25">
					<Armchair strokeWidth={2.5} className="size-4 text-black" />
					<span className="text-black text-sm font-bold">32K</span>
				</div>
			</div>
		</div>
	);
}

/* ----------------------------- Fire toast --------------------------------- */

export function fireToast(type: ToastType, position?: SileoPosition) {
	switch (type) {
		case "success":
			sileo.success({
				title: "Changes Saved",
				description:
					"Changes saved successfully to the database. Please refresh the page to see the changes.",
				position,
			});
			break;
		case "error":
			sileo.error({
				title: "Something Went Wrong",
				description:
					"We're having trouble saving your changes to the server. Please try again in a few minutes.",
				position,
			});
			break;
		case "warning":
			sileo.warning({
				title: "Storage Almost Full",
				description:
					"You've used 95% of your available storage. Please upgrade your plan to continue.",
				position,
			});
			break;
		case "info":
			sileo.action({
				icon: <ArrowUp className="size-3.5" />,
				title: "New Update Available",
				description:
					"Version 2.0 is now available. Please update your app to continue using the latest features.",
				position,
			});
			break;
		case "action":
			sileo.action({
				title: "File Uploaded",
				icon: <File className="size-3.5" />,
				description: "Your file has been uploaded. Share it with your team?",
				button: {
					title: "Share Now",
					onClick: () => sileo.success({ title: "Link Copied", position }),
				},
				position,
			});
			break;
		case "description":
			sileo.success({
				title: "Payment Received",
				icon: <Bell className="size-3.5" />,
				description: (
					<span className="text-foreground/50">
						We received your payment of $49.00. A receipt has been sent to your
						email.
					</span>
				),
				position,
			});
			break;
		case "promise":
			sileo.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
				loading: { title: "Booking Flight" },
				success: {
					title: "Booking Confirmed",
					fill: "black",
					styles: DARK_STYLES,
					button: {
						title: "View Details",
						onClick: () => sileo.success({ title: "Details Viewed", position }),
					},
					description: <FlightToast />,
				},
				error: { title: "Booking Failed" },
			});
			break;
		case "promise-success":
			sileo.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
				loading: { title: "Saving Changes..." },
				success: {
					title: "Changes Saved",
					icon: <Star className="size-3.5" />,
					description: "All changes have been saved successfully.",
					position,
				},
				error: { title: "Save Failed" },
			});
			break;
		case "promise-error":
			sileo.promise(
				new Promise((_, reject) =>
					setTimeout(() => reject(new Error("Network error")), 2500),
				),
				{
					loading: { title: "Connecting..." },
					success: { title: "Connected" },
					error: {
						title: "Connection Failed",
						styles: { description: "text-white!" },
						description: "Network error — please check your connection.",
						position,
					},
				},
			);
			break;
		case "custom-icon":
			sileo.success({
				title: "Deployment Started",
				icon: <Rocket className="size-3.5" />,
				description: "Your app is being deployed to production.",
				position,
			});
			break;
		case "custom-flighty":
			sileo.action({
				title: "Booking Confirmed",
				fill: "black",
				styles: DARK_STYLES,
				button: {
					title: "View Details",
					onClick: () => sileo.success({ title: "Details Viewed", position }),
				},
				description: <FlightToast />,
				position,
			});
			break;
	}
}
