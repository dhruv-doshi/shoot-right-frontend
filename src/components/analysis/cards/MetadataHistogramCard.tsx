import type { ImageMetadata, HistogramData } from '@/types/analysis'
import Histogram from '../Histogram'

interface Props {
  metadata: ImageMetadata
  histogram: HistogramData
}

function MetaRow({ label, value }: { label: string; value?: string | number }) {
  if (!value && value !== 0) return null
  return (
    <tr className="border-b border-[var(--border)] last:border-0">
      <td className="py-2 pr-4 text-xs text-[var(--muted-foreground)]">{label}</td>
      <td className="py-2 font-mono text-xs text-[var(--foreground)]">{value}</td>
    </tr>
  )
}

export default function MetadataHistogramCard({ metadata, histogram }: Props) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return undefined
    return bytes > 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(0)} KB`
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* EXIF table */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Camera & EXIF
        </h4>
        <table className="w-full">
          <tbody>
            <MetaRow label="Camera" value={[metadata.make, metadata.model].filter(Boolean).join(' ')} />
            <MetaRow label="Lens" value={metadata.lens} />
            <MetaRow label="Focal Length" value={metadata.focalLength ? `${metadata.focalLength}mm` : undefined} />
            <MetaRow label="Aperture" value={metadata.aperture ? `f/${metadata.aperture}` : undefined} />
            <MetaRow label="Shutter" value={metadata.shutterSpeed} />
            <MetaRow label="ISO" value={metadata.iso} />
            <MetaRow label="Exposure" value={metadata.exposureMode} />
            <MetaRow label="White Balance" value={metadata.whiteBalance} />
            <MetaRow label="Flash" value={metadata.flash} />
            <MetaRow label="Dimensions" value={metadata.width && metadata.height ? `${metadata.width} × ${metadata.height}` : undefined} />
            <MetaRow label="File Size" value={formatFileSize(metadata.fileSize)} />
            <MetaRow label="Format" value={metadata.format} />
            {metadata.dateTaken && (
              <MetaRow label="Taken" value={new Date(metadata.dateTaken).toLocaleString()} />
            )}
            {metadata.gps && (
              <MetaRow label="GPS" value={`${metadata.gps.lat.toFixed(4)}, ${metadata.gps.lng.toFixed(4)}`} />
            )}
          </tbody>
        </table>
      </div>

      {/* Histogram */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Histogram
        </h4>
        <Histogram data={histogram} />
      </div>
    </div>
  )
}
