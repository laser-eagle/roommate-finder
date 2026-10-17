# ManagerListings

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- Files: `ManagerListings.tsx`, listing styles in `ManagersView.css`

## Purpose

Expose the sample portfolio with clear status, base rent, availability, and listing actions.

## Usage

```tsx
<ManagerListings listings={listings} filter={filter} query={query}
  onFilter={setFilter} onQuery={setQuery} onEdit={editListing}
  onToggle={toggleListing} onCreate={createListing} />
```

The parent owns data, filters, and mutations. The component emits the selected record for each action.
The component owns only a reference for keyboard focus recovery.

## Requirements and behavior

- [x] Filter by All, Live, Draft, or Paused with visible counts and pressed state.
- [x] Search listing names and neighborhoods without case sensitivity.
- [x] Show an empty result with a clear-filter action.
- [x] Display base rent separately from availability and status.
- [x] Preserve cents and local calendar dates through shared formatting rules.
- [x] Offer draft editing without a publish control.
- [x] Offer pause/resume controls on existing non-draft records.
- [x] Return focus to the active filter when a status change removes its row.
- [ ] Apply production status transitions and account permissions.

## Design

Each row contains an identity block, a fact list, and named actions.
On narrow screens these blocks stack in the same reading order.
The Ballard image is decorative because the adjacent heading identifies the listing.
No other property borrows that photo.

## Testing and acceptance

- [x] Draft filtering shows the matching sample record.
- [x] An unmatched search exposes the empty state.
- [x] Clearing filters restores all records.
- [x] Pause and resume update the selected row and overview count.
- [x] Filtered-row removal preserves keyboard focus.
- [x] All rows and actions fit at 320px.

## Limitations

Rent values represent base rent only. Complete costs belong to the future listing editor.
The parent currently permits local Live/Paused transitions without server checks.

## Completion checklist

- [x] Controlled portfolio mockup exists.
- [x] Narrow-screen and focus checks pass.
- [ ] Production inventory permissions exist.
