import { sampleListing } from '../listing-detail/listing.mock'

export type ListingStatus = 'Live' | 'Draft' | 'Paused'
export interface ManagedListing {
  id: string
  title: string
  neighborhood: string
  type: 'Private room' | 'Apartment' | 'Sublet'
  rent: number
  available: string
  status: ListingStatus
  photo: typeof sampleListing.photo
}

export interface Inquiry {
  id: string
  name: string
  initials: string
  listingId: string
  received: string
  message: string
  reply: string
}

export interface Tour {
  id: string
  name: string
  listingId: string
  day: string
  month: string
  date: string
  time: string
  mode: string
  confirmed: boolean
}

export const initialListings: ManagedListing[] = [
  { id: 'ballard-room', title: 'Ballard private room', neighborhood: 'Ballard, Seattle', type: 'Private room', rent: 118000, available: '2026-10-15', status: 'Live', photo: sampleListing.photo },
  { id: 'fremont-apartment', title: 'Fremont apartment', neighborhood: 'Fremont, Seattle', type: 'Apartment', rent: 215000, available: '2026-11-01', status: 'Draft', photo: null },
  { id: 'wallingford-room', title: 'Wallingford garden room', neighborhood: 'Wallingford, Seattle', type: 'Private room', rent: 105000, available: '2026-11-15', status: 'Paused', photo: null },
]

export const initialInquiries: Inquiry[] = [
  { id: 'inquiry-1', name: 'Jamie Chen', initials: 'JC', listingId: 'ballard-room', received: 'Oct 12 · 9:40 AM', message: 'Hi! The room looks lovely. Is there space for a small desk, and would an October 20 move-in work?', reply: '' },
  { id: 'inquiry-2', name: 'Alex Morgan', initials: 'AM', listingId: 'ballard-room', received: 'Oct 12 · 8:15 AM', message: 'I’m interested in the Ballard room. Would it be possible to visit later this week?', reply: '' },
  { id: 'inquiry-3', name: 'Sam Rivera', initials: 'SR', listingId: 'wallingford-room', received: 'Oct 11 · 4:30 PM', message: 'Thanks for the update. Let me know when the garden room becomes available again.', reply: 'Thanks, Sam. The listing is currently paused. We will update its availability before arranging a tour.' },
]

export const initialTours: Tour[] = [
  { id: 'tour-1', name: 'Alex Morgan', listingId: 'ballard-room', day: '16', month: 'OCT', date: 'Friday, October 16, 2026', time: '4:30–5:00 PM Pacific', mode: 'In person', confirmed: false },
  { id: 'tour-2', name: 'Taylor Lee', listingId: 'ballard-room', day: '17', month: 'OCT', date: 'Saturday, October 17, 2026', time: '11:00–11:30 AM Pacific', mode: 'Virtual', confirmed: true },
]

export type ManagerDialog = { type: 'listing'; listing: ManagedListing | null }
  | { type: 'inquiry'; inquiry: Inquiry }
  | { type: 'tour'; tour: Tour }
