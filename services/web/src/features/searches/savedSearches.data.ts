export type SearchKind = 'Apartments' | 'Rooms' | 'Roommates'

export type HomeCriterion = 'location' | 'type' | 'maxTotal'
export interface CriterionPriority { mode: 'Required' | 'Preferred'; importance: 'Low' | 'Medium' | 'High' }
export type RunStatus = 'Delivered' | 'No new results' | 'Failed, retried' | 'Skipped (paused)'
export interface SearchRun { id: string; ranAt: string; status: RunStatus; matches: { id: string; label: string; href: string; change: 'New' | 'Price changed' | 'Availability changed' }[] }

export interface SavedSearch {
  id: string
  name: string
  kind: SearchKind
  criteria: { location: string; type: string; maxTotal: string; query: string; plans: string }
  priorities: Record<HomeCriterion, CriterionPriority>
  runTime: string
  paused: boolean
  runs: SearchRun[]
}

export const criterionLabels: Record<HomeCriterion, string> = { location: 'Location', type: 'Housing type', maxTotal: 'Maximum total / month' }
const required = (importance: CriterionPriority['importance'] = 'Medium'): CriterionPriority => ({ mode: 'Required', importance })
const preferred = (importance: CriterionPriority['importance']): CriterionPriority => ({ mode: 'Preferred', importance })

export const initialSavedSearches: SavedSearch[] = [
  { id: 'search-apartments', name: 'Apartments under $1,800', kind: 'Apartments', criteria: { location: '', type: 'Apartment', maxTotal: '1800', query: '', plans: 'Everyone' }, priorities: { location: preferred('Low'), type: required(), maxTotal: required() }, runTime: '08:00', paused: false, runs: [
    { id: 'apt-3', ranAt: 'Oct 27, 2026, 8:00 AM', status: 'Delivered', matches: [{ id: 'm1', label: 'A studio near Green Lake.', href: '/listings/green-lake-studio', change: 'Price changed' }] },
    { id: 'apt-2', ranAt: 'Oct 26, 2026, 8:00 AM', status: 'No new results', matches: [] },
    { id: 'apt-1', ranAt: 'Oct 25, 2026, 8:00 AM', status: 'Failed, retried', matches: [{ id: 'm2', label: 'A studio near Green Lake.', href: '/listings/green-lake-studio', change: 'New' }] },
  ] },
  { id: 'search-rooms', name: 'Private rooms in Ballard', kind: 'Rooms', criteria: { location: 'Ballard', type: 'Private room', maxTotal: '', query: '', plans: 'Everyone' }, priorities: { location: required(), type: required(), maxTotal: preferred('Medium') }, runTime: '08:00', paused: false, runs: [
    { id: 'room-3', ranAt: 'Oct 27, 2026, 8:00 AM', status: 'Delivered', matches: [{ id: 'm3', label: 'A quiet room to make your own.', href: '/listings/ballard-room', change: 'Availability changed' }] },
    { id: 'room-2', ranAt: 'Oct 26, 2026, 8:00 AM', status: 'No new results', matches: [] },
    { id: 'room-1', ranAt: 'Oct 25, 2026, 8:00 AM', status: 'Failed, retried', matches: [{ id: 'm4', label: 'A quiet room to make your own.', href: '/listings/ballard-room', change: 'New' }] },
  ] },
  { id: 'search-roommates', name: 'Roommates looking to team up', kind: 'Roommates', criteria: { location: '', type: 'All housing', maxTotal: '', query: '', plans: 'Looking to team up' }, priorities: { location: preferred('Low'), type: preferred('Low'), maxTotal: preferred('Low') }, runTime: '08:00', paused: true, runs: [
    { id: 'mate-3', ranAt: 'Oct 27, 2026, 8:00 AM', status: 'Skipped (paused)', matches: [] },
    { id: 'mate-2', ranAt: 'Oct 26, 2026, 8:00 AM', status: 'Delivered', matches: [{ id: 'm5', label: 'Avery Chen', href: '/roommates?q=Avery', change: 'New' }] },
    { id: 'mate-1', ranAt: 'Oct 25, 2026, 8:00 AM', status: 'No new results', matches: [] },
  ] },
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

export interface MatchableHome { type: string; location: { city: string; neighborhood: string }; total: number | null }

export function meetsCriterion(search: SavedSearch, criterion: HomeCriterion, home: MatchableHome) {
  const { location, type, maxTotal } = search.criteria
  if (criterion === 'location') return !location || `${home.location.city} ${home.location.neighborhood}`.toLowerCase().includes(location.trim().toLowerCase())
  if (criterion === 'type') return type === 'All housing' || home.type === type
  return !maxTotal || (home.total !== null && home.total <= Number(maxTotal) * 100)
}

export function requiredCriteria(search: SavedSearch) {
  return (Object.keys(criterionLabels) as HomeCriterion[]).filter((criterion) => search.priorities[criterion].mode === 'Required'
    && (criterion === 'location' ? search.criteria.location : criterion === 'type' ? search.criteria.type !== 'All housing' : search.criteria.maxTotal))
}

export function requiredMatchCount(search: SavedSearch, homes: MatchableHome[]) {
  const criteria = requiredCriteria(search)
  return homes.filter((home) => criteria.every((criterion) => meetsCriterion(search, criterion, home))).length
}
