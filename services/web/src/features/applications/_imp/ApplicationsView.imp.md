# ApplicationsView

## Metadata

- Status: `in-progress`
- Scope: renter's list of submitted rental applications
- Route: `/applications`
- Updated: 2026-10-28
- Files: `ApplicationsView.tsx`, `Applications.css`, `applications.data.ts`
- Requirements source: SRS Feature 17 Reusable Rental Applications, UC-2.4 Track Application Status; prototype checklist item 2.13

## Purpose and requirements

Let a renter see every application they have sent and its current status.

- [x] Render at `/applications`, including a trailing slash.
- [x] List each application with the listing (linked), location, date submitted, and status.
- [x] Open Application details in a dialog with the status history and messages from the landlord, or No messages yet.
- [x] Link to the page from the Account sidebar (My applications) and from the application confirmation.
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Load the renter's applications and status changes from backend services.

## Usage

```tsx
<ApplicationsView />
```

App selects the component for `/applications`. The page title is `My applications | Roommate Finder`.

## Design and data

`applications.data.ts` exports the `ApplicationStatus` type (Submitted, Under Review, Info Requested, Approved, Declined, Withdrawn), the `RentalApplication` type, and three fictional applications: Ballard (Under Review), Capitol Hill (Info Requested, with a Pine Street Homes message asking for proof of income), and Green Lake (Submitted).
The details dialog uses the shared PreviewDialog. No header link is highlighted on this page.

## Acceptance criteria

- [x] `/applications` lists three applications with the statuses Under Review, Info Requested, and Submitted.
- [x] Capitol Hill details show Submitted, Under Review, and Info Requested in order, and one landlord message.
- [x] Green Lake details show No messages yet.

## Non-goals

These UC-2.4 actions are not part of this mockup: uploading a missing item (4a), withdrawing (4b), and sorting or filtering by status.

## Completion checklist

- [x] Application status list mockup exists.
- [ ] Backend application data exists.
