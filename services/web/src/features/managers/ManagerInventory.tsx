import { useRef, useState } from 'react'
import { Icon } from '../../components/Icon'
import { formatLocalDate, formatMoney } from '../listing-detail/costs'
import { unitDetails } from './operations.data'
import { initialInventoryFilters, matchesInventory } from './inventoryFilters'
import type { InventoryFilters } from './inventoryFilters'
import type { Inquiry, ListingStatus, ManagedListing, Tour } from './managers.mock'

export function ManagerInventory({ listings, inquiries, tours, filters, onFilters, onEdit, onActivity, onBulkStatus }: {
  listings: ManagedListing[]; inquiries: Inquiry[]; tours: Tour[]; filters: InventoryFilters
  onFilters: (value: InventoryFilters) => void; onEdit: (listing: ManagedListing) => void
  onActivity: (type: 'inquiries' | 'tours', listingId: string) => void
  onBulkStatus: (ids: string[], status: ListingStatus) => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const statusFilters = useRef<HTMLDivElement>(null)
  const visible = listings.filter((listing) => matchesInventory(listing, filters, unitDetails[listing.id], inquiries, tours))
    .sort((a, b) => filters.sort === 'Lowest rent' ? a.rent - b.rent : a.available.localeCompare(b.available))
  const activeSelection = visible.filter((listing) => selected.includes(listing.id))
  const allSelected = visible.length > 0 && activeSelection.length === visible.length
  const hasFilters = filters.occupancy.length > 0 || filters.needsReply || filters.needsConfirmation || filters.status !== 'All' || !!filters.query

  function updateFilters(value: Partial<InventoryFilters>) { onFilters({ ...filters, ...value }); setSelected([]) }
  function toggleOccupancy(value: string) {
    updateFilters({ occupancy: filters.occupancy.includes(value) ? filters.occupancy.filter((item) => item !== value) : [...filters.occupancy, value] })
  }
  function clearFilters() { onFilters(structuredClone(initialInventoryFilters)); setSelected([]) }

  function changeSelection(id: string) { setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]) }
  function bulkStatus(next: ListingStatus) {
    statusFilters.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus()
    onBulkStatus(activeSelection.filter((listing) => listing.status !== 'Draft' && listing.status !== next).map((listing) => listing.id), next)
    setSelected([])
  }

  return <section className="ops-panel" aria-label="Listing inventory">
    <div className="ops-inventory-toolbar"><div ref={statusFilters} className="ops-status-filters" role="group" aria-label="Listing status">
      {(['All', 'Live', 'Draft', 'Paused'] as const).map((value) => <button key={value} aria-pressed={filters.status === value} onClick={() => updateFilters({ status: filters.status === value ? 'All' : value })}>{value}<span>{value === 'All' ? listings.length : listings.filter((listing) => listing.status === value).length}</span></button>)}
    </div><label className="ops-search"><Icon name="search" /><span className="sr-only">Search property, unit, or location</span><input type="search" placeholder="Search property or unit" value={filters.query} onChange={(event) => updateFilters({ query: event.target.value })} /></label></div>
    <div className="ops-toggle-toolbar"><div className="ops-filter-toggles" role="group" aria-label="Filter listings">
      {(['Vacant', 'Notice given', 'Occupied'] as const).map((value) => <button key={value} aria-pressed={filters.occupancy.includes(value)} onClick={() => toggleOccupancy(value)}><span className="ops-toggle-mark">{filters.occupancy.includes(value) && <Icon name="check" />}</span>{value === 'Vacant' ? 'Vacant units' : value}</button>)}
      <button aria-pressed={filters.needsReply} onClick={() => updateFilters({ needsReply: !filters.needsReply })}><span className="ops-toggle-mark">{filters.needsReply && <Icon name="check" />}</span>Needs reply</button>
      <button aria-pressed={filters.needsConfirmation} onClick={() => updateFilters({ needsConfirmation: !filters.needsConfirmation })}><span className="ops-toggle-mark">{filters.needsConfirmation && <Icon name="check" />}</span>Tours to confirm</button>
    </div><button className="ops-clear-filters" disabled={!hasFilters} onClick={clearFilters}>Clear filters</button></div>
    <div className="ops-filter-row"><label className="ops-select-all"><input type="checkbox" checked={allSelected} disabled={!visible.length} onChange={() => setSelected(allSelected ? [] : visible.map((listing) => listing.id))} />Select all visible</label><label>Sort<select value={filters.sort} onChange={(event) => updateFilters({ sort: event.target.value as InventoryFilters['sort'] })}><option>Next available</option><option>Lowest rent</option></select></label><span role="status">{visible.length} of {listings.length} listings{!hasFilters ? ' · No filters applied' : ''}</span></div>
    {activeSelection.length > 0 && <div className="ops-selection"><strong>{activeSelection.length} selected</strong><button disabled={!activeSelection.some((listing) => listing.status === 'Live')} onClick={() => bulkStatus('Paused')}>Pause live listings</button><button disabled={!activeSelection.some((listing) => listing.status === 'Paused')} onClick={() => bulkStatus('Live')}>Resume paused listings</button><button className="ops-clear-selection" onClick={() => setSelected([])}>Clear selection</button></div>}
    <table className="ops-table ops-inventory-table"><caption className="sr-only">Managed listings, occupancy, publishing status, and renter activity</caption><thead><tr><th className="ops-checkbox-cell"><span className="sr-only">Select</span></th><th scope="col">Property / unit</th><th scope="col">Occupancy</th><th scope="col">Base rent</th><th scope="col">Available</th><th scope="col">Listing</th><th scope="col">Activity</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{visible.map((listing) => {
        const unit = unitDetails[listing.id]
        const pending = inquiries.filter((inquiry) => inquiry.listingId === listing.id && !inquiry.reply).length
        const scheduled = tours.filter((tour) => tour.listingId === listing.id).length
        return <tr key={listing.id} className={selected.includes(listing.id) ? 'is-selected' : undefined}>
          <td className="ops-checkbox-cell"><input type="checkbox" aria-label={`Select ${listing.title}`} checked={selected.includes(listing.id)} onChange={() => changeSelection(listing.id)} /></td>
          <th scope="row" className="ops-unit-cell"><button onClick={() => onEdit(listing)} aria-label={`Edit ${listing.title}`}>{unit?.property ?? listing.title}</button><span title={listing.type}>{unit ? `${unit.unit} · ${listing.neighborhood.split(',')[0]}` : `${listing.type} · ${listing.neighborhood}`}</span></th>
          <td data-label="Occupancy"><span className={`ops-occupancy ${unit?.occupancy === 'Vacant' ? 'is-vacant' : ''}`}>{unit?.occupancy ?? 'Not set'}</span>{unit?.vacantSince && <small>Since {unit.vacantSince}</small>}</td>
          <td data-label="Base rent" className="ops-money">{formatMoney(listing.rent)}<small>/ month</small></td>
          <td data-label="Available"><time dateTime={listing.available} title={formatLocalDate(listing.available)}>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${listing.available}T12:00:00Z`))}</time></td>
          <td data-label="Listing"><span className={`manager-badge status-${listing.status.toLowerCase()}`}>{listing.status}</span></td>
          <td data-label="Activity" className="ops-row-activity">{pending ? <button onClick={() => onActivity('inquiries', listing.id)}>{pending} to reply</button> : <span className="muted">No pending replies</span>}{scheduled > 0 && <button onClick={() => onActivity('tours', listing.id)}>{scheduled} {scheduled === 1 ? 'tour' : 'tours'}</button>}</td>
          <td className="ops-row-edit"><button className="ops-icon-button" title={`Edit ${listing.title}`} aria-label={`Edit details for ${listing.title}`} onClick={() => onEdit(listing)}><Icon name="edit" /></button></td>
        </tr>
      })}</tbody>
    </table>
    {!visible.length && <div className="ops-empty"><h3>No matching listings</h3><p>Turn off a filter or clear all filters to show more listings.</p><button className="button" onClick={clearFilters}>Show all listings</button></div>}
    <div className="ops-table-footer"><span>Base rent excludes fees and utilities.</span><span>Select rows to pause or resume listings.</span></div>
  </section>
}
