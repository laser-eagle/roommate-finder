# ManagerLeases

## Metadata

- Status: `in-progress`
- Scope: manager's lease list, lease details dialog, landlord signing, and renewal offers
- Route: `/managers/leases` (manager workspace)
- Updated: 2026-10-29
- Files: `ManagerLeases.tsx`, `leases.mock.ts`, related rules in `ManagerWorkspace.css`
- Requirements source: SRS Feature 44 Lease and Renewal Workflows, UC-4.7 Sign or Renew Lease; prototype checklist item 2.22

## Purpose and requirements

Let a landlord or property manager track leases, see who has signed, complete signing, and follow renewal offers.

- [x] List leases with unit, rent, renters, term, and status (Waiting for signatures, Renewal offered, or Signed).
- [x] Open a lease in a dialog with the term, rent, deposit, signed copy, each signer with the date signed, and the parties the copy is shared with.
- [x] Show the renewal: the date the offer will be sent (90 days before the lease ends), or the sent offer's new term, rent, and response date.
- [x] Sign lease as Pine Street Homes once every renter has signed. This stands in for the e-signature link (UC-4.7 steps 6–7); it records today's date, sets the status to Signed, and stores the signed copy's file name.
- [x] Show the number of leases needing action (Waiting for signatures and Renewal offered) on the workspace sidebar link.
- [ ] Send a lease: upload a file or pick a template, and enter the renters, start date, end date, rent, and deposit (steps 1–4).
- [ ] Send a renewal offer for a lease ending within 90 days, and record the renter's accept, decline, or proposed changes (extension 1a).
- [ ] Send a reminder to a renter who has not signed, and let the landlord cancel after the deadline (extension 5a).
- [ ] Sign through an e-signature service, retry when it does not respond (extension 3a), and schedule date reminders (step 8).

## Usage

```tsx
<ManagerLeases leases={leases} onSign={signLease} />
```

ManagerWorkspace renders the component for the `leases` page. ManagersView owns the lease records.
`onSign(id)` marks Pine Street Homes signed with today's date, sets the status to Signed, sets the signed copy, and shows `Lease signed. The signed copy was shared with every party.` Focus moves to the dialog's close button.

## Design and data

`leases.mock.ts` exports the `ManagerLease` type, `leaseLandlord`, `needsAction`, and three leases:

| Unit | Renters | Term | Rent / deposit | Status |
| --- | --- | --- | --- | --- |
| Greenwood Flats · Unit 101 | Grace Liu | November 1, 2026 – October 31, 2027 | $1,875 / $1,875 | Waiting for signatures (Grace signed October 27, 2026) |
| Wallingford House · Garden room | Theo Grant | January 16, 2026 – January 15, 2027 | $1,050 / $1,050 | Renewal offered |
| Capitol Hill · Room | Jordan Ellis and Avery Chen | October 20, 2026 – April 19, 2027 | $2,500 / $1,000 | Signed |

Grace Liu's lease follows her Approved application on Greenwood Flats · Unit 101. Its renewal offer date is August 2, 2027.
Theo Grant's lease was signed January 8–9, 2026. The renewal offer was sent October 17, 2026 for January 16, 2027 – January 15, 2028 at $1,050 per month, with a response due November 16, 2026 (30 days, as on the resident side).
The Capitol Hill lease reuses `household/lease.data.ts`, so it matches the resident Lease tab.
The table reuses the workspace queue styles (`ops-panel`, `ops-table`, `ops-tag`, `ops-row-button`). Leases that need action use the `needs-action` tag style.
The dialog uses PreviewDialog inside `ops-dialog-host` and the application detail and feedback styles.
Records persist while navigating inside the workspace and reset on refresh, like other workspace records.

## Acceptance criteria

- [x] `/managers/leases` lists three leases, and the sidebar shows Leases 2.
- [x] Wallingford shows the sent renewal offer; Capitol Hill shows the January 19, 2027 renewal date and three signers.
- [x] Sign lease on Greenwood Flats · Unit 101 marks Pine Street Homes signed, shows the signed copy, changes the row to Signed, and changes the badge to 1.
- [x] Changes remain after Back to listings and returning to Leases.
- [x] The page fits 320, 390, 600, 760, 800, 960, and 1280px without horizontal overflow.

## Limitations and open questions

Signing on the manager side does not update the renter's pages, and Approve on Applications does not create a lease.
The Wallingford House listing still shows Paused with availability on November 15, 2026, which does not match a lease ending January 15, 2027. This mismatch is left as-is.
Theo Grant's deposit and signing dates are sample values.
UC-4.7 open issues remain: which e-signature provider to use, and whether lease templates are provided and who is responsible for their content. The renewal response window is not in the SRS. TBD.
