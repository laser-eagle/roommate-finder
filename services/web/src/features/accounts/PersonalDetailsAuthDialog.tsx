import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { Icon } from '../../components/Icon'
import { createChallenge, verifyChallenge } from './personalDetailsAuth.mock'
import type { PersonalDetailsChallenge } from './personalDetailsAuth.mock'

export function PersonalDetailsAuthDialog({ email, onVerified, onClose }: {
  email: string; onVerified: () => void; onClose: () => void
}) {
  const [challenge, setChallenge] = useState<PersonalDetailsChallenge | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [needsNewCode, setNeedsNewCode] = useState(false)
  const [notice, setNotice] = useState('')

  function sendCode() {
    setChallenge(createChallenge())
    setCode('')
    setError('')
    setNeedsNewCode(false)
    setNotice('Verification code sent.')
  }

  function verify() {
    if (!challenge) return
    const result = verifyChallenge(challenge, code)
    if (result === 'verified') { onVerified(); return }
    setChallenge({ ...challenge, attempts: challenge.attempts + 1 })
    setNotice('')
    setNeedsNewCode(result !== 'invalid')
    setError(result === 'expired' ? 'This code has expired. Request a new code.'
      : result === 'locked' ? 'Too many incorrect attempts. Request a new code.'
        : 'That code is incorrect. Check the code and try again.')
  }

  return <PreviewDialog title="Confirm it’s you" onClose={onClose}>
    <div className="account-auth-context"><Icon name="lock" /><p className="small muted">Verify your account to edit personal details.</p></div>
    {challenge ? <form onSubmit={(event) => { event.preventDefault(); verify() }}>
      <p>Enter the 6-digit code sent to <strong className="account-reset-email">{email}</strong>.</p>
      <label>Verification code<input name="verification-code" type="text" inputMode="numeric" autoComplete="one-time-code" autoFocus pattern="[0-9]{6}" minLength={6} maxLength={6} required value={code} disabled={needsNewCode}
        aria-invalid={!!error} aria-describedby={error ? 'verification-error' : 'verification-help'} onChange={(event) => { setCode(event.target.value); setError('') }} /></label>
      <p id="verification-help" className="small muted">The code expires after 5 minutes.</p>
      {error && <p id="verification-error" className="account-auth-error" role="alert">{error}</p>}
      <button type="button" className="account-text-button" onClick={sendCode}>Send a new code</button>
      <div className="account-password-actions"><button type="button" className="button" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary" disabled={needsNewCode}>Verify and edit</button></div>
    </form> : <div className="account-password-content">
      <p>Send a verification code to <strong className="account-reset-email">{email}</strong>.</p>
      <div className="account-password-actions"><button className="button" onClick={onClose}>Cancel</button><button className="button button-primary" onClick={sendCode}>Send code</button></div>
    </div>}
    <p className="sr-only" role="status">{notice}</p>
  </PreviewDialog>
}
