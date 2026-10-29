import { useState } from 'react'
import type { FormEvent } from 'react'
import { householdHome } from './household.data'
import { today } from './money.data'
import { announcements, initialRequests, requestCategories, urgencyLevels } from './maintenance.data'
import type { MaintenanceRequest, RequestStatus } from './maintenance.data'

export function Maintenance() {
  const [requests, setRequests] = useState(() => structuredClone(initialRequests))
  const [photos, setPhotos] = useState<string[]>([])
  const [notice, setNotice] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const number = Math.max(...requests.map((request) => request.number)) + 1
    const date = today()
    setRequests((current) => [{ id: `req-${number}`, number, category: String(form.get('category')), description: String(form.get('description') ?? '').trim(), urgency: String(form.get('urgency')),
      entryAllowed: form.get('entry') === 'yes', photos, status: 'Open', submitted: date, updates: [{ id: `u-${number}`, date, author: 'You', text: 'Request submitted.' }] }, ...current])
    setPhotos([])
    setNotice(`Request #${number} submitted. Its status is Open.`)
    event.currentTarget.reset()
  }

  function respond(request: MaintenanceRequest, fixed: boolean) {
    const status: RequestStatus = fixed ? 'Closed' : 'Open'
    setRequests((current) => current.map((entry) => entry.id === request.id ? { ...entry, status,
      updates: [...entry.updates, { id: `u-${Date.now()}`, date: today(), author: 'You', text: fixed ? 'Confirmed the fix. Request closed.' : 'The issue is not fixed. Request reopened.' }] } : entry))
    setNotice(fixed ? `Request #${request.number} closed.` : `Request #${request.number} reopened.`)
  }

  return <div className="household-money">
    <section className="household-panel" aria-labelledby="maintenance-announcements">
      <h2 id="maintenance-announcements">Announcements</h2>
      <ul className="household-items">{announcements.map((item) => <li key={item.id}><div className="household-item-main">
        <p><strong>{item.title}</strong> · {item.date}</p><p className="small">{item.text}</p><p className="small muted">From {item.from}</p>
      </div></li>)}</ul>
    </section>
    <section className="household-panel" aria-labelledby="maintenance-new">
      <h2 id="maintenance-new">New request</h2>
      <p className="small muted">For {householdHome.title}</p>
      <form className="household-item-form" noValidate onSubmit={submit}>
        <label>Category<select name="category">{requestCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label>Urgency<select name="urgency" defaultValue="Medium">{urgencyLevels.map((level) => <option key={level}>{level}</option>)}</select></label>
        <label className="household-wide">Describe the problem<textarea name="description" rows={3} maxLength={1000} /></label>
        <fieldset className="household-wide household-radio"><legend>May staff enter when you are not home?</legend>
          <label><input type="radio" name="entry" value="yes" defaultChecked />Yes</label><label><input type="radio" name="entry" value="no" />No</label>
        </fieldset>
        <div className="household-wide household-photo-row"><label className="household-attach">Add photos<input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => setPhotos([...(event.target.files ?? [])].map((file) => file.name))} /></label><span className="small muted">{photos.length ? photos.join(', ') : 'No photos added'}</span></div>
        <div className="household-form-actions"><button type="submit" className="button button-primary">Submit request</button><span className="small" role="status">{notice}</span></div>
      </form>
    </section>
    <section className="household-panel" aria-labelledby="maintenance-requests">
      <h2 id="maintenance-requests">Your requests</h2>
      <ul className="household-items maintenance-requests">{requests.map((request) => <li key={request.id}>
        <div className="household-item-main">
          <p><strong>#{request.number} · {request.category}</strong> <span className={`maintenance-status is-${request.status.toLowerCase().replace(' ', '-')}`}>{request.status}</span></p>
          <p>{request.description || 'No description provided.'}</p>
          <p className="small muted">Submitted {request.submitted} · {request.urgency} urgency · {request.entryAllowed ? 'Entry allowed' : 'Entry not allowed'}{request.photos.length ? ` · Photos: ${request.photos.join(', ')}` : ''}</p>
          {request.assignedTo && <p className="small">Assigned to {request.assignedTo}{request.scheduled ? ` · Repair scheduled for ${request.scheduled}` : ''}</p>}
          <ol className="maintenance-updates">{request.updates.map((update) => <li key={update.id} className="small"><span className="muted">{update.date} · {update.author}:</span> {update.text}</li>)}</ol>
          {request.status === 'Resolved' && <div className="household-form-actions"><span className="small">Is the issue fixed?</span>
            <button type="button" className="button button-primary" onClick={() => respond(request, true)}>Confirm fix</button>
            <button type="button" className="button" onClick={() => respond(request, false)}>Not fixed</button></div>}
        </div>
      </li>)}</ul>
    </section>
  </div>
}
