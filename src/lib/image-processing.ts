import type { HistogramData, ImageMetadata } from '@/types/analysis'

export async function extractMetadata(file: File): Promise<ImageMetadata> {
  try {
    const exifr = await import('exifr')
    const raw = await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
      xmp: false,
      icc: false,
      iptc: false,
    })

    if (!raw) return buildBasicMetadata(file)

    return {
      make: raw.Make,
      model: raw.Model,
      lens: raw.LensModel,
      focalLength: raw.FocalLength,
      aperture: raw.FNumber,
      shutterSpeed: formatShutterSpeed(raw.ExposureTime),
      iso: raw.ISO,
      exposureMode: raw.ExposureMode,
      whiteBalance: raw.WhiteBalance,
      flash: raw.Flash,
      dateTaken: raw.DateTimeOriginal?.toISOString(),
      width: raw.ExifImageWidth || raw.ImageWidth,
      height: raw.ExifImageHeight || raw.ImageHeight,
      fileSize: file.size,
      format: file.type.split('/')[1]?.toUpperCase(),
      gps:
        raw.latitude && raw.longitude
          ? { lat: raw.latitude, lng: raw.longitude }
          : undefined,
    }
  } catch {
    return buildBasicMetadata(file)
  }
}

function buildBasicMetadata(file: File): ImageMetadata {
  return {
    fileSize: file.size,
    format: file.type.split('/')[1]?.toUpperCase(),
  }
}

function formatShutterSpeed(exposureTime?: number): string | undefined {
  if (!exposureTime) return undefined
  if (exposureTime >= 1) return `${exposureTime}s`
  return `1/${Math.round(1 / exposureTime)}`
}

export function generateHistogramData(img: HTMLImageElement): HistogramData {
  const canvas = document.createElement('canvas')
  const maxDim = 400
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height))
  canvas.width = Math.round((img.naturalWidth || img.width) * scale)
  canvas.height = Math.round((img.naturalHeight || img.height) * scale)

  const ctx = canvas.getContext('2d')
  if (!ctx) return emptyHistogram()

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const red = new Array(256).fill(0)
  const green = new Array(256).fill(0)
  const blue = new Array(256).fill(0)
  const luminance = new Array(256).fill(0)

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
    red[r]++
    green[g]++
    blue[b]++
    luminance[lum]++
  }

  const totalPixels = canvas.width * canvas.height
  const normalize = (arr: number[]) => arr.map((v) => Math.round((v / totalPixels) * 255))

  return {
    red: normalize(red),
    green: normalize(green),
    blue: normalize(blue),
    luminance: normalize(luminance),
  }
}

function emptyHistogram(): HistogramData {
  const empty = new Array(256).fill(0)
  return { red: [...empty], green: [...empty], blue: [...empty], luminance: [...empty] }
}
