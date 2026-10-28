import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { criteriaSummary, deviceTimeZone, formatRunTime, nextRun, resultsUrl } from './savedSearches.data'
import type { SavedSearch } from './savedSearches.data'
import './SavedSearches.css'

export function SavedSearchesDialog({ searches, onChange, onClose }: {
  searches: SavedSearch[]; onChange: (search: SavedSearch) => void; onClose: () => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = searches.find((search) => search.id === editingId) ?? null

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing) return
    const form = new FormData(event.currentTarget)
    const value = (key: string) => String(form.get(key) ?? '')
    onChange({ ...editing, name: value('name'), runTime: value('runTime') || editing.runTime, criteria: editing.kind === 'Roommates'
      ? { ...editing.criteria, query: value('query'), plans: value('plans') }
      : { ...editing.criteria, location: value('location'), type: value('type'), maxTotal: value('maxTotal') } })
    setEditingId(null)
  }

  return <PreviewDialog title={editing ? 'Edit saved search' : 'Saved searches'} onClose={onClose}>
    {!editing ? <ul className="saved-search-list">{searches.map((search) => <li key={search.id} className="saved-search">
      <div className="saved-search-top"><span className="saved-search-kind">{search.kind}</span>{search.paused && <span className="saved-search-paused">Paused</span>}</div>
      <h3>{search.name}</h3>
      <p className="small muted">{criteriaSummary(search)}</p>
      <p className="small">{search.paused ? 'Daily search paused.' : `Daily at ${formatRunTime(search.runTime)} · Next run ${nextRun(search.runTime)}`}</p>
      <div className="saved-search-actions">
        <a className="button button-primary" href={resultsUrl(search)}>Run now</a>
        <button type="button" className="button" onClick={() => setEditingId(search.id)} aria-label={`Edit ${search.name}`}>Edit</button>
        <button type="button" className="button" onClick={() => onChange({ ...search, paused: !search.paused })} aria-label={`${search.paused ? 'Resume' : 'Pause'} ${search.name}`}>{search.paused ? 'Resume' : 'Pause'}</button>
      </div>
    </li>)}</ul> : <form key={editing.id} noValidate onSubmit={save}>
      <p className="small muted">{editing.kind} search</p>
      <label>Name<input name="name" type="text" defaultValue={editing.name} autoFocus /></label>
      {editing.kind === 'Roommates' ? <>
        <label>Name or neighborhood<input name="query" type="search" defaultValue={editing.criteria.query} /></label>
        <label>Housing plans<select name="plans" defaultValue={editing.criteria.plans}><option>Everyone</option><option>Looking for a room</option><option>Looking to team up</option></select></label>
      </> : <>
        <label>Location<input name="location" type="search" placeholder="City or neighborhood" defaultValue={editing.criteria.location} /></label>
        <label>Housing type<select name="type" defaultValue={editing.criteria.type}><option>All housing</option><option>Private room</option><option>Apartment</option><option>Sublet</option></select></label>
        <label>Maximum total / month<input name="maxTotal" type="number" min="0" step="50" placeholder="No maximum" defaultValue={editing.criteria.maxTotal} /></label>
      </>}
      <label>Daily run time<input name="runTime" type="time" defaultValue={editing.runTime} /></label>
      <p className="small muted">Time zone: {deviceTimeZone()}</p>
      <button type="submit" className="button button-primary">Save changes</button>
      <button type="button" className="button" onClick={() => setEditingId(null)}>Back to saved searches</button>
    </form>}
  </PreviewDialog>
}
