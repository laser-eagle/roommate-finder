# ShortlistView

## Metadata

- Status: `in-progress`
- Scope: shared shortlist for a roommate group's collaborative search
- Route: `/shortlist`
- Updated: 2026-10-28
- Files: `ShortlistView.tsx`, `ShortlistView.css`, `shortlist.data.ts`
- Requirements source: SRS Feature 28 Collaborative Searches; SRS 8.1 conceptual data (Collaborative Search, Shared Shortlist, Shortlist Item, Shortlist Vote, Comment); prototype checklist item 2.12

## Purpose and requirements

Let roommate group members review candidate homes together, see each member's vote, and read comments.

- [x] Render at `/shortlist`, including a trailing slash.
- [x] List the group members, marking the signed-in user as you.
- [x] Show each shortlisted home with location, type, estimated monthly total, a link to its listing, and who added it.
- [x] Show every member's Yes or No vote and a yes/no tally for each home.
- [x] Let the signed-in user set or change their own vote with Yes and No buttons.
- [x] Show each home's comments with their authors, or No comments yet.
- [x] Link to Saved homes; Saved homes links back with Shared shortlist.
- [x] Highlight Saved in the header on this page.
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Add homes to the shortlist, post comments, and remove homes.
- [ ] Record each member's preferences (SRS Feature 28).
- [ ] Load groups, shortlists, votes, and comments from backend services.

## Usage

```tsx
<ShortlistView />
```

App selects the component for `/shortlist`. The page title is `Shared shortlist | Roommate Finder`.

## Design and data

`shortlist.data.ts` defines the group (Jordan Ellis as you, and Avery Chen) and three shortlist items for the sample homes. Each item records who added it, Avery's vote, and sample comments.
Jordan starts with no votes. Votes are local state and reset on refresh. Avery's votes and all comments are fixed sample data.
Each item is a surface card with three areas: home, Votes, and Comments. The areas stack below 960px.
The signed-in user's vote is a pair of toggle buttons (`aria-pressed`) in a group labeled with the home's title. Other members' votes show as text, or No vote yet.

## Acceptance criteria

- [x] `/shortlist` lists Jordan Ellis (you) and Avery Chen and shows three homes.
- [x] Starting tallies are 0 yes · 1 no (Ballard), 1 yes · 0 no (Capitol Hill), and 0 yes · 1 no (Green Lake).
- [x] Voting Yes on Capitol Hill shows 2 yes · 0 no; changing to No shows 1 yes · 1 no.
- [x] Home titles open their listing pages.
- [x] The page fits 390px without horizontal overflow.

## Limitations and open questions

Only one sample group exists, and the signed-in user cannot add homes, comment, or remove homes in this mockup.
The SRS has no use case for collaborative searches, so group creation and invitations are not defined.
