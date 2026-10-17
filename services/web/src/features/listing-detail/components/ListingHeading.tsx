import { Icon } from '../../../components/Icon'
import type { Listing } from '../listing.types'

export function ListingHeading({ listing, saved, pending, notice, onSave }: {
  listing: Listing; saved: boolean; pending: boolean; notice: string; onSave: () => void
}) {
  const search = `/listings?city=${encodeURIComponent(listing.location.city)}`
  return (
    <div className="listing-intro">
      <nav className="breadcrumb eyebrow" aria-label="Breadcrumb">
        <a href={search}>{listing.location.city}</a><span aria-hidden="true">/</span>
        <a href={`${search}&neighborhood=${encodeURIComponent(listing.location.neighborhood)}`}>{listing.location.neighborhood}</a>
        <span aria-hidden="true">/</span><span>{listing.type}</span>
      </nav>
      <div className="listing-heading">
        <div>
          <h1>{listing.title}</h1>
          <p className="listing-subtitle muted">{listing.subtitle}</p>
        </div>
        <div className="save-action">
          <button className="button" aria-pressed={saved} disabled={pending} aria-busy={pending} onClick={onSave}>
            <Icon name="heart" filled={saved} />{pending ? 'Saving…' : saved ? 'Saved' : 'Save home'}
          </button>
          <span className="save-notice small" role="status">{notice}</span>
        </div>
      </div>
    </div>
  )
}
