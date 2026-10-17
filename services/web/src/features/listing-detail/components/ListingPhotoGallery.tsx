import { useState } from 'react'
import { Icon } from '../../../components/Icon'
import type { Listing } from '../listing.types'

export function ListingPhotoGallery({ photo, caption }: { photo: Listing['photo']; caption: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const hasPhoto = photo && photo.src !== failedSource
  return (
    <figure className="listing-photo" aria-label="Room photograph">
      {hasPhoto && photo.crop ? (
        <svg className="cropped-photo" role="img" aria-label={photo.alt}
          viewBox={`${photo.crop.x} ${photo.crop.y} ${photo.crop.width} ${photo.crop.height}`}
          preserveAspectRatio="xMidYMid slice">
          <image href={photo.src} width={photo.crop.sourceWidth} height={photo.crop.sourceHeight}
            onError={() => setFailedSource(photo.src)} />
        </svg>
      ) : hasPhoto ? (
        <img src={photo.src} alt={photo.alt} width="800" height="460"
          fetchPriority="high" onError={() => setFailedSource(photo.src)} />
      ) : (
        <div className="photo-placeholder" role="img" aria-label="Room photograph unavailable">
          <span className="photo-placeholder-icon"><Icon name="home" /></span>
          <span className="photo-placeholder-title">Property photo</span>
        </div>
      )}
      <figcaption className="photo-label eyebrow">{caption}</figcaption>
    </figure>
  )
}
