# AboutHomeSection

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `AboutHomeSection.tsx`

## Purpose

Describe the offered room and shared home without inventing household preferences.
This unit includes RoomFacts.

## Usage

```tsx
<AboutHomeSection listing={listing} />
```

`listing.description` provides plain text. `listing.roomFacts` provides labeled facts.

## Requirements and design

- [x] Display the concept description and all three supplied facts.
- [x] Use a section heading and a semantic description list.
- [x] Preserve mobile access to every fact.
- [x] Keep description lines within a readable width.
- [ ] Receive current publishable facts with provenance from inventory.

Desktop uses three fact columns. Narrow mobile widths use one column.
The description and facts occur together in the DOM at all widths.
The component has no local state, network access, or inferred pet policy.

## Testing and acceptance

- [x] Room privacy, furnishing, household count, and pets remain visible at 320px.
- [x] Text reflows without fixed-height clipping.
- [ ] Production data supplies the same facts and provenance.

## Completion checklist

- [x] Responsive description and facts exist.
- [x] Browser review passes.
- [ ] Production inventory integration is complete.
