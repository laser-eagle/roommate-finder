# SignUpView

## Metadata

- Status: `in-progress`
- Scope: sign-up form for new accounts with one or more roles
- Route: `/signup`
- Updated: 2026-10-28
- Files: `SignUpView.tsx`, `AuthForm.css`
- Requirements source: SRS UC-1.1 Create Account (steps 1–3), Feature 11 Multi-role Accounts; prototype checklist item 2.1

## Purpose and requirements

Let a visitor create an account and choose the roles that decide which features they use.

- [x] Render at `/signup`, including a trailing slash.
- [x] Collect full name, email, and password.
- [x] Offer the roles Renter, Roommate seeker, Landlord, and Property manager as checkboxes, allowing one or more.
- [x] Submit with a Create account button.
- [x] Send the user to `/listings` when Renter or Roommate seeker is selected, including combinations with Landlord or Property manager.
- [x] Send the user to `/managers` when only Landlord and/or Property manager is selected.
- [x] Send the user to `/listings` when no role is selected.
- [x] Link to `/login` for visitors who already have an account.
- [x] Use the shared SiteHeader, which shows Log in and Sign up links on this page.
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Create the account, store the roles, and verify the email through a backend service.

## Usage

```tsx
<SignUpView />
```

App selects the component when the pathname is `/signup`.
The component supplies the SiteHeader, the main landmark, and the page title `Sign up | Roommate Finder`.

## Design and state

The form is uncontrolled. On submit, the selected `role` checkbox values are read from FormData and mapped to a destination.
The form uses `noValidate` and has no required fields, so submission always continues.
Nothing typed into the form is stored or sent.
`AuthForm.css` styles the panel, labeled inputs, the role fieldset, and the full-width submit button. It is shared with LogInView.

## Acceptance criteria

- [x] `/signup` shows the Full name, Email, and Password fields, the four role checkboxes, and Create account.
- [x] Selecting any combination that includes Renter or Roommate seeker opens `/listings`.
- [x] Selecting only Landlord, only Property manager, or both opens `/managers`.
- [x] Submitting with no role opens `/listings`.
- [x] The Log in link opens `/login`.

## Non-goals

These UC-1.1 flows are not part of this mockup: the business name field for landlords and property managers (3a), the duplicate-email and password-rule errors (4a, 4b), and the verification email and expired-link steps (5–7, 6a).
Admin accounts are created by an existing admin, so the admin role is not offered here.

## Limitations and open questions

No validation runs. Empty fields and an empty role selection are accepted.
The SRS profile-setup page after verification is not defined. The role-based destinations stand in for it.
The heading text is not specified in the SRS.

## Completion checklist

- [x] Sign-up form mockup exists.
- [ ] Backend account creation exists.
