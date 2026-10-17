# ContactPreview

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `ContactPreview.tsx`
- Dependency: `PreviewDialog`

## Purpose

Demonstrate the contact interaction while the tour and messaging services remain pending.

## Usage

```tsx
<ContactPreview action="tour" listing={listing} onClose={closePreview} />
```

`action` is `tour` or `message`. The parent opens the preview after permission checks.

## Requirements and behavior

- [x] Preserve the listing title and neighborhood in the dialog.
- [x] Address the property manager for apartments and the household for rooms and sublets.
- [x] Use product-facing request, message, and confirmation text without preview qualifiers.
- [x] Require a preferred date for a tour and a message for household contact.
- [x] Apply the sample availability date as the tour-date minimum when confirmed.
- [x] Limit message text to 1000 characters.
- [x] Replace the form with the intended success screen after valid submission.
- [x] Distinguish a sent tour request from a confirmed tour.
- [ ] Connect tours to current availability and explicit request states.
- [ ] Connect messages to authorized conversations and household consent.
- [ ] Handle production failure, retry, duplicate submission, and changed permissions.

## Design

Form fields remain local to the dialog. Closing it discards the draft.
The result replaces the form, so a completed preview cannot submit twice.
No external communication or network request occurs.
Sent messages and requests are simulated states. Production delivery requires service integration.
Implementation limitations appear in this specification, not in the customer dialog.

## Testing and acceptance

- [x] Empty required fields prevent preview completion.
- [x] A valid form displays the intended message or tour-request confirmation.
- [x] Escape and close return focus to the originating action.
- [ ] Production flows create authorized, traceable requests without duplicates.

## Open questions

- What tour modes, appointment slots, and confirmation states will services support?
- How will message consent and block reasons appear to renters?
- Will production drafts survive dialog dismissal?

## Completion checklist

- [x] Local forms and product-facing result states exist.
- [x] Browser form and focus review passes.
- [ ] Production submission flows exist.
