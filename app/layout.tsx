import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Native Resolution",
    description: "Native Resolution Database for Anime",
    openGraph: {
        title: "Native Resolution",
        description: "Native Resolution Database for Anime",
        url: "https://native-res.vercel.app",
        siteName: "Native Resolution"
    },
    twitter: {
        card: "summary_large_image",
        title: "Native Resolution",
        description: "Native Resolution Database for Anime"
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
