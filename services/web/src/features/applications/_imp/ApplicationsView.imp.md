# ApplicationsView

## Metadata

- Status: `in-progress`
- Scope: renter's list of submitted rental applications and shared application documents
- Route: `/applications`
- Updated: 2026-10-29
- Files: `ApplicationsView.tsx`, `Applications.css`, `applications.data.ts`, `SharedDocuments.tsx`, `documents.data.ts`
- Requirements source: SRS Feature 17 Reusable Rental Applications, UC-2.4 Track Application Status; prototype checklist item 2.13; SRS Feature 22 Secure Document Sharing; prototype checklist item 2.20

## Purpose and requirements

Let a renter see every application they have sent and its current status.

- [x] Render at `/applications`, including a trailing slash.
- [x] List each application with the listing (linked), location, date submitted, and status.
- [x] Open Application details in a dialog with the status history and messages from the landlord, or No messages yet.
- [x] Link to the page from the Account sidebar (My applications) and from the application confirmation.
- [x] Show a Shared documents section below the list with each stored document's name, file name, and date added.
- [x] List who can see each document, the application it was shared for (or Joint applicant), and when access expires.
- [x] Revoke a recipient's access after a confirmation dialog. The recipient stays listed as Access revoked on {date} and the Revoke access button is removed.
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Log each view and revoke of a document and show the access log (SRS Feature 22: access shall be logged).
- [ ] Encrypt documents at rest and in transit, and end access automatically on the expiration date.
- [ ] Load the renter's applications and status changes from backend services.

## Usage

```tsx
<ApplicationsView />
```

App selects the component for `/applications`. The page title is `My applications | Roommate Finder`.

## Design and data

`applications.data.ts` exports the `ApplicationStatus` type (Submitted, Under Review, Info Requested, Approved, Declined, Withdrawn), the `RentalApplication` type, and three fictional applications: Ballard (Under Review), Capitol Hill (Info Requested, with a Pine Street Homes message asking for proof of income), and Green Lake (Submitted).
The details dialog uses the shared PreviewDialog. No header link is highlighted on this page.

SharedDocuments renders the Shared documents section and owns the document records in local state, so revokes reset on refresh.
`documents.data.ts` exports `DocumentGrant`, `StoredDocument`, and three fictional documents:

| Document | Recipient | Shared for | Expires |
| --- | --- | --- | --- |
| Photo ID | Pine Street Homes | Ballard application | December 31, 2026 |
| Pay stub (October 2026) | Pine Street Homes | Capitol Hill application | November 30, 2026 |
| Pay stub (October 2026) | Avery Chen | Joint applicant | November 30, 2026 |
| Rental history letter | Pine Street Homes | Ballard application | January 15, 2027 |

The confirmation uses PreviewDialog with Cancel and Revoke access. After a revoke, a status message names the recipient and document, and focus moves to that document's heading.

## Acceptance criteria

- [x] `/applications` lists three applications with the statuses Under Review, Info Requested, and Submitted.
- [x] Capitol Hill details show Submitted, Under Review, and Info Requested in order, and one landlord message.
- [x] Green Lake details show No messages yet.
- [x] Shared documents lists three documents and four recipients, each with Revoke access.
- [x] Cancel leaves access unchanged; Revoke access marks Avery Chen's pay stub access as revoked with today's date and removes the button.
- [x] The page fits 320, 390, 600, 760, 960, and 1280px without horizontal overflow.

## Non-goals

These UC-2.4 actions are not part of this mockup: uploading a missing item (4a), withdrawing (4b), and sorting or filtering by status. Uploading documents, sharing with new recipients, and changing expiration dates are not part of this mockup.

## Completion checklist

- [x] Application status list mockup exists.
- [x] Shared documents mockup exists.
- [ ] Backend application data exists.
