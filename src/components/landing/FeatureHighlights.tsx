import { Layers, Aperture, Palette } from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Composition Analysis',
    description:
      'Rule of thirds, golden ratio, leading lines, balance — visualized with interactive overlays directly on your image.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Aperture,
    title: 'Technical Review',
    description:
      'Sharpness, exposure, noise, chromatic aberration and lens distortion scored and explained in plain language.',
    color: 'text-[var(--accent)]',
    bg: 'bg-[var(--accent)]/10',
  },
  {
    icon: Palette,
    title: 'Color & Aesthetics',
    description:
      'Dominant color palette extraction, harmony analysis, mood assessment, and specific post-processing recommendations.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
]

export default function FeatureHighlights() {
  return (
    <section className="border-t border-[var(--border)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
            Three lenses of analysis
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--muted-foreground)]">
            Every upload triggers a comprehensive multi-dimensional analysis covering the pillars of
            great photography.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 transition-shadow hover:shadow-md"
            >
              <div className={`mb-5 inline-flex rounded-lg p-3 ${f.bg}`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="mb-2 font-serif text-xl text-[var(--foreground)]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
