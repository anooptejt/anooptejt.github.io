import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anooptejt.github.io"),
  title: "Anoop Tej Thotapalli | Independent DevOps & AIOps Architect",
  description:
    "Independent DevOps, platform engineering and AIOps consulting for Engineering Front Door platforms, GitOps, MLOps and cloud transformation.",
  keywords: [
    "DevOps Architect",
    "Platform Engineering",
    "Engineering Front Door",
    "AIOps",
    "MLOps",
    "GitOps",
    "Cloud Architecture",
  ],
  authors: [{ name: "Anoop Tej Thotapalli" }],
  openGraph: {
    type: "website",
    title: "Anoop Tej Thotapalli | Independent DevOps & AIOps Architect",
    description: "Engineering systems, designed with intent.",
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
    title: "Anoop Tej Thotapalli | Independent DevOps & AIOps Architect",
    description: "Engineering systems, designed with intent.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/og.png",
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
