import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { maintenanceStaff, managerAnnouncements } from './maintenance.mock'
import type { ManagerRequest } from './maintenance.mock'

export function ManagerMaintenance({ requests, onUpdate }: { requests: ManagerRequest[]; onUpdate: (id: string, change: Partial<ManagerRequest>, update: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const selected = requests.find((request) => request.id === openId) ?? null
  const active = selected && (selected.status === 'Open' || selected.status === 'In Progress')
  const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`))

  return <>
    <section className="ops-panel" aria-label="Maintenance requests">
      <div className="ops-filter-row"><span role="status">{requests.length} requests</span></div>
      <table className="ops-table ops-activity-table"><caption className="sr-only">Maintenance requests and repair status</caption>
        <thead><tr><th scope="col">Request / submitted</th><th scope="col">Unit / resident</th><th scope="col">Issue</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>{requests.map((request) => <tr key={request.id}>
          <th scope="row"><strong>#{request.number}</strong><small>{request.submitted}</small></th>
          <td data-label="Unit / resident">{request.unit}<br /><span className="muted">{request.resident}</span></td>
          <td data-label="Issue">{request.category} · {request.urgency}</td>
          <td data-label="Status"><span className={`ops-tag ${request.status === 'Open' ? 'needs-action' : ''}`}>{request.status}</span></td>
          <td><button className="ops-row-button" onClick={() => { setOpenId(request.id); setMessage('') }} aria-label={`Review request ${request.number}`}>Review</button></td>
        </tr>)}</tbody>
      </table>
    </section>
    <section className="ops-panel manager-announcements" aria-labelledby="manager-announcements-title">
      <div className="ops-panel-title"><h2 id="manager-announcements-title">Building announcements</h2></div>
      <ul>{managerAnnouncements.map((item) => <li key={item.id}><strong>{item.title}</strong><span>{item.property} · {item.date}</span><p>{item.text}</p></li>)}</ul>
    </section>
    {selected && <div className="ops-dialog-host"><PreviewDialog title={`Request #${selected.number}`} onClose={() => setOpenId(null)}>
      <p className="dialog-context small">{selected.unit} · {selected.resident}<br /><span className="muted">{selected.category} · {selected.urgency} urgency · Status: {selected.status}</span></p>
      <p>{selected.description || 'No description provided.'}</p>
      <dl className="manager-application-details">
        <div><dt>Entry</dt><dd>{selected.entryAllowed ? 'Staff may enter' : 'Resident must be home'}</dd></div>
        <div><dt>Photos</dt><dd>{selected.photos.length ? selected.photos.join(', ') : 'None'}</dd></div>
        <div><dt>Assigned to</dt><dd>{selected.assignedTo ?? 'Not assigned'}</dd></div>
        <div><dt>Repair date</dt><dd>{selected.scheduled ?? 'Not scheduled'}</dd></div>
      </dl>
      <section className="manager-application-feedback" aria-labelledby="request-updates-heading">
        <h3 id="request-updates-heading">Updates</h3>
        <ul>{selected.updates.map((update) => <li key={update.id}><strong>{update.author}</strong><span className="small muted">{update.date}</span><p>{update.text}</p></li>)}</ul>
      </section>
      {active && <div className="manager-maintenance-actions">
        <form onSubmit={(event) => { event.preventDefault(); const staff = String(new FormData(event.currentTarget).get('staff')); onUpdate(selected.id, { assignedTo: staff, status: 'In Progress' }, `Assigned to ${staff}.`) }}>
          <label>Assign staff<select name="staff" defaultValue={selected.assignedTo ?? maintenanceStaff[0]}>{maintenanceStaff.map((name) => <option key={name}>{name}</option>)}</select></label>
          <button type="submit" className="button">Assign</button>
        </form>
        <form onSubmit={(event) => { event.preventDefault(); const value = String(new FormData(event.currentTarget).get('date')); if (!value) return; const date = formatDate(value); onUpdate(selected.id, { scheduled: date }, `Repair scheduled for ${date}.`) }}>
          <label>Repair date<input name="date" type="date" /></label>
          <button type="submit" className="button">Schedule repair</button>
        </form>
        <form onSubmit={(event) => { event.preventDefault(); if (!message.trim()) return; onUpdate(selected.id, {}, message.trim()); setMessage('') }}>
          <label>Post an update<textarea value={message} maxLength={1000} onChange={(event) => setMessage(event.target.value)} /></label>
          <button type="submit" className="button">Post update</button>
        </form>
        <button type="button" className="button button-primary" onClick={() => onUpdate(selected.id, { status: 'Resolved' }, 'Marked resolved. Waiting for the resident to confirm the fix.')}>Mark resolved</button>
      </div>}
      {!active && <p className="small muted">This request is {selected.status.toLowerCase()}. No further action is needed.</p>}
    </PreviewDialog></div>}
  </>
}
