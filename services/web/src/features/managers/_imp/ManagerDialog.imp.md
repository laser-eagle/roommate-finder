# ManagerDialog

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- Files: `ManagerDialog.tsx`, form styles in `ManagersView.css`
- Dependency: shared PreviewDialog

## Purpose

Demonstrate listing edits, renter replies, and tour review with local state.

## Usage

```tsx
<ManagerDialog dialog={dialog} listings={listings} onClose={closeDialog}
  onSaveListing={saveListing} onReply={saveReply} onConfirmTour={confirmTour} />
```

`dialog` is a discriminated union for a listing, inquiry, or tour.
The parent applies emitted changes and closes the dialog.
Titles identify the task: Edit listing, Create listing draft, Inquiry from a named renter, or Tour request/details.
Button labels name the intended action: Save changes, Send reply, or Confirm tour.
The customer interface contains no demo qualifiers. All changes and delivery states remain simulated.

## Requirements and behavior

- [x] Preserve listing or person context in every dialog.
- [x] Require a listing name, neighborhood, base rent, and availability date.
- [x] Reject whitespace-only listing names, neighborhoods, and replies.
- [x] Accept base rent from $1 through $100,000 with two decimal places.
- [x] Convert the rent into integer cents.
- [x] Create only Draft listings and preserve status during edits.
- [x] Use product wording for replies and confirmations while keeping actions local.
- [x] Reuse close, Escape, focus restoration, and Tab wrapping from PreviewDialog.
- [ ] Add production validation, persistence, and duplicate-request protection.

## Design

ListingEditor uses native form constraints and a local text-validation error.
InquiryPreview keeps reply text local until submission.
TourPreview shows a supplied appointment and emits its ID for local confirmation.
Forms do not upload assets, publish records, send messages, or book appointments.

## Testing and acceptance

- [x] Empty required fields prevent draft creation.
- [x] A valid draft appears with the entered title, rent, and date.
- [x] Editing a draft preserves its ID and changes its displayed values.
- [x] Saving a reply and confirming a tour update only the sample workspace.
- [x] Dialog controls fit at 320px and support keyboard navigation.
- [x] Escape returns focus to the opening control.

## Limitations and open questions

The editor covers basic fields only. Full costs, photos, and authorization are required before real publication.
Server payloads, field limits, account permissions, and retention policies remain TBD.

## Completion checklist

- [x] Local form workflows exist.
- [x] Mobile and keyboard review passes.
- [ ] Production validation and persistence exist.
