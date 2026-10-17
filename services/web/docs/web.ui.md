# Roommate Finder - Listing Detail UI Specification

**Document ID:** `webapp.ui`  
**Screen name:** `ListingDetailView`  
**Proposed route:** `/listings/{id}`  
**Figma source:** [Roommate Finder - Housing Discovery Concept](https://www.figma.com/design/y4wfpwsEfEaB2s29lh6q7W)  
**Source frames:** [Desktop `2:20`](https://www.figma.com/design/y4wfpwsEfEaB2s29lh6q7W?node-id=2-20) (1440 × 989); [Mobile `2:21`](https://www.figma.com/design/y4wfpwsEfEaB2s29lh6q7W?node-id=2-21) (390 × 1258), both on Figma Page 1  
**Purpose:** Give a renter a calm, credible view of one available room, its full monthly cost, household context, fit with their search, and two clear ways to make contact.

## 1. Scope and source of truth

This document describes the **first page in the Figma file**: a listing detail screen for a fictional private bedroom in Ballard, Seattle. It is not a home page or a description of every screen in the product. The desktop and mobile frames represent the same listing and should be implemented from one data model with responsive presentation.

The content, visual hierarchy, colors, type styles, and frame sizes below are captured from the created Figma concept. Behavior, responsive rules between the two supplied widths, data contracts, and exceptional states are **implementation decisions** specified here to make the static design buildable. The broader product's implementation names and service boundaries follow **Roommate Finder - Product Implementation Master Checklist**.

**Known design correction:** The title and subtitle overlap in the current Figma frames because of text height behavior. The application must give both text blocks their natural height and a visible gap. Do not reproduce that collision.

## 2. Page identity and content

| Element / implementation name | Description and exact concept content                                                                                                                                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SiteHeader`                  | White navigation bar with the lowercase wordmark **roommate finder**. On desktop it includes **Homes** (active), **Roommates**, **Community**, **For managers**, **Saved**, and **Account**. It anchors the marketplace without competing with the listing.                                                              |
| `ListingBreadcrumb`           | Small uppercase location/type trail: **SEATTLE / BALLARD / PRIVATE ROOM**. Its items identify the region, neighborhood, and offer type. Linkable ancestors should lead to the corresponding search context.                                                                                                              |
| `ListingHeroTitle`            | Editorial heading: **A quiet room to make your own.** This is the page's only `h1`. Its line breaks may change with viewport width.                                                                                                                                                                                      |
| `ListingHeroSubtitle`         | Supporting line: **A thoughtful two-bedroom home near Ballard Avenue.** It sits below the title with enough space to remain distinct.                                                                                                                                                                                    |
| `SaveListingButton`           | Secondary outlined action labeled **Save home**. It represents the viewer's private favorite state; when saved, announce and display **Saved** and allow removal.                                                                                                                                                        |
| `ListingPhotoGallery`         | The concept shows one large photograph of the bedroom. It depicts a warm, sunlit room with a bed, pale bedding, olive throw, timber floor, dark window trim, plants, and bedside lamps. Render the supplied concept asset as the first image. Do not imply that more images exist unless listing data contains them.     |
| `InquiryCard`                 | White, visually contained panel beside the image on desktop and below it on mobile. It houses rent, estimated total, availability, lease summary, contact actions, and the verification statement.                                                                                                                       |
| `MonthlyRent`                 | Eyebrow **MONTHLY RENT**, prominent **$1,180**, and smaller **/ month**. This is base rent for this private room, not the estimated all-in monthly total.                                                                                                                                                                |
| `EstimatedMonthlySummary`     | **Estimated $1,265 total with utilities**. The word “Estimated” must remain attached to the amount.                                                                                                                                                                                                                      |
| `AvailabilitySummary`         | Eyebrow **AVAILABLE**; value **October 15, 2026**. The implementation should render the listing's current local date rather than hardcode the concept date.                                                                                                                                                              |
| `LeaseSummary`                | Eyebrow **LEASE**; value **12 months · flexible start**. The text summarizes the term; any detailed terms can be provided lower on the page or in a later product section.                                                                                                                                               |
| `RequestTourButton`           | Primary filled green action: **Request a tour**. It opens the tour request flow for this listing.                                                                                                                                                                                                                        |
| `MessageHouseholdButton`      | Secondary action: **Message the household**. It opens or starts a permitted conversation tied to this listing.                                                                                                                                                                                                           |
| `ListingVerificationStatus`   | Small trust line: **Verified listing · Authorization checked**. It refers specifically to a current listing authorization check and must reflect the actual verification record, not merely an account badge.                                                                                                            |
| `AboutHomeSection`            | Desktop section heading **A little more about this home** and body: **A bright private room in a calm, lived-in home. Share the kitchen and living room with one housemate, with easy access to neighborhood shops and transit.** The content describes the offered room and shared home.                                |
| `RoomFacts`                   | Three quick facts: **THE ROOM** → **Private · furnished**; **THE HOUSEHOLD** → **One housemate**; **PETS** → **Cats welcome**. These are listing-supplied facts, not inferred preferences.                                                                                                                               |
| `MatchExplanationPanel`       | Soft green panel headed **Why it fits your search**. Concept explanation: **Within your budget and available in October. Commute information is still missing.** Positive matches and missing data are stated separately. Only show personalized claims when the viewer has an applicable saved search or preferences.   |
| `CostBreakdownPanel`          | White panel headed **The full cost**. Rows: **Base rent $1,180**, **Required monthly fees $0**, **Estimated utilities $85**, **Estimated monthly total $1,265**, **Move-in deposit $400**. Footer: **Utility cost is an estimate. The deposit is a one-time amount.** Keep the one-time deposit outside the monthly sum. |

### Content integrity

- The concept numbers reconcile: `$1,180 + $0 + $85 = $1,265` estimated monthly total. `$400` is a separate one-time deposit.
- The zero required-fees value is valid only when inventory explicitly confirms there are none. Missing fees data must be displayed as **Unknown**, never silently converted to `$0`.
- The concept's verification, availability, pet, furnishing, and household statements are sample data. Production copy must be derived from current, publishable fields and permissions.
- Use a consistent currency and locale for every amount and date on the screen. The example is USD and English (United States).

## 3. Visual design system

### 3.1 Color tokens

| Token              | Hex       | Role                                              |
| ------------------ | --------- | ------------------------------------------------- |
| `color/canvas`     | `#F6F4EE` | Warm off-white page background.                   |
| `color/surface`    | `#FFFFFF` | Header, inquiry card, and cost panel surfaces.    |
| `color/ink`        | `#24352E` | Primary text and editorial headings.              |
| `color/muted`      | `#68776D` | Secondary descriptions and metadata.              |
| `color/line`       | `#D8DED5` | Quiet borders, separators, and outlined controls. |
| `color/brand`      | `#275D49` | Primary action and active accent.                 |
| `color/brand-soft` | `#E4EEE5` | Match explanation background.                     |
| `color/warm`       | `#ECE5D8` | Supporting neutral accent where needed.           |

Use the dark green for text on pale surfaces and white on the filled primary button. Token names come from the Figma concept; define one application token source so desktop and mobile cannot drift.

### 3.2 Typography

| Style / implementation name | Family and concept size        | Use                                                |
| --------------------------- | ------------------------------ | -------------------------------------------------- |
| `type/display-desktop`      | Newsreader Medium, 62px / 68px | Desktop `h1`, allowed to wrap naturally.           |
| `type/display-mobile`       | Newsreader Medium, 42px / 48px | Mobile `h1`.                                       |
| `type/section-desktop`      | Newsreader Medium, 32px / 38px | Large section headings.                            |
| `type/section-mobile`       | Newsreader Medium, 25px / 31px | Mobile section headings.                           |
| `type/price`                | Newsreader Medium, 44px / 48px | Base rent amount.                                  |
| `type/body`                 | DM Sans Regular, 16px / 24px   | Descriptions and readable supporting content.      |
| `type/small`                | DM Sans Regular, 14px / 20px   | Secondary facts, cost notes, and compact metadata. |
| `type/eyebrow`              | DM Sans SemiBold, 12px / 16px  | Uppercase field labels with subtle letter spacing. |
| `type/action`               | DM Sans SemiBold, 15px / 20px  | Buttons and action links.                          |

Preserve the contrast between an expressive serif headline and restrained sans-serif utility copy. Load both families with sensible serif and sans-serif fallbacks; keep text legible during font loading. No heading, subtitle, or price should depend on fixed-height text boxes.

### 3.3 Shape and rhythm

- Overall impression: warm, editorial, spacious, and residential. White panels sit on the warm canvas with modest radii and fine borders rather than heavy shadows.
- Use a consistent spacing scale based on 4px increments. The supplied desktop composition has 96px outer margins at 1440px, a 32px gap between its main columns, and generous vertical spacing between sections. The mobile composition uses 24px page insets.
- Buttons should have comfortable horizontal padding and a minimum 44px touch height. Maintain visual order: filled tour button first, outlined or quiet message action second.
- Keep line length comfortable for the description. Do not stretch body copy across the entire 1248px container.

## 4. Responsive composition

### 4.1 Desktop frame - `ListingDetailDesktop`

**Reference size:** 1440 × 989. Header height is approximately 82px. Main content is centered in an approximately 1248px-wide area, producing about 96px side margins.

1. `SiteHeader` spans the viewport width on a white surface. The wordmark sits left; primary navigation sits across the middle; Saved and Account align right. Homes shows the active state.
2. `ListingBreadcrumb` starts the main content, followed by a heading area containing `ListingHeroTitle`, `ListingHeroSubtitle`, and `SaveListingButton` toward the right. The title and subtitle occupy separate rows with natural height.
3. The hero body is a two-column grid: approximately **800px image + 32px gap + 416px inquiry card**. The photo is approximately **800 × 460px**, cropped with `object-fit: cover` and a stable focal point. The card aligns to the photo's top edge.
4. Below the hero, `AboutHomeSection`, `RoomFacts`, and `MatchExplanationPanel` occupy the broader left column. `CostBreakdownPanel` occupies the right column. Allow the page to grow below the reference frame if content wraps; the 989px canvas is a design capture, not a fixed application height.
5. Align panel edges and internal padding consistently. The price is the strongest utility element, while the photograph and headline lead the emotional hierarchy.

### 4.2 Mobile frame - `ListingDetailMobile`

**Reference size:** 390 × 1258. Header height is approximately 68px; text and panels use approximately **24px side insets**, yielding a **342px** content width. The hero photograph spans the mobile composition at approximately **390 × 252px**.

1. Use a compact header with the wordmark and a reachable navigation control. The full desktop navigation must remain available through an accessible mobile menu or equivalent compact navigation; the exact collapsed treatment is an implementation choice.
2. Stack breadcrumb, title, subtitle, and save action without overlap or clipped text. Keep the headline at 42px / 48px and allow its number of lines to grow.
3. Show the photograph prominently before the inquiry information. Preserve its focal point when cropping to the wide mobile aspect ratio.
4. Stack monthly rent, estimated total, availability, lease, `RequestTourButton`, `MessageHouseholdButton`, and verification in the inquiry area. Both actions should fill the available width or have equally clear touch targets.
5. Present `MatchExplanationPanel` and `CostBreakdownPanel` below the main actions. The mobile concept condenses some of the desktop description and quick facts. For production content parity, include `AboutHomeSection` and `RoomFacts` further down the page or behind a clearly labeled expandable section; do not silently remove facts from mobile access.
6. Maintain the same cost math and wording as desktop. A narrow viewport may wrap row labels, but amounts remain associated with their own labels.

### 4.3 Intermediate widths - `ListingDetailResponsiveRules`

The Figma file supplies only 1440px and 390px frames. Implement the transition with content-driven breakpoints rather than scaling the desktop canvas. Use the two-column layout while the photo, 32px gap, and a readable inquiry card fit; otherwise stack them in the mobile order. An initial breakpoint around **900 to 1000px** is a build starting point, not a measured Figma breakpoint. At all widths from 320px upward, forbid horizontal scrolling, clipped actions, and text collisions.

## 5. Component tree and semantic structure

```text
ListingDetailView
├── SiteHeader
│   ├── BrandLink
│   ├── PrimaryNavigation
│   └── AccountNavigation / MobileNavigation
└── main
    ├── ListingBreadcrumb
    ├── ListingHeading
    │   ├── ListingHeroTitle (h1)
    │   ├── ListingHeroSubtitle
    │   └── SaveListingButton
    ├── ListingHero
    │   ├── ListingPhotoGallery
    │   └── InquiryCard
    │       ├── MonthlyRent
    │       ├── EstimatedMonthlySummary
    │       ├── AvailabilitySummary
    │       ├── LeaseSummary
    │       ├── RequestTourButton
    │       ├── MessageHouseholdButton
    │       └── ListingVerificationStatus
    └── ListingDetails
        ├── AboutHomeSection
        ├── RoomFacts
        ├── MatchExplanationPanel
        └── CostBreakdownPanel
```

The visual grid may place `CostBreakdownPanel` beside the descriptive content while keeping one logical reading order. Use semantic `header`, `nav`, `main`, `section`, and `aside` only where their meanings fit. Each region with a heading should have a meaningful accessible name. Avoid duplicating the same content in separate desktop and mobile DOM trees.

## 6. Interactions and navigation

The Figma frames show static controls. The following contracts specify their intended application behavior.

| Control / implementation name | Interaction contract                                                                                                                                                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `BrandLink`                   | Navigate to the product's housing discovery entry point. Preserve standard link behavior, including open-in-new-tab.                                                                                                                                               |
| `PrimaryNavigation`           | Homes opens `/listings`; Roommates, Community, For managers, Saved, and Account open their respective product destinations. Use real links, active-page indication, and visible focus. Do not render a nonfunctional label as a link.                              |
| `ListingBreadcrumb`           | Region and neighborhood ancestors return to relevant listing results; the current “PRIVATE ROOM” segment can be plain text. Preserve enough search context for a sensible back path when available.                                                                |
| `SaveListingButton`           | Toggle the viewer's private favorite using `SavedItemsService`; update label, pressed state, and count if present. Require sign-in only when necessary and resume the action afterward. Handle save failure without claiming success.                              |
| `ListingPhotoGallery`         | With one image, present one accessible image and no dead carousel controls. With more images, expose ordered media, current position, captions, and keyboard-operable next/previous controls. Opening a larger view must have a close action and focus management. |
| `RequestTourButton`           | Open a tour request flow tied to this listing and its latest availability. Show available in-person or virtual options only if supplied. Submission creates a request with an explicit pending/confirmed state, and duplicate submission is prevented.             |
| `MessageHouseholdButton`      | Open an existing authorized listing conversation or start a contact request. Respect visibility, blocking, and household consent. Keep the listing context visible in the composer.                                                                                |
| `ListingVerificationStatus`   | If interactive, open a concise explanation of what was checked and when. Never imply that every room condition, identity, or future availability is guaranteed. Hide or replace the claim when authorization lapses.                                               |
| `MatchExplanationPanel`       | Show reasons derived from the viewer's chosen search and a recorded evaluation version. If no personalized context exists, omit the panel or use clearly nonpersonal language. Do not fabricate a fit score.                                                       |

The primary tour and message actions must be disabled or replaced with a clear unavailability explanation for a paused, expired, archived, or otherwise unavailable listing. A previously saved item may remain visible with its current status.

## 7. Data contract and formatting

`ListingDetailView` should render a current published listing snapshot from `InventoryService`, with viewer-specific saved and match projections from `DiscoveryService`. Inquiry permissions come from the renter journey and trust services. The shape below names the data the screen needs; it is not a mandate for a specific API payload format.

| Field / implementation name                                | Type and meaning                                                                                         | Concept example                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `listing.id`, `listing.type`, `listing.status`             | Stable identity, offer type, and current publication/availability state.                                 | Room listing; active.                            |
| `listing.title`, `listing.subtitle`, `listing.description` | Publishable editorial copy, with plain-text handling and sensible length limits.                         | Title and about copy in section 2.               |
| `listing.location`                                         | Displayable city and neighborhood; do not expose a private exact address before permissions allow it.    | Seattle; Ballard.                                |
| `listing.photos[]`                                         | Ordered, publishable asset URL, dimensions, alt text, optional caption, and focal position.              | One bedroom image.                               |
| `listing.roomFacts`                                        | Room privacy, furnishing, household count, pet policy, and provenance.                                   | Private; furnished; one housemate; cats welcome. |
| `listing.availability`                                     | Status, local start date, timezone, and last-confirmed timestamp.                                        | October 15, 2026.                                |
| `listing.leaseTerms`                                       | Duration, flexibility, and any conditions needed for accurate summary.                                   | 12 months; flexible start.                       |
| `listing.costs.baseRent`                                   | Exact recurring amount, currency, and monthly cadence.                                                   | USD 1,180 monthly.                               |
| `listing.costs.requiredMonthlyFees`                        | Explicit itemized fee amounts or unknown state, never a fabricated zero.                                 | USD 0 confirmed.                                 |
| `listing.costs.utilities`                                  | Estimated amount or range, estimation method if available, and payer.                                    | USD 85 estimate.                                 |
| `listing.costs.deposit`                                    | One-time amount, timing, and conditionality.                                                             | USD 400 one time.                                |
| `listing.verification`                                     | Claim type, status, checked-at date, and permitted display text.                                         | Authorization checked.                           |
| `viewer.favorite`                                          | Whether this viewer has privately saved the listing.                                                     | Unsaved in concept.                              |
| `viewer.matchExplanation`                                  | Search/evaluation version, positive reasons, gaps, and unknown values, within visibility policy.         | Budget and October match; commute unknown.       |
| `viewer.contactPermissions`                                | Whether the viewer may request a tour or message this household and any reason a control is unavailable. | Both actions available in concept.               |

Compute `estimatedMonthlyTotal` through the shared `CostBreakdown` rule used in search and comparison. Display the amount with the word “estimated” whenever any included component is estimated. Show an explicit unknown or partial total when required inputs are missing. Do not add the deposit to this monthly figure.

## 8. Loading, empty, error, and changed states

| State / implementation name | Required presentation and behavior                                                                                                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ListingLoading`            | Reserve approximate photo, heading, and card space with calm skeletons or a concise loading indicator. Avoid shifting the primary actions beneath the user's pointer when data arrives.        |
| `ListingNotFound`           | Explain that the listing cannot be found and provide a route back to Homes/search; do not expose private details of an unpublished listing.                                                    |
| `ListingUnavailable`        | Preserve publicly viewable details as policy permits, label the listing's current state prominently, and remove active tour/message promises. Saved links must resolve to this truthful state. |
| `PhotoMissing`              | Show a quiet placeholder with accessible text; maintain the intended image region aspect ratio. Do not show broken-image chrome.                                                               |
| `CostUnknown`               | Mark unknown amounts explicitly, explain that the monthly total is incomplete when applicable, and keep known one-time charges separate.                                                       |
| `AvailabilityUnconfirmed`   | Show an “Availability not confirmed” or equivalent status and timestamp instead of presenting an old date as current.                                                                          |
| `NoPersonalizedMatch`       | Omit personalized reasons or state that the viewer can set preferences. Never display “Within your budget” without a known budget and evaluated cost.                                          |
| `FavoritePendingOrFailed`   | Show a pending state while saving; on failure restore the prior state and provide a readable retry message.                                                                                    |
| `InquiryBlockedOrFailed`    | Explain why contact is unavailable or that submission failed, without leaking household data. Prevent duplicate requests.                                                                      |

## 9. Accessibility and quality requirements

- **Reading order - `SemanticReadingOrder`:** The title is first-level heading; subsequent sections use descending heading levels. Keyboard and screen-reader order follows the content order even when desktop CSS creates columns.
- **Navigation - `KeyboardNavigation`:** Every link, save control, photo gallery control, menu, and inquiry action works with keyboard input. Focus rings are visible against both white and canvas surfaces. Mobile navigation opens, closes, and returns focus predictably.
- **Image - `BedroomPhotoAlt`:** Suggested concept alt text: “Sunlit private bedroom with a bed, dark-trimmed windows, plants, and wood floors.” Use listing-specific alt text in production; captions and alt text must not claim amenities the image does not show.
- **State - `AccessibleActionState`:** Save exposes pressed state; pending actions expose status; form validation and errors are announced in context. Disabled actions include the reason in nearby text rather than relying on color.
- **Contrast - `ReadablePalette`:** Validate text, button, muted label, and focus contrast in implementation, especially small muted text on the warm background and white text on brand green.
- **Touch - `TouchTarget`:** Mobile interactive targets are at least 44 × 44px with spacing that prevents accidental adjacent taps.
- **Zoom - `ResponsiveText`:** At 200% browser zoom and at 320px CSS width, content reflows without horizontal scrolling or clipped title, price, cost, and action text.
- **Motion - `ReducedMotion`:** Any gallery or drawer transition respects reduced-motion preferences. Motion is not required to understand a state change.

## 10. Acceptance checks

1. At **1440px**, the page reads as the Figma desktop composition: white header, warm canvas, editorial title, large room image at left, inquiry card at right, details below left, and full cost below right.
2. At **390px**, the content stacks in the Figma mobile hierarchy with approximately 24px text insets, a prominent wide image, reachable actions, match explanation, and full cost. Desktop facts remain accessible on mobile.
3. The headline and subtitle never overlap at either reference size, at intermediate widths, after font loading, or with longer localized content.
4. The concept data displays `$1,180` base rent, `$85` estimated utilities, `$0` confirmed required fees, `$1,265` estimated monthly total, and `$400` one-time deposit without mixing billing cadences.
5. Save, tour request, message, navigation, and any gallery controls are operable, communicate their states, and honor current permissions and listing status.
6. A missing cost, stale availability, or lapsed verification never appears as a confirmed zero, current date, or verified claim.
7. Keyboard order, labels, image alt text, focus, contrast, and narrow-screen reflow pass manual accessibility review.

## 11. Asset and implementation handoff

- **Concept photo - `BedroomHeroImage`:** The source is the photograph embedded in the Figma frames. A local companion asset is supplied as `listing-room-reference.jpg` (680 × 453px). Its use in a real listing requires appropriate publishing rights; the concept image represents fictional sample inventory.
- **Image rendering - `PhotoCrop`:** Desktop uses an approximately 800 × 460px display area; mobile uses an approximately 390 × 252px area. Use `object-fit: cover` and choose a focal position that retains the bed and windows. Provide a responsive image source at an appropriate resolution for production.
- **Design implementation - `ListingDetailTokens`:** Implement the named colors and type styles as reusable tokens, and build the screen from the component tree above. Avoid absolute positioning for the heading, subtitle, cards, and price rows.
- **Related product work - `ListingDetailDependencies`:** Inventory and authorization, transparent costs, favorites, matching explanation, messaging, tours, and verification are defined in the product implementation master checklist. This UI specification states how the first Figma page presents those capabilities; it does not replace the full product document.

**Source status:** The Figma file and frames were created and inspected in the design session. Fresh Figma MCP reads were blocked by the account's Starter plan tool-call limit when this document was prepared. The file uses the captured frame details and prior screenshot review; dimensions labeled “approximately” should be checked against the editable file if tool access becomes available again.
