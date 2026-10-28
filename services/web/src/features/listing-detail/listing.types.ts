export interface ListingCosts {
  currency: 'USD'
  baseRent: number | null
  requiredMonthlyFees: number | null
  utilities: number | null
  deposit: number | null
}

export interface Listing {
  id: string
  type: 'Private room' | 'Apartment' | 'Sublet'
  status: 'active' | 'paused'
  title: string
  subtitle: string
  description: string
  location: { city: string; neighborhood: string }
  photo: {
    src: string
    alt: string
    crop?: { x: number; y: number; width: number; height: number; sourceWidth: number; sourceHeight: number }
  } | null
  costs: ListingCosts
  availability: { confirmed: boolean; localDate: string }
  lease: string
  roomFacts: { label: string; value: string }[]
  verification: { status: 'current' | 'expired'; checkedAt: string }
  match: { reasons: string; gap: string; searchId: string; evaluationVersion: string } | null
  contactAllowed: boolean
  businessId?: string
}

export type PreviewState = 'default' | 'missing-photo' | 'unknown-costs' | 'unavailable' | 'unconfirmed' | 'no-match' | 'save-failure' | 'contact-blocked' | 'loading' | 'not-found'
export type ContactAction = 'tour' | 'message'
