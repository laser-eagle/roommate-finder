# Roommate Finder web

This React and TypeScript app presents the planned customer interface with representative placeholder data.
The visual system follows the listing specification in `docs/web.ui.md`.
Feature scope follows `../../docs/Project Features.pdf`.
No backend is connected. Submission, relationship, and delivery states run locally.

Customer screens use product copy, real field labels, and intended action states.
Keep construction notices, simulation warnings, and implementation details in developer documentation.
Use neutral media placeholders when an asset is missing. Use empty states only when data or filters make them relevant.

## Preview

From `services/web`, run:

```powershell
npm ci
npm run dev -- --host 127.0.0.1 --port 5174
```

Open `http://127.0.0.1:5174/listings`.

## Routes and interactions

- `/` opens the welcome page with Sign up and Log in actions.
- `/signup` shows the sign-up form with full name, email, password, and one or more roles. Create account opens `/listings` when Renter or Roommate seeker is selected (or no role), otherwise `/managers`.
- `/login` shows the login form with email and password. Log in opens `/listings`.
- `/listings` filters and sorts three homes by location, housing type, total monthly cost, and availability. It also has Commute fields and a List | Map toggle; the map is a blank placeholder and commute times are not calculated. Saved searches opens three sample saved searches with Run now, Edit (including Required/Preferred criteria with importance), Pause/Resume, and Show history (runs, delivery status, and New / Price changed / Availability changed labels); `type`, `max`, and `neighborhood` query parameters prefill the filters.
- `/listings/{id}` shows the matching home, costs, household details, and contact dialogs. Managed listings link to their business profile. Apply opens `/listings/{id}/apply`, a rental application with a joint-application option.
- `/household` shows the household agreement (add, edit, remove, check off, share) and move-in/move-out checklists (dates, tasks, key handoffs, documents, condition photos, meter readings). The Account sidebar links to it.
- `/applications` lists the renter's sample applications with statuses; View details shows status history and landlord messages. The Account sidebar links to it.
- `/business/pine-street-homes` shows the sample business profile with contact details, properties, staff, and a verified badge. The manager workspace sidebar links to it.
- `/saved` shows session favorites. Saving and removing homes updates the shared header count. It links to the shared shortlist.
- `/shortlist` shows a sample roommate group's shared shortlist with each member's Yes/No vote and comments. Your vote can be set locally.
- On `/listings` and `/saved`, checking Compare on two to four homes shows Compare (n), which opens a side-by-side comparison of cost, features, availability, commute, and preference fit.
- `/roommates` filters profiles, shows household preferences and references, and supports a local connection-request state and a Write a reference form.
- `/community` filters posts and supports local publishing, comments, likes, and group membership.
- `/managers` provides listing filters, draft creation, editing, status changes, inquiries, and tours.
- `/managers?view=workspace` provides the second manager layout: a compact inventory table, vacancy filters, bulk pause/resume, and dedicated inquiry and tour queues. Workspace / Overview links switch layouts.
- `/managers/listings` is the workspace inventory path. Occupancy and activity filters toggle on/off, combine, and reset through Clear filters.
- `/managers/vacant` and `/managers/notices` show detailed unit preparation, lifecycle dates, asking rents, and leasing activity.
- `/managers/inquiries/pending` and `/managers/tours/pending` show work requiring a reply or confirmation; parent paths show all activity.
- `/managers/applications` lists rental applications. Review opens details, documents, and team feedback, with Add note, Request info, Decline, and Approve.
- Manager summary links open these pages. Internal Back/Forward and Back to listings preserve inventory filters and local record updates.
- `/account/personal` shows locked personal details and an email verification indicator. The edit icon opens an authentication check. The profile card's View profile dialog lists the user's references and a Request a reference form.
- `/account/preferences`, `/account/notifications`, and `/account/security` open their corresponding settings sections.
- `/account`, `/accounts`, and plural section aliases resolve to canonical account paths.
- `/listings/ballard-room` opens the original Ballard detail. Unknown listing paths show the unavailable-listing state.

Saved home IDs persist in session storage, including migration from the older single-home favorite.
Account section links preserve local settings and drafts, support Back/Forward, and relock personal details when changing sections.
Manager workspace routes also retain local record state during internal navigation.
Other interaction state resets on refresh or navigation outside the current feature.
No email, password reset, tour, connection request, post, or message is sent to a service.
The success screens depict the intended product flow.

Student verification in Security & privacy accepts campus emails ending in `@csulb.edu`. Its fixture code is `731905`; no email is delivered. Verify with a verification service succeeds without a code.

The personal-details authentication adapter is a local fixture. Its code is `482631`; no email is delivered.
Incorrect codes do not unlock editing. Codes and editing access expire after five minutes.
Three incorrect attempts require a new challenge. Save, discard, manual lock, or account section navigation revokes editing access.
Production must replace this adapter with server-owned verification, rate limiting, and write authorization.

Add `?review=1` to a listing detail URL to inspect loading, missing-photo, cost, permission, and failure states.
Normal customer routes do not show these review controls.

The photo uses the bedroom region of the supplied `docs/web.ui.png` reference.
An SVG viewport crops its display without changing the original file.
The separate missing-photo scenario demonstrates the fallback.
Production needs a standalone image at a higher resolution.

## Component specifications

The screen specification is [ListingDetailView.imp.md](src/features/listing-detail/_imp/ListingDetailView.imp.md).
The cost rule is [CostBreakdown.imp.md](src/features/listing-detail/_imp/CostBreakdown.imp.md).
The manager specification is [ManagersView.imp.md](src/features/managers/_imp/ManagersView.imp.md).
The account specification is [AccountsView.imp.md](src/features/accounts/_imp/AccountsView.imp.md).
The discovery specification is [DiscoveryView.imp.md](src/features/discovery/_imp/DiscoveryView.imp.md).

Component specifications sit in `_imp` directories beside their source files:

- `src/components/SiteHeader/_imp`
- `src/components/PreviewDialog/_imp`
- `src/features/listing-detail/components/_imp`
- `src/features/discovery/_imp`
- `src/features/accounts/_imp`
- `src/features/managers/_imp`

Each specification distinguishes completed mock behavior from pending production requirements.
The production work includes inventory, authentication, favorites, matching, permissions, tours, and messaging.

## Checks

```powershell
npm run build
npm run lint
npm test
```

Tests use the built-in Node test runner and TypeScript stripping available in Node 22.17 or newer.
They cover cost integrity, missing values, local dates, fixture isolation, and personal-details authorization failures and expiry.
Fonts load from Google Fonts. Serif and sans-serif fallbacks remain available without network access.
