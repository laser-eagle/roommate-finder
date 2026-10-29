# ManagerTeam

## Metadata

- Status: `in-progress`
- Scope: manager's team list with roles, permissions, and property access; add and remove members
- Route: `/managers/team` (manager workspace)
- Updated: 2026-10-29
- Files: `ManagerTeam.tsx`, `team.mock.ts`, related rules in `ManagerWorkspace.css`
- Requirements source: SRS Feature 29 Team Roles and Permissions, UC-3.6 Assign Staff Permissions; prototype checklist item 2.21

## Purpose and requirements

Let a property manager control which staff can see properties, messages, applications, resident records, and financial information.

- [x] List each team member's name, email, role, permissions, properties, and status (UC-3.6 step 1).
- [x] Offer the roles Leasing Agent, Maintenance, Accountant, and Office Admin, plus Custom permissions.
- [x] Add a member with an email, a role or custom permissions, and the properties they can access (steps 2–5).
- [x] Pre-check a role's permissions and lock them; Custom permissions lets the manager check them.
- [x] Show an Invitation sent notice and add the person as Invitation pending (step 6).
- [x] Reject an invalid email, an email already on the team, no permissions, or no properties.
- [x] Remove a member after a confirmation; the row is removed and a notice confirms it (extension 2a).
- [x] Show the number of team members, including pending invitations, on the workspace sidebar link.
- [ ] Change a member's role, permissions, or properties (sub-variation 1).
- [ ] Mark invitations expired after 7 days and let the manager resend them (extension 7a).
- [ ] Send invitation emails, let staff accept and log in, and limit their access to the chosen properties and areas (steps 6–8).

## Usage

```tsx
<ManagerTeam team={team} onAdd={addMember} onRemove={removeMember} />
```

ManagerWorkspace renders the component for the `team` page. ManagersView owns the team records.
`onAdd(member)` appends a new member and shows `Invitation sent to {email}.` `onRemove(id)` removes the member and shows `{name} was removed from the team.`

## Design and data

`team.mock.ts` exports `teamAreas`, `teamRoles`, `rolePermissions`, `teamProperties`, the `TeamMember` type, and `initialTeam`.

| Role | Default permissions |
| --- | --- |
| Leasing Agent | Properties, Messages, Applications |
| Maintenance | Properties, Resident records |
| Accountant | Resident records, Financial information |
| Office Admin | All five areas |

The sample team is Hannah Wu (Leasing Agent), Omar Haddad (Maintenance), and Chris Morales (Office Admin), all Active, and Priya Shah (Accountant, Invitation pending). Everyone can access all four portfolio properties: Market Street, Fremont Court, Wallingford House, and Greenwood Flats.
New members have no name yet, so the email is shown as the name. Members with every property show All properties.
The table reuses the workspace queue styles (`ops-panel`, `ops-table`, `ops-tag`, `ops-row-button`). Invitation pending uses the `needs-action` tag style.
Add member and the remove confirmation use PreviewDialog inside `ops-dialog-host`. The Add member form uses `noValidate` with inline errors. After a removal, focus moves to the page heading.
Records persist while navigating inside the workspace and reset on refresh, like other workspace records.

## Acceptance criteria

- [x] `/managers/team` lists four members, and the sidebar shows Team 4.
- [x] Save with no email shows Enter a valid email address; Hannah Wu's email shows This person is already on the team.
- [x] Custom permissions with no boxes checked, or no properties checked, shows an error.
- [x] Adding sam.lee@example.com with Custom permissions (Messages, Applications) and Fremont Court adds an Invitation pending row.
- [x] Removing Omar Haddad removes his row, shows the notice, and moves focus to the Team heading.
- [x] Changes remain after Back to listings and returning to Team.
- [x] The page fits 320, 390, 600, 760, 800, 960, and 1280px without horizontal overflow.

## Limitations and open questions

The team list does not update the Business profile staff list or the Maintenance Assign staff options.
Permissions are not enforced anywhere in the workspace.
UC-3.6 lists "Which default roles will we include?" as an open issue. The default permissions above are a proposal for this mockup. TBD.
