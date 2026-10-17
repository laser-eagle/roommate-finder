import type { Listing } from '../listing.types'

export function MatchExplanationPanel({ match }: { match: Listing['match'] }) {
  if (!match) return null
  return (
    <section className="match-panel" aria-labelledby="match-heading">
      <h2 id="match-heading" className="utility-heading">Why it fits your search</h2>
      <p className="small">{match.reasons} <span>{match.gap}</span></p>
    </section>
  )
}
