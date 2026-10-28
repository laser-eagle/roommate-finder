# PreviewDialog

## Metadata

- Status: `in-progress`
- Updated: 2026-10-28
- Files: `PreviewDialog.tsx`, `PreviewDialog.css`

## Purpose

Contain a local interaction preview with modal focus behavior.

## Usage

```tsx
<PreviewDialog title="Start with a hello." onClose={closePreview}>
  <ContactForm />
</PreviewDialog>
```

`title` supplies the accessible dialog name. `children` supplies the content.
`onClose` tells the owner to remove the dialog.
`wide` (optional, default `false`) widens the dialog to up to 960px, for content such as the comparison table.

## Requirements and design

- [x] Use the native `dialog` element and `showModal()`.
- [x] Provide a visible close button and Escape dismissal.
- [x] Use native modal behavior and explicitly wrap Tab and Shift+Tab at the first and last controls.
- [x] Restore the opener focus after unmount.
- [x] Restrict dialog height and allow internal scrolling.
- [x] Restore the previous body overflow style after dismissal.
- [x] Complete browser keyboard review.
- [x] Show the Roommate finder brand without a preview qualifier.

The component owns its element reference and lifecycle only.
The parent owns open state and form data.
The close button receives initial focus. There is no custom modal animation.
Shared field styles cover inputs, textareas, and selects without a dependency on feature-specific stylesheets.

## Testing and acceptance

- [x] Opening, Escape, and close-button actions preserve sensible focus.
- [x] Tab and Shift+Tab remain inside the open dialog.
- [ ] Content remains usable at 320px and browser zoom.

## Assumptions and limitations

The target browser supports the native dialog API.
Only one preview dialog can be open at a time.
Backdrop clicks do not discard form content.

## Completion checklist

- [x] Modal lifecycle is implemented.
- [x] Manual keyboard review passes.
