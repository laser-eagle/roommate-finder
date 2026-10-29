import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import type { AppealStatus, ModerationAppeal } from './moderation.data'

export function AdminAppeals({ appeals, onDecide }: { appeals: ModerationAppeal[]; onDecide: (id: string, status: AppealStatus) => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const selected = appeals.find((appeal) => appeal.id === openId) ?? null
  const decide = (status: AppealStatus) => {
    if (!selected) return
    onDecide(selected.id, status)
    requestAnimationFrame(() => document.querySelector<HTMLElement>('dialog .dialog-close')?.focus())
  }

  return <>
    <section className="ops-panel" aria-label="Appeals">
      <div className="ops-filter-row"><span role="status">{appeals.length} appeals</span></div>
      <table className="ops-table ops-activity-table"><caption className="sr-only">Appeals of moderation decisions</caption>
        <thead><tr><th scope="col">Report / appealed</th><th scope="col">Content</th><th scope="col">Decision</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>{appeals.map((appeal) => <tr key={appeal.id}>
          <th scope="row"><strong>{appeal.reportNumber}</strong><small>{appeal.submitted}</small></th>
          <td data-label="Content">{appeal.content}<br /><span className="muted">{appeal.contentType} · {appeal.appellant}</span></td>
          <td data-label="Decision">{appeal.decision}</td>
          <td data-label="Status"><span className={`ops-tag ${appeal.status === 'Under review' ? 'needs-action' : ''}`}>{appeal.status}</span></td>
          <td><button className="ops-row-button" onClick={() => setOpenId(appeal.id)} aria-label={`Review appeal for ${appeal.reportNumber}`}>Review</button></td>
        </tr>)}</tbody>
      </table>
    </section>
    {selected && <div className="ops-dialog-host"><PreviewDialog title={`Appeal for ${selected.reportNumber}`} onClose={() => setOpenId(null)}>
      <p className="dialog-context small">{selected.content}<br /><span className="muted">{selected.contentType} · {selected.appellant} · Status: {selected.status}</span></p>
      <dl className="manager-application-details">
        <div><dt>Decision</dt><dd>{selected.decision}</dd></div>
        <div><dt>Appealed</dt><dd>{selected.submitted}</dd></div>
      </dl>
      <section className="manager-application-feedback" aria-labelledby="appeal-reason-heading">
        <h3 id="appeal-reason-heading">Reason for the appeal</h3>
        <p className="small">{selected.reason}</p>
      </section>
      {selected.status === 'Under review' ? <div className="admin-review-actions">
        <button type="button" className="button" onClick={() => decide('Decision upheld')}>Uphold decision</button>
        <button type="button" className="button button-primary" onClick={() => decide('Decision reversed')}>Reverse decision</button>
      </div> : <p className="small muted">{selected.status === 'Decision reversed' ? 'The content was restored.' : 'The content stays removed.'} No further action is needed.</p>}
    </PreviewDialog></div>}
  </>
}
