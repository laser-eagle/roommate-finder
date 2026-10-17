import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'

export function PasswordResetDialog({ email, onClose }: { email: string; onClose: () => void }) {
  const [sent, setSent] = useState(false)

  return <PreviewDialog title={sent ? 'Check your email' : 'Reset your password'} onClose={onClose}>
    {sent ? <div className="account-password-content" role="status">
      <p>We sent a password reset link to <strong>{email}</strong>.</p>
      <p className="small muted">Follow the link to choose a new password. If the email does not arrive, check your spam folder.</p>
      <button className="button button-primary" onClick={onClose} autoFocus>Done</button>
    </div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
      <p>Send a password reset link to <strong className="account-reset-email">{email}</strong>.</p>
      <p className="small muted">Your current password will keep working until you choose a new one.</p>
      <div className="account-password-actions"><button className="button" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">Send reset link</button></div>
    </form>}
  </PreviewDialog>
}
