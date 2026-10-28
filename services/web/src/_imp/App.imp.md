# App

## Metadata

- Status: `complete`
- Scope: route selection for the current mockups
- Updated: 2026-10-28
- File: `App.tsx`

## Purpose and usage

`<App />` selects the current mockup from the browser pathname.
`main.tsx` mounts it once inside StrictMode.

## Requirements and design

- [x] Select WelcomeView for `/`, including a trailing slash.
- [x] Select ManagersView for the `/managers` prefix, including workspace detail paths.
- [x] Select AccountsView for `/account` and `/accounts` prefixes, including section paths.
- [x] Select DiscoveryView for Homes, Saved, Roommates, and Community, with optional trailing slashes.
- [x] Delegate listing IDs and unknown paths to ListingDetailView.
- [x] Use representative content at all primary destinations rather than construction notices or empty stubs.
- [x] Preserve native anchor navigation and browser history.
- [x] Keep each view responsible for its header and main landmark.

The route selector adds no routing dependency.
Primary navigation reloads the document and resets manager and account state.
Account section navigation uses its own history adapter to retain settings and drafts.
Manager workspace navigation uses its history adapter to retain inventory filters and local records.
The development server provides the SPA fallback for direct paths.
Production hosting must provide the same fallback before these routes are deployed.

## Testing and acceptance

- [x] The managers route mounts its workspace and updates the document title.
- [x] The trailing-slash route and listing-detail regression pass browser review.
- [x] Both account paths, trailing slashes, and the shared Account link open account settings.
- [x] `/` opens WelcomeView. The Ballard sample detail remains at `/listings/ballard-room`.
- [x] All discovery destinations render at desktop, tablet, and 320px widths without construction copy.

## Limitations

Client-side transitions are implemented for account sections and manager workspace pages. Route loading states and server-authenticated route guards remain future work.
Customer-facing content depicts the intended product. Fixture and backend limitations belong in developer documentation.

## Completion checklist

- [x] Route selection is implemented and builds.
- [x] Direct-route browser checks pass.
