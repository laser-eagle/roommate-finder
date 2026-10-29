import { useEffect, useState } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { Icon } from '../../components/Icon'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { homes } from '../discovery/housing.data'
import { applications } from './applications.data'
import type { RentalApplication } from './applications.data'
import { SharedDocuments } from './SharedDocuments'
import './Applications.css'

const homeFor = (application: RentalApplication) => homes.find((home) => home.id === application.homeId)

export function ApplicationsView() {
  const { savedIds } = useSavedHomes()
  const [selected, setSelected] = useState<RentalApplication | null>(null)
  useEffect(() => {
    const previous = document.title
    document.title = 'My applications | Roommate Finder'
    return () => { document.title = previous }
  }, [])
  const selectedHome = selected ? homeFor(selected) : undefined

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container applications-main">
    <div className="applications-heading">
      <span className="eyebrow muted">Rental applications</span>
      <h1>My applications</h1>
    </div>
    <ul className="applications-list">{applications.map((application) => {
      const home = homeFor(application)
      return <li key={application.id} className="applications-item">
        <div>
          <h2><a href={`/listings/${application.homeId}`}>{home?.title ?? 'Listing unavailable'}</a></h2>
          <p className="small muted">{home ? `${home.location.neighborhood}, ${home.location.city} · ` : ''}Submitted {application.submitted}</p>
        </div>
        <span className="application-status">{application.status}</span>
        <button type="button" className="application-details-button" onClick={() => setSelected(application)} aria-label={`View details for ${home?.title ?? 'application'}`}>View details<Icon name="arrow" /></button>
      </li>
    })}</ul>
    <SharedDocuments />
    {selected && <PreviewDialog title="Application details" onClose={() => setSelected(null)}>
      <p className="dialog-context small">{selectedHome?.title ?? 'Listing unavailable'}<br /><span className="muted">Submitted {selected.submitted} · Status: {selected.status}</span></p>
      <section className="application-history" aria-labelledby="application-history-heading">
        <h3 id="application-history-heading">Status history</h3>
        <ol>{selected.history.map((entry) => <li key={entry.status + entry.date}><strong>{entry.status}</strong><span className="small muted">{entry.date}</span></li>)}</ol>
      </section>
      <section className="application-messages" aria-labelledby="application-messages-heading">
        <h3 id="application-messages-heading">Messages from the landlord</h3>
        {selected.messages.length ? <ul>{selected.messages.map((message) => <li key={message.id}>
          <strong className="small">{message.from}</strong><span className="small muted">{message.date}</span><p className="small">{message.text}</p>
        </li>)}</ul> : <p className="small muted">No messages yet.</p>}
      </section>
    </PreviewDialog>}
  </main></>
}
