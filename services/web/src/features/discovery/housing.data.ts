import { sampleListing } from '../listing-detail/listing.mock'
import type { Listing } from '../listing-detail/listing.types'

export const homes: Listing[] = [sampleListing, {
  ...sampleListing, id: 'green-lake-studio', type: 'Apartment',
  title: 'A studio near Green Lake.', subtitle: 'A bright apartment with a separate kitchen and space to work.',
  description: 'An unfurnished studio two blocks from Green Lake. The apartment includes a separate kitchen, built-in storage, and access to shared laundry.',
  location: { city: 'Seattle', neighborhood: 'Green Lake' }, photo: null,
  costs: { currency: 'USD', baseRent: 165000, requiredMonthlyFees: 2500, utilities: 9500, deposit: 80000 },
  availability: { confirmed: true, localDate: '2026-11-01' }, lease: '12 months', match: null,
  roomFacts: [{ label: 'The home', value: 'Studio · unfurnished' }, { label: 'Laundry', value: 'Shared laundry' }, { label: 'Pets', value: 'Cats welcome' }],
}, {
  ...sampleListing, id: 'capitol-hill-sublet', type: 'Sublet', businessId: 'pine-street-homes',
  title: 'A furnished room on Capitol Hill.', subtitle: 'A six-month sublet near light rail and neighborhood shops.',
  description: 'A furnished private room in a three-bedroom apartment. Share a kitchen and living room with two housemates. The light rail station is a short walk away.',
  location: { city: 'Seattle', neighborhood: 'Capitol Hill' }, photo: null,
  costs: { currency: 'USD', baseRent: 125000, requiredMonthlyFees: 0, utilities: 7500, deposit: 50000 },
  availability: { confirmed: true, localDate: '2026-10-20' }, lease: '6 months', match: null,
  roomFacts: [{ label: 'The room', value: 'Private · furnished' }, { label: 'The household', value: 'Two housemates' }, { label: 'Pets', value: 'No pets' }],
}]
