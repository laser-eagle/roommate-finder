import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { Icon } from '../../components/Icon'
import { estimatedMonthlyTotal, formatLocalDate, formatMoney } from '../listing-detail/costs'
import type { Listing } from '../listing-detail/listing.types'

type Sort = 'Selected order' | 'Lowest total cost' | 'Soonest available'

const availableDate = (home: Listing) => home.availability.confirmed ? home.availability.localDate : null

function lowest<T>(values: (T | null)[], compare: (a: T, b: T) => number) {
  const known = values.filter((value): value is T => value !== null)
  return known.length ? known.reduce((best, value) => compare(value, best) < 0 ? value : best) : null
}

export function CompareDialog({ homes, savedIds, onSave, onRemove, onClose }: {
  homes: Listing[]; savedIds: string[]; onSave: (id: string) => void; onRemove: (id: string) => void; onClose: () => void
}) {
  const [sort, setSort] = useState<Sort>('Selected order')
  const bestTotal = lowest(homes.map((home) => estimatedMonthlyTotal(home.costs)), (a, b) => a - b)
  const bestDate = lowest(homes.map(availableDate), (a, b) => a.localeCompare(b))
  const columns = [...homes]
  if (sort === 'Lowest total cost') columns.sort((a, b) => (estimatedMonthlyTotal(a.costs) ?? Infinity) - (estimatedMonthlyTotal(b.costs) ?? Infinity))
  if (sort === 'Soonest available') columns.sort((a, b) => (availableDate(a) ?? '9999').localeCompare(availableDate(b) ?? '9999'))

  return <PreviewDialog title="Compare homes" onClose={onClose} wide>
    {homes.length < 2 ? <div className="dialog-confirmation">
      <p>Select at least two homes to compare.</p>
      <button className="button button-primary" onClick={onClose} autoFocus>Back to homes</button>
    </div> : <>
      <label className="compare-sort small">Sort columns by<select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
        <option>Selected order</option><option>Lowest total cost</option><option>Soonest available</option>
      </select></label>
      <div className="compare-scroll">
        <table className="compare-table">
          <caption className="sr-only">Selected homes compared by cost, features, availability, commute, and preference fit</caption>
          <thead><tr><td />{columns.map((home) => <th scope="col" key={home.id}>
            <a href={`/listings/${home.id}`}>{home.title}</a>
            <span className="small muted">{home.location.neighborhood}, {home.location.city} · {home.type}</span>
            <span className="compare-actions">
              <button type="button" className="compare-action" aria-pressed={savedIds.includes(home.id)} onClick={() => onSave(home.id)}>
                <Icon name="heart" filled={savedIds.includes(home.id)} />{savedIds.includes(home.id) ? 'Saved' : 'Save'}
              </button>
              <button type="button" className="compare-action" aria-label={`Remove ${home.title} from comparison`} onClick={() => onRemove(home.id)}>Remove</button>
            </span>
          </th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">Total monthly cost</th>{columns.map((home) => {
              const total = estimatedMonthlyTotal(home.costs)
              const best = total !== null && total === bestTotal
              return <td key={home.id} className={best ? 'compare-best' : undefined}>{formatMoney(total)}{best && <span className="compare-badge">Lowest</span>}</td>
            })}</tr>
            <tr><th scope="row">Features</th>{columns.map((home) => <td key={home.id}><ul className="compare-features">
              <li>{home.type}</li>{home.roomFacts.map((fact) => <li key={fact.label}>{fact.label}: {fact.value}</li>)}
            </ul></td>)}</tr>
            <tr><th scope="row">Availability</th>{columns.map((home) => {
              const date = availableDate(home)
              const best = date !== null && date === bestDate
              return <td key={home.id} className={best ? 'compare-best' : undefined}>{date ? formatLocalDate(date) : 'Availability not confirmed'}{best && <span className="compare-badge">Soonest</span>}</td>
            })}</tr>
            <tr><th scope="row">Commute</th>{columns.map((home) => <td key={home.id} className="muted">Not available</td>)}</tr>
            <tr><th scope="row">Preference fit</th>{columns.map((home) => <td key={home.id}>{home.match ? `${home.match.reasons} ${home.match.gap}` : <span className="muted">No match details</span>}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </>}
  </PreviewDialog>
}
