import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { estimatedMonthlyTotal, formatLocalDate, formatMoney } from '../listing-detail/costs'
import { homes } from './housing.data'

export function HomesBrowse({ savedOnly, savedIds, onSave }: { savedOnly: boolean; savedIds: string[]; onSave: (id: string) => void }) {
  const search = new URLSearchParams(window.location.search)
  const [location, setLocation] = useState(search.get('neighborhood') ?? search.get('city') ?? '')
  const [type, setType] = useState('All housing')
  const [budget, setBudget] = useState('')
  const [sort, setSort] = useState('Available soonest')
  const [notice, setNotice] = useState('')
  const visible = homes.filter((home) => (!savedOnly || savedIds.includes(home.id))
    && `${home.location.city} ${home.location.neighborhood}`.toLowerCase().includes(location.trim().toLowerCase())
    && (type === 'All housing' || home.type === type)
    && (!budget || (estimatedMonthlyTotal(home.costs) ?? Infinity) <= Number(budget) * 100))
    .sort((a, b) => sort === 'Lowest total cost' ? (estimatedMonthlyTotal(a.costs) ?? Infinity) - (estimatedMonthlyTotal(b.costs) ?? Infinity)
      : a.availability.localDate.localeCompare(b.availability.localDate))

  function clearFilters() { setLocation(''); setType('All housing'); setBudget('') }

  return <>
    <div className="discovery-heading"><div><span className="eyebrow muted">{savedOnly ? 'Your shortlist' : 'Housing search'}</span><h1>{savedOnly ? 'Saved homes' : 'Find a home'}</h1><p className="muted">{savedOnly ? 'Review the homes you saved and compare their costs.' : 'Search by location, housing type, and total monthly cost.'}</p></div>{savedOnly && <a href="/listings" className="button">Browse homes<Icon name="arrow" /></a>}</div>
    <div className="discovery-filters" role="search" aria-label="Filter homes">
      <label>Location<input type="search" placeholder="City or neighborhood" value={location} onChange={(event) => setLocation(event.target.value)} /></label>
      <label>Housing type<select value={type} onChange={(event) => setType(event.target.value)}><option>All housing</option><option>Private room</option><option>Apartment</option><option>Sublet</option></select></label>
      <label>Maximum total / month<input type="number" min="0" step="50" placeholder="No maximum" value={budget} onChange={(event) => setBudget(event.target.value)} /></label>
      <button className="discovery-text-button" onClick={clearFilters}>Clear filters</button>
    </div>
    <div className="discovery-results-heading"><p className="small" role="status">{visible.length} {visible.length === 1 ? 'home' : 'homes'}{savedOnly ? ' saved' : ' found'}</p><label className="small muted">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Available soonest</option><option>Lowest total cost</option></select></label></div>
    {visible.length ? <div className="home-results">{visible.map((home) => <article className="home-result" key={home.id}>
      <div className={`home-result-photo ${home.photo ? '' : 'home-result-placeholder'}`}>
        {home.photo?.crop ? <svg role="img" aria-label={home.photo.alt} viewBox={`${home.photo.crop.x} ${home.photo.crop.y} ${home.photo.crop.width} ${home.photo.crop.height}`} preserveAspectRatio="xMidYMid slice"><image href={home.photo.src} width={home.photo.crop.sourceWidth} height={home.photo.crop.sourceHeight} /></svg> : <div><Icon name="home" /><span>{home.location.neighborhood}</span></div>}
        <span className="home-type">{home.type}</span><button className="home-save" aria-label={`${savedIds.includes(home.id) ? 'Unsave' : 'Save'} ${home.title}`} aria-pressed={savedIds.includes(home.id)} onClick={() => { onSave(home.id); setNotice(savedIds.includes(home.id) ? 'Home removed from saved homes.' : 'Home saved.') }}><Icon name="heart" filled={savedIds.includes(home.id)} /></button>
      </div>
      <div className="home-result-copy"><span className="eyebrow muted">{home.location.neighborhood}, {home.location.city}</span><h2><a href={`/listings/${home.id}`}>{home.title}</a></h2><p className="home-result-price">{formatMoney(home.costs.baseRent)}<span className="small muted"> / month</span></p><p className="small muted">Estimated {formatMoney(estimatedMonthlyTotal(home.costs))} total with utilities</p><div className="home-result-bottom"><span className="small muted">Available {formatLocalDate(home.availability.localDate)}</span><a href={`/listings/${home.id}`} aria-label={`View ${home.title}`}><Icon name="arrow" /></a></div></div>
    </article>)}</div> : <div className="discovery-empty"><Icon name={savedOnly ? 'heart' : 'home'} /><h2>{savedOnly && !savedIds.length ? 'Save homes to build your shortlist' : 'No homes match these filters'}</h2><p className="muted">{savedOnly && !savedIds.length ? 'Select the heart on a home to find it here.' : 'Try a nearby location or increase your monthly budget.'}</p>{savedOnly && !savedIds.length ? <a href="/listings" className="button button-primary">Browse homes</a> : <button className="button" onClick={clearFilters}>Clear filters</button>}</div>}
    <p className="discovery-cost-note small muted">Monthly totals include rent, required fees, and estimated utilities. Move-in costs are listed separately on each home.</p>
    <p className="sr-only" role="status">{notice}</p>
  </>
}
