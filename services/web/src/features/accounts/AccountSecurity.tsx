import { AccountSaveBar, AccountToggle } from './AccountControls'
import { accountEmail } from './accounts.mock'

export function AccountSecurity({ visible, dirty, onChange, onSave, onDiscard, onResetPassword }: {
  visible: boolean; dirty: boolean; onChange: (visible: boolean) => void
  onSave: () => void; onDiscard: () => void; onResetPassword: () => void
}) {
  return <form className="account-panel" aria-labelledby="account-panel-heading" onSubmit={(event) => { event.preventDefault(); onSave() }}>
    <div className="account-panel-heading"><span className="eyebrow muted">Account access</span><h2 id="account-panel-heading">Security &amp; privacy</h2><p className="small muted">Review your sign-in method and profile visibility.</p></div>
    <div className="account-form-content">
      <div className="account-security-block"><h3>Email and password</h3><p className="small muted">{accountEmail}</p><button type="button" className="button" onClick={onResetPassword}>Password reset</button></div>
      <AccountToggle title="Show my profile" description="Let signed-in members view your display name, city, and introduction." checked={visible} onChange={onChange} />
      <div className="account-private-details"><h3>Private information</h3><p className="small muted">Your full name, email address, and housing preferences are not included in your public profile.</p></div>
      <div className="account-session"><span className="account-session-icon" aria-hidden="true">↳</span><div><h3>Current session</h3><p className="small muted">This browser</p></div><span className="account-status">Active now</span></div>
    </div>
    <AccountSaveBar dirty={dirty} onDiscard={onDiscard} />
  </form>
}
