# ManagerApplications

## Metadata

- Status: `in-progress`
- Scope: manager's rental application review queue and review dialog
- Route: `/managers/applications` (manager workspace)
- Updated: 2026-10-28
- Files: `ManagerApplications.tsx`, `applications.mock.ts`, related rules in `ManagerWorkspace.css`
- Requirements source: SRS Feature 40 Application Review Workflow, UC-4.4 Review Rental Application; prototype checklist item 2.13

## Purpose and requirements

Let a landlord or property manager review applications, ask for missing information, collect team feedback, and send a decision.

- [x] List applications with applicant, date submitted, listing (unit label), and status.
- [x] Support the statuses Submitted, Under Review, Info Requested, Approved, Declined, and Withdrawn.
- [x] Open an application in a review dialog with monthly income, current address, reference, joint applicant (when present), and document names.
- [x] Set a Submitted application to Under Review when it is opened (UC-4.4 step 2).
- [x] Show team feedback with each author and any Approve or Decline recommendation.
- [x] Add a note for the team on open applications.
- [x] Request info, which sets the status to Info Requested (UC-4.4 extension 3a).
- [x] Approve or Decline, which sets the status and shows a Decision sent notice.
- [x] Hide actions on Approved, Declined, and Withdrawn applications and explain that no further action is needed.
- [x] Show the number of open applications (Submitted, Under Review, Info Requested) on the workspace sidebar link.
- [ ] Notify applicants, send the standard decline message (6b), and offer lease signing after approval (6a).
- [ ] Let team members add their own recommendations, and compare applicants side by side.

## Usage

```tsx
<ManagerApplications applications={applications} listings={listings} onStatus={setStatus} onNote={addNote} />
```

ManagerWorkspace renders the component for the `applications` page. ManagersView owns the application records.
`onStatus(id, status)` updates one application. `onNote(id, text)` appends a note from You; blank notes are ignored.

## Design and data

`applications.mock.ts` exports `ManagerApplication`, `openStatuses`, and six fictional applications, one per status, on portfolio units. Jordan Ellis is the Under Review applicant on Market Street · Room B, matching the renter-side sample. Feedback authors are the Pine Street Homes staff.
The table reuses the workspace queue styles (`ops-panel`, `ops-table`, `ops-tag`, `ops-row-button`). Open statuses use the `needs-action` tag style.
The dialog uses PreviewDialog inside `ops-dialog-host`. Request info is disabled when the status is already Info Requested.
Records persist while navigating inside the workspace and reset on refresh, like other workspace records.

## Acceptance criteria

- [x] `/managers/applications` lists six applications, one per status.
- [x] Opening Marisol Vega's Submitted application shows Status: Under Review.
- [x] Request info changes the row to Info Requested; Approve changes Jordan Ellis's row to Approved.
- [x] Changes remain after Back to listings and returning to Applications; the sidebar count updates.
- [x] The page fits 320, 390, 760, 800, 960, and 1280px without horizontal overflow.

## Limitations and open questions

UC-4.4 leaves open what fair housing rules allow the review to ask for and show, and whether background and credit checks are in scope.
Manager-side status changes do not update the renter's My applications page.
