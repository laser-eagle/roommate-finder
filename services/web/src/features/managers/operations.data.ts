import { initialInquiries, initialListings, initialTours } from './managers.mock'
import type { Inquiry, ManagedListing, Tour } from './managers.mock'

export type Occupancy = 'Vacant' | 'Notice given' | 'Occupied'
export interface UnitDetails {
  property: string; unit: string; occupancy: Occupancy; vacantSince?: string
  noticeReceived?: string; moveOut?: string; preparation?: string
}

export const unitDetails: Record<string, UnitDetails> = {
  'ballard-room': { property: 'Market Street', unit: 'Room B', occupancy: 'Vacant', vacantSince: 'Oct 1', preparation: 'Cleaning booked · Oct 14' },
  'fremont-apartment': { property: 'Fremont Court', unit: 'Unit 204', occupancy: 'Notice given', noticeReceived: 'Sep 25, 2026', moveOut: 'Oct 25, 2026', preparation: 'Inspection booked · Oct 26' },
  'wallingford-room': { property: 'Wallingford House', unit: 'Garden room', occupancy: 'Occupied' },
  'greenwood-101': { property: 'Greenwood Flats', unit: 'Unit 101', occupancy: 'Vacant', vacantSince: 'Sep 28', preparation: 'Ready for tours' },
  'fremont-302': { property: 'Fremont Court', unit: 'Unit 302', occupancy: 'Notice given', noticeReceived: 'Oct 3, 2026', moveOut: 'Nov 3, 2026', preparation: 'Cleaning booked · Nov 4' },
  'greenwood-203': { property: 'Greenwood Flats', unit: 'Unit 203', occupancy: 'Vacant', vacantSince: 'Oct 8', preparation: 'Inspection booked · Oct 14' },
}

export const operationsListings: ManagedListing[] = [
  ...initialListings,
  { id: 'greenwood-101', title: 'Greenwood one-bedroom', neighborhood: 'Greenwood, Seattle', type: 'Apartment', rent: 187500, available: '2026-10-12', status: 'Live', photo: null },
  { id: 'fremont-302', title: 'Fremont two-bedroom', neighborhood: 'Fremont, Seattle', type: 'Apartment', rent: 269500, available: '2026-11-10', status: 'Live', photo: null },
  { id: 'greenwood-203', title: 'Greenwood studio', neighborhood: 'Greenwood, Seattle', type: 'Apartment', rent: 149500, available: '2026-10-15', status: 'Draft', photo: null },
]

export const operationsInquiries: Inquiry[] = [
  ...initialInquiries,
  { id: 'inquiry-4', name: 'Robin Patel', initials: 'RP', listingId: 'greenwood-101', received: 'Oct 11 · 2:10 PM', message: 'Is unit 101 still available? I can tour on Tuesday after 3 PM.', reply: '' },
  { id: 'inquiry-5', name: 'Casey Reed', initials: 'CR', listingId: 'fremont-302', received: 'Oct 12 · 10:05 AM', message: 'Can you confirm the total monthly cost and whether parking is included?', reply: '' },
]

export const operationsTours: Tour[] = [
  { id: 'tour-3', name: 'Robin Patel', listingId: 'greenwood-101', day: '13', month: 'OCT', date: 'Tuesday, October 13, 2026', time: '3:30–4:00 PM Pacific', mode: 'In person', confirmed: false },
  ...initialTours,
]

export function unitLabel(listing: ManagedListing) {
  const unit = unitDetails[listing.id]
  return unit ? `${unit.property} · ${unit.unit}` : listing.title
}
