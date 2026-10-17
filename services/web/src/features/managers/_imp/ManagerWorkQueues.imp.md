# ManagerWorkQueues

## Metadata

- Status: `complete`
- Updated: 2026-09-27
- File: `ManagerWorkQueues.tsx`
- Scope: inquiry and tour table interfaces

## Purpose and requirements

- [x] Present inquiries and tours as separate compact work views.
- [x] Filter by listing, renter name, and pending status.
- [x] Show inquiry sender, received time, listing, message excerpt, and reply status.
- [x] Show the complete message on the pending-inquiries detail page.
- [x] Show tour date/time, renter, listing, format, and confirmation status.
- [x] Reuse ManagerDialog for replies and tour review.
- [x] Recover from empty filters through a Show all action.
- [x] Update counts and filtered rows immediately after a local action.
- [x] Complete mobile, keyboard, and empty-state acceptance checks.

## Usage and design

The `section` prop selects inquiries or tours.
The parent supplies collections, listing ID, pending flag, and mutation/open callbacks.
Search by renter name is local state. The route controls listing and pending scope.
All and pending views are real links to `/managers/inquiries`, `/managers/inquiries/pending`, `/managers/tours`, or `/managers/tours/pending`.
Each link retains a selected listing query. `onClear` resets all activity filters in one parent navigation.
Changing the page remounts the queue and resets its renter search.
Property/unit labels resolve from current listing IDs; deleted or unavailable references use Listing unavailable.
Rows become labeled cards on small screens. Status is conveyed by text as well as color.

## Testing and acceptance

- [x] Opening the Ballard listing's activity shows only its two pending inquiries.
- [x] Replying removes a pending row and updates the total pending count.
- [x] Confirming a tour removes it from the pending filter and updates the tour count.
- [x] A query with no match can recover to all activity.
- [x] The two work views fit at 320px and tablet widths.
- [x] Completing a filtered tour returns focus to the tool heading when its row disappears.

## Limitations

Reply delivery, time-zone preferences, rescheduling, cancellation, assignments, and permission checks require later integration.
The underlying inquiry fixture stores one reply rather than a full conversation history.
