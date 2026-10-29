# ManagerMaintenance

## Metadata

- Status: `in-progress`
- Scope: manager's maintenance request queue, request review dialog, and building announcements list
- Route: `/managers/maintenance` (manager workspace)
- Updated: 2026-10-29
- Files: `ManagerMaintenance.tsx`, `maintenance.mock.ts`, related rules in `ManagerWorkspace.css`
- Requirements source: SRS Feature 24 Maintenance Requests and Building Announcements; prototype checklist item 2.20

## Purpose and requirements

Let a landlord or property manager see repair requests from residents, act on them, and see building announcements.

- [x] List requests with number, date submitted, unit, resident, category, urgency, and status.
- [x] Use the request statuses Open, In Progress, Resolved, and Closed from the resident side.
- [x] Open a request in a review dialog with its description, entry permission, photos, assigned staff, repair date, and updates.
- [x] Assign a staff member, which sets the status to In Progress and adds an update.
- [x] Schedule a repair date, which adds an update.
- [x] Post a free-text update to the resident.
- [x] Mark a request resolved, which adds an update saying the resident still needs to confirm the fix.
- [x] Hide actions on Resolved and Closed requests and explain that no further action is needed.
- [x] Show the number of Open and In Progress requests on the workspace sidebar link.
- [x] List building announcements with title, property, date and time, and message.
- [ ] Add an announcement post form with title, property, date and time, and message.
- [ ] Send manager changes to the resident's Maintenance tab and notify residents of updates.

## Usage

```tsx
<ManagerMaintenance requests={requests} onUpdate={onRequestUpdate} />
```

ManagerWorkspace renders the component for the `maintenance` page. ManagersView owns the request records.
`onUpdate(id, change, update)` merges `change` into one request and appends `update` as a new entry from Pine Street Homes dated today. ManagersView also shows `update` as the workspace notice.

## Design and data

`maintenance.mock.ts` exports `ManagerRequest` (a `MaintenanceRequest` with `unit` and `resident`), `maintenanceStaff`, `managerAnnouncements`, and `initialManagerRequests`.
Three requests are on occupied portfolio units: #1045 Fremont Court · Unit 302 (Open, High), #1040 Wallingford House · Garden room (In Progress), and #1035 Fremont Court · Unit 204 (Resolved).
The Capitol Hill household's two resident requests (#1042 and #1038) are copied from `household/maintenance.data.ts`, with Jordan Ellis as the resident and author. Requests are sorted newest number first.
Announcements reuse the resident-side water shutoff with the property Capitol Hill.
Staff options are the Pine Street Homes team: Chris Morales, Hannah Wu, and Omar Haddad.
The table reuses the workspace queue styles (`ops-panel`, `ops-table`, `ops-tag`, `ops-row-button`). Open requests use the `needs-action` tag style.
The dialog uses PreviewDialog inside `ops-dialog-host`. Its updates list reuses the application feedback styles. The action forms use `.manager-maintenance-actions`.
Records persist while navigating inside the workspace and reset on refresh, like other workspace records.

## Acceptance criteria

- [x] `/managers/maintenance` lists #1045, #1042, #1040, #1038, and #1035, and the sidebar shows Maintenance 3.
- [x] Assigning staff on #1045 changes it to In Progress and adds an update.
- [x] Scheduling a date, posting an update, and marking resolved each add an update; Mark resolved changes the row to Resolved.
- [x] Changes remain after Back to listings and returning to Maintenance; the sidebar count updates.
- [x] Jordan Ellis's requests show updates from Jordan Ellis and Pine Street Homes.
- [x] The page fits 320, 390, 760, 800, 960, and 1280px without horizontal overflow.

## Non-goals

- Changing request categories, urgency, or photos from the manager side.
- Closing a request. Closing follows the resident's confirmation.

## Limitations and open questions

Manager-side changes do not update the resident's Maintenance tab on `/household`. Both sides start from the same sample data.
No notice is sent to the resident or to assigned staff.
The SRS does not say who may post announcements, how long they stay listed, or whether residents can reply. TBD.
