import type { Listing } from '../listing.types'

export function AboutHomeSection({ listing }: { listing: Listing }) {
  return (
    <section className="about-home" aria-labelledby="about-heading">
      <h2 id="about-heading">A little more about this home</h2>
      <p className="muted">{listing.description}</p>
      <dl className="room-facts">
        {listing.roomFacts.map((fact) => (
          <div key={fact.label}><dt className="eyebrow muted">{fact.label}</dt><dd>{fact.value}</dd></div>
        ))}
      </dl>
    </section>
  )
}
