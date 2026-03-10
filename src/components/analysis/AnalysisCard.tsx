'use client'

import { X, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/lib/utils'

interface AnalysisCardProps {
  id: string
  title: string
  icon?: React.ReactNode
  preview?: React.ReactNode
  children: React.ReactNode
}

export default function AnalysisCard({ id, title, icon, preview, children }: AnalysisCardProps) {
  const { openCards, toggleCard, closeCard } = useUIStore()
  const isOpen = openCards.has(id)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border transition-shadow',
        isOpen
          ? 'border-[var(--accent)]/40 bg-[var(--card)] shadow-md'
          : 'border-[var(--border)] bg-[var(--card)] hover:shadow-sm'
      )}
    >
      {/* Header — always visible */}
      <button
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
        onClick={() => toggleCard(id)}
        aria-expanded={isOpen}
      >
        {icon && (
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--accent)]">
            {icon}
          </span>
        )}
        <span className="flex-1 font-serif text-lg text-[var(--foreground)]">{title}</span>
        {preview && !isOpen && (
          <span className="hidden text-xs text-[var(--muted-foreground)] sm:block">{preview}</span>
        )}
        <ChevronDown
          className={cn(
            'h-4 w-4 flex-shrink-0 text-[var(--muted-foreground)] transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Expandable body */}
      <div className={cn('card-grid-expand', isOpen && 'open')}>
        <div className="card-grid-inner">
          <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
            {/* Close button */}
            <div className="mb-3 flex justify-end">
              <button
                onClick={() => closeCard(id)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
