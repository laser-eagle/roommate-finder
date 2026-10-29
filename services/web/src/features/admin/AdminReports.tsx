import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { openReport } from './moderation.data'
import type { ModerationReport } from './moderation.data'

export function AdminReports({ reports, onDismiss }: { reports: ModerationReport[]; onDismiss: (id: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const selected = reports.find((report) => report.id === openId) ?? null

  return <>
    <section className="ops-panel" aria-label="Reports">
      <div className="ops-filter-row"><span role="status">{reports.length} reports</span></div>
      <table className="ops-table ops-activity-table"><caption className="sr-only">Reported content and review status</caption>
        <thead><tr><th scope="col">Report / submitted</th><th scope="col">Content</th><th scope="col">Reason</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>{reports.map((report) => <tr key={report.id}>
          <th scope="row"><strong>{report.number}</strong><small>{report.submitted}</small></th>
          <td data-label="Content">{report.content}<br /><span className="muted">{report.contentType} · {report.owner}</span></td>
          <td data-label="Reason">{report.reason}{report.reportCount > 1 ? ` · ${report.reportCount} reports` : ''}</td>
          <td data-label="Status"><span className={`ops-tag ${openReport(report) ? 'needs-action' : ''}`}>{report.status}</span></td>
          <td><button className="ops-row-button" onClick={() => setOpenId(report.id)} aria-label={`Review report ${report.number}`}>Review</button></td>
        </tr>)}</tbody>
      </table>
    </section>
    {selected && <div className="ops-dialog-host"><PreviewDialog title={`Report ${selected.number}`} onClose={() => setOpenId(null)}>
      <p className="dialog-context small">{selected.content}<br /><span className="muted">{selected.contentType} · {selected.owner} · Status: {selected.status}</span></p>
      <dl className="manager-application-details">
        <div><dt>Reason</dt><dd>{selected.reason}</dd></div>
        <div><dt>Reported by</dt><dd>{selected.reporter}</dd></div>
        <div><dt>Reports</dt><dd>{selected.reportCount}</dd></div>
        <div><dt>Submitted</dt><dd>{selected.submitted}</dd></div>
      </dl>
      {selected.status === 'Hidden pending review' && <p className="small">This content is hidden from members until the review is finished.</p>}
      {openReport(selected) ? <div className="admin-review-actions">
        <button type="button" className="button button-primary" onClick={() => { onDismiss(selected.id); requestAnimationFrame(() => document.querySelector<HTMLElement>('dialog .dialog-close')?.focus()) }}>Dismiss report</button>
      </div> : <p className="small muted">This report is resolved. No further action is needed.</p>}
    </PreviewDialog></div>}
  </>
}
