import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteName, siteUrl } from "./seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevOps, Platform Engineering & AIOps Architect | Anoop Tej",
    template: "%s | Anoop Tej",
  },
  description:
    "Independent DevOps, platform engineering and AIOps architect helping global teams build secure delivery platforms, GitOps and AI assisted operations.",
  keywords: [
    "DevOps Architect",
    "Platform Engineering",
    "Engineering Front Door",
    "AIOps",
    "MLOps",
    "GitOps",
    "Cloud Architecture",
    "DevOps Speaker",
    "Technical Writing",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,
    title: "DevOps, Platform Engineering & AIOps Architect | Anoop Tej",
    description:
      "Independent architecture consulting for secure delivery platforms, GitOps and AI assisted operations.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Anoop Tej Thotapalli, DevOps, Platform Engineering and AIOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOps, Platform Engineering & AIOps Architect | Anoop Tej",
    description:
      "Independent architecture consulting for secure delivery platforms, GitOps and AI assisted operations.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
