# CompareDialog

## Metadata

- Status: `in-progress`
- Scope: side-by-side comparison of two to four homes
- Updated: 2026-10-28
- Files: `CompareDialog.tsx`, related rules in `DiscoveryView.css`
- Requirements source: SRS Feature 15 Side-by-side Comparisons, UC-2.2 Compare Listings; prototype checklist item 2.10

## Purpose and requirements

Let a renter compare selected homes by total cost, features, availability, commute, and preference fit.

- [x] Open from HomesBrowse on `/listings` and `/saved` when two to four homes have Compare checked.
- [x] Show one column per home with its title (linked to the listing), location, and type.
- [x] Show rows for Total monthly cost, Features, Availability, Commute, and Preference fit.
- [x] Highlight the lowest total monthly cost and the soonest confirmed availability, each with a text badge (Lowest, Soonest).
- [x] Sort columns by Selected order, Lowest total cost, or Soonest available.
- [x] Save or unsave a home from its column using the shared saved-homes state.
- [x] Remove a home from the comparison, which also unchecks it on the page.
- [x] Show `Select at least two homes to compare.` with Back to homes when fewer than two remain.
- [ ] Calculate commute times to the renter's saved destinations through a maps service.
- [ ] Calculate preference fit for every listing.

## Usage

```tsx
<CompareDialog homes={selectedHomes} savedIds={savedIds} onSave={onSave} onRemove={removeFromComparison} onClose={close} />
```

`homes` is in selection order. `onSave(id)` toggles a saved home. `onRemove(id)` removes a home from the parent's comparison selection.

## Design

The dialog uses PreviewDialog with `wide` (up to 960px). The table scrolls horizontally inside its container on narrow screens.
Features list the housing type and the listing's room facts.
Commute always shows Not available (UC-2.2 extension 4b), because no maps service is connected.
Preference fit shows the listing's match reasons and gap, or No match details when the listing has no match.
Features, Commute, and Preference fit are not highlighted or sortable.
HomesBrowse owns the selection. A home that leaves the visible results (for example, after a filter change or unsaving on `/saved`) leaves the comparison. A fifth Compare checkbox is disabled while four are checked.

## Acceptance criteria

- [x] Checking two homes shows Compare (2); checking one shows no Compare button.
- [x] With all three sample homes, Ballard is highlighted as Lowest ($1,265) and Soonest (October 15, 2026).
- [x] Sorting by Lowest total cost or Soonest available reorders columns; Selected order restores the checked order.
- [x] Save in a column updates the header saved count.
- [x] Removing homes until one remains shows the message; Back to homes closes the dialog.

## Limitations and open questions

Only three sample homes exist, so the four-home limit cannot be reached in the mockup.
UC-2.2 leaves open whether four is the right maximum and which commute modes are supported.
