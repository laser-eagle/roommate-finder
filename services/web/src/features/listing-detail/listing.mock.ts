import type { Listing, PreviewState } from './listing.types'

export const sampleListing: Listing = {
  id: 'ballard-room',
  type: 'Private room',
  status: 'active',
  title: 'A quiet room to make your own.',
  subtitle: 'A thoughtful two-bedroom home near Ballard Avenue.',
  description: 'A bright private room in a calm, lived-in home. Share the kitchen and living room with one housemate, with easy access to neighborhood shops and transit.',
  location: { city: 'Seattle', neighborhood: 'Ballard' },
  photo: {
    src: new URL('../../../docs/web.ui.png', import.meta.url).href,
    alt: 'Sunlit private bedroom with a bed, dark-trimmed windows, plants, and wood floors.',
    crop: { x: 68, y: 173, width: 518, height: 297, sourceWidth: 1306, sourceHeight: 850 },
  },
  costs: { currency: 'USD', baseRent: 118000, requiredMonthlyFees: 0, utilities: 8500, deposit: 40000 },
  availability: { confirmed: true, localDate: '2026-10-15' },
  lease: '12 months · flexible start',
  roomFacts: [
    { label: 'The room', value: 'Private · furnished' },
    { label: 'The household', value: 'One housemate' },
    { label: 'Pets', value: 'Cats welcome' },
  ],
  verification: { status: 'current', checkedAt: '2026-09-20' },
  match: {
    reasons: 'Within your budget and available in October.',
    gap: 'Commute information is still missing.',
    searchId: 'sample-seattle-search',
    evaluationVersion: 'mock-v1',
  },
  contactAllowed: true,
}

export function listingForPreview(state: PreviewState, source: Listing = sampleListing): Listing {
  const listing = structuredClone(source)
  if (state === 'missing-photo') listing.photo = null
  if (state === 'unknown-costs') {
    listing.costs.requiredMonthlyFees = null
    listing.match = null
  }
  if (state === 'unavailable') {
    listing.status = 'paused'
    listing.match = null
  }
  if (state === 'unconfirmed') {
    listing.availability.confirmed = false
    listing.verification.status = 'expired'
    listing.match = null
  }
  if (state === 'no-match') listing.match = null
  if (state === 'contact-blocked') listing.contactAllowed = false
  return listing
}
