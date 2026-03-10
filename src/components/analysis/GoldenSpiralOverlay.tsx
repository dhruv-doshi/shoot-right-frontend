// Fibonacci spiral approximation using quarter-circle arcs
// Each square side: 1, 1, 2, 3, 5, 8 (scaled to 100-unit viewport)
// Origin at bottom-left of 8-square

export default function GoldenSpiralOverlay() {
  // Scaled so the full spiral fits in a 100×61.8 area, centered
  // Using SVG arc commands. The spiral grows from center-right.
  // Pre-calculated path for an 8-level Fibonacci spiral
  const spiralPath = `
    M 61.8,61.8
    A 38.2,38.2 0 0 0 61.8,23.6
    A 23.6,23.6 0 0 0 38.2,23.6
    A 14.6,14.6 0 0 0 38.2,38.2
    A 9,9    0 0 0 47.2,38.2
    A 5.6,5.6 0 0 0 47.2,32.6
    A 3.4,3.4 0 0 0 43.8,32.6
    A 2.2,2.2 0 0 0 43.8,34.8
  `

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={spiralPath}
        fill="none"
        stroke="gold"
        strokeWidth="0.5"
        strokeOpacity="0.85"
        strokeLinecap="round"
      />
      {/* Grid lines showing golden rectangles */}
      <line x1="61.8" y1="0" x2="61.8" y2="100" stroke="gold" strokeWidth="0.2" strokeOpacity="0.35" strokeDasharray="2 2" />
      <line x1="0" y1="61.8" x2="100" y2="61.8" stroke="gold" strokeWidth="0.2" strokeOpacity="0.35" strokeDasharray="2 2" />
      <line x1="38.2" y1="0" x2="38.2" y2="61.8" stroke="gold" strokeWidth="0.15" strokeOpacity="0.28" strokeDasharray="2 2" />
      <line x1="38.2" y1="38.2" x2="100" y2="38.2" stroke="gold" strokeWidth="0.15" strokeOpacity="0.28" strokeDasharray="2 2" />
    </svg>
  )
}
