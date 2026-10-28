# SavedSearchesDialog

## Metadata

- Status: `in-progress`
- Scope: saved searches with criteria, Edit, Run now, and daily schedule controls
- Updated: 2026-10-28
- Files: `SavedSearchesDialog.tsx`, `SavedSearches.css`, `savedSearches.data.ts`
- Requirements source: SRS Feature 23 Multiple Saved Searches, Feature 41 Daily Search Scheduling, UC-4.1 Schedule Daily Search; prototype checklist item 2.15

## Purpose and requirements

Let a renter keep separate named searches for apartments, rooms, and roommates, run them, and control their daily schedule.

- [x] Open from the Saved searches button in the Find a home heading (`/listings` only).
- [x] List each search with its type (Apartments, Rooms, Roommates), name, criteria summary, and schedule.
- [x] Show Daily at {time} · Next run {date and time} for scheduled searches, and Paused with Daily search paused for paused ones.
- [x] Pause and Resume each search (UC-4.1 extension 7a).
- [x] Edit a search's name, criteria, and daily run time. Home searches edit location, housing type, and maximum total per month; roommate searches edit name or neighborhood and housing plans.
- [x] Show the browser's time zone (read-only) on the edit form.
- [x] Run now opens Find a home or Find a roommate with the search's criteria filled in.
- [ ] Create a saved search from the current filters (UC-4.1 Save and Run Daily), and delete searches.
- [ ] Run searches on a server schedule, including daylight saving adjustments and saved-search limits.

## Usage

```tsx
<SavedSearchesDialog searches={savedSearches} onChange={updateSearch} onClose={close} />
```

HomesBrowse owns the saved-search records. `onChange(search)` replaces a record by ID.

## Design and data

`savedSearches.data.ts` exports the `SavedSearch` type, three fictional searches (Apartments under $1,800 and Private rooms in Ballard scheduled at 8:00 AM; Roommates looking to team up paused), and helpers: `criteriaSummary`, `resultsUrl`, `formatRunTime`, `nextRun`, and `deviceTimeZone`.
`nextRun` uses the browser's local time: the next occurrence of the run time after now.
`resultsUrl` builds `/listings?neighborhood=&type=&max=` or `/roommates?q=&plans=`; HomesBrowse and RoommatesBrowse read those query parameters.
The edit form replaces the list inside the same dialog. It uses `noValidate`, and an empty run time keeps the previous time.
Changes are local state. They last while the Find a home page stays open and reset on refresh or navigation, including Run now.

## Acceptance criteria

- [x] The dialog lists three searches; the roommates search shows Paused.
- [x] Pause and Resume toggle the Paused state and schedule text.
- [x] Editing the rooms search's name, location, type, and run time updates its card and next run.
- [x] Run now on Apartments under $1,800 opens `/listings?type=Apartment&max=1800` with those filters set.
- [x] Run now on the roommates search opens `/roommates?plans=Looking+to+team+up` with that filter set.

## Limitations and open questions

UC-4.1 leaves open whether searches can run more than once a day and how many saved searches a user can have.
