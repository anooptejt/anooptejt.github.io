import { profile } from "@/lib/profile"

export function ProfileLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 text-sm ${className}`}>
      <a href={profile.linkedin} className="underline underline-offset-4">
        LinkedIn
      </a>
      <a href={profile.x} className="underline underline-offset-4">
        X
      </a>
    </div>
  )
}
