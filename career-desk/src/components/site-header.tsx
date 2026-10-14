"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { profile } from "@/lib/profile"
import { cn } from "@/lib/utils"

const links = [
  { href: "/career", label: "Career" },
  { href: "/library", label: "Library" },
  { href: "/open-source", label: "Open source" },
  { href: "/interview", label: "Interview" },
  { href: "/ask", label: "Ask me" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="shrink-0">
          <a href="https://anooptejt.github.io/" className="text-xs text-muted-foreground hover:underline">← Anoop’s engineering site</a>
          <Link href="/" className="mt-1 flex flex-wrap items-baseline gap-x-3">
            <span className="font-serif text-lg tracking-tight text-foreground sm:text-2xl">Ask Anoop Tej</span>
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Career desk</span>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Main">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-2 py-1 transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <a href={profile.linkedin} className="rounded-full px-2 py-1 text-foreground/80 hover:bg-muted hover:text-foreground">
            LinkedIn
          </a>
          <a href={profile.x} className="rounded-full px-2 py-1 text-foreground/80 hover:bg-muted hover:text-foreground">
            X
          </a>
        </nav>
      </div>
    </header>
  )
}
