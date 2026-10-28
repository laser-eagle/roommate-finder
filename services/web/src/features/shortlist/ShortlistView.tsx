import { useEffect, useState } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { Icon } from '../../components/Icon'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { homes } from '../discovery/housing.data'
import { estimatedMonthlyTotal, formatMoney } from '../listing-detail/costs'
import { initialShortlist, members } from './shortlist.data'
import type { Vote } from './shortlist.data'
import './ShortlistView.css'

const you = members.find((member) => member.you)!
const memberName = (id: string) => members.find((member) => member.id === id)?.name ?? 'Unknown member'
const displayName = (id: string) => id === you.id ? `${you.name} (you)` : memberName(id)

export function ShortlistView() {
  const { savedIds } = useSavedHomes()
  const [items, setItems] = useState(() => structuredClone(initialShortlist))
  useEffect(() => {
    const previous = document.title
    document.title = 'Shared shortlist | Roommate Finder'
    return () => { document.title = previous }
  }, [])

  function vote(homeId: string, value: Vote) {
    setItems((current) => current.map((item) => item.homeId === homeId ? { ...item, votes: { ...item.votes, [you.id]: value } } : item))
  }

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container shortlist-main">
    <div className="shortlist-heading">
      <div>
        <span className="eyebrow muted">Collaborative search</span>
        <h1>Shared shortlist</h1>
        <p className="muted">Members: {members.map((member) => displayName(member.id)).join(', ')}</p>
      </div>
      <a href="/saved" className="button">Saved homes<Icon name="arrow" /></a>
    </div>
    <ul className="shortlist-items">{items.map((item) => {
      const home = homes.find((entry) => entry.id === item.homeId)
      if (!home) return null
      const votes = Object.values(item.votes)
      return <li key={item.homeId} className="shortlist-item">
        <div className="shortlist-home">
          <span className="eyebrow muted">{home.location.neighborhood}, {home.location.city} · {home.type}</span>
          <h2><a href={`/listings/${home.id}`}>{home.title}</a></h2>
          <p className="small muted">Estimated {formatMoney(estimatedMonthlyTotal(home.costs))} total with utilities · Added by {displayName(item.addedBy)}</p>
        </div>
        <section className="shortlist-votes" aria-labelledby={`votes-${item.homeId}`}>
          <h3 id={`votes-${item.homeId}`}>Votes <span className="small muted">{votes.filter((value) => value === 'Yes').length} yes · {votes.filter((value) => value === 'No').length} no</span></h3>
          <ul>{members.map((member) => <li key={member.id}>
            <span>{displayName(member.id)}</span>
            {member.you ? <span className="shortlist-vote-buttons" role="group" aria-label={`Your vote on ${home.title}`}>
              {(['Yes', 'No'] as const).map((value) => <button key={value} type="button" aria-pressed={item.votes[member.id] === value} onClick={() => vote(item.homeId, value)}>{value}</button>)}
            </span> : <strong>{item.votes[member.id] ?? 'No vote yet'}</strong>}
          </li>)}</ul>
        </section>
        <section className="shortlist-comments" aria-labelledby={`comments-${item.homeId}`}>
          <h3 id={`comments-${item.homeId}`}>Comments</h3>
          {item.comments.length ? <ul>{item.comments.map((comment) => <li key={comment.id}>
            <strong className="small">{displayName(comment.author)}</strong><p className="small">{comment.text}</p>
          </li>)}</ul> : <p className="small muted">No comments yet.</p>}
        </section>
      </li>
    })}</ul>
  </main></>
}
