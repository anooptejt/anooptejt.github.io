import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <h1 className="font-serif text-4xl">That page is not on the desk.</h1>
      <p className="mt-3 text-muted-foreground">Try the library, or send me the topic you expected to find.</p>
      <div className="mt-6 flex gap-3">
        <Button nativeButton={false} render={<Link href="/library" />}>Library</Button>
        <Button nativeButton={false} render={<Link href="/ask" />} variant="outline">Ask me</Button>
      </div>
    </div>
  )
}
