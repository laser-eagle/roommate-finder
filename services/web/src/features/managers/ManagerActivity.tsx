import { Icon } from '../../components/Icon'
import type { Inquiry, ManagedListing, Tour } from './managers.mock'

export function ManagerInbox({ inquiries, listings, onOpen }: {
  inquiries: Inquiry[]; listings: ManagedListing[]; onOpen: (inquiry: Inquiry) => void
}) {
  return (
    <section id="manager-inquiries" className="manager-section" aria-labelledby="inquiries-heading">
      <div className="manager-section-heading"><div><span className="eyebrow muted">Renter communication</span><h2 id="inquiries-heading">Inquiries</h2></div><span className="manager-count">{inquiries.filter((inquiry) => !inquiry.reply).length} pending</span></div>
      <ul className="manager-inbox">
        {inquiries.map((inquiry) => <li key={inquiry.id}>
          <button className="manager-inquiry" onClick={() => onOpen(inquiry)} aria-label={`Open inquiry from ${inquiry.name}`}>
            <span className="manager-avatar" aria-hidden="true">{inquiry.initials}</span>
            <span className="manager-inquiry-copy"><span className="manager-inquiry-title"><strong>{inquiry.name}</strong><span className="small muted">{inquiry.reply ? 'Replied' : 'Awaiting reply'}</span></span><span className="small muted">{listings.find((listing) => listing.id === inquiry.listingId)?.title}</span><span className="small manager-message-snippet">{inquiry.message}</span></span>
            <Icon name="arrow" />
          </button>
        </li>)}
      </ul>
    </section>
  )
}

export function ManagerTours({ tours, listings, onOpen }: {
  tours: Tour[]; listings: ManagedListing[]; onOpen: (tour: Tour) => void
}) {
  return (
    <section id="manager-tours" className="manager-section manager-tours" aria-labelledby="tours-heading">
      <div className="manager-section-heading"><div><span className="eyebrow muted">Scheduling</span><h2 id="tours-heading">Upcoming tours</h2></div></div>
      <p className="small muted manager-sample-week">October 12–18, 2026</p>
      <ul>
        {tours.map((tour) => <li key={tour.id}>
          <div className="manager-tour-top"><span className="manager-date-tile"><span>{tour.month}</span><strong>{tour.day}</strong></span><div><h3>{tour.name}</h3><p className="small muted">{listings.find((listing) => listing.id === tour.listingId)?.title}</p></div></div>
          <p className="small manager-tour-time">{tour.time}<br /><span className="muted">{tour.mode} · {tour.confirmed ? 'Confirmed' : 'Awaiting confirmation'}</span></p>
          <button className="manager-text-action" onClick={() => onOpen(tour)} aria-label={`Review tour with ${tour.name}`}>{tour.confirmed ? 'View tour details' : 'Review request'}<Icon name="arrow" /></button>
        </li>)}
      </ul>
    </section>
  )
}

export function ListingReadiness() {
  return <aside className="manager-readiness" aria-labelledby="readiness-heading"><span className="eyebrow">Publishing</span><h2 id="readiness-heading">Required listing details</h2><p className="small">Review these items before publishing:</p><ul><li><Icon name="check" /><span>Rent, fees, and utility estimates</span></li><li><Icon name="check" /><span>Current availability date</span></li><li><Icon name="check" /><span>Property photos</span></li><li><Icon name="check" /><span>Authorization to list the property</span></li></ul><p className="small muted">Drafts stay private until you publish them.</p></aside>
}
