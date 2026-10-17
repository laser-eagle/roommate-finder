# RoommatesBrowse

## Metadata

- Status: `in-progress`
- Scope: roommate discovery and profile interaction
- Updated: 2026-09-27
- File: `RoommatesBrowse.tsx`

## Purpose and requirements

- [x] Show representative profiles with biographies, target areas, budgets, dates, and household preferences.
- [x] Filter profiles by name or neighborhood and housing plans.
- [x] Open a profile dialog with the same person and facts as its card.
- [x] Show a connection request state without removing the profile context.
- [x] Prevent a duplicate connection request in the current page session.
- [x] Provide a clear-filter action when no profiles match.
- [x] Link to the account page for profile editing.
- [ ] Connect profile visibility, relationship status, and messaging services.

## Usage and design

`<RoommatesBrowse />` owns filter, selected-profile, and connection-request state.
Three fictional records supply descriptive preferences. The UI shows no inferred compatibility score.
The shared PreviewDialog provides focus containment, Escape, and opener focus restoration.
The Connect action changes local state to Request sent and displays an awaiting-response message.
No network request or external contact occurs.

## Testing and acceptance

- [x] Searching Riley returns only the matching profile.
- [x] The profile dialog exposes the corresponding budget, date, and household preferences.
- [x] Connect updates the action and response status.
- [x] The profile dialog fits a 320px viewport without horizontal overflow.
- [x] An unmatched search shows a clear-filter action that restores all profiles.

## Limitations

Requests reset on refresh. Search is limited to the three placeholder profiles.
Production compatibility, blocking, consent, and relationship persistence remain future work.
