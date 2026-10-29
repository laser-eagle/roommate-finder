import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { rolePermissions, teamAreas, teamProperties, teamRoles } from './team.mock'
import type { TeamArea, TeamMember, TeamRole } from './team.mock'

const propertyLabel = (properties: string[]) => properties.length === teamProperties.length ? 'All properties' : properties.join(', ')

function AddMemberDialog({ team, onClose, onAdd }: { team: TeamMember[]; onClose: () => void; onAdd: (member: TeamMember) => void }) {
  const [role, setRole] = useState<TeamRole>('Leasing Agent')
  const [custom, setCustom] = useState<TeamArea[]>([])
  const [properties, setProperties] = useState<string[]>([...teamProperties])
  const [error, setError] = useState('')
  const permissions = role === 'Custom permissions' ? custom : rolePermissions[role]
  const toggle = <T,>(list: T[], value: T) => list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email')).trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError('Enter a valid email address.'); return }
    if (team.some((member) => member.email === email)) { setError('This person is already on the team.'); return }
    if (!permissions.length) { setError('Choose at least one permission.'); return }
    if (!properties.length) { setError('Choose at least one property.'); return }
    onAdd({ id: `team-${Date.now()}`, name: email, email, role, permissions: teamAreas.filter((area) => permissions.includes(area)), properties: teamProperties.filter((item) => properties.includes(item)), status: 'Invitation pending' })
  }

  return <PreviewDialog title="Add member" onClose={onClose}>
    <form className="manager-team-form" noValidate onSubmit={submit}>
      <label>Email<input name="email" type="email" maxLength={120} placeholder="name@example.com" onChange={() => setError('')} /></label>
      <label>Role<select value={role} onChange={(event) => { setRole(event.target.value as TeamRole); setError('') }}>
        {teamRoles.map((item) => <option key={item}>{item}</option>)}<option>Custom permissions</option>
      </select></label>
      <fieldset><legend>Permissions</legend>{teamAreas.map((area) => <label key={area}>
        <input type="checkbox" checked={permissions.includes(area)} disabled={role !== 'Custom permissions'} onChange={() => { setCustom(toggle(custom, area)); setError('') }} />{area}
      </label>)}</fieldset>
      <fieldset><legend>Properties</legend>{teamProperties.map((property) => <label key={property}>
        <input type="checkbox" checked={properties.includes(property)} onChange={() => { setProperties(toggle(properties, property)); setError('') }} />{property}
      </label>)}</fieldset>
      {error && <p role="alert" className="small">{error}</p>}
      <button className="button button-primary" type="submit">Save</button>
    </form>
  </PreviewDialog>
}

export function ManagerTeam({ team, onAdd, onRemove }: { team: TeamMember[]; onAdd: (member: TeamMember) => void; onRemove: (id: string) => void }) {
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState<TeamMember | null>(null)

  return <>
    <section className="ops-panel" aria-labelledby="manager-team-title">
      <div className="ops-panel-title"><h2 id="manager-team-title">Pine Street Homes team</h2><button type="button" onClick={() => setAdding(true)}><span aria-hidden="true">＋</span>Add member</button></div>
      <table className="ops-table ops-activity-table manager-team-table"><caption className="sr-only">Team members, roles, permissions, and property access</caption>
        <thead><tr><th scope="col">Member</th><th scope="col">Role</th><th scope="col">Permissions</th><th scope="col">Properties</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>{team.map((member) => <tr key={member.id}>
          <th scope="row"><strong>{member.name}</strong>{member.name !== member.email && <small>{member.email}</small>}</th>
          <td data-label="Role">{member.role}</td>
          <td data-label="Permissions">{member.permissions.join(', ')}</td>
          <td data-label="Properties">{propertyLabel(member.properties)}</td>
          <td data-label="Status"><span className={`ops-tag ${member.status === 'Active' ? '' : 'needs-action'}`}>{member.status}</span></td>
          <td><button className="ops-row-button" onClick={() => setRemoving(member)} aria-label={`Remove ${member.name}`}>Remove</button></td>
        </tr>)}</tbody>
      </table>
    </section>
    {adding && <div className="ops-dialog-host"><AddMemberDialog team={team} onClose={() => setAdding(false)} onAdd={(member) => { setAdding(false); onAdd(member) }} /></div>}
    {removing && <div className="ops-dialog-host"><PreviewDialog title="Remove member" onClose={() => setRemoving(null)}>
      <p className="dialog-context">Remove {removing.name} from Pine Street Homes? They lose access right away.</p>
      <div className="manager-team-confirm">
        <button type="button" className="button" onClick={() => setRemoving(null)}>Cancel</button>
        <button type="button" className="button button-primary" onClick={() => { setRemoving(null); onRemove(removing.id); requestAnimationFrame(() => document.querySelector<HTMLElement>('#ops-content h1')?.focus()) }}>Remove member</button>
      </div>
    </PreviewDialog></div>}
  </>
}
