# ManagersView

## Metadata

- Status: `in-progress`
- Milestone: interactive manager mockup
- Updated: 2026-10-29
- Routes: `/managers` (overview), `/managers/listings` and manager subpaths (workspace); `/managers?view=workspace` remains an alias
- Source: [Product Features, items 32–35, 25–26, 40, and 43](<../../../../../../docs/Project Features.pdf>)

## Purpose and scope

Give managers one place to review their homes, renter inquiries, and upcoming tours.
The first mockup uses fictional records and local state. It follows the existing listing screen's visual system.

## Requirements

- [x] Replace the managers placeholder with a responsive workspace.
- [x] Derive portfolio, live-listing, unanswered-inquiry, and tour counts from current sample state.
- [x] Search and filter listings by status.
- [x] Add and edit drafts without publishing them.
- [x] Pause and resume existing sample listings.
- [x] Save reply previews and confirm sample tours locally.
- [x] Use intended product labels without demo badges or reset controls.
- [x] Reset all manager changes on refresh.
- [ ] Load inventory and contact records for the authorized management account.
- [ ] Apply team permissions, listing authorization, audit records, and concurrency rules.
- [ ] Support production publishing, vacancy tracking, imports, renewals, and archival.

## Usage

```tsx
<ManagersView />
```

`App` selects the component for the managers route.
The component provides its own SiteHeader and main landmark.
Section links point to overview, listings, inquiries, and tours within the page.
The Workspace / Overview switch opens the alternative layout through a native link.
The `view=workspace` query or a manager subpath selects ManagerWorkspace with an expanded operational fixture collection.
Both layouts reuse the same mutation handlers, notices, and ManagerDialog.

## Design and state

| Unit | Responsibility |
| --- | --- |
| ManagersView | Page structure, summaries, local state, notices |
| ManagerListings | Search, filters, listing rows, edit and status actions |
| ManagerActivity | Inquiry inbox, tour cards, publication guidance |
| ManagerDialog | Listing editor, reply composer, tour detail preview |
| ManagerWorkspace | Alternative compact manager layout and work-view navigation |
| ManagerInventory / ManagerWorkQueues | Inventory table, bulk controls, and dedicated activity queues |
| ManagerUnitReport / useManagerRoute | Vacancy and notice detail pages, route selection, and browser history |
| managers.mock.ts | Types and fictional initial records |
| SiteHeader / PreviewDialog | Shared navigation and modal behavior |

State starts as independent copies of the fixture arrays.
Updates replace records by stable ID. Summaries derive from the same records.
In the workspace, ManagersView also owns the rental application records from `applications.mock.ts` and passes status and note handlers to ManagerWorkspace.
It also owns the maintenance request records from `maintenance.mock.ts` and passes an update handler that appends a Pine Street Homes update and shows it as the notice.
It also owns the team records from `team.mock.ts` and passes add and remove handlers that show a notice.
It also owns the lease records from `leases.mock.ts` and passes a sign handler that records the landlord signature and shows a notice.
New listings receive a unique ID and always start as Draft.
Workspace bulk pause/resume handlers exclude drafts and only change the selected IDs supplied by inventory.
Draft creation and editing clear filters so the saved record stays visible.
Manager actions do not change the renter-facing listing fixture or session favorites.
The header reads the aggregate saved-home count through useSavedHomes.

## Visual decisions

The workspace uses the existing warm canvas, green accents, Newsreader headings, and DM Sans utility text.
Manager copy uses direct business labels: Property management, Listings, Inquiries, and Upcoming tours.
Summary cards show counts and operational status. They contain no promotional taglines or decorative leading zeros.
Actions name the operation. Empty states explain how to adjust the search or filter.
The UI uses product copy for saves, replies, and confirmations. These interactions remain simulated in local state.
Backend limitations are documented here rather than displayed in the customer interface.
The Ballard thumbnail reuses the supplied photo crop. Other sample homes display neutral placeholders.
The page uses a portfolio column and a tour column on wide screens.
Narrow screens stack the sections and preserve every action.
Tour dates show the fixture week without a sample-data label.
The second layout's visual and interaction decisions are specified in `ManagerWorkspace.imp.md`.

## Testing and acceptance

- [x] Build and lint checks pass.
- [x] Adding and editing a draft updates its row and portfolio count.
- [x] Status changes update the live count without publishing anything.
- [x] Reply and tour actions update their local summary counts.
- [x] Desktop and 320px layout review passes without horizontal overflow.
- [x] Keyboard, dialog, refresh, and routing checks pass.
- [ ] Production authorization and service integration are complete.

## Limitations and open questions

- All manager state lasts only until refresh. No API, delivery service, or browser storage persists it.
- Listing editors cover basic inventory fields. Fee itemization, photos, and authorization remain future work.
- Published records and tour confirmations require server validation in production.
- Manager roles, account switching, portfolio structure, and final service contracts remain TBD.
- Payments belong to later mockups. Applications, leases, and maintenance requests are in the workspace only.

## Completion checklist

- [x] Current mockup and component specifications exist.
- [x] Browser acceptance review passes.
- [ ] Production requirements are complete.

## Review record

The mockup review passed on 2026-09-27.
Widths of 320, 390, 768, 1024, and 1440px fit without horizontal scrolling, including the vertical scrollbar width.
Checks covered filters, empty results, creation, editing, status changes, local replies, tour confirmation, and refresh.
Keyboard checks covered native validation, dialog focus wrapping, Escape, opener focus, and filtered-row removal.
Direct paths with and without a trailing slash work. The existing listing screen still renders at 320px.
The shared body minimum width was removed so narrow screens can accommodate a vertical scrollbar.
