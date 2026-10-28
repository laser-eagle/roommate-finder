import { Icon } from '../../../components/Icon'
import { estimatedMonthlyTotal, formatLocalDate, formatMoney } from '../costs'
import type { ContactAction, Listing } from '../listing.types'
import { findBusiness } from '../../business/business.data'

export function InquiryCard({ listing, onContact }: { listing: Listing; onContact: (action: ContactAction) => void }) {
  const total = estimatedMonthlyTotal(listing.costs)
  const business = findBusiness(listing.businessId)
  const blocked = listing.status !== 'active' || !listing.contactAllowed
  const recipient = listing.type === 'Apartment' ? 'property manager' : 'household'
  const reason = listing.status !== 'active'
    ? 'This listing is paused. Tour requests and messages are unavailable.'
    : 'Contact is unavailable for this account.'
  return (
    <section className="inquiry-card panel" aria-labelledby="rent-heading">
      <h2 id="rent-heading" className="eyebrow utility-heading muted">Monthly rent</h2>
      <p className="rent"><span>{formatMoney(listing.costs.baseRent)}</span><span className="small muted">/ month</span></p>
      <p className="small muted total-summary">{total === null ? 'Monthly total incomplete · some costs unknown' : `Estimated ${formatMoney(total)} total with utilities`}</p>
      <dl className="lease-facts">
        <div><dt className="eyebrow muted">Available</dt><dd>{listing.status !== 'active' ? 'Currently paused' : listing.availability.confirmed ? formatLocalDate(listing.availability.localDate) : 'Availability not confirmed'}</dd></div>
        <div><dt className="eyebrow muted">Lease</dt><dd>{listing.lease}</dd></div>
      </dl>
      {blocked && <p id="contact-reason" className="contact-reason small">{reason}</p>}
      <div className="contact-actions">
        <button className="button button-primary" disabled={blocked} aria-describedby={blocked ? 'contact-reason' : undefined}
          onClick={() => onContact('tour')}>Request a tour<Icon name="arrow" /></button>
        <button className="button" disabled={blocked} aria-describedby={blocked ? 'contact-reason' : undefined}
          onClick={() => onContact('message')}>Message the {recipient}</button>
      </div>
      <p className="verification small muted">
        {listing.verification.status === 'current' && <Icon name="check" />}
        {listing.verification.status === 'current' ? 'Verified listing · Authorization checked' : 'Listing authorization not current'}
      </p>
      {business && <p className="managed-by small muted">Managed by <a href={`/business/${business.id}`}>{business.name}</a></p>}
    </section>
  )
}
