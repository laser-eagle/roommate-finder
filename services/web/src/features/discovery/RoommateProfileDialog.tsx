import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { ReferenceList } from '../../components/References/ReferenceList'
import { referencesFor } from './references.data'
import { StudentBadge } from '../../components/StudentBadge/StudentBadge'
import type { RoommatePerson } from './RoommatesBrowse'

type View = 'profile' | 'write' | 'sent'

export function RoommateProfileDialog({ person, connected, onConnect, onClose }: {
  person: RoommatePerson; connected: boolean; onConnect: () => void; onClose: () => void
}) {
  const [view, setView] = useState<View>('profile')
  const title = view === 'write' ? 'Write a reference' : view === 'sent' ? 'Reference sent' : person.name

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setView('sent')
  }

  return <PreviewDialog title={title} onClose={onClose}>
    {view === 'profile' && <div className="roommate-dialog">
      {person.verifiedStudent && <StudentBadge />}
      <p className="small muted">{person.area} · {person.looking}</p>
      <p>{person.bio}</p>
      <dl><div><dt>Monthly budget</dt><dd>Up to ${person.budget.toLocaleString('en-US')}</dd></div><div><dt>Move-in date</dt><dd>{person.moveIn}</dd></div></dl>
      <h3>Sharing a home</h3>
      <div className="discovery-tags">{person.habits.map((habit) => <span key={habit}>{habit}</span>)}</div>
      <p className="small muted">Connect to discuss your search and household expectations.</p>
      <button className="button button-primary" disabled={connected} onClick={onConnect}>{connected ? 'Request sent' : 'Connect'}</button>
      <span role="status" className="small">{connected ? 'Your connection request is awaiting a response.' : ''}</span>
      <section className="roommate-references" aria-labelledby="roommate-references-heading">
        <h3 id="roommate-references-heading">References</h3>
        <ReferenceList references={referencesFor(person.id)} />
        <button className="button" type="button" onClick={() => setView('write')}>Write a reference</button>
      </section>
    </div>}
    {view === 'write' && <>
      <p className="dialog-context small">{person.name}<br /><span className="muted">{person.area}</span></p>
      <form noValidate onSubmit={submit}>
        <label>Your relationship<select name="relationship" autoFocus><option>Former roommate</option><option>Former landlord</option></select></label>
        <label>Reference<textarea name="reference" maxLength={1000} placeholder={`Describe what it was like to live with or rent to ${person.name}.`} /></label>
        <button className="button button-primary" type="submit">Send reference</button>
        <button className="button" type="button" onClick={() => setView('profile')}>Back to profile</button>
      </form>
    </>}
    {view === 'sent' && <div className="dialog-confirmation" role="status">
      <p>Your reference for {person.name} was sent.</p>
      <button className="button button-primary" onClick={() => setView('profile')} autoFocus>Back to profile</button>
    </div>}
  </PreviewDialog>
}
