import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        <div>
          <p className="font-serif text-lg">Ask Anoop Tej</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Questions, ideas, and conversations about anything on your mind.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/about" className="hover:underline">About this desk</Link>
          <a href="https://medium.com/@anoopt0106/" className="hover:underline">Medium</a>
          <a href="https://anooptejt.github.io/" className="hover:underline">Engineering site</a>
          <a href="https://anooptejt.github.io/wonderabouts/" className="hover:underline">Wonderabouts</a>
          <a href="https://www.linkedin.com/in/anooptej-t-a3754b77" className="hover:underline">LinkedIn</a>
          <a href="https://x.com/Anooptej" className="hover:underline">X</a>
        </div>
      </div>
    </footer>
  )
}
