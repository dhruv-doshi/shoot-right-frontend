import { Camera } from 'lucide-react'

interface Props {
  tips: string[]
}

export default function ClickingTipsCard({ tips }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--muted-foreground)]">
        Apply these tips on your next shoot to capture a stronger version of this photo.
      </p>
      <ol className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 font-mono text-xs font-semibold text-[var(--accent)]">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-[var(--foreground)]">{tip}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
