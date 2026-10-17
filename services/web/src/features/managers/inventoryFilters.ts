import type { Inquiry, ListingStatus, ManagedListing, Tour } from './managers.mock'

export interface InventoryFilters {
  occupancy: string[]
  needsReply: boolean
  needsConfirmation: boolean
  status: 'All' | ListingStatus
  query: string
  sort: 'Next available' | 'Lowest rent'
}

export const initialInventoryFilters: InventoryFilters = {
  occupancy: [], needsReply: false, needsConfirmation: false, status: 'All', query: '', sort: 'Next available',
}

export function matchesInventory(listing: ManagedListing, filters: InventoryFilters,
  unit: { property: string; unit: string; occupancy: string } | undefined, inquiries: Inquiry[], tours: Tour[]) {
  return (filters.status === 'All' || listing.status === filters.status)
    && (!filters.occupancy.length || filters.occupancy.includes(unit?.occupancy ?? 'Not set'))
    && (!filters.needsReply || inquiries.some((item) => item.listingId === listing.id && !item.reply))
    && (!filters.needsConfirmation || tours.some((item) => item.listingId === listing.id && !item.confirmed))
    && `${listing.title} ${listing.neighborhood} ${unit?.property ?? ''} ${unit?.unit ?? ''}`.toLowerCase().includes(filters.query.trim().toLowerCase())
}
