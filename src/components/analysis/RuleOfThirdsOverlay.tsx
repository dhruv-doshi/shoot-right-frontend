export default function RuleOfThirdsOverlay() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Vertical lines */}
      <line x1="33.33" y1="0" x2="33.33" y2="100" stroke="white" strokeWidth="0.3" strokeOpacity="0.7" />
      <line x1="66.66" y1="0" x2="66.66" y2="100" stroke="white" strokeWidth="0.3" strokeOpacity="0.7" />
      {/* Horizontal lines */}
      <line x1="0" y1="33.33" x2="100" y2="33.33" stroke="white" strokeWidth="0.3" strokeOpacity="0.7" />
      <line x1="0" y1="66.66" x2="100" y2="66.66" stroke="white" strokeWidth="0.3" strokeOpacity="0.7" />
      {/* Intersection circles */}
      <circle cx="33.33" cy="33.33" r="1.5" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.9" />
      <circle cx="66.66" cy="33.33" r="1.5" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.9" />
      <circle cx="33.33" cy="66.66" r="1.5" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.9" />
      <circle cx="66.66" cy="66.66" r="1.5" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.9" />
      {/* Dot centers */}
      <circle cx="33.33" cy="33.33" r="0.5" fill="white" fillOpacity="0.9" />
      <circle cx="66.66" cy="33.33" r="0.5" fill="white" fillOpacity="0.9" />
      <circle cx="33.33" cy="66.66" r="0.5" fill="white" fillOpacity="0.9" />
      <circle cx="66.66" cy="66.66" r="0.5" fill="white" fillOpacity="0.9" />
    </svg>
  )
}
