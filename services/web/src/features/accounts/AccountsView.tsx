import { useCallback, useEffect, useState } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { Icon } from '../../components/Icon'
import { AccountProfile } from './AccountProfile'
import { AccountHousing, AccountNotificationSettings } from './AccountPreferences'
import { AccountSecurity } from './AccountSecurity'
import { PasswordResetDialog } from './PasswordResetDialog'
import { AccountProfileDialog } from './AccountProfileDialog'
import { PersonalDetailsAuthDialog } from './PersonalDetailsAuthDialog'
import { authWindowMs, canEditPersonalDetails } from './personalDetailsAuth.mock'
import { useAccountRoute } from './useAccountRoute'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { accountEmail, accountEmailVerified, accountSections, initialAccount } from './accounts.mock'
import type { AccountSection, AccountSettings } from './accounts.mock'
import './AccountsView.css'

export function AccountsView() {
  const [account, setAccount] = useState(() => structuredClone(initialAccount))
  const [draft, setDraft] = useState(() => structuredClone(initialAccount))
  const [notice, setNotice] = useState('')
  const [dialog, setDialog] = useState<'profile' | 'password' | 'verify' | null>(null)
  const [editExpiresAt, setEditExpiresAt] = useState(0)
  const onNavigate = useCallback(() => { setEditExpiresAt(0); setDialog(null); setNotice('') }, [])
  const { section, navigate } = useAccountRoute(onNavigate)
  const { savedIds } = useSavedHomes()
  const sectionLabel = accountSections.find((item) => item.id === section)?.label

  useEffect(() => {
    const title = document.title
    document.title = `${sectionLabel ?? 'Account settings'} | Roommate Finder`
    return () => { document.title = title }
  }, [sectionLabel])

  useEffect(() => {
    if (!editExpiresAt) return
    const timer = window.setTimeout(() => {
      setEditExpiresAt(0)
      setNotice('Personal details locked. Verify your account again to continue editing.')
    }, Math.max(0, editExpiresAt - Date.now()))
    return () => window.clearTimeout(timer)
  }, [editExpiresAt])

  function update<K extends AccountSection>(key: K, value: AccountSettings[K]) {
    if (key === 'profile' && !canEditPersonalDetails(editExpiresAt)) return
    setDraft((current) => ({ ...current, [key]: value }))
    setNotice('')
  }

  function save() {
    if (!section) return
    if (section === 'profile' && !canEditPersonalDetails(editExpiresAt)) { setEditExpiresAt(0); setDialog('verify'); return }
    const value = section === 'profile' ? {
      ...draft.profile, fullName: draft.profile.fullName.trim(), displayName: draft.profile.displayName.trim(),
      city: draft.profile.city.trim(), bio: draft.profile.bio.trim(),
    } : draft[section]
    setAccount((current) => ({ ...current, [section]: value }))
    setDraft((current) => ({ ...current, [section]: value }))
    setNotice(`${accountSections.find((item) => item.id === section)!.label} saved.`)
    if (section === 'profile') setEditExpiresAt(0)
  }

  function discard() {
    if (!section) return
    setDraft((current) => ({ ...current, [section]: structuredClone(account[section]) }))
    setNotice('Unsaved changes discarded for this section.')
    if (section === 'profile') setEditExpiresAt(0)
  }

  const dirty = !!section && JSON.stringify(draft[section]) !== JSON.stringify(account[section])
  const actions = { dirty, onSave: save, onDiscard: discard }
  const initials = account.profile.fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((name) => name[0]).join('').toUpperCase()
  const moveIn = new Date(`${account.housing.moveIn}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return <>
    <SiteHeader savedCount={savedIds.length} />
    <main id="main-content" className="container account-main" tabIndex={-1}>
      <div className="account-topline"><span className="eyebrow muted">Your account</span></div>
      <div className="account-heading"><h1>Account settings</h1><p className="muted">Manage your profile, housing preferences, and account access.</p></div>
      <div className="account-layout">
        <aside className="account-sidebar" aria-label="Account navigation">
          <div className="account-identity"><span className="account-avatar" aria-hidden="true">{initials}</span><div><strong>{account.profile.fullName}</strong><span className="small muted">Personal account</span>{accountEmailVerified && <span className="account-verified account-identity-verified"><Icon name="verified" />Email verified</span>}</div></div>
          <nav aria-label="Account sections">{accountSections.map((item) => <a key={item.id} href={item.path} aria-current={section === item.id ? 'page' : undefined} aria-controls="account-content" onClick={(event) => navigate(event, item.id)}>
            <span>{item.label}</span><Icon name="arrow" /></a>)}</nav>
          <a className="account-manager-link" href="/applications"><span className="eyebrow muted">Rental applications</span><span>My applications<Icon name="arrow" /></span></a>
          <a className="account-manager-link" href="/managers"><span className="eyebrow muted">Property management</span><span>Open manager workspace<Icon name="arrow" /></span></a>
        </aside>
        <div id="account-content" className="account-content">
          {section === 'profile' && <AccountProfile {...actions} value={draft.profile} editing={editExpiresAt > 0} onChange={(value) => update('profile', value)} onSecurity={(event) => navigate(event, 'privacy')} onEdit={() => setDialog('verify')} onLock={() => setEditExpiresAt(0)} />}
          {section === 'housing' && <AccountHousing {...actions} value={draft.housing} onChange={(value) => update('housing', value)} />}
          {section === 'notifications' && <AccountNotificationSettings {...actions} value={draft.notifications} onChange={(value) => update('notifications', value)} />}
          {section === 'privacy' && <AccountSecurity {...actions} visible={draft.privacy.profileVisible} onChange={(profileVisible) => update('privacy', { profileVisible })} onResetPassword={() => setDialog('password')} />}
          {!section && <section className="account-panel"><div className="account-panel-heading"><h2>Account page not found</h2><p className="small muted">Choose a section to manage your account.</p><a className="account-text-button" href="/account/personal" onClick={(event) => navigate(event, 'profile')}>Go to personal details<Icon name="arrow" /></a></div></section>}
        </div>
        <aside className="account-summary" aria-label="Account summary">
          <section className="account-profile-card" aria-labelledby="profile-preview-heading"><span className="eyebrow">Member profile</span><h2 id="profile-preview-heading">Your profile</h2><div className="account-profile-person"><span className="account-avatar" aria-hidden="true">{account.profile.displayName.charAt(0).toUpperCase()}</span><div><h3>{account.profile.displayName}</h3><p className="small muted">{account.profile.city}</p></div></div>
            <p className="small account-bio-preview">{account.profile.bio || 'No introduction added.'}</p><div className="account-profile-visibility"><span className="account-status">{account.privacy.profileVisible ? 'Visible to members' : 'Hidden from members'}</span></div>
            <button className="account-text-button" onClick={() => setDialog('profile')}>View profile<Icon name="arrow" /></button></section>
          <section className="account-search-card" aria-labelledby="search-summary-heading"><span className="eyebrow muted">Saved preferences</span><h2 id="search-summary-heading">Your housing search</h2><dl><div><dt>Monthly budget</dt><dd>Up to ${Number(account.housing.budget).toLocaleString('en-US')}</dd></div><div><dt>Location</dt><dd>{account.housing.location}</dd></div><div><dt>Move-in date</dt><dd>{moveIn}</dd></div><div><dt>Housing type</dt><dd>{account.housing.homeType}</dd></div></dl><a className="account-text-button" href="/account/preferences" onClick={(event) => navigate(event, 'housing')}>Edit preferences<Icon name="arrow" /></a></section>
        </aside>
      </div>
      <div role="status" className={`account-notice ${notice ? 'has-notice' : ''}`}>{notice}{notice && <button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" /></button>}</div>
    </main>
    {dialog === 'profile' && <AccountProfileDialog account={account} onClose={() => setDialog(null)} />}
    {dialog === 'password' && <PasswordResetDialog email={accountEmail} onClose={() => setDialog(null)} />}
    {dialog === 'verify' && <PersonalDetailsAuthDialog email={accountEmail} onClose={() => setDialog(null)} onVerified={() => { setEditExpiresAt(Date.now() + authWindowMs); setDialog(null); setNotice('Account verified. Personal details are unlocked for editing.') }} />}
  </>
}
