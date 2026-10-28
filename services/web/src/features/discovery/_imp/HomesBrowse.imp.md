# HomesBrowse

## Metadata

- Status: `in-progress`
- Scope: home search and saved-home interface
- Updated: 2026-10-28
- Files: `HomesBrowse.tsx`, `housing.data.ts`, related rules in `DiscoveryView.css`

## Purpose and usage

Present searchable home cards with comparable monthly totals and working detail links.
The component receives `savedOnly`, `savedIds`, and `onSave(id)`.
DiscoveryView owns the saved collection through useSavedHomes.

## Requirements and behavior

- [x] Populate a private room, an apartment, and a sublet.
- [x] Filter by city or neighborhood, housing type, and maximum total monthly cost.
- [x] Include fees and estimated utilities in budget filtering.
- [x] Sort by availability or lowest total monthly cost.
- [x] Initialize location from city or neighborhood query parameters, housing type from `type`, and maximum total from `max`.
- [x] On `/listings`, show a Saved searches button that opens SavedSearchesDialog (SRS Features 23 and 41).
- [x] Show base rent, estimated total, availability, and location on each card.
- [x] Open a distinct listing detail for every home.
- [x] Save or unsave individual homes and update the header count.
- [x] Provide useful empty states for an empty shortlist or unmatched filters.
- [x] On `/listings`, offer a List | Map toggle in the results heading (SRS Feature 31).
- [x] In Map view, show the result cards beside a blank map area with a neutral placeholder and a Search this area button.
- [x] On `/listings`, show Commute fields: Destination, Travel mode (Walk, Bike, Transit, Drive), and Maximum travel time (Any, 15, 30, 45, 60 min).
- [x] On `/listings`, show Commute time unavailable on each card.
- [x] Reset the commute fields with Clear filters.
- [x] Keep Saved homes (`/saved`) without the map toggle and commute fields.
- [x] On Saved homes, link to the Shared shortlist (`/shortlist`) beside Browse homes.
- [x] On `/listings` and `/saved`, show a Compare checkbox on each card (up to four) and a Compare (n) button once two or more are checked. The button opens CompareDialog (SRS Feature 15).
- [ ] Show results on a real map, search within the visible map area, and calculate commute times through a maps service.
- [ ] Load publishable inventory and saved items from authorized services.

## Design

housing.data.ts supplies three Listing fixtures. The Ballard record reuses the provided photo crop.
Other fixtures use neutral image placeholders. Their prices, dates, descriptions, and types differ.
ListingDetailView consumes the same catalog, so card and detail content agree.
Filtering operates on computed monthly totals in cents. Sorting uses ISO availability dates or computed costs.
An unknown total cannot pass a maximum-cost filter.
The results view (`list` or `map`), commute values, and comparison selection are local state. The comparison keeps only checked homes that are still visible.
The results view (`list` or `map`) and commute values reset on refresh. View starts as List; Travel mode starts as Transit; Maximum travel time starts as Any.
The commute fields and Search this area do not change results, because no maps service is connected.
The map region is a `section` labeled Map. Its placeholder icon is decorative. Map view uses a single card column beside the map on desktop, two equal columns below 1100px, and stacks the map above the cards below 800px.

## Testing and acceptance

- [x] A $1,300 maximum includes Ballard and excludes the $1,325 Capitol Hill total.
- [x] The apartment filter opens the Green Lake detail.
- [x] Saving in a detail page appears in Saved after navigation.
- [x] Removing a saved home updates the shortlist and header count.
- [x] An empty shortlist links to Homes and recovers after saving a home.
- [x] An unmatched location shows filter guidance, and clearing filters restores all homes.
- [x] Layouts fit at 320, 768, and 1440px.
- [x] Map view shows the Map region, Search this area, and all matching cards at 1280, 900, and 390px without horizontal overflow.
- [x] Clear filters resets Destination to empty, Travel mode to Transit, and Maximum travel time to Any.

## Limitations

Only three fixture homes exist. The map is a blank placeholder and commute times are not calculated. Advanced amenities and saved searches remain later work.
Session favorites are not account-level persistence.
