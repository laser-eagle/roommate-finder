# ListingHeading

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `ListingHeading.tsx`

## Purpose

Identify the listing and expose its private favorite state.
This unit includes the breadcrumb, hero title, subtitle, and SaveListingButton.

## Usage

```tsx
<ListingHeading listing={listing} saved={saved} pending={pending}
  notice={notice} onSave={saveHome} />
```

All favorite state belongs to the parent. `onSave` requests a toggle.
`notice` provides a live status message after success or failure.

## Requirements and behavior

- [x] Render one `h1` with a separate subtitle and natural text height.
- [x] Link the city and neighborhood to query-specific listing destinations.
- [x] Keep the current room type as plain text.
- [x] Expose the favorite state through `aria-pressed` and its visible label.
- [x] Disable duplicate save actions while pending.
- [x] Show a readable failure without claiming a successful save.
- [ ] Connect the toggle to SavedItemsService and sign-in continuation.

## Design

Desktop places the save control beside the heading. Mobile places it below the subtitle.
The presentation component has no storage or network dependency.
The parent currently simulates a delay and stores success in browser session storage.

## Testing and acceptance

- [x] The title and subtitle do not collide at 320px, 390px, or 1440px.
- [x] Save changes the label, pressed state, and navigation count.
- [x] Save failure preserves the prior favorite value.
- [x] Keyboard input can activate the control.

## Limitations

The fixture always represents a private room. Localization and other offer types remain pending.

## Completion checklist

- [x] Controlled heading and favorite mockup exist.
- [x] Browser acceptance checks pass.
- [ ] Persistent private favorites and sign-in continuation exist.
