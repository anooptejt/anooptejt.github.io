import type { Metadata } from "next"
import { Figtree, Newsreader } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteUrl } from "@/lib/site"
import "./globals.css"

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
})

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ask Anoop Tej | Career guidance for engineers",
    template: "%s · Ask Anoop Tej",
  },
  description:
    "Career guidance for adults in DevOps, platform engineering, CI/CD, Kubernetes, and AI-assisted delivery. Explore the guides and contact Anoop on LinkedIn.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
