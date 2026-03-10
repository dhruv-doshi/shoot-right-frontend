// φ ≈ 1.618
const PHI = 1.618033988749895

export default function GoldenRatioOverlay() {
  // Width segments based on golden ratio: 100/φ ≈ 61.8, remainder ≈ 38.2
  const major = (100 / PHI).toFixed(3)          // ~61.8
  const minor = (100 - 100 / PHI).toFixed(3)    // ~38.2
  // Height segments
  const majorH = (100 / PHI).toFixed(3)
  const minorH = (100 - 100 / PHI).toFixed(3)

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Primary vertical division */}
      <line x1={major} y1="0" x2={major} y2="100" stroke="gold" strokeWidth="0.3" strokeOpacity="0.75" />
      {/* Primary horizontal division */}
      <line x1="0" y1={majorH} x2="100" y2={majorH} stroke="gold" strokeWidth="0.3" strokeOpacity="0.75" />
      {/* Secondary rectangle in top-right section */}
      <line x1={major} y1={minorH} x2="100" y2={minorH} stroke="gold" strokeWidth="0.25" strokeOpacity="0.55" />
      {/* Secondary rectangle in bottom-left section */}
      <line x1={minor} y1={majorH} x2={minor} y2="100" stroke="gold" strokeWidth="0.25" strokeOpacity="0.55" />
      {/* Outer rectangle */}
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="gold" strokeWidth="0.2" strokeOpacity="0.4" />
      {/* Intersection highlight */}
      <circle cx={major} cy={majorH} r="1.8" fill="none" stroke="gold" strokeWidth="0.4" strokeOpacity="0.9" />
      <circle cx={major} cy={majorH} r="0.5" fill="gold" fillOpacity="0.9" />
    </svg>
  )
}
