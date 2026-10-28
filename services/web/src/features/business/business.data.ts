export interface BusinessProfile {
  id: string
  name: string
  initials: string
  verified: boolean
  contact: { phone: string; email: string; office: string }
  properties: { name: string; neighborhood: string }[]
  staff: string[]
}

export const businesses: BusinessProfile[] = [{
  id: 'pine-street-homes',
  name: 'Pine Street Homes',
  initials: 'PS',
  verified: true,
  contact: { phone: '(206) 555-0142', email: 'leasing@pinestreethomes.example', office: 'Suite 300, 1420 Pine Street, Seattle, WA 98101' },
  properties: [
    { name: 'Greenwood Flats', neighborhood: 'Greenwood, Seattle' },
    { name: 'Market Street', neighborhood: 'Ballard, Seattle' },
    { name: 'Fremont Court', neighborhood: 'Fremont, Seattle' },
    { name: 'Wallingford House', neighborhood: 'Wallingford, Seattle' },
  ],
  staff: ['Chris Morales', 'Hannah Wu', 'Omar Haddad'],
}]

export function findBusiness(id: string | undefined) {
  return businesses.find((business) => business.id === id)
}
