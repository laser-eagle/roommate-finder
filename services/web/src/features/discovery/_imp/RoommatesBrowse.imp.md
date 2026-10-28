# RoommatesBrowse

## Metadata

- Status: `in-progress`
- Scope: roommate discovery and profile interaction
- Updated: 2026-10-28
- Files: `RoommatesBrowse.tsx`, `RoommateProfileDialog.tsx`, `references.data.ts`

## Purpose and requirements

- [x] Show representative profiles with biographies, target areas, budgets, dates, and household preferences.
- [x] Filter profiles by name or neighborhood and housing plans, initialized from the `q` and `plans` query parameters.
- [x] Open a profile dialog with the same person and facts as its card.
- [x] Show a connection request state without removing the profile context.
- [x] Prevent a duplicate connection request in the current page session.
- [x] Show the person's references in the profile dialog (SRS Feature 12).
- [x] Show the verified-student badge on cards and in the profile dialog for verified students (Morgan Lee and Avery Chen; Riley Brooks is not verified).
- [x] Offer Write a reference, which replaces the dialog content with a form for relationship and reference text.
- [x] Show a Reference sent confirmation without adding the reference to the list.
- [x] Provide a clear-filter action when no profiles match.
- [x] Link to the account page for profile editing.
- [ ] Connect profile visibility, relationship status, and messaging services.

## Usage and design

`<RoommatesBrowse />` owns filter, selected-profile, and connection-request state.
Three fictional records supply descriptive preferences. The UI shows no inferred compatibility score.
RoommateProfileDialog renders the profile dialog. It owns the dialog view (`profile`, `write`, `sent`); the connection state stays in RoommatesBrowse.
The dialog title changes to Write a reference and Reference sent for the form and confirmation views. Back to profile returns to the profile view.
The write form has Your relationship (Former roommate or Former landlord) and Reference (up to 1,000 characters). It uses `noValidate`, so empty submissions continue.
`references.data.ts` supplies fictional references by person ID: two for Morgan Lee, two for Avery Chen, and none for Riley Brooks.
The shared ReferenceList renders the references or the empty message.
The shared PreviewDialog provides focus containment, Escape, and opener focus restoration.
The Connect action changes local state to Request sent and displays an awaiting-response message.
No network request or external contact occurs.

## Testing and acceptance

- [x] Searching Riley returns only the matching profile.
- [x] The profile dialog exposes the corresponding budget, date, and household preferences.
- [x] Connect updates the action and response status.
- [x] The profile dialog fits a 320px viewport without horizontal overflow.
- [x] Morgan Lee and Avery Chen show two references each; Riley Brooks shows No references yet.
- [x] Write a reference shows the form; Send reference shows the confirmation; Back to profile returns to the profile.
- [x] An unmatched search shows a clear-filter action that restores all profiles.

## Limitations

Requests and dialog views reset on refresh. Sent references are not stored. Search is limited to the three placeholder profiles.
Production compatibility, blocking, consent, and relationship persistence remain future work.
