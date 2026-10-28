# AccountsView

## Metadata

- Status: `in-progress`
- Milestone: interactive account mockup
- Updated: 2026-10-28
- Routes: `/account/personal`, `/account/preferences`, `/account/notifications`, `/account/security`
- Files: `AccountsView.tsx`, `AccountsView.css`, `AccountProfileDialog.tsx`, `accounts.mock.ts`, `useAccountRoute.ts`

## Purpose and scope

Provide a personal account page for profile details, housing preferences, email notifications, and privacy settings.
The page extends the visual system in `services/web/docs/web.ui.md`. That source specifies the listing screen, not an account design.
All account details are fictional. React state and a fixture authentication adapter model the flow without backend requests or account storage.

## Requirements

- [x] Provide four account sections through keyboard-accessible links with distinct URLs.
- [x] Support direct navigation, refresh, Back/Forward, and native modified-click behavior.
- [x] Resolve `/account`, `/accounts`, plural section aliases, and trailing slashes to canonical paths.
- [x] Show an account-specific missing-page state for an unknown section.
- [x] Keep unsaved edits when the user switches sections.
- [x] Save or discard edits for the selected section only.
- [x] Use saved details for the account identity, profile preview, and housing summary.
- [x] Keep full names, email addresses, and housing preferences outside the public profile preview.
- [x] Announce saves and discards through a status region.
- [x] Reset local account details on refresh.
- [x] Use intended product copy without demo badges, reset tools, or implementation notices.
- [x] Read the aggregate saved-home count through the shared useSavedHomes hook.
- [x] Show locked personal details, an edit icon, and a verified email indicator.
- [x] Require successful fixture verification before changing or saving personal details.
- [x] Relock on save, discard, manual lock, section navigation, refresh, or five-minute expiry.
- [x] Show the user's references in the profile dialog and offer Request a reference with an email field and a confirmation.
- [ ] Connect an authenticated account and persistent settings.

## Usage

```tsx
<AccountsView />
```

`App` selects this component for singular and plural account path prefixes.
The header uses `/account/personal`. Root aliases resolve to that page with replaceState.
useAccountRoute maps section links to pushState and handles popstate. Modified clicks remain native links.
Section transitions preserve saved values and drafts while revoking personal-details editing access.

## Design and state

| Unit | Responsibility |
| --- | --- |
| AccountsView | Section selection, draft and saved settings, summaries, dialogs, notices |
| AccountProfile | Locked personal details, verified email status, and authenticated editing form |
| PersonalDetailsAuthDialog | Email-code challenge, errors, and successful verification callback |
| useAccountRoute | Canonical section paths, navigation, and browser history |
| AccountPreferences | Housing preferences and notification forms |
| AccountSecurity | Sign-in overview and profile visibility |
| PasswordResetDialog | Reset-link request and email confirmation states |
| AccountProfileDialog | Public profile preview, the user's references, and the Request a reference form and confirmation |
| AccountControls | Shared save bar and accessible switch control |
| accounts.mock.ts | Types, section labels, fictional initial settings, and the user's sample reference |
| SiteHeader / PreviewDialog | Shared navigation and dialog behavior |

The page owns separate draft and saved objects. Each object groups values by section.
Save replaces one saved section. Discard restores one draft section from saved values.
Profile saves trim text. Native form validation checks required names, locations, dates, and budget limits.
No save changes search results, sends email, updates credentials, or publishes a profile.
Personal-details changes and saves additionally check a short-lived edit authorization.
A timer locks the UI when authorization expires. The write handlers also check expiry at action time.
When locked with pending changes, the form keeps the read-only draft and explains how to resume editing.
Verification uses a fixture adapter; it is not a production security boundary.
The email verification badge describes email ownership, not identity or background verification.

The desktop layout has a navigation column, form column, and summary column.
At intermediate widths, summaries move below the form. Narrow screens stack all content.
The layout uses shared color and typography tokens. Controls retain visible keyboard focus and touch targets.

The profile dialog uses saved public fields and reflects the saved visibility setting.
AccountProfileDialog owns its view (`profile`, `request`, `sent`). The profile view lists the user's references with the shared ReferenceList (SRS Feature 12), without Report actions, and offers Request a reference.
Request a reference replaces the dialog content with an Email field, Send request, and Back to profile. The form uses `noValidate`, so empty submissions continue. Send request shows a Request sent confirmation; nothing is sent.
PasswordResetDialog shows a reset-link request and a Check your email confirmation. It collects no credentials.
The interface uses product language. Submission and delivery remain simulated in local state.
Implementation limitations belong in these specifications, not in the customer interface.
The shared dialog provides focus containment, Escape dismissal, and opener focus restoration.

## Testing and acceptance

- [x] Build and lint checks pass.
- [x] Saving housing preferences updates the summary without saving pending profile edits.
- [x] Section changes preserve drafts. Discard restores the current saved value.
- [x] Whitespace-only names fail native validation and receive focus.
- [x] Notification and privacy controls pass browser review.
- [x] Dialog keyboard behavior and responsive layouts pass browser review.
- [x] Password reset supports cancellation, confirmation, reopening, and a 320px layout.
- [x] Main and alias account routes pass browser review.
- [x] Invalid codes leave fields read-only; successful verification enables changes and saves relock them.
- [x] Account navigation and Back/Forward retain drafts while requiring verification again.
- [x] Cancellation restores focus to the edit icon without unlocking fields.
- [x] New personal-details lock and authentication dialog pass 320px layout review.
- [x] The profile dialog lists Jordan's sample reference with its author, relationship, and date.
- [x] Request a reference shows the email form; Send request shows the confirmation; Back to profile returns to the profile.

## Limitations and open questions

- All account edits reset on refresh or navigation outside account sections.
- Production identity, session management, email changes, and password resets remain outside this mockup.
- Profile visibility is a local preview setting. Server access rules remain future work.
- Final account roles, API contracts, and settings persistence remain TBD.

## Completion checklist

- [x] Mockup components and implementation files exist.
- [x] Browser acceptance review passes.
- [ ] Production account integration is complete.

## Review coverage

Browser checks cover 320, 390, 768, 1024, and 1440px widths without horizontal overflow.
All four settings forms fit at 320px. Dialogs fit the same width.
Keyboard checks cover switch activation, native validation, dialog focus containment, Escape, and opener focus.
Route checks cover canonical section paths, aliases, refresh, and browser history.
Existing listing and manager routes still render. The browser reports no warnings or errors during these checks.
