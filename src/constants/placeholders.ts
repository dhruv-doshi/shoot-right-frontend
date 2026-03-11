import type { FullAnalysis, UserImage } from '@/types/analysis'

// Generate sine-wave histogram data (256 values)
function generateHistogramChannel(phase: number, amplitude: number, baseline: number): number[] {
  return Array.from({ length: 256 }, (_, i) => {
    const x = i / 255
    const value =
      baseline +
      amplitude * Math.sin(Math.PI * x * 3 + phase) +
      amplitude * 0.5 * Math.sin(Math.PI * x * 7 + phase * 1.5) +
      amplitude * 0.25 * Math.exp(-Math.pow((x - 0.5) * 3, 2))
    return Math.max(0, Math.min(255, Math.round(value)))
  })
}

export const PLACEHOLDER_ANALYSIS: FullAnalysis = {
  id: 'placeholder-analysis-001',
  imageUrl: 'https://picsum.photos/seed/shootright/1200/800',
  thumbnailUrl: 'https://picsum.photos/seed/shootright/400/300',
  filename: 'mountain_landscape.jpg',
  uploadedAt: '2026-03-10T09:30:00Z',
  status: 'completed',
  overallScore: 78,
  summaryHeadline: 'Strong Composition with Room for Technical Improvement',
  summaryText:
    'This landscape photograph demonstrates excellent compositional instincts with the horizon positioned along the upper third and leading lines drawing the eye naturally into the frame. The golden hour lighting creates a warm, inviting atmosphere. However, the image suffers from slight overexposure in the highlight areas and could benefit from a polarizing filter to reduce atmospheric haze. The depth of field is well-chosen, keeping both foreground and background elements sharp. With minor adjustments in post-processing, this could be an outstanding shot.',
  metadata: {
    make: 'Sony',
    model: 'α7R V',
    lens: 'FE 24-70mm f/2.8 GM II',
    focalLength: '35',
    aperture: '8',
    shutterSpeed: '1/250',
    iso: '200',
    exposureMode: 'Aperture Priority',
    whiteBalance: 'Auto',
    flash: 'No Flash',
    dateTaken: '2026-03-10T06:45:22Z',
    width: 9504,
    height: 6336,
    fileSize: 24576000,
    format: 'JPEG',
    gps: { lat: 46.8523, lng: -121.7603 },
  },
  histogram: {
    red: generateHistogramChannel(0.3, 80, 60),
    green: generateHistogramChannel(0.8, 70, 55),
    blue: generateHistogramChannel(1.4, 65, 45),
    luminance: generateHistogramChannel(0.6, 85, 58),
  },
  composition: {
    score: 84,
    strengths: [
      'Horizon placed along the upper rule-of-thirds line',
      'Strong leading lines from the foreground path',
      'Subject positioned at a golden ratio intersection',
      'Excellent use of negative space on the left',
    ],
    weaknesses: [
      'Slight tilt — horizon is ~0.8° off level',
      'Foreground element partially cut at bottom edge',
    ],
    details:
      'The compositional structure is well-executed with clear intent. The photographer has intuitively applied classical compositional principles, resulting in a balanced yet dynamic frame. The leading lines created by the mountain path guide the viewer\'s gaze naturally toward the snow-capped peak. The rule-of-thirds placement of the horizon avoids the static feel of a centered composition. Consider slight rotation to correct the horizon tilt, and reframing to include more of the foreground element.',
  },
  technical: {
    score: 71,
    sharpness: 'good',
    exposure: 'slightly-over',
    noise: 'minimal',
    strengths: [
      'Excellent sharpness throughout the frame',
      'Minimal noise at ISO 200',
      'Good dynamic range utilization',
    ],
    weaknesses: [
      'Highlight clipping in 2% of cloud area',
      'Slight chromatic aberration at high-contrast edges',
      'Minor lens distortion at 35mm focal length',
    ],
    details:
      'Technical execution is solid with a well-chosen exposure triangle. The aperture of f/8 falls in the sweet spot for this lens, delivering corner-to-corner sharpness. The low ISO of 200 keeps noise imperceptible. The primary technical concern is the highlight clipping in the brightest cloud areas — exposure compensation of -1/3 stop would have preserved this detail. The chromatic aberration is minor and easily corrected in post-processing.',
  },
  colorAesthetic: {
    score: 82,
    dominantColors: [
      { hex: '#E8A87C', name: 'Warm Amber', percentage: 28 },
      { hex: '#4A7C9E', name: 'Mountain Blue', percentage: 24 },
      { hex: '#7BA05B', name: 'Alpine Green', percentage: 19 },
      { hex: '#F2E8D9', name: 'Cream White', percentage: 16 },
      { hex: '#8B6B4A', name: 'Earth Brown', percentage: 13 },
    ],
    colorHarmony: 'Complementary (warm-cool contrast)',
    mood: 'Serene, Expansive, Uplifting',
    strengths: [
      'Beautiful warm-cool color harmony',
      'Natural color palette that enhances the mood',
      'Good color contrast between sky and landscape',
    ],
    weaknesses: ['Slight yellow cast in shadows', 'Saturation could be subtly increased in midtones'],
    details:
      'The color palette is naturally harmonious, with the warm golden hour tones of the foreground providing excellent contrast against the cool blue atmospheric haze in the distance. This warm-cool complementary relationship is one of the most visually appealing color dynamics in landscape photography. The overall mood is serene and expansive, which aligns perfectly with the subject matter.',
  },
  clickingTips: [
    'Shoot from a slightly lower angle (6-12 inches lower) to give the foreground more presence and create a stronger sense of depth.',
    'Use a polarizing filter to reduce atmospheric haze and increase color saturation in the sky by 20-30%.',
    'Try bracketing exposures (±1 stop) to ensure highlight detail retention in the clouds.',
    'Wait for the "sweet spot" 20 minutes after sunrise — the light quality improves significantly and shadows become more defined.',
    'Consider a 2-stop graduated neutral density filter to balance exposure between the bright sky and darker foreground.',
    'Set your camera to electronic shutter to eliminate any mirror vibration that could affect sharpness at 1/250s.',
  ],
  editingTips: [
    'Apply -20 to -30 Highlights to recover the clipped cloud detail — your RAW file likely retains this data.',
    'Add +10 to +15 Clarity to enhance the texture of the mountain rock faces and foreground gravel.',
    'Correct the horizon tilt by rotating -0.8° — this subtle fix makes a significant difference.',
    'Use HSL to shift the blue channel slightly toward cyan to enhance the mountain haze effect.',
    'Apply a subtle S-curve to increase contrast in the midtones while protecting highlights and shadows.',
    'Remove chromatic aberration using the lens correction profile for Sony FE 24-70mm f/2.8 GM II.',
  ],
}

export const PLACEHOLDER_USER_IMAGES: UserImage[] = [
  {
    id: 'img-001',
    url: 'https://picsum.photos/seed/photo1/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/photo1/400/300',
    uploadedAt: '2026-03-10T09:30:00Z',
    filename: 'mountain_landscape.jpg',
    overallScore: 78,
    summaryHeadline: 'Strong Composition with Room for Technical Improvement',
    status: 'completed',
  },
  {
    id: 'img-002',
    url: 'https://picsum.photos/seed/photo2/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/photo2/400/300',
    uploadedAt: '2026-03-08T14:15:00Z',
    filename: 'urban_street_rain.jpg',
    overallScore: 91,
    summaryHeadline: 'Exceptional Mood and Technically Superb',
    status: 'completed',
  },
  {
    id: 'img-003',
    url: 'https://picsum.photos/seed/photo3/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/photo3/400/300',
    uploadedAt: '2026-03-06T17:45:00Z',
    filename: 'portrait_golden_hour.jpg',
    overallScore: 65,
    summaryHeadline: 'Good Subject but Needs Composition Work',
    status: 'completed',
  },
  {
    id: 'img-004',
    url: 'https://picsum.photos/seed/photo4/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/photo4/400/300',
    uploadedAt: '2026-03-04T11:20:00Z',
    filename: 'macro_dewdrop.jpg',
    overallScore: 88,
    summaryHeadline: 'Stunning Macro with Perfect Focus',
    status: 'completed',
  },
  {
    id: 'img-005',
    url: 'https://picsum.photos/seed/photo5/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/photo5/400/300',
    uploadedAt: '2026-03-02T08:00:00Z',
    filename: 'night_cityscape.jpg',
    overallScore: 73,
    summaryHeadline: 'Atmospheric Night Shot with Noise Issues',
    status: 'completed',
  },
  {
    id: 'img-006',
    url: 'https://picsum.photos/seed/photo6/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/photo6/400/300',
    uploadedAt: '2026-02-28T16:30:00Z',
    filename: 'forest_mist.jpg',
    overallScore: 0,
    summaryHeadline: 'Analysis in progress...',
    status: 'processing',
  },
]
