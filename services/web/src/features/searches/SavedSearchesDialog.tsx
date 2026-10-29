import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { homes } from '../discovery/housing.data'
import { estimatedMonthlyTotal } from '../listing-detail/costs'
import { criteriaSummary, criterionLabels, deviceTimeZone, formatRunTime, nextRun, requiredCriteria, requiredMatchCount, resultsUrl } from './savedSearches.data'
import type { CriterionPriority, HomeCriterion, SavedSearch } from './savedSearches.data'
import './SavedSearches.css'

const matchableHomes = homes.map((home) => ({ type: home.type, location: home.location, total: estimatedMonthlyTotal(home.costs) }))

export function SavedSearchesDialog({ searches, onChange, onClose }: {
  searches: SavedSearch[]; onChange: (search: SavedSearch) => void; onClose: () => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [priorities, setPriorities] = useState<SavedSearch['priorities'] | null>(null)
  const [historyIds, setHistoryIds] = useState<string[]>([])
  const [result, setResult] = useState<{ text: string; warning: boolean } | null>(null)
  const editing = searches.find((search) => search.id === editingId) ?? null

  function startEdit(search: SavedSearch) {
    setEditingId(search.id)
    setPriorities(structuredClone(search.priorities))
    setResult(null)
  }

  function setPriority(criterion: HomeCriterion, change: Partial<CriterionPriority>) {
    setPriorities((current) => current && { ...current, [criterion]: { ...current[criterion], ...change } })
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing || !priorities) return
    const form = new FormData(event.currentTarget)
    const value = (key: string) => String(form.get(key) ?? '')
    const next: SavedSearch = { ...editing, priorities, name: value('name'), runTime: value('runTime') || editing.runTime, criteria: editing.kind === 'Roommates'
      ? { ...editing.criteria, query: value('query'), plans: value('plans') }
      : { ...editing.criteria, location: value('location'), type: value('type'), maxTotal: value('maxTotal') } }
    onChange(next)
    if (next.kind === 'Roommates') setResult({ text: `${next.name} saved.`, warning: false })
    else {
      const count = requiredMatchCount(next, matchableHomes)
      const names = requiredCriteria(next).map((criterion) => criterionLabels[criterion])
      setResult(count ? { text: `${next.name} saved. ${count} ${count === 1 ? 'listing meets' : 'listings meet'} all required criteria.`, warning: false }
        : { text: `${next.name} saved. No listings meet all required criteria. Try changing ${names.join(' or ')} to Preferred.`, warning: true })
    }
    setEditingId(null)
  }

  const priorityControls = (criterion: HomeCriterion) => priorities && <div className="saved-search-priority" role="group" aria-label={`${criterionLabels[criterion]} priority`}>
    <label>Priority<select value={priorities[criterion].mode} onChange={(event) => setPriority(criterion, { mode: event.target.value as CriterionPriority['mode'] })}><option>Required</option><option>Preferred</option></select></label>
    <label>Importance<select value={priorities[criterion].importance} disabled={priorities[criterion].mode === 'Required'} onChange={(event) => setPriority(criterion, { importance: event.target.value as CriterionPriority['importance'] })}><option>Low</option><option>Medium</option><option>High</option></select></label>
  </div>

  return <PreviewDialog title={editing ? 'Edit saved search' : 'Saved searches'} onClose={onClose}>
    {!editing ? <>
      {result && <p className={`saved-search-result small ${result.warning ? 'is-warning' : ''}`} role="status">{result.text}</p>}
      <ul className="saved-search-list">{searches.map((search) => {
        const showHistory = historyIds.includes(search.id)
        return <li key={search.id} className="saved-search">
          <div className="saved-search-top"><span className="saved-search-kind">{search.kind}</span>{search.paused && <span className="saved-search-paused">Paused</span>}</div>
          <h3>{search.name}</h3>
          <p className="small muted">{criteriaSummary(search)}</p>
          <p className="small">{search.paused ? 'Daily search paused.' : `Daily at ${formatRunTime(search.runTime)} · Next run ${nextRun(search.runTime)}`}</p>
          <div className="saved-search-actions">
            <a className="button button-primary" href={resultsUrl(search)}>Run now</a>
            <button type="button" className="button" onClick={() => startEdit(search)} aria-label={`Edit ${search.name}`}>Edit</button>
            <button type="button" className="button" onClick={() => onChange({ ...search, paused: !search.paused })} aria-label={`${search.paused ? 'Resume' : 'Pause'} ${search.name}`}>{search.paused ? 'Resume' : 'Pause'}</button>
          </div>
          <button type="button" className="saved-search-history-toggle" aria-expanded={showHistory} aria-controls={`history-${search.id}`}
            onClick={() => setHistoryIds((current) => showHistory ? current.filter((id) => id !== search.id) : [...current, search.id])}>{showHistory ? 'Hide history' : 'Show history'}</button>
          {showHistory && <div id={`history-${search.id}`} className="saved-search-history">
            <p className="small">Last run {search.runs[0]?.ranAt ?? 'not yet'} · {search.paused ? 'Paused' : `Next run ${nextRun(search.runTime)}`}</p>
            <ol>{search.runs.map((run) => <li key={run.id}>
              <div className="saved-search-run"><strong className="small">{run.ranAt}</strong><span className={`saved-search-delivery ${run.status === 'Failed, retried' ? 'is-retried' : ''}`}>{run.status}</span></div>
              <p className="small muted">{run.matches.length} {run.matches.length === 1 ? 'match' : 'matches'}</p>
              {run.matches.length > 0 && <ul>{run.matches.map((match) => <li key={match.id} className="small"><a href={match.href}>{match.label}</a><span className="saved-search-change">{match.change}</span></li>)}</ul>}
            </li>)}</ol>
          </div>}
        </li>
      })}</ul>
    </> : <form key={editing.id} noValidate onSubmit={save}>
      <p className="small muted">{editing.kind} search</p>
      <label>Name<input name="name" type="text" defaultValue={editing.name} autoFocus /></label>
      {editing.kind === 'Roommates' ? <>
        <label>Name or neighborhood<input name="query" type="search" defaultValue={editing.criteria.query} /></label>
        <label>Housing plans<select name="plans" defaultValue={editing.criteria.plans}><option>Everyone</option><option>Looking for a room</option><option>Looking to team up</option></select></label>
      </> : <>
        <p className="small muted">Required criteria filter listings out. Preferred criteria raise a listing's ranking by their importance.</p>
        <div className="saved-search-criterion"><label>Location<input name="location" type="search" placeholder="City or neighborhood" defaultValue={editing.criteria.location} /></label>{priorityControls('location')}</div>
        <div className="saved-search-criterion"><label>Housing type<select name="type" defaultValue={editing.criteria.type}><option>All housing</option><option>Private room</option><option>Apartment</option><option>Sublet</option></select></label>{priorityControls('type')}</div>
        <div className="saved-search-criterion"><label>Maximum total / month<input name="maxTotal" type="number" min="0" step="50" placeholder="No maximum" defaultValue={editing.criteria.maxTotal} /></label>{priorityControls('maxTotal')}</div>
      </>}
      <label>Daily run time<input name="runTime" type="time" defaultValue={editing.runTime} /></label>
      <p className="small muted">Time zone: {deviceTimeZone()}</p>
      <button type="submit" className="button button-primary">Save changes</button>
      <button type="button" className="button" onClick={() => setEditingId(null)}>Back to saved searches</button>
    </form>}
  </PreviewDialog>
}
