# DiscoveryView

## Metadata

- Status: `in-progress`
- Scope: discovery and community interface with placeholder data
- Routes: `/listings`, `/saved`, `/roommates`, `/community`
- Updated: 2026-09-27
- Files: `DiscoveryView.tsx`, `DiscoveryView.css`
- Requirements source: `docs/Project Features.pdf`, items 2–9, 11–14, and 45

## Purpose and requirements

Show the intended customer experience at every main navigation destination.
Representative records supply content while services remain unconnected.

- [x] Render HomesBrowse for listings and saved homes.
- [x] Render RoommatesBrowse for roommate discovery.
- [x] Render CommunityFeed for posts and local groups.
- [x] Set a page-specific document title and the correct header destination.
- [x] Use product-facing labels and realistic placeholder records.
- [x] Keep implementation notices and review tools outside normal customer flows.
- [ ] Connect live inventory, accounts, relationships, and community services.

## Usage and design

`<DiscoveryView page="listings" />` accepts listings, saved, roommates, or community.
App resolves these routes, including trailing slashes.
The component supplies a SiteHeader, main landmark, and the selected feature.
useSavedHomes supplies the saved count and home-toggle action.
Each feature owns its filters and interaction state.

Cards use shared color and typography tokens. Missing images use neutral graphic placeholders.
Grid columns stack as the viewport narrows. Forms and dialogs use native accessible controls.
The mockup depicts intended product states rather than advertising its implementation stage.

## Acceptance and limitations

- [x] All four destinations contain their own layout and representative content.
- [x] Desktop review passes.
- [x] Mobile review and dialog checks pass.
- [ ] Production service integration is complete.

Placeholders are not real listings, people, messages, or groups.
Connections, posts, comments, and group membership use local state and reset on navigation or refresh.
Saved homes persist in session storage. No external messages or account changes occur.
