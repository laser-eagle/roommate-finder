import { useState } from 'react'
import type { MouseEvent } from 'react'
import { unitLabel } from './operations.data'
import type { Inquiry, ManagedListing, Tour } from './managers.mock'

export function ManagerWorkQueues({ section, listings, inquiries, tours, listingId, onListing, pendingOnly, onPending, onClear, onInquiry, onTour }: {
  section: 'inquiries' | 'tours'; listings: ManagedListing[]; inquiries: Inquiry[]; tours: Tour[]
  listingId: string; onListing: (id: string) => void; pendingOnly: boolean; onPending: (pending: boolean) => void
  onInquiry: (inquiry: Inquiry) => void; onTour: (tour: Tour) => void
  onClear: () => void
}) {
  const [query, setQuery] = useState('')
  const visibleInquiries = inquiries.filter((inquiry) => (!pendingOnly || !inquiry.reply) && (!listingId || inquiry.listingId === listingId) && inquiry.name.toLowerCase().includes(query.trim().toLowerCase()))
  const visibleTours = tours.filter((tour) => (!pendingOnly || !tour.confirmed) && (!listingId || tour.listingId === listingId) && tour.name.toLowerCase().includes(query.trim().toLowerCase()))
  const count = section === 'inquiries' ? visibleInquiries.length : visibleTours.length
  const getHome = (id: string) => { const listing = listings.find((item) => item.id === id); return listing ? unitLabel(listing) : 'Listing unavailable' }
  const queueHref = (pending: boolean) => `/managers/${section}${pending ? '/pending' : ''}${listingId ? `?listing=${encodeURIComponent(listingId)}` : ''}`
  function followQueue(event: MouseEvent<HTMLAnchorElement>, pending: boolean) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault(); onPending(pending)
  }

  return <section className={`ops-panel ${pendingOnly ? 'ops-detailed-queue' : ''}`} aria-label={section === 'inquiries' ? 'Renter inquiries' : 'Tour schedule'}>
    <div className="ops-inventory-toolbar"><nav className="ops-status-filters ops-queue-navigation" aria-label="Activity lists"><a href={queueHref(false)} aria-current={!pendingOnly ? 'page' : undefined} onClick={(event) => followQueue(event, false)}>All {section}</a><a href={queueHref(true)} aria-current={pendingOnly ? 'page' : undefined} onClick={(event) => followQueue(event, true)}>{section === 'inquiries' ? 'Needs reply' : 'Needs confirmation'}</a></nav><label className="ops-search"><span className="sr-only">Search renter name</span><input type="search" placeholder="Search renter name" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
    <div className="ops-filter-row"><label>Listing<select value={listingId} onChange={(event) => onListing(event.target.value)}><option value="">All listings</option>{listings.map((listing) => <option key={listing.id} value={listing.id}>{unitLabel(listing)}</option>)}</select></label><span role="status">{count} {section === 'inquiries' ? (count === 1 ? 'inquiry' : 'inquiries') : (count === 1 ? 'tour' : 'tours')}</span></div>
    {section === 'inquiries' ? <table className="ops-table ops-activity-table"><caption className="sr-only">Renter inquiries and reply status</caption><thead><tr><th scope="col">Renter / received</th><th scope="col">Listing</th><th scope="col">Message</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead><tbody>{visibleInquiries.map((inquiry) => <tr key={inquiry.id}><th scope="row"><strong>{inquiry.name}</strong><small>{inquiry.received}</small></th><td data-label="Listing">{getHome(inquiry.listingId)}</td><td data-label="Message" className="ops-message-cell"><span>{inquiry.message}</span></td><td data-label="Status"><span className={`ops-tag ${inquiry.reply ? '' : 'needs-action'}`}>{inquiry.reply ? 'Replied' : 'Needs reply'}</span></td><td><button className="ops-row-button" onClick={() => onInquiry(inquiry)} aria-label={`${inquiry.reply ? 'View conversation with' : 'Reply to'} ${inquiry.name}`}>{inquiry.reply ? 'View' : 'Reply'}</button></td></tr>)}</tbody></table>
      : <table className="ops-table ops-activity-table"><caption className="sr-only">Scheduled tours and confirmation status</caption><thead><tr><th scope="col">Date / time</th><th scope="col">Renter</th><th scope="col">Listing</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead><tbody>{visibleTours.map((tour) => <tr key={tour.id}><th scope="row"><strong>{tour.date}</strong><small>{tour.time}</small></th><td data-label="Renter">{tour.name}</td><td data-label="Listing">{getHome(tour.listingId)}</td><td data-label="Type">{tour.mode}</td><td data-label="Status"><span className={`ops-tag ${tour.confirmed ? '' : 'needs-action'}`}>{tour.confirmed ? 'Confirmed' : 'Needs confirmation'}</span></td><td><button className="ops-row-button" onClick={() => onTour(tour)} aria-label={`Review tour with ${tour.name}`}>{tour.confirmed ? 'Details' : 'Review'}</button></td></tr>)}</tbody></table>}
    {!count && <div className="ops-empty"><h3>{query || listingId ? 'No matching activity' : section === 'inquiries' ? 'No replies waiting' : 'No tours waiting for confirmation'}</h3><p>{query || listingId ? 'Try another renter or listing.' : 'Open all activity to review completed items.'}</p><button className="button" onClick={() => { setQuery(''); onClear() }}>Show all {section}</button></div>}
  </section>
}
