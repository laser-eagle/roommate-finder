# PersonalDetailsAuthDialog

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- Scope: account verification before editing personal details
- Files: `PersonalDetailsAuthDialog.tsx`, `personalDetailsAuth.mock.ts`, `personalDetailsAuth.test.mjs`

## Purpose and requirements

- [x] Explain why verification is required and show the destination email.
- [x] Require an explicit Send code action before collecting a code.
- [x] Collect a six-digit code with numeric keyboard and one-time-code autocomplete.
- [x] Keep details locked when verification fails or the dialog is dismissed.
- [x] Reject expired codes and stop verification after three incorrect attempts.
- [x] Offer a new challenge after expiry or failed attempts.
- [x] Grant editing only through the successful verification callback.
- [x] Keep fixture details and implementation notices outside customer-facing copy.
- [ ] Use server-issued challenges, real delivery, session binding, and rate limits.
- [ ] Authorize personal-details writes on the server with recent verification.

## Usage and design

`<PersonalDetailsAuthDialog email={email} onVerified={grantEditing} onClose={dismiss} />`

AccountsView opens the dialog from the personal-details pencil button.
The dialog owns the current challenge, code, attempts, and feedback.
Successful verification calls onVerified and unmounts the challenge.
Dismissal never calls onVerified. Reopening starts at the send-code step.
PreviewDialog supplies focus containment, Escape dismissal, and opener focus restoration.
The code field receives focus when the challenge begins. Errors use an alert region.

The fixture adapter accepts only `482631`. It sends no email and is not secure authentication.
Challenges expire after five minutes and allow three incorrect attempts.
New challenges reset the fixture attempt count. Production resend throttling must be server-enforced.
No real password, account token, or authentication code is persisted.

The parent grants five minutes of local editing access and checks expiry again on every write.
Save, discard, manual lock, section changes, refresh, and expiry revoke that access.
Pending drafts survive section changes and expiry but remain read-only until another verification.

## Testing and acceptance

- [x] Wrong and incomplete codes do not authorize editing.
- [x] Even a correct code is rejected at challenge expiry or after attempt exhaustion.
- [x] Zero, expired, and missing edit authorization fail write eligibility.
- [x] Three failed browser attempts block verification until a new code is requested.
- [x] Successful verification enables the form; saving relocks it.
- [x] Cancel restores edit-button focus and retains the locked state.
- [x] Verification dialog fits a 320px viewport and supports keyboard dismissal.

## Production requirements and open questions

Email verification is the selected mockup interaction, not an identity or background check.
The final identity provider and supported step-up factors remain TBD.
The server must bind challenges and recent-auth grants to the signed-in account and operation.
The server must enforce expiry, replay prevention, retries, resend throttling, and authorization on writes.
Client state, fixture verification results, and the verification badge must never authorize production writes.
