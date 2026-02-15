import { ArrowRight, ArrowUp, File, Rocket } from "lucide-react";
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
	{ label: "Icon", type: "custom-icon" },
	{ label: "Promise", type: "promise" },
];

const AirplaneSeatIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={24}
		height={24}
		color={"#ff0000"}
		fill={"none"}
		{...props}
	>
		<title>Airplane Seat</title>
		<path
			d="M13.9674 17.7501H16.3235L15 20.2501H18C18.5523 20.2501 19 20.6978 19 21.2501C19 21.8023 18.5523 22.2501 18 22.2501H8C7.44772 22.2501 7 21.8023 7 21.2501C7 20.6978 7.44772 20.2501 8 20.2501H12.5L13.9674 17.7501Z"
			fill="#141B34"
		/>
		<path
			d="M12.5001 10.25H18.0001"
			stroke="#141B34"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			opacity="0.4"
			d="M8.48169 17.75H17.9722C19.0921 17.75 20 16.8578 20 15.7571C20 14.25 17.9722 13.7641 17.9722 13.7641C17.9722 13.7641 14.2844 12.3465 10 13.75C10 13.75 9.86099 8.62277 7.70985 2.9207C7.28543 1.79569 5.90119 1.41158 4.88539 2.07713C4.21507 2.51633 3.8807 3.30969 4.0387 4.08608L6.49327 16.1479C6.68283 17.0795 7.51507 17.75 8.48169 17.75Z"
			fill="#141B34"
		/>
	</svg>
);

/* -------------------------- Shared toast JSX ------------------------------ */

function FlightToast(): ReactNode {
	return (
		<div className="flex flex-col gap-4 -mt-1.5">
			<div className="flex items-center -mb-4 justify-between">
				{/* biome-ignore lint: external logo used in demo toast */}
				<img
					className="h-7.5 -ml-1.5 w-auto invert-0 dark:invert"
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
				<span className="text-2xl font-medium mt-6 text-white dark:text-black tracking-tight leading-none">
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
				<span className="text-2xl mt-6 font-medium text-white dark:text-black tracking-tight leading-none">
					SFO
				</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex flex-col">
					<span className="text-green-400 text-sm font-semibold">On Time</span>
					<p className="text-white/50 dark:text-black/50 text-xs">
						PNR <span className="text-white dark:text-black">EC2QW4</span>
					</p>
				</div>
				<div className="flex items-center gap-1.5 bg-amber-500 rounded-xl px-2.25 py-1.25">
					<AirplaneSeatIcon className="size-4 text-black" />
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
		case "promise":
			sileo.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
				loading: { title: "Booking Flight" },
				success: {
					title: "Booking Confirmed",
					button: {
						title: "View Details",
						onClick: () => sileo.success({ title: "Details Viewed", position }),
					},
					description: <FlightToast />,
				},
				error: { title: "Booking Failed" },
				position,
			});
			break;
		case "custom-icon":
			sileo.success({
				title: "Deployment Started",
				icon: <Rocket className="size-3.5" />,
				description: "Your app is being deployed to production.",
				position,
			});
			break;
	}
}
