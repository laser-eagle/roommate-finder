import { AccountSaveBar, AccountToggle } from './AccountControls'
import { accountEmail } from './accounts.mock'
import { StudentBadge } from '../../components/StudentBadge/StudentBadge'
import type { StudentVerification } from './studentVerification.mock'

export function AccountSecurity({ visible, dirty, onChange, onSave, onDiscard, onResetPassword, student, onVerifyStudent }: {
  visible: boolean; dirty: boolean; onChange: (visible: boolean) => void
  onSave: () => void; onDiscard: () => void; onResetPassword: () => void
  student: StudentVerification | null; onVerifyStudent: () => void
}) {
  return <form className="account-panel" aria-labelledby="account-panel-heading" onSubmit={(event) => { event.preventDefault(); onSave() }}>
    <div className="account-panel-heading"><span className="eyebrow muted">Account access</span><h2 id="account-panel-heading">Security &amp; privacy</h2><p className="small muted">Review your sign-in method and profile visibility.</p></div>
    <div className="account-form-content">
      <div className="account-security-block"><h3>Email and password</h3><p className="small muted">{accountEmail}</p><button type="button" className="button" onClick={onResetPassword}>Password reset</button></div>
      <div className="account-security-block"><h3>Student verification</h3>{student ? <><StudentBadge detail={student.school} /><p className="small muted">Expires {student.expires}.</p></> : <><p className="small muted">Verify your enrollment with your campus email to get a verified student badge.</p><button type="button" className="button" onClick={onVerifyStudent}>Verify student status</button></>}</div>
      <AccountToggle title="Show my profile" description="Let signed-in members view your display name, city, and introduction." checked={visible} onChange={onChange} />
      <div className="account-private-details"><h3>Private information</h3><p className="small muted">Your full name, email address, and housing preferences are not included in your public profile.</p></div>
      <div className="account-session"><span className="account-session-icon" aria-hidden="true">↳</span><div><h3>Current session</h3><p className="small muted">This browser</p></div><span className="account-status">Active now</span></div>
    </div>
    <AccountSaveBar dirty={dirty} onDiscard={onDiscard} />
  </form>
}
