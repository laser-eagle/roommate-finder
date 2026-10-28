# LogInView

## Metadata

- Status: `in-progress`
- Scope: login form for registered users
- Route: `/login`
- Updated: 2026-10-28
- Files: `LogInView.tsx`, `AuthForm.css`
- Requirements source: SRS UC-1.2 Log In (steps 1–2), Feature 11 Multi-role Accounts; prototype checklist item 2.1

## Purpose and requirements

Let a registered user sign in and reach the product screens.

- [x] Render at `/login`, including a trailing slash.
- [x] Collect email and password.
- [x] Submit with a Log in button.
- [x] Open `/listings` on submit as the existing sample renter account.
- [x] Link to `/signup` for visitors without an account.
- [x] Use the shared SiteHeader, which shows Log in and Sign up links on this page.
- [x] Use the shared tokens and button classes from `index.css`, and the shared form styles in `AuthForm.css`.
- [ ] Check credentials, start a session, and load the user's roles through a backend service.

## Usage

```tsx
<LogInView />
```

App selects the component when the pathname is `/login`.
The component supplies the SiteHeader, the main landmark, and the page title `Log in | Roommate Finder`.

## Design and state

The form is uncontrolled and uses `noValidate` with no required fields, so submission always continues to `/listings`.
Nothing typed into the form is stored or sent.
The layout reuses the `auth-main`, `auth-panel`, `auth-form`, and `auth-switch` classes from `AuthForm.css`.

## Acceptance criteria

- [x] `/login` shows the Email and Password fields and the Log in button.
- [x] Submitting, with or without input, opens `/listings`.
- [x] The Sign up link opens `/signup`.

## Non-goals

These UC-1.2 flows are not part of this mockup: Forgot password (2a), the incorrect-credentials error (3a), the 15-minute lockout after five failed attempts (3b), the header role switcher for users with more than one role (5a), and Remember me.

## Limitations and open questions

No validation runs. Empty fields are accepted.
Login does not know the user's roles, so it does not route by role. The SRS home page for each role is not defined.

## Completion checklist

- [x] Login form mockup exists.
- [ ] Backend authentication exists.
