# StudentVerificationDialog

## Metadata

- Status: `in-progress`
- Scope: student status verification by campus email code or a verification service
- Updated: 2026-10-28
- Files: `StudentVerificationDialog.tsx`, `studentVerification.mock.ts`
- Requirements source: SRS Feature 24 Student Identity Verification, UC-3.3 Verify Student Status; prototype checklist item 2.14

## Purpose and requirements

Let a student verify enrollment so a verified-student badge appears on their profile.

- [x] Open from Verify student status in Account → Security & privacy.
- [x] Ask for the school (California State University, Long Beach) and a campus email.
- [x] Reject an email outside the approved school list with `Enter a campus email address ending in @csulb.edu.`
- [x] Send a code to an approved campus email, then ask for the 6-digit code.
- [x] Show an error for a wrong code, with Send a new code.
- [x] Offer Verify with a verification service, which verifies without a code (SRS Feature 24: third-party verification service).
- [x] On success, report the school (CSULB) and expiration (end of the academic year) to the parent.
- [ ] Use a server-owned email check and a real verification service.
- [ ] Offer a student ID upload for manual review when the domain is not on the list (UC-3.3 extension 3a).
- [ ] Block a campus email already linked to another account (6a), and ask students to verify again each academic year.

## Usage

```tsx
<StudentVerificationDialog onVerified={setStudent} onClose={close} />
```

`onVerified` receives `{ school, expires }`. AccountsView stores it, closes the dialog, and shows Student status verified.

## Design and data

`studentVerification.mock.ts` is a fixture adapter. It lists one approved school (`csulb.edu`), the fixture code `731905`, and the expiration `May 31, 2027`.
Any number of wrong codes may be entered; there is no expiry or lockout. Verification is local state and resets on refresh or navigation outside the account sections.

## Acceptance criteria

- [x] `jordan@gmail.com` shows the campus email error; `jordan.ellis@csulb.edu` continues to the code step.
- [x] Code `111111` shows the incorrect-code error; `731905` verifies.
- [x] Verify with a verification service verifies immediately.
- [x] After verifying, the Account sidebar, Security & privacy, and Your profile dialog show the badge.

## Limitations and open questions

UC-3.3 leaves open whether a third-party service or only campus email will be used, and whether graduates keep the badge.
The expiration date is a placeholder for the end of the CSULB academic year.
