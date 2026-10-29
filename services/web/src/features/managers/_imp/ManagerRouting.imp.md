# ManagerRouting

## Metadata

- Status: `complete`
- Updated: 2026-10-29
- File: `useManagerRoute.ts`

## Purpose and routes

`useManagerRoute()` provides the current page, selected listing ID, programmatic navigation, and native-link click handling.

| Path | Page |
| --- | --- |
| `/managers/listings` | Inventory and work summary |
| `/managers/vacant` | Vacant unit details |
| `/managers/notices` | Notice and move-out details |
| `/managers/inquiries` | All renter inquiries |
| `/managers/inquiries/pending` | Inquiries requiring a reply |
| `/managers/tours` | All tours |
| `/managers/tours/pending` | Tours requiring confirmation |
| `/managers/applications` | Rental applications for review |
| `/managers/maintenance` | Maintenance requests and building announcements |

The query `listing={id}` scopes activity to a listing and survives refresh.
The earlier `/managers?view=workspace` URL remains a workspace entry alias.
Plain `/managers` remains the original overview and is selected outside this hook.
Unknown manager subpaths show a manager-specific missing-page state.

## Requirements and design

- [x] Give summary destinations real anchor URLs.
- [x] Navigate within the mounted workspace with pushState so local records and inventory filters remain intact.
- [x] Read the route on Back/Forward through popstate.
- [x] Preserve modified-click behavior for opening an anchor in another tab.
- [x] Accept trailing slashes when resolving pages.
- [x] Focus the destination heading after an internal navigation.
- [x] Avoid duplicate history entries when navigating to the current exact URL.

App selects ManagersView for the full manager path prefix.
ManagersView selects the workspace for subpaths and retains the original overview at its root.
Route state lives in ManagerWorkspace. Record state remains in ManagersView.
Inventory filter state is preserved in ManagerWorkspace and is not stored in browser history or storage.
Refresh resets records and filters while retaining the URL-selected page and activity listing.

## Testing and acceptance

- [x] Summary links open the corresponding detail URL.
- [x] Browser Back/Forward and Back to listings restore the previous active inventory filters.
- [x] Refresh on the notice path retains the report and title.
- [x] Direct inquiry/tour paths, listing query context, and unknown-path recovery pass final browser checks.

## Limitations

These routes do not enforce production authentication or property permissions.
Hosting must provide SPA fallback for direct URLs. Network loading/error handling and persistent filter URLs remain future work.
