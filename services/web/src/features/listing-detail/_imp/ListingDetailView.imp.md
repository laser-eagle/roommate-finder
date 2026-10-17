# ListingDetailView

## Metadata

- Status: `in-progress`
- Milestone: interactive mockup
- Updated: 2026-09-27
- Source: [Listing detail specification](../../../../docs/web.ui.md)
- Location: `src/features/listing-detail`

## Purpose and scope

Present one room, its household, its costs, and its contact actions.
The current implementation uses fictional data. Production services remain pending.

## Requirements

- [x] Render the same listing model at desktop and mobile widths.
- [x] Keep the headline and subtitle in separate natural-height blocks.
- [x] Include all household facts on mobile.
- [x] Keep the deposit outside the monthly total.
- [x] Provide local save, tour, and message previews.
- [x] Expose loading, missing-listing, uncertainty, and permission scenarios.
- [ ] Load published inventory and viewer projections from services.
- [ ] Apply current authorization, blocking, and household consent rules.
- [x] Display the bedroom photo from the supplied `docs/web.ui.png` reference.

## Design

`ListingDetailView` owns the preview scenario, favorite state, pending save, and active contact dialog.
`listing.mock.ts` provides independent fixture copies. `listing.types.ts` defines the current presentation model.
The shared cost rule provides the monthly total for both panels.

| Unit | Responsibility |
| --- | --- |
| SiteHeader | Navigation and compact menu |
| ListingHeading | Breadcrumb, title, subtitle, favorite control |
| ListingPhotoGallery | Single photo or missing-photo state |
| InquiryCard | Price, availability, lease, contact permission, verification |
| AboutHomeSection | Description and household facts |
| MatchExplanationPanel | Sample search reasons and missing information |
| CostBreakdownPanel | Monthly costs and separate deposit |
| ContactPreview | Local contact form demonstration |
| MockupControls | Review scenarios, visible only with `?review=1` |
| ListingStates | Loading and missing-listing states |

Shared CSS tokens live in `src/index.css`. The listing stylesheet defines the layout.
The 960px breakpoint changes the grid into one column.
DOM and visual reading order remain consistent: photo, inquiry, about, match, costs.
The mobile about section remains visible between inquiry and match information.

## Usage

```tsx
<ListingDetailView />
```

`/` and `/listings/ballard-room` show the sample detail.
Header destinations use real URLs. `/managers` opens the separate ManagersView mockup.
`/accounts` and its `/account` alias open AccountsView.
DiscoveryView handles `/listings`, `/saved`, `/roommates`, and `/community`.
Each home in its catalog opens the corresponding detail by ID. Optional trailing slashes are supported.
The selected record supplies its type, caption, contact context, costs, and document title.
Unrecognized paths show the missing-listing state.

## State and error behavior

The shared useSavedHomes hook stores multiple home IDs in session storage and supports the previous Ballard favorite key.
The header count reflects the full collection. If storage is unavailable, the current page retains its in-memory state.
A simulated save delay exposes pending state. Failure preserves the previous favorite value.
Changing the scenario cancels any pending save and closes the contact preview.
No inventory, authentication, favorites, or contact API is connected.
The UI uses intended product wording without mockup banners. Sent states remain simulated.
Scenario controls are available only when the URL includes `?review=1`.

## Decisions and limitations

- The local specification takes priority over the known text overlap in the reference image.
- The user supplied `docs/web.ui.png` as the photo source. An SVG viewport isolates its bedroom region without changing the file.
- The crop uses the supplied photograph. Production needs a higher-resolution standalone asset.
- Muted text uses `#5C6C62` for improved contrast on pale surfaces.
- Fonts load from Google Fonts with local fallback families.
- The mock service boundary is a presentation model, not a final API contract.

## Testing and acceptance

- [x] TypeScript compilation and production bundling pass.
- [x] Desktop, mobile, and 320px browser reviews pass.
- [x] Keyboard checks cover menu, save, and contact dialogs.
- [x] All preview scenarios display accurate claims.
- [ ] Production services satisfy the contracts in the UI specification.

## Open questions

- Who supplies a higher-resolution production photo and its publication rights?
- What are the final inventory and viewer API payloads?
- How long does an authorization check remain current?

## Completion checklist

- [x] Mockup components and colocated specifications exist.
- [x] Browser acceptance review is complete.
- [ ] Production integration is complete.

## Review record

The mockup review passed on 2026-09-27.
Desktop and mobile screenshots show the supplied bedroom crop without the surrounding reference interface.
Layouts at 320, 390, 768, 960, and 1440px had no horizontal overflow.
The headline and subtitle retained a visible gap.
Keyboard review covered saving, menu dismissal, dialog focus wrapping, form validation, and focus restoration.
Navigation review covered all six destinations and session favorite state.
The browser console reported no errors in the final review.
Build, lint, and six automated behavior tests passed.
Production integration checkboxes remain open. They do not block the current mockup milestone.
