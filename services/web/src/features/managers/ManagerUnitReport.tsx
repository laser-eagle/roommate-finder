import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { formatLocalDate, formatMoney } from '../listing-detail/costs'
import { unitDetails } from './operations.data'
import type { Inquiry, ManagedListing, Tour } from './managers.mock'

export function ManagerUnitReport({ kind, listings, inquiries, tours, onEdit, onActivity }: {
  kind: 'vacant' | 'notices'; listings: ManagedListing[]; inquiries: Inquiry[]; tours: Tour[]
  onEdit: (listing: ManagedListing) => void; onActivity: (type: 'inquiries' | 'tours', listingId: string) => void
}) {
  const [query, setQuery] = useState('')
  const units = listings.filter((listing) => unitDetails[listing.id]?.occupancy === (kind === 'vacant' ? 'Vacant' : 'Notice given'))
  const visible = units.filter((listing) => `${listing.title} ${listing.neighborhood} ${unitDetails[listing.id].property} ${unitDetails[listing.id].unit}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => a.available.localeCompare(b.available))
  return <section className="ops-panel ops-unit-report" aria-label={kind === 'vacant' ? 'Vacant unit details' : 'Notice and move-out details'}>
    <div className="ops-report-summary"><div><span>Units</span><strong>{units.length}</strong></div><div><span>Monthly asking rent</span><strong>{formatMoney(units.reduce((sum, listing) => sum + listing.rent, 0))}</strong></div><div><span>Live listings</span><strong>{units.filter((listing) => listing.status === 'Live').length}</strong></div></div>
    <div className="ops-inventory-toolbar"><p role="status">{visible.length} of {units.length} units · Ordered by availability</p><label className="ops-search"><Icon name="search" /><span className="sr-only">Search unit details</span><input type="search" value={query} placeholder="Search property or unit" onChange={(event) => setQuery(event.target.value)} /></label></div>
    <table className="ops-table ops-report-table"><caption className="sr-only">{kind === 'vacant' ? 'Vacancy dates, readiness, and leasing activity' : 'Notice dates, move-out plans, and leasing activity'}</caption><thead><tr><th scope="col">Property / unit</th><th scope="col">{kind === 'vacant' ? 'Vacancy / availability' : 'Notice / move-out'}</th><th scope="col">Asking rent / listing</th><th scope="col">Preparation / next step</th><th scope="col">Leasing activity</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead><tbody>{visible.map((listing) => {
      const unit = unitDetails[listing.id]
      const pending = inquiries.filter((inquiry) => inquiry.listingId === listing.id && !inquiry.reply).length
      const requests = tours.filter((tour) => tour.listingId === listing.id && !tour.confirmed).length
      const scheduled = tours.filter((tour) => tour.listingId === listing.id).length
      const nextStep = requests ? `Review ${requests} pending tour ${requests === 1 ? 'request' : 'requests'}.`
        : pending ? `Respond to ${pending} pending ${pending === 1 ? 'inquiry' : 'inquiries'}.`
          : listing.status === 'Draft' ? 'Review rent and availability before publishing.' : 'No pending renter actions.'
      return <tr key={listing.id}><th scope="row"><strong>{unit.property}</strong><span>{unit.unit} · {listing.type}</span><small>{listing.neighborhood}</small></th>
        <td data-label={kind === 'vacant' ? 'Vacancy / availability' : 'Notice / move-out'}>{kind === 'vacant' ? <><span>Vacant since {unit.vacantSince ?? 'Not recorded'}</span><small>Available {formatLocalDate(listing.available)}</small></> : <><span>Notice received {unit.noticeReceived ?? 'Not recorded'}</span><span>Move-out {unit.moveOut ?? 'Not recorded'}</span><small>Available {formatLocalDate(listing.available)}</small></>}</td>
        <td data-label="Asking rent / listing"><strong className="ops-money">{formatMoney(listing.rent)} / mo</strong><span className={`manager-badge status-${listing.status.toLowerCase()}`}>{listing.status}</span></td>
        <td data-label="Preparation / next step"><strong>{unit.preparation ?? 'Not scheduled'}</strong><p>{nextStep}</p></td>
        <td data-label="Leasing activity" className="ops-row-activity">{pending ? <button onClick={() => onActivity('inquiries', listing.id)}>{pending} {pending === 1 ? 'reply needed' : 'replies needed'}</button> : <span className="muted">No pending replies</span>}{scheduled > 0 && <button onClick={() => onActivity('tours', listing.id)}>{scheduled} {scheduled === 1 ? 'tour' : 'tours'} · {requests} to confirm</button>}</td>
        <td><button className="ops-row-button" onClick={() => onEdit(listing)} aria-label={`Edit ${listing.title}`}>Edit listing</button></td></tr>
    })}</tbody></table>
    {!visible.length && <div className="ops-empty"><h3>{query ? 'No matching units' : kind === 'vacant' ? 'No vacant units' : 'No notices to review'}</h3><p>{query ? 'Try another property or unit name.' : 'Units will appear here when their occupancy status changes.'}</p>{query && <button className="button" onClick={() => setQuery('')}>Clear search</button>}</div>}
    <div className="ops-table-footer">Asking rent is the advertised base rent. Fees and utilities are separate.</div>
  </section>
}
