import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../PreviewDialog/PreviewDialog'
import { reportReasons } from './reports.data'
import type { ReportReason, SubmittedReport } from './reports.data'
import './ReportDialog.css'

export function ReportDialog({ title, subject, number, onSubmit, onClose }: {
  title: string; subject: string; number: string; onSubmit: (report: SubmittedReport) => void; onClose: () => void
}) {
  const [reason, setReason] = useState<ReportReason | ''>('')
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState<SubmittedReport | null>(null)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!reason) { setError('Choose a reason for your report.'); return }
    const report = { number, reason }
    setSubmitted(report)
    onSubmit(report)
  }

  return <PreviewDialog title={submitted ? 'Report received' : title} onClose={onClose}>
    <p className="dialog-context small">{subject}</p>
    {submitted ? <div className="dialog-confirmation" role="status">
      <dl className="report-summary">
        <div><dt>Report number</dt><dd>{submitted.number}</dd></div>
        <div><dt>Reason</dt><dd>{submitted.reason}</dd></div>
        <div><dt>Status</dt><dd>Under review</dd></div>
      </dl>
      <p className="small muted">An admin will review your report.</p>
      <button type="button" className="button button-primary" onClick={onClose} autoFocus>Done</button>
    </div> : <form className="report-form" noValidate onSubmit={submit}>
      <fieldset className="report-reasons" aria-describedby={error ? 'report-error' : undefined}>
        <legend>Reason</legend>
        {reportReasons.map((item) => <label key={item}><input type="radio" name="reason" value={item} checked={reason === item} onChange={() => { setReason(item); setError('') }} />{item}</label>)}
      </fieldset>
      <label>Details (optional)<textarea name="details" maxLength={1000} placeholder="Tell us what happened." /></label>
      <label>Screenshots (optional)<input type="file" accept="image/*" multiple onChange={(event) => setScreenshots([...(event.target.files ?? [])].map((file) => file.name))} /></label>
      {screenshots.length > 0 && <p className="small muted">{screenshots.join(', ')}</p>}
      {error && <p id="report-error" className="small" role="alert">{error}</p>}
      <button type="submit" className="button button-primary">Submit report</button>
    </form>}
  </PreviewDialog>
}
