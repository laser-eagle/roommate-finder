import { useState } from 'react'
import type { FormEvent } from 'react'
import { jordanDecision } from '../admin/moderation.data'

export function AccountModeration({ appealed, onAppeal }: { appealed: boolean; onAppeal: () => void }) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!reason.trim()) { setError('Enter a reason for your appeal.'); return }
    onAppeal()
  }

  return <section className="account-panel" aria-labelledby="account-panel-heading">
    <div className="account-panel-heading"><span className="eyebrow muted">Account standing</span><h2 id="account-panel-heading">Moderation</h2><p className="small muted">Decisions about content you posted, and appeals you can make.</p></div>
    <div className="account-form-content">
      <div className="account-security-block account-moderation-decision">
        <h3>{jordanDecision.content}</h3>
        <p className="small muted">{jordanDecision.contentType} · Report {jordanDecision.reportNumber}</p>
        <p className="small">Removed for {jordanDecision.reason.toLowerCase()} on {jordanDecision.decided}.</p>
        {appealed ? <p className="account-status" role="status">Appeal submitted · Under review</p>
          : <form className="account-moderation-appeal" noValidate onSubmit={submit}>
            <label>Why should this be reviewed again?<textarea value={reason} maxLength={1000} onChange={(event) => { setReason(event.target.value); setError('') }} aria-describedby={error ? 'appeal-error' : undefined} /></label>
            {error && <p id="appeal-error" className="small" role="alert">{error}</p>}
            <button type="submit" className="button button-primary">Submit appeal</button>
          </form>}
      </div>
    </div>
  </section>
}
