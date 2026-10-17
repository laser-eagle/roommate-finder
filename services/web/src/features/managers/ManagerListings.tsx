import { useRef } from 'react'
import { Icon } from '../../components/Icon'
import { formatLocalDate, formatMoney } from '../listing-detail/costs'
import type { ListingStatus, ManagedListing } from './managers.mock'

export type ListingFilter = 'All' | ListingStatus

export function ManagerListings({ listings, filter, query, onFilter, onQuery, onEdit, onToggle, onCreate }: {
  listings: ManagedListing[]
  filter: ListingFilter
  query: string
  onFilter: (filter: ListingFilter) => void
  onQuery: (query: string) => void
  onEdit: (listing: ManagedListing) => void
  onToggle: (listing: ManagedListing) => void
  onCreate: () => void
}) {
  const filters = useRef<HTMLDivElement>(null)
  const visible = listings.filter((listing) => (filter === 'All' || listing.status === filter)
    && `${listing.title} ${listing.neighborhood}`.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <section id="manager-listings" className="manager-section" aria-labelledby="portfolio-heading">
      <div className="manager-section-heading">
        <div><span className="eyebrow muted">Portfolio</span><h2 id="portfolio-heading">Listings</h2></div>
        <span className="manager-count">{listings.length} listings</span>
      </div>
      <div className="manager-filters">
        <div ref={filters} className="manager-filter-buttons" role="group" aria-label="Filter listings by status">
          {(['All', 'Live', 'Draft', 'Paused'] as const).map((value) => (
            <button key={value} aria-pressed={filter === value} onClick={() => onFilter(value)}>
              {value}<span>{value === 'All' ? listings.length : listings.filter((listing) => listing.status === value).length}</span>
            </button>
          ))}
        </div>
        <label className="manager-search"><span className="sr-only">Search listings by name or location</span>
          <input type="search" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search listings" />
        </label>
      </div>
      <p className="sr-only" role="status">{visible.length} {visible.length === 1 ? 'listing' : 'listings'} shown.</p>
      <ul className="manager-listings">
        {visible.map((listing) => (
          <li key={listing.id} className="manager-listing">
            <div className="manager-listing-identity">
              <div className={`manager-thumbnail ${listing.photo ? '' : 'manager-thumbnail-empty'}`}>
                {listing.photo?.crop ? <svg viewBox={`${listing.photo.crop.x} ${listing.photo.crop.y} ${listing.photo.crop.width} ${listing.photo.crop.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href={listing.photo.src} width={listing.photo.crop.sourceWidth} height={listing.photo.crop.sourceHeight} /></svg> : <Icon name="home" />}
              </div>
              <div><span className={`manager-badge status-${listing.status.toLowerCase()}`}>{listing.status}</span><h3>{listing.title}</h3><p className="small muted">{listing.neighborhood} · {listing.type}</p></div>
            </div>
            <dl className="manager-listing-facts">
              <div><dt className="eyebrow muted">Base rent</dt><dd>{formatMoney(listing.rent)}<span className="small muted"> / mo</span></dd></div>
              <div><dt className="eyebrow muted">Available from</dt><dd>{formatLocalDate(listing.available)}</dd></div>
            </dl>
            <div className="manager-listing-actions">
              <button className="manager-text-action" onClick={() => onEdit(listing)} aria-label={`Edit ${listing.title}`}>{listing.status === 'Draft' ? 'Edit draft' : 'Edit listing'}<Icon name="arrow" /></button>
              {listing.status !== 'Draft' && <button className="manager-quiet-action" onClick={() => {
                if (filter !== 'All') filters.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus()
                onToggle(listing)
              }} aria-label={`${listing.status === 'Live' ? 'Pause' : 'Resume'} ${listing.title}`}>{listing.status === 'Live' ? 'Pause listing' : 'Resume listing'}</button>}
            </div>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <div className="manager-empty"><Icon name="home" /><h3>No matching listings</h3><p className="small muted">Change your search or status filter.</p><button className="button" onClick={() => { onFilter('All'); onQuery('') }}>Clear filters</button></div>}
      <button className="manager-add-row" onClick={onCreate}><span aria-hidden="true">＋</span>Create listing draft<span className="small muted">Not published</span></button>
    </section>
  )
}
