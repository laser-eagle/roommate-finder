# MockupControls

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `MockupControls.tsx`
- Scope: review interface for the mockup

## Purpose

Expose important listing states without connecting a backend or modifying source fixtures.

## Usage

```tsx
<MockupControls state={preview} onChange={changePreview} />
```

`state` is a `PreviewState`. `onChange` requests a different scenario.
The parent supplies the resulting fixture and cancels pending actions.
ListingDetailView mounts these review tools only when the URL includes `?review=1`.
Normal product routes contain no mockup toolbar.

## Requirements and behavior

- [x] Name the selected display state without demo or mockup labels.
- [x] Hide the review interface from normal listing routes.
- [x] Offer default, missing-photo, unknown-fees, paused, unconfirmed, no-match, failed-save, blocked-contact, loading, and not-found states.
- [x] Use a labeled native select with a mobile touch target.
- [x] Keep the review controls outside the product main region.
- [x] Complete browser review for every scenario.

The controls own no state and perform no navigation or network requests.
The default scenario uses the bedroom photo from the supplied reference. A separate scenario demonstrates the missing-photo state.
The review interface is not part of the production listing specification.

## Testing and acceptance

- [x] Each option updates the visible page without a reload.
- [x] Loading and not-found states retain access to the scenario select.
- [ ] Changing a scenario cancels a pending favorite action.

## Completion checklist

- [x] Review controls and scenario fixtures exist.
- [x] Browser interaction review passes.
