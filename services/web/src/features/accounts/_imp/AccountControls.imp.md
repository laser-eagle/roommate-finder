# AccountControls

## Metadata

- Status: `complete`
- Scope: shared account form controls
- Updated: 2026-09-27
- File: `AccountControls.tsx`

## Purpose and usage

AccountSaveBar receives `dirty` and `onDiscard`.
It submits its enclosing form through Save changes. Discard uses a separate button handler.
Both buttons are disabled when the current section has no unsaved changes.

AccountToggle receives `title`, `description`, `checked`, and `onChange`.
It uses a button with the switch role and aria-checked state.
Generated IDs associate its visible label and description with the control.
The button supports Enter and Space without submitting its enclosing form.

## Requirements and acceptance

- [x] Save and discard controls reflect the section's dirty state.
- [x] Save submits the enclosing form for native validation.
- [x] Discard does not submit the form.
- [x] Switches expose labels, descriptions, and checked state.
- [x] Keyboard switching and narrow layout review pass.

## Limitations

Pending requests and server errors are outside these synchronous demo controls.
