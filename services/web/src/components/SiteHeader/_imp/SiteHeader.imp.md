# SiteHeader

## Metadata

- Status: `in-progress`
- Updated: 2026-10-28
- Files: `SiteHeader.tsx`, `SiteHeader.css`

## Purpose

Provide the marketplace identity and access to its six main destinations.

## Requirements

- [x] Show Homes, Roommates, Community, For managers, Saved, and Account.
- [x] Use anchors that preserve native link behavior.
- [x] Indicate the current destination.
- [x] Link the wordmark to the welcome page at `/`.
- [x] Show Log in and Sign up links on `/`, `/login`, and `/signup` only.
- [x] Show a compact menu below 960px.
- [x] Expose expanded state and a skip link.
- [x] Close the menu with Escape and return focus to its button.
- [ ] Connect navigation to completed product screens.

## Usage

```tsx
<SiteHeader savedCount={savedIds.length} />
```

`savedCount` controls the heart and aggregate saved-home count.
The component owns menu visibility. The location pathname determines the active link.
Links use `/listings`, `/roommates`, `/community`, `/managers`, `/saved`, and `/account/personal`.
The wordmark links to `/`.
On `/`, `/login`, and `/signup`, Log in (`/login`) and Sign up (`/signup`) follow the six destinations. Each shows its active state on its own path.
Homes is active on listing detail paths, not on the welcome page.
The Account link shows its active state on all singular and plural account section paths.
For managers stays active across every manager workspace subpath.

## Behavior and design

Desktop navigation fits beside the wordmark in an 82px header.
The mobile header has a 68px minimum height. Its menu expands within document flow.
The menu uses disclosure semantics, not application-menu roles.
The shared decorative `Icon` helper supplies the heart and menu symbols.

## Testing and acceptance

- [x] All six destinations remain reachable at 320px.
- [x] Escape closes the compact menu and restores focus.
- [x] Every destination opens a feature screen, empty state, or the sample listing.
- [x] Saved state appears after a local save.

## Limitations and open questions

The managers destination opens ManagersView. The account destination opens AccountsView.
Homes, Saved, Roommates, and Community open DiscoveryView with representative records and local controls.
Authentication and user identity are not implemented.
Server-backed counts and authenticated routing remain future work.

## Completion checklist

- [x] Responsive navigation mockup exists.
- [x] Browser interaction review passes.
- [ ] Production destinations exist.
