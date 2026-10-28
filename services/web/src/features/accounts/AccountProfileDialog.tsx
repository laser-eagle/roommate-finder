import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { ReferenceList } from '../../components/References/ReferenceList'
import { accountReferences } from './accounts.mock'
import type { AccountSettings } from './accounts.mock'
import { StudentBadge } from '../../components/StudentBadge/StudentBadge'
import type { StudentVerification } from './studentVerification.mock'

type View = 'profile' | 'request' | 'sent'

export function AccountProfileDialog({ account, student, onClose }: { account: AccountSettings; student: StudentVerification | null; onClose: () => void }) {
  const [view, setView] = useState<View>('profile')
  const title = view === 'request' ? 'Request a reference' : view === 'sent' ? 'Request sent' : 'Your profile'

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setView('sent')
  }

  return <PreviewDialog title={title} onClose={onClose}>
    {view === 'profile' && <>
      <p className="small muted">{account.privacy.profileVisible ? 'This is what signed-in members can see.' : 'Your profile is hidden from other members. Only you can view it.'}</p>
      <div className="account-public-preview"><span className="account-avatar" aria-hidden="true">{account.profile.displayName.charAt(0).toUpperCase()}</span><h3>{account.profile.displayName}</h3>{student && <StudentBadge detail={`${student.school} · Expires ${student.expires}`} />}<p className="small muted">{account.profile.city}</p><p>{account.profile.bio || 'No introduction added.'}</p></div>
      <p className="small muted">Your full name, email, and housing preferences are private.</p>
      <section className="account-references" aria-labelledby="account-references-heading">
        <h3 id="account-references-heading">References</h3>
        <ReferenceList references={accountReferences} showReport={false} />
        <button className="button" type="button" onClick={() => setView('request')}>Request a reference</button>
      </section>
    </>}
    {view === 'request' && <>
      <p className="small muted">Ask a former roommate or landlord to write a reference for your profile.</p>
      <form noValidate onSubmit={submit}>
        <label>Email<input name="reference-email" type="email" autoComplete="off" autoFocus /></label>
        <button className="button button-primary" type="submit">Send request</button>
        <button className="button" type="button" onClick={() => setView('profile')}>Back to profile</button>
      </form>
    </>}
    {view === 'sent' && <div className="dialog-confirmation" role="status">
      <p>Your reference request was sent.</p>
      <button className="button button-primary" onClick={() => setView('profile')} autoFocus>Back to profile</button>
    </div>}
  </PreviewDialog>
}
