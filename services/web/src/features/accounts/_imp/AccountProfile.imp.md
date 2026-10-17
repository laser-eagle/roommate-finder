# AccountProfile

## Metadata

- Status: `complete`
- Scope: locked personal details and authenticated editing interface
- Updated: 2026-09-27
- File: `AccountProfile.tsx`

## Purpose and requirements

- [x] Display a full name, display name, city, and introduction as read-only by default.
- [x] Show a lock icon and Locked status, with an accessible pencil button to request editing.
- [x] Enable editing only after the parent grants a current verification session.
- [x] Show Unlocked for editing, a manual lock button, and save/discard controls while authorized.
- [x] Show a Verified badge beside the verified email address.
- [x] Distinguish private information from public profile fields.
- [x] Show the fictional email address and a sign-in settings action.
- [x] Require nonblank names and city values.
- [x] Limit full name and city to 80 characters, display name to 40, and introduction to 300.
- [x] Show introduction length and a save/discard bar.

## Usage and design

`AccountProfile` receives controlled `value`, `dirty`, `editing`, `onChange`, `onSave`, `onDiscard`, `onSecurity`, `onEdit`, and `onLock`.
`value` implements the AccountProfile data interface in `accounts.mock.ts`.
The parent owns saved and draft values. The form submits through `onSave` after native validation.
`onSecurity` handles the `/account/security` link without updating the email address.
`onEdit` requests the parent verification dialog. `onLock` revokes editing access.
Inputs use readOnly while locked and remain available for reading and copying.
The first name field receives focus when editing becomes available.
The parent guards updates and saves independently of the visible field state.

Full names remain private. Display names, city, and introduction appear in the saved profile preview.
Empty introductions use a placeholder in the preview. The email address is read-only in this mockup.

## Testing and acceptance

- [x] Saving a display name updates the profile summary.
- [x] Discard restores the saved city.
- [x] Unsaved changes survive section navigation.
- [x] A whitespace-only name prevents submission and receives focus.
- [x] Locked fields have readOnly and no save action.
- [x] Saving after verification updates the summary and restores the lock.

## Limitations

Email verification status comes from fixture data. It does not represent legal identity verification.
Production contact verification, email changes, avatar uploads, and server authorization remain outside this form.
