import { AccountSaveBar } from './AccountControls'
import { Icon } from '../../components/Icon'
import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { accountEmail, accountEmailVerified } from './accounts.mock'
import type { AccountProfile as Profile } from './accounts.mock'

export function AccountProfile({ value, dirty, editing, onChange, onSave, onDiscard, onSecurity, onEdit, onLock }: {
  value: Profile; dirty: boolean; onChange: (value: Profile) => void
  editing: boolean; onSave: () => void; onDiscard: () => void; onSecurity: (event: MouseEvent<HTMLAnchorElement>) => void
  onEdit: () => void; onLock: () => void
}) {
  const firstField = useRef<HTMLInputElement>(null)
  useEffect(() => { if (editing) firstField.current?.focus() }, [editing])

  return <form className="account-panel" aria-labelledby="account-panel-heading" onSubmit={(event) => { event.preventDefault(); onSave() }}>
    <div className="account-panel-heading">
      <div className="account-personal-heading"><div><span className="eyebrow muted">Profile</span><h2 id="account-panel-heading">Personal details</h2></div>
        <button type="button" className="account-icon-button" aria-label={editing ? 'Lock personal details' : 'Edit personal details'} title={editing ? 'Lock personal details' : 'Edit personal details'} onClick={editing ? onLock : onEdit}><Icon name={editing ? 'lock' : 'edit'} /></button></div>
      <span className={`account-lock-status ${editing ? 'is-editing' : ''}`}><Icon name={editing ? 'unlock' : 'lock'} />{editing ? 'Unlocked for editing' : 'Locked'}</span>
      <p className="small muted">{editing ? 'Save your changes when you’re done. These details will lock again.' : 'Confirm it’s you before making changes.'}</p>
    </div>
    <div className="account-form-content">
      <div className="account-field-grid">
        <label>Full name<input ref={firstField} readOnly={!editing} value={value.fullName} required pattern=".*\S.*" maxLength={80} autoComplete="name"
          onChange={(event) => onChange({ ...value, fullName: event.target.value })} /><span className="account-field-hint">Only visible to you.</span></label>
        <label>Display name<input readOnly={!editing} value={value.displayName} required pattern=".*\S.*" maxLength={40}
          onChange={(event) => onChange({ ...value, displayName: event.target.value })} /><span className="account-field-hint">Shown on your profile and messages.</span></label>
      </div>
      <label>City<input readOnly={!editing} value={value.city} required pattern=".*\S.*" maxLength={80} autoComplete="address-level2"
        onChange={(event) => onChange({ ...value, city: event.target.value })} /></label>
      <label>About you<textarea readOnly={!editing} value={value.bio} maxLength={300} rows={4}
        onChange={(event) => onChange({ ...value, bio: event.target.value })} /><span className="account-field-hint account-character-count"><span>Shown on your profile.</span><span>{value.bio.length}/300</span></span></label>
      <div className="account-contact-row"><div><div className="account-contact-label"><span className="small muted">Email address</span>{accountEmailVerified && <span className="account-verified"><Icon name="verified" />Verified</span>}</div><p>{accountEmail}</p><span className="account-field-hint">Used for sign-in and notifications. Not shown on your profile.</span></div>
        <a href="/account/security" className="account-text-button" onClick={onSecurity}>Manage sign-in</a></div>
    </div>
    {editing ? <AccountSaveBar dirty={dirty} onDiscard={onDiscard} /> : <div className="account-locked-note small muted"><Icon name="lock" />{dirty ? 'Unsaved changes kept. Verify your account to continue editing.' : 'Your personal details are locked for editing.'}</div>}
  </form>
}
