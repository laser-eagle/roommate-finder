# ManagerInventory

## Metadata

- Status: `complete`
- Updated: 2026-09-27
- Scope: local manager inventory interactions
- Files: `ManagerInventory.tsx`, `inventoryFilters.ts`

## Purpose and requirements

- [x] Show property/unit identity, explicit occupancy, base rent, availability, publishing status, and activity.
- [x] Search property, unit, listing title, and location.
- [x] Combine search with occupancy and listing-status filters.
- [x] Expose Vacant units, Notice given, Occupied, Needs reply, and Tours to confirm as reversible toggles.
- [x] Show each toggle's active state through a checkmark, color, and aria-pressed.
- [x] Toggle an active criterion off with the same control.
- [x] Provide a visible Clear filters action; disable it only when no criteria are active.
- [x] Sort by next availability or lowest base rent.
- [x] Select individual rows or all visible rows.
- [x] Pause selected live listings and resume selected paused listings.
- [x] Never publish a draft through a bulk action.
- [x] Scope bulk actions to selected visible rows and clear selection after completion.
- [x] Clear selection when filters change.
- [x] Open the listing editor or its related work queue from each row.
- [x] Retain all row data and actions on mobile.

## Usage and state

The component receives listings, inquiries, tours, filters, and callbacks for filter updates, editing, activity, and bulk status.
ManagerWorkspace owns search, publishing-status filter, occupancy selection, activity flags, and sort order.
Only selected row IDs remain local component state. Leaving inventory clears row selection but preserves filter criteria.
Multiple occupancy selections are combined with OR. Occupancy, status, search, and activity groups are combined with AND.
No occupancy selection includes every occupancy, including Not set.
The currently selected Live, Draft, or Paused filter can also be clicked again to return to All.
Clear filters restores all criteria and the Next available sort order.
Visible selection is derived from the filtered collection. Bulk handlers send eligible visible IDs only.
ManagersView repeats the draft exclusion at mutation time.
Bulk buttons are disabled when no selected record can take the requested action.

Occupancy metadata comes from operations.data.ts and remains separate from ManagedListing publishing status.
Known fixtures show property/unit identity. New records fall back to their listing title and Not set occupancy.
Currency uses existing integer-cent formatting. Date display uses UTC to retain the provided local date.
The footer identifies base rent as excluding fees and utilities.

## Testing and acceptance

- [x] Vacant plus Draft shows the single vacant draft.
- [x] An unmatched search shows Show all listings; clearing restores all six rows.
- [x] Clicking Vacant units twice returns from three rows to all six.
- [x] Vacant plus Notice given shows five rows; Needs reply narrows to three and Tours to confirm to two.
- [x] Pausing the selected vacant rows changes only their two live listings, leaving the vacant draft untouched.
- [x] Selecting six records and pausing changes three live records, leaving two drafts and four paused records.
- [x] Resuming those paused records results in four live listings and two unchanged drafts.
- [x] Row activity opens the correct listing's pending queue.
- [x] Inventory has no horizontal overflow at reviewed mobile, tablet, and desktop widths.

## Limitations

Bulk changes are synchronous local state. Production requires permissions, concurrency checks, audit history, and per-record failures.
Occupancy is read-only fixture data. Adding a draft does not create a unit record or occupancy claim.
