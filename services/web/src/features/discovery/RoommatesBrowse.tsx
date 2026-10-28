import { useState } from 'react'
import { RoommateProfileDialog } from './RoommateProfileDialog'
import { Icon } from '../../components/Icon'

const people = [
  { id: 'morgan', name: 'Morgan Lee', initials: 'ML', area: 'Ballard, Fremont', budget: 1400, moveIn: 'October 15, 2026', habits: ['Shared spaces tidy', 'Early mornings'], bio: 'Looking for a private room with a shared kitchen. I enjoy cooking and cycling, and prefer a home with quiet evenings.', looking: 'Looking for a room' },
  { id: 'avery', name: 'Avery Chen', initials: 'AC', area: 'Capitol Hill, Central District', budget: 1500, moveIn: 'November 1, 2026', habits: ['No indoor smoking', 'Occasional guests'], bio: 'Looking for someone to find a two-bedroom apartment with. I like live music, neighborhood walks, and keeping shared spaces organized.', looking: 'Looking to team up' },
  { id: 'riley', name: 'Riley Brooks', initials: 'RB', area: 'Green Lake, Wallingford', budget: 1350, moveIn: 'October 20, 2026', habits: ['Cat-friendly', 'Quiet evenings'], bio: 'Searching for a long-term room near transit. I have a cat, enjoy reading, and value clear agreements about shared chores.', looking: 'Looking for a room' },
]

export type RoommatePerson = typeof people[number]

export function RoommatesBrowse() {
  const [query, setQuery] = useState('')
  const [intent, setIntent] = useState('Everyone')
  const [selected, setSelected] = useState<RoommatePerson | null>(null)
  const [connections, setConnections] = useState<string[]>([])
  const visible = people.filter((person) => `${person.name} ${person.area}`.toLowerCase().includes(query.trim().toLowerCase()) && (intent === 'Everyone' || intent === person.looking))
  return <>
    <div className="discovery-heading"><div><span className="eyebrow muted">People in Seattle</span><h1>Find a roommate</h1><p className="muted">Compare budgets, move-in dates, and how you share a home.</p></div><a className="button" href="/accounts">Edit your profile<Icon name="arrow" /></a></div>
    <div className="discovery-filters roommate-filters" role="search" aria-label="Filter roommates"><label>Name or neighborhood<input type="search" placeholder="Search people or neighborhoods" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label>Housing plans<select value={intent} onChange={(event) => setIntent(event.target.value)}><option>Everyone</option><option>Looking for a room</option><option>Looking to team up</option></select></label></div>
    <p className="discovery-result-count small" role="status">{visible.length} {visible.length === 1 ? 'person' : 'people'} found</p>
    <div className="roommate-results">{visible.map((person) => <article className="roommate-result" key={person.id}><div className="roommate-card-top"><span className="discovery-avatar" aria-hidden="true">{person.initials}</span><span className="discovery-tag">{person.looking}</span></div><h2>{person.name}</h2><p className="small muted">{person.area}</p><p className="roommate-bio small">{person.bio}</p><dl><div><dt>Monthly budget</dt><dd>Up to ${person.budget.toLocaleString('en-US')}</dd></div><div><dt>Move-in date</dt><dd>{person.moveIn}</dd></div></dl><div className="discovery-tags">{person.habits.map((habit) => <span key={habit}>{habit}</span>)}</div><button className="discovery-text-button" onClick={() => setSelected(person)} aria-label={`View profile for ${person.name}`}>View profile<Icon name="arrow" /></button></article>)}</div>
    {!visible.length && <div className="discovery-empty"><h2>No matching profiles</h2><p className="muted">Try another neighborhood or change the housing plans filter.</p><button className="button" onClick={() => { setQuery(''); setIntent('Everyone') }}>Clear filters</button></div>}
    {selected && <RoommateProfileDialog person={selected} connected={connections.includes(selected.id)} onConnect={() => setConnections((current) => [...current, selected.id])} onClose={() => setSelected(null)} />}
  </>
}
