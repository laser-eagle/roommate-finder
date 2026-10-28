import type { Reference } from '../../components/References/ReferenceList'

const references: Record<string, Reference[]> = {
  morgan: [
    { id: 'morgan-priya', author: 'Priya Shah', relationship: 'Former roommate', date: 'August 2026', text: 'Morgan and I shared a two-bedroom apartment in Fremont for a year. Morgan kept the kitchen clean, paid utilities on time, and was easy to talk to about house rules.' },
    { id: 'morgan-dana', author: 'Dana Ortiz', relationship: 'Former landlord', date: 'June 2026', text: 'Morgan rented a room from me for 18 months. Rent was always on time, and the room was in excellent condition at move-out.' },
  ],
  avery: [
    { id: 'avery-marcus', author: 'Marcus Hall', relationship: 'Former roommate', date: 'May 2026', text: 'Avery set up our shared chore schedule and kept common areas organized. Guests were always mentioned ahead of time.' },
    { id: 'avery-elena', author: 'Elena Ruiz', relationship: 'Former landlord', date: 'March 2026', text: 'Avery was a reliable tenant for two years and reported maintenance needs quickly.' },
  ],
}

export function referencesFor(personId: string) {
  return references[personId] ?? []
}
