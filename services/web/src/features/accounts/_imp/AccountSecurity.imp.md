# AccountSecurity

## Metadata

- Status: `complete`
- Scope: security and privacy mockup
- Updated: 2026-10-28
- File: `AccountSecurity.tsx`

## Purpose and requirements

- [x] Show the email sign-in method and current session using fixture data.
- [x] Open PasswordResetDialog through the Password reset action without requesting credentials.
- [x] Show Student verification: a Verify student status button, or the verified-student badge with the school and expiration once verified. The `student` and `onVerifyStudent` props supply the state and open StudentVerificationDialog.
- [x] Provide a profile visibility switch with save and discard actions.
- [x] Identify full name, email, and housing preferences as private fields.
- [x] Use product-facing session labels and omit mockup qualifiers.

## Usage and design

The component receives `visible`, `dirty`, `onChange`, `onSave`, `onDiscard`, and `onResetPassword`.
The parent owns visibility state and the password reset dialog.
This section is served at `/account/security`.
The switch calls `onChange` without saving. Form submission calls `onSave`.
The saved visibility value controls the summary badge and profile preview explanation.

The session row is a fixture. It does not inspect browser identity, device information, or login records.
The reset flow simulates confirmation in local state. It sends no email and changes no credentials.

## Testing and acceptance

- [x] Saving a hidden profile updates the summary and preview.
- [x] Discard restores the saved visibility setting.
- [x] Password reset dismissal restores opener focus.

## Limitations

Production authentication, password resets, email verification, session revocation, and access enforcement remain future work.
