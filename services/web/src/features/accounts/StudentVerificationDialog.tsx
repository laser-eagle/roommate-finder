import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { approvedSchools, isApprovedCampusEmail, studentVerificationCode, studentVerificationExpires } from './studentVerification.mock'
import type { StudentVerification } from './studentVerification.mock'

export function StudentVerificationDialog({ onVerified, onClose }: {
  onVerified: (verification: StudentVerification) => void; onClose: () => void
}) {
  const school = approvedSchools[0]
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const verified = () => onVerified({ school: school.short, expires: studentVerificationExpires })

  function sendCode() {
    if (!isApprovedCampusEmail(email)) { setError(`Enter a campus email address ending in @${school.domain}.`); return }
    setCodeSent(true)
    setCode('')
    setError('')
    setNotice('Verification code sent.')
  }

  function checkCode() {
    if (code.trim() === studentVerificationCode) { verified(); return }
    setNotice('')
    setError('That code is incorrect. Try again or send a new code.')
  }

  return <PreviewDialog title="Verify student status" onClose={onClose}>
    {!codeSent ? <form noValidate onSubmit={(event) => { event.preventDefault(); sendCode() }}>
      <p className="small muted">Verified students get a badge on their profile. Verification lasts until the end of the academic year.</p>
      <label>School<select name="school" defaultValue={school.domain}>{approvedSchools.map((item) => <option key={item.domain} value={item.domain}>{item.name}</option>)}</select></label>
      <label>Campus email<input name="campus-email" type="email" autoComplete="email" autoFocus value={email}
        aria-invalid={!!error} aria-describedby={error ? 'student-error' : undefined} onChange={(event) => { setEmail(event.target.value); setError('') }} /></label>
      {error && <p id="student-error" className="account-auth-error" role="alert">{error}</p>}
      <button type="submit" className="button button-primary">Send code</button>
      <button type="button" className="button" onClick={verified}>Verify with a verification service</button>
    </form> : <form noValidate onSubmit={(event) => { event.preventDefault(); checkCode() }}>
      <p>Enter the 6-digit code sent to <strong className="account-reset-email">{email.trim()}</strong>.</p>
      <label>Verification code<input name="student-code" type="text" inputMode="numeric" autoComplete="one-time-code" autoFocus maxLength={6} value={code}
        aria-invalid={!!error} aria-describedby={error ? 'student-error' : undefined} onChange={(event) => { setCode(event.target.value); setError('') }} /></label>
      {error && <p id="student-error" className="account-auth-error" role="alert">{error}</p>}
      <button type="submit" className="button button-primary">Verify</button>
      <button type="button" className="account-text-button" onClick={sendCode}>Send a new code</button>
    </form>}
    <p className="sr-only" role="status">{notice}</p>
  </PreviewDialog>
}
