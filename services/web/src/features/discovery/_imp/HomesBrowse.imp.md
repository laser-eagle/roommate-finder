# HomesBrowse

## Metadata

- Status: `in-progress`
- Scope: home search and saved-home interface
- Updated: 2026-09-27
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
- [x] Initialize location from city or neighborhood query parameters.
- [x] Show base rent, estimated total, availability, and location on each card.
- [x] Open a distinct listing detail for every home.
- [x] Save or unsave individual homes and update the header count.
- [x] Provide useful empty states for an empty shortlist or unmatched filters.
- [ ] Load publishable inventory and saved items from authorized services.

## Design

housing.data.ts supplies three Listing fixtures. The Ballard record reuses the provided photo crop.
Other fixtures use neutral image placeholders. Their prices, dates, descriptions, and types differ.
ListingDetailView consumes the same catalog, so card and detail content agree.
Filtering operates on computed monthly totals in cents. Sorting uses ISO availability dates or computed costs.
An unknown total cannot pass a maximum-cost filter.

## Testing and acceptance

- [x] A $1,300 maximum includes Ballard and excludes the $1,325 Capitol Hill total.
- [x] The apartment filter opens the Green Lake detail.
- [x] Saving in a detail page appears in Saved after navigation.
- [x] Removing a saved home updates the shortlist and header count.
- [x] An empty shortlist links to Homes and recovers after saving a home.
- [x] An unmatched location shows filter guidance, and clearing filters restores all homes.
- [x] Layouts fit at 320, 768, and 1440px.

## Limitations

Only three fixture homes exist. Maps, advanced amenities, comparison tools, and saved searches remain later work.
Session favorites are not account-level persistence.
