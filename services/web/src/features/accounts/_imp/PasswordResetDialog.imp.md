# PasswordResetDialog

## Metadata

- Status: `complete`
- Scope: password reset interaction mockup
- Updated: 2026-09-27
- File: `PasswordResetDialog.tsx`

## Purpose and usage

Show the intended reset-link request and confirmation screens for a signed-in account.
The component receives `email` and `onClose`.

```tsx
<PasswordResetDialog email={accountEmail} onClose={closeDialog} />
```

## Requirements and design

- [x] Identify the destination email before the user submits.
- [x] Explain that the current password works until the user chooses a new one.
- [x] Provide Cancel and Send reset link actions.
- [x] Change the heading to Check your email after submission.
- [x] Show email instructions and a Done action in the confirmation state.
- [x] Use product copy without mockup or preview labels.
- [x] Collect no passwords or other credentials.

The component owns a local sent flag. Closing the dialog removes that state.
Reopening starts at the request screen. The confirmation replaces the form and focuses Done.
PreviewDialog provides modal semantics, focus containment, Escape, and opener focus restoration.

## Testing and acceptance

- [x] Cancel restores focus to Password reset without showing confirmation.
- [x] Send reset link shows the email confirmation and focuses Done.
- [x] Done closes the dialog. Reopening restores the request screen.
- [x] The dialog fits at 320px without horizontal overflow.

## Limitations

This mockup performs no network requests, sends no email, and changes no credentials.
The sent state demonstrates intended product behavior. It is not a delivery receipt.
Production integration requires authenticated requests, rate limits, failure states, and server-issued reset tokens.
