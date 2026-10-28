import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { homes } from '../discovery/housing.data'
import './Applications.css'

export function ApplicationFormView() {
  const { savedIds } = useSavedHomes()
  const [submitted, setSubmitted] = useState(false)
  const id = window.location.pathname.replace(/\/+$/, '').split('/')[2]
  const home = homes.find((entry) => entry.id === id)
  useEffect(() => {
    const previous = document.title
    document.title = `${home ? 'Apply' : 'Listing unavailable'} | Roommate Finder`
    return () => { document.title = previous }
  }, [home])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container applications-main">
    {!home ? <section className="applications-empty">
      <span className="eyebrow muted">Listing unavailable</span>
      <h1>This home could not be found.</h1>
      <a className="button button-primary" href="/listings">Back to Homes</a>
    </section> : submitted ? <section className="applications-panel application-confirmation" role="status" aria-labelledby="application-sent-heading">
      <span className="eyebrow muted">Rental application</span>
      <h1 id="application-sent-heading">Application submitted</h1>
      <p className="application-context small">{home.title}<br /><span className="muted">{home.location.neighborhood}, {home.location.city} · {home.type}</span></p>
      <p>Your application was sent. Its status is Submitted.</p>
      <div className="applications-actions">
        <a className="button button-primary" href="/applications">View my applications</a>
        <a className="button" href={`/listings/${home.id}`}>Back to the home</a>
      </div>
    </section> : <section className="application-form-panel" aria-labelledby="application-heading">
      <span className="eyebrow muted">Rental application</span>
      <h1 id="application-heading">Apply</h1>
      <p className="application-context small">{home.title}<br /><span className="muted">{home.location.neighborhood}, {home.location.city} · {home.type}</span></p>
      <form className="application-form" noValidate onSubmit={submit}>
        <fieldset><legend>Personal information</legend><label>Full name<input name="name" type="text" autoComplete="name" /></label></fieldset>
        <fieldset><legend>Income</legend><label>Monthly income ($)<input name="income" type="number" min="0" step="50" /></label></fieldset>
        <fieldset><legend>Rental history</legend><label>Current address<input name="address" type="text" autoComplete="street-address" /></label></fieldset>
        <fieldset><legend>References</legend><label>Reference name<input name="reference" type="text" /></label></fieldset>
        <fieldset><legend>Documents</legend><label>Upload a document<input name="document" type="file" /></label></fieldset>
        <label className="application-check"><input name="joint" type="checkbox" />Apply jointly with my roommate group (Avery Chen)</label>
        <button className="button button-primary" type="submit">Submit application</button>
      </form>
    </section>}
  </main></>
}
