# ManagerWorkspace

## Metadata

- Status: `in-progress`
- Updated: 2026-10-28
- Routes: `/managers/listings` and manager detail paths; `/managers?view=workspace` remains an entry alias
- Files: `ManagerWorkspace.tsx`, `ManagerWorkspace.css`, `operations.data.ts`

## Purpose

Provide a second manager layout focused on inventory and work queues.
The original overview remains at `/managers`. Both layouts expose a Workspace / Overview switch.
The workspace uses representative records and local interactions without customer-facing development notices.

## Requirements

- [x] Use compact sans-serif headings, a persistent tool navigation, and an inventory table.
- [x] Show explicit vacancy, notice, unanswered inquiry, and unconfirmed tour counts.
- [x] Open a dedicated detail page from each summary count.
- [x] Keep summary navigation separate from reversible inventory filter toggles.
- [x] Retain inventory filters and local records when navigating between workspace pages.
- [x] Separate listing publishing status from unit occupancy.
- [x] Support local listing creation/editing, bulk pause/resume, replies, and tour confirmation.
- [x] Include Applications in the tool navigation with the count of open applications (see ManagerApplications.imp.md).
- [x] Show pending work and the next three tours beneath inventory.
- [x] Provide working links to the business profile, account, and renter interfaces.
- [ ] Future change: show the sidebar's Business profile, Account settings, and Renter site links below 960px. They are currently hidden on narrow screens.
- [x] Keep the original overview available for comparison.
- [ ] Load authorized property, unit, occupancy, inquiry, and tour data from services.

## Usage and design

ManagersView selects this component from the `view=workspace` query parameter or a manager subpath.
It owns listings, inquiries, tours, dialog state, mutation handlers, and notices.
ManagerWorkspace receives those collections and callbacks, then owns inventory filter context and useManagerRoute.
ManagerInventory receives controlled search, status, occupancy, activity, and sort values. It owns only row selection.
ManagerUnitReport provides richer vacancy and notice lists with preparation, dates, rent, and leasing actions.
ManagerWorkQueues owns renter search. Its listing ID and pending scope are derived from the route.
Opening a listing's activity includes its exact ID in the URL query.
Summary anchors navigate to `/managers/vacant`, `/managers/notices`, `/managers/inquiries/pending`, and `/managers/tours/pending`.
Each detail page has Back to listings. Internal navigation and browser history retain inventory filters until refresh.
Selecting a current filter again removes it; Clear filters resets all filter criteria and sorting.

The workspace fixture extends the overview with six listings, five inquiries, and three tours.
Four inquiries and two tour requests initially need action; two listings are drafts.
Unit metadata explicitly supplies three Vacant, two Notice given, and one Occupied record.
Publishing status never determines occupancy. A paused listing can remain occupied.
New drafts have no occupancy record and display Not set rather than inventing a vacancy.
Workspace fixtures and all changes are local. Switching to the original overview or refreshing resets local state.

## Visual and accessibility decisions

The shared wordmark and green palette remain. Operational headings use DM Sans rather than display typography.
At desktop widths, property/unit, occupancy, rent, availability, status, and activity are visible in one row.
Below 760px, table rows become labeled cards with the same information and actions.
The sidebar becomes compact horizontal tool navigation; controls remain keyboard accessible. Below 760px the four tools form a two-column grid.
The sidebar links open Business profile (`/business/pine-street-homes`), Account settings, and the Renter site.
Readiness marketing panels and listing photos are omitted from this layout.
The existing listing, inquiry, and tour dialogs are reused, with sans-serif titles in this workspace.
If a completed action removes its opener from a filtered queue, focus returns to the current tool heading.
Bulk actions return focus to the active listing-status filter before removing the selection bar.

## Testing and acceptance

- [x] Vacancy and listing-status filters compose correctly.
- [x] Vacant toggles from three rows back to six; multiple occupancy values use union matching.
- [x] Activity toggles narrow results and Clear filters restores all records.
- [x] Summary links change the URL and show their detailed scope.
- [x] Back/Forward and Back to listings preserve the inventory's active filters.
- [x] Empty searches recover through Clear filters.
- [x] Bulk pause/resume changes eligible records and leaves drafts unpublished.
- [x] A listing's pending count opens only its inquiries.
- [x] Replies and confirmations remove pending items and update summary counts.
- [x] Inventory fits 320, 390, 768, 1024, and 1440px widths without horizontal overflow.
- [x] Activity queues, 320px dialogs, and draft creation pass browser review.
- [x] Vacancy and notice detail pages fit at 320, 768, 1024, and 1440px.
- [x] Original-layout regression passes final browser review with its three existing listings.
- [x] Final build, lint, and all ten existing unit tests pass.

## Limitations and next implementation work

Property grouping and occupancy are fixture metadata and are not editable in this iteration.
The reused listing editor covers title, type, neighborhood, base rent, and availability only.
Actual publishing, unit lifecycle changes, fees, leases, permissions, and audit history need service integration.
Counts describe the loaded fixture collection. Pagination, saved filters, assignments, and exports remain future work.
No message or tour confirmation is delivered to an external service.
