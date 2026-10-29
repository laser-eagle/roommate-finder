# SavedSearchesDialog

## Metadata

- Status: `in-progress`
- Scope: saved searches with criteria, Edit, Run now, daily schedule, search history, listing change labels, and required versus preferred criteria
- Updated: 2026-10-28
- Files: `SavedSearchesDialog.tsx`, `SavedSearches.css`, `savedSearches.data.ts`
- Requirements source: SRS Features 23 Multiple Saved Searches, 37 Required Criteria versus Preferences, 38 Search History and Reliability, 41 Daily Search Scheduling, and 45 New and Updated Listing Detection; UC-4.1, UC-4.2, UC-4.3; prototype checklist items 2.9 and 2.15

## Purpose and requirements

Let a renter keep separate named searches for apartments, rooms, and roommates, run them, and control their daily schedule.

- [x] Open from the Saved searches button in the Find a home heading (`/listings` only).
- [x] List each search with its type (Apartments, Rooms, Roommates), name, criteria summary, and schedule.
- [x] Show Daily at {time} · Next run {date and time} for scheduled searches, and Paused with Daily search paused for paused ones.
- [x] Pause and Resume each search (UC-4.1 extension 7a).
- [x] Edit a search's name, criteria, and daily run time. Home searches edit location, housing type, and maximum total per month; roommate searches edit name or neighborhood and housing plans.
- [x] Show the browser's time zone (read-only) on the edit form.
- [x] Run now opens Find a home or Find a roommate with the search's criteria filled in.
- [x] Show history and Hide history under each search, with the last run, next run (or Paused), and three runs.
- [x] Show each run's time, delivery status (Delivered, No new results, Failed, retried, Skipped (paused)), match count, and matches.
- [x] Label each match New, Price changed, or Availability changed (roommate matches are labeled New).
- [x] In Edit for apartment and room searches, mark Location, Housing type, and Maximum total / month as Required or Preferred, with Low, Medium, or High importance for Preferred criteria.
- [x] After saving a home search, show how many sample listings meet all required criteria, or warn that none do and name the required criteria to change to Preferred (UC-4.3 step 5 and extension 5a).
- [ ] Score and rank results by required and preferred criteria (SRS Feature 42), and detect changes from real runs.
- [ ] Create a saved search from the current filters (UC-4.1 Save and Run Daily), and delete searches.
- [ ] Run searches on a server schedule, including daylight saving adjustments and saved-search limits.

## Usage

```tsx
<SavedSearchesDialog searches={savedSearches} onChange={updateSearch} onClose={close} />
```

HomesBrowse owns the saved-search records. `onChange(search)` replaces a record by ID.

## Design and data

`savedSearches.data.ts` exports the `SavedSearch`, `SearchRun`, and `CriterionPriority` types, three fictional searches (Apartments under $1,800 and Private rooms in Ballard scheduled at 8:00 AM; Roommates looking to team up paused), each with three sample runs and criterion priorities, and helpers: `criteriaSummary`, `resultsUrl`, `formatRunTime`, `nextRun`, `deviceTimeZone`, `requiredCriteria`, and `requiredMatchCount`.
`requiredMatchCount` counts the three sample homes that meet every Required criterion that has a value. Location matches the city or neighborhood text; Housing type matches exactly; Maximum total compares the estimated monthly total.
Importance is disabled while a criterion is Required. Roommate searches have no priority controls.
History runs and labels are fixed sample data; Run now does not add a run.
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
- [x] Show history on Apartments under $1,800 shows Delivered, No new results, and Failed, retried, with Price changed and New labels; the paused roommates search's latest run is Skipped (paused).
- [x] Saving Private rooms in Ballard shows 1 listing meets all required criteria; changing its housing type to Apartment shows the no-match warning naming Location and Housing type.
- [x] Changing Housing type to Preferred enables Importance, and saving shows 1 listing again.

## Limitations and open questions

UC-4.1 leaves open whether searches can run more than once a day and how many saved searches a user can have. UC-4.3 leaves open whether importance uses three levels or a 1 to 5 scale; the mockup uses Low, Medium, and High.
Move-in date is not a saved-search criterion.
