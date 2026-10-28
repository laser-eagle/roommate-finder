export type SearchKind = 'Apartments' | 'Rooms' | 'Roommates'

export interface SavedSearch {
  id: string
  name: string
  kind: SearchKind
  criteria: { location: string; type: string; maxTotal: string; query: string; plans: string }
  runTime: string
  paused: boolean
}

export const initialSavedSearches: SavedSearch[] = [
  { id: 'search-apartments', name: 'Apartments under $1,800', kind: 'Apartments', criteria: { location: '', type: 'Apartment', maxTotal: '1800', query: '', plans: 'Everyone' }, runTime: '08:00', paused: false },
  { id: 'search-rooms', name: 'Private rooms in Ballard', kind: 'Rooms', criteria: { location: 'Ballard', type: 'Private room', maxTotal: '', query: '', plans: 'Everyone' }, runTime: '08:00', paused: false },
  { id: 'search-roommates', name: 'Roommates looking to team up', kind: 'Roommates', criteria: { location: '', type: 'All housing', maxTotal: '', query: '', plans: 'Looking to team up' }, runTime: '08:00', paused: true },
]

export const deviceTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export function criteriaSummary(search: SavedSearch) {
  const { location, type, maxTotal, query, plans } = search.criteria
  const parts = search.kind === 'Roommates'
    ? [query && `Name or neighborhood: ${query}`, plans !== 'Everyone' && plans]
    : [type !== 'All housing' && type, location && `in ${location}`, maxTotal && `up to $${Number(maxTotal).toLocaleString('en-US')} / month`]
  return parts.filter(Boolean).join(' · ') || 'Any'
}

export function resultsUrl(search: SavedSearch) {
  const { location, type, maxTotal, query, plans } = search.criteria
  const params = new URLSearchParams()
  if (search.kind === 'Roommates') {
    if (query) params.set('q', query)
    if (plans !== 'Everyone') params.set('plans', plans)
    return `/roommates${params.toString() ? `?${params}` : ''}`
  }
  if (location) params.set('neighborhood', location)
  if (type !== 'All housing') params.set('type', type)
  if (maxTotal) params.set('max', maxTotal)
  return `/listings${params.toString() ? `?${params}` : ''}`
}

export function formatRunTime(runTime: string) {
  const [hours, minutes] = runTime.split(':').map(Number)
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(2000, 0, 1, hours, minutes))
}

export function nextRun(runTime: string, now = new Date()) {
  const [hours, minutes] = runTime.split(':').map(Number)
  const next = new Date(now)
  next.setHours(hours, minutes, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(next)
}
