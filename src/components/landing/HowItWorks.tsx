import { Upload, Cpu, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload your photo',
    description:
      'Drag and drop or browse to upload any JPEG, PNG, WebP or HEIC image up to 20 MB.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI analyzes it',
    description:
      'Our model scores composition, technical quality and color harmony, extracting EXIF data and generating a histogram.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Improve & repeat',
    description:
      'Review the detailed breakdown, visualize overlays, generate an improved version, and use the tips on your next shoot.',
  },
]

export default function HowItWorks() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--secondary)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-base text-[var(--muted-foreground)]">
            From upload to insight in seconds.
          </p>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {/* Connector line (desktop only) */}
          <div className="absolute left-1/3 right-1/3 top-9 hidden h-px bg-[var(--border)] sm:block" />
          <div className="absolute left-2/3 right-0 top-9 hidden h-px bg-[var(--border)] sm:block" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative mb-6 flex h-18 w-18 items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--card)]">
                  <step.icon className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] font-mono text-[10px] font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <span className="mb-1 font-mono text-xs text-[var(--muted-foreground)]">
                {step.number}
              </span>
              <h3 className="mb-2 font-serif text-xl text-[var(--foreground)]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
