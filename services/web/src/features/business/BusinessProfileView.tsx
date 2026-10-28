import { useEffect } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { Icon } from '../../components/Icon'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { findBusiness } from './business.data'
import './BusinessProfileView.css'

export function BusinessProfileView() {
  const { savedIds } = useSavedHomes()
  const id = window.location.pathname.replace(/\/+$/, '').split('/')[2]
  const business = findBusiness(id)
  useEffect(() => {
    const previous = document.title
    document.title = `${business ? business.name : 'Business unavailable'} | Roommate Finder`
    return () => { document.title = previous }
  }, [business])

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container business-main">
    {!business ? <section className="business-empty">
      <span className="eyebrow muted">Business unavailable</span>
      <h1>This business could not be found.</h1>
      <a className="button button-primary" href="/listings">Back to Homes</a>
    </section> : <>
      <header className="business-heading">
        <span className="business-logo" aria-hidden="true">{business.initials}</span>
        <div>
          <span className="eyebrow muted">Management company</span>
          <h1>{business.name}</h1>
          {business.verified && <p className="business-verified small"><Icon name="verified" />Verified business</p>}
        </div>
      </header>
      <div className="business-grid">
        <section className="business-panel" aria-labelledby="business-contact-heading">
          <h2 id="business-contact-heading">Contact</h2>
          <dl className="business-contact">
            <div><dt>Phone</dt><dd>{business.contact.phone}</dd></div>
            <div><dt>Email</dt><dd>{business.contact.email}</dd></div>
            <div><dt>Office address</dt><dd>{business.contact.office}</dd></div>
          </dl>
        </section>
        <section className="business-panel" aria-labelledby="business-properties-heading">
          <h2 id="business-properties-heading">Properties</h2>
          <ul className="business-list">{business.properties.map((property) => <li key={property.name}>
            <strong>{property.name}</strong><span className="small muted">{property.neighborhood}</span>
          </li>)}</ul>
        </section>
        <section className="business-panel" aria-labelledby="business-staff-heading">
          <h2 id="business-staff-heading">Staff</h2>
          <ul className="business-list">{business.staff.map((name) => <li key={name}><strong>{name}</strong></li>)}</ul>
        </section>
      </div>
    </>}
  </main></>
}
