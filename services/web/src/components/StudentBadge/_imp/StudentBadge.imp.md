# StudentBadge

## Metadata

- Status: `complete`
- Scope: shared verified-student badge
- Updated: 2026-10-28
- Files: `StudentBadge.tsx`, `StudentBadge.css`
- Requirements source: SRS Feature 24 Student Identity Verification, UC-3.3 Verify Student Status; prototype checklist item 2.14

## Purpose and requirements

Mark a person whose student status is verified.

- [x] Show a verified icon and the text Verified student.
- [x] Optionally append detail text, such as the school and expiration.
- [x] Use the shared tokens from `index.css`.

## Usage

```tsx
<StudentBadge />
<StudentBadge detail="CSULB · Expires May 31, 2027" />
```

## Design

The badge is an inline pill using the brand-soft background and brand text. The icon is decorative; the text carries the meaning.
It appears in the Account sidebar identity, Security & privacy, the Your profile dialog, and on verified roommate cards and profile dialogs.

## Completion checklist

- [x] Shared badge exists and is used on account and roommate profiles.
