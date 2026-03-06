import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const mono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sileo",
	description:
		"A tiny, beautiful, physics-based toast component for React. SVG morphing and spring animations.",
	icons: {
		apple: "/sileo.png",
		icon: "/sileo.ico",
		shortcut: "/sileo.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${sans.variable} ${mono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
