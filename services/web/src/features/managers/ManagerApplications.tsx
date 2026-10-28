import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { unitLabel } from './operations.data'
import { openStatuses } from './applications.mock'
import type { ManagerApplication } from './applications.mock'
import type { ManagedListing } from './managers.mock'
import type { ApplicationStatus } from '../applications/applications.data'

export function ManagerApplications({ applications, listings, onStatus, onNote }: {
  applications: ManagerApplication[]; listings: ManagedListing[]
  onStatus: (id: string, status: ApplicationStatus) => void; onNote: (id: string, text: string) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const selected = applications.find((application) => application.id === openId) ?? null
  const getHome = (id: string) => { const listing = listings.find((item) => item.id === id); return listing ? unitLabel(listing) : 'Listing unavailable' }

  function open(application: ManagerApplication) {
    if (application.status === 'Submitted') onStatus(application.id, 'Under Review')
    setNote('')
    setOpenId(application.id)
  }

  function decide(status: ApplicationStatus) {
    if (!selected) return
    onStatus(selected.id, status)
    setOpenId(null)
  }

  return <section className="ops-panel" aria-label="Rental applications">
    <div className="ops-filter-row"><span role="status">{applications.length} {applications.length === 1 ? 'application' : 'applications'}</span></div>
    <table className="ops-table ops-activity-table"><caption className="sr-only">Rental applications and review status</caption>
      <thead><tr><th scope="col">Applicant / submitted</th><th scope="col">Listing</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{applications.map((application) => <tr key={application.id}>
        <th scope="row"><strong>{application.name}</strong><small>{application.submitted}</small></th>
        <td data-label="Listing">{getHome(application.listingId)}</td>
        <td data-label="Status"><span className={`ops-tag ${openStatuses.includes(application.status) ? 'needs-action' : ''}`}>{application.status}</span></td>
        <td><button className="ops-row-button" onClick={() => open(application)} aria-label={`Review application from ${application.name}`}>Review</button></td>
      </tr>)}</tbody>
    </table>
    {selected && <div className="ops-dialog-host"><PreviewDialog title={`Application: ${selected.name}`} onClose={() => setOpenId(null)}>
      <p className="dialog-context small">{getHome(selected.listingId)}<br /><span className="muted">Submitted {selected.submitted} · Status: {selected.status}</span></p>
      <dl className="manager-application-details">
        <div><dt>Monthly income</dt><dd>{selected.income}</dd></div>
        <div><dt>Current address</dt><dd>{selected.address}</dd></div>
        <div><dt>Reference</dt><dd>{selected.reference}</dd></div>
        {selected.jointWith && <div><dt>Joint application</dt><dd>With {selected.jointWith}</dd></div>}
        <div><dt>Documents</dt><dd><ul>{selected.documents.map((document) => <li key={document}>{document}</li>)}</ul></dd></div>
      </dl>
      <section className="manager-application-feedback" aria-labelledby="application-feedback-heading">
        <h3 id="application-feedback-heading">Team feedback</h3>
        {selected.feedback.length ? <ul>{selected.feedback.map((item) => <li key={item.id}>
          <strong>{item.author}</strong>{item.recommendation && <span className="ops-tag">Recommends: {item.recommendation}</span>}<p>{item.text}</p>
        </li>)}</ul> : <p className="small muted">No feedback yet.</p>}
        {openStatuses.includes(selected.status) && <form onSubmit={(event) => { event.preventDefault(); onNote(selected.id, note); setNote('') }}>
          <label>Add a note for your team<textarea value={note} maxLength={1000} onChange={(event) => setNote(event.target.value)} /></label>
          <button className="button" type="submit">Add note</button>
        </form>}
      </section>
      {openStatuses.includes(selected.status) ? <div className="manager-application-actions">
        <button className="button" type="button" disabled={selected.status === 'Info Requested'} onClick={() => decide('Info Requested')}>Request info</button>
        <button className="button" type="button" onClick={() => decide('Declined')}>Decline</button>
        <button className="button button-primary" type="button" onClick={() => decide('Approved')}>Approve</button>
      </div> : <p className="small muted">This application is {selected.status.toLowerCase()}. No further action is needed.</p>}
    </PreviewDialog></div>}
  </section>
}
