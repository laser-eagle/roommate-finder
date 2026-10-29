# HouseholdView

## Metadata

- Status: `in-progress`
- Scope: household agreement and move-in/move-out checklists for a roommate household
- Route: `/household`
- Updated: 2026-10-29
- Files: `HouseholdView.tsx`, `HouseholdAgreement.tsx`, `MoveChecklists.tsx`, `household.data.ts`, `Household.css`
- Requirements source: SRS Feature 1 Household Planning Tools, Feature 5 Move-in and Move-out Checklists; SRS 8.1 conceptual data (Household, Household Rule, Household Task, Move Checklist, Checklist Item, Condition Record); prototype checklist item 2.18

## Purpose and requirements

Help roommates agree on how they will share a home and organize moving in and out.

- [x] Render at `/household`, linked from the Account sidebar (Household planning).
- [x] Show the members (Jordan Ellis and Avery Chen) and the home (Capitol Hill sublet, linked).
- [x] Switch between Household agreement and Move checklists without losing changes.
- [x] Agreement: list Expectations, Shared-space rules, Chores, and Responsibilities.
- [x] Agreement: add, edit, and remove items. Chores and responsibilities have an assignee and a When field.
- [x] Agreement: check off chores and responsibilities.
- [x] Agreement: Share with group shows `Shared with Avery Chen · {time}`.
- [x] Checklists: switch between Move-in (October 20, 2026) and Move-out (April 19, 2027), with a completed-items count.
- [x] Checklists: list Important dates, Tasks, and Key handoffs with assignee and due date.
- [x] Checklists: check off tasks and key handoffs and attach a document to each (file name shown).
- [x] Checklists: add condition photos per room (Bedroom, Kitchen, Bathroom, Living room); file names shown.
- [x] Checklists: enter Electricity (kWh), Water, and Reading date, and Save readings.
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Share the agreement with members, store files, and send reminders through backend services.
- [ ] Add your own checklist items.

## Usage

```tsx
<HouseholdView />
```

App selects the component for `/household`. The page title is `Household planning | Roommate Finder`.
HouseholdView owns agreement items, checklists, and the shared time, and passes them to HouseholdAgreement and MoveChecklists.
MoveChecklists owns the selected checklist, photo file names, and meter readings per checklist.

## Design and data

`household.data.ts` defines the members, the home, agreement categories, eight sample agreement items, the condition rooms, and the two sample checklists with their important dates, tasks, and key handoffs.
Both sections stay mounted and the inactive one is `hidden`, so changes survive switching. All state resets on refresh.
Agreement items are added with an empty description ignored. The item form shows Assigned to and When only for chores and responsibilities.
File inputs are visually hidden inside labeled buttons (Attach document, Add photos); nothing is uploaded.
Panels are surface cards. The checklist panels use two columns on wide screens and stack below 960px.

## Acceptance criteria

- [x] The Account sidebar link opens `/household` with four agreement sections and the add form.
- [x] Editing Clean the bathroom changes its text and assignee; removing a rule removes it; adding Water the plants as a chore lists it under Chores.
- [x] Checking Transfer renter's insurance changes the move-in count from 1 of 5 to 2 of 5.
- [x] An attached document and a kitchen photo show their file names; Save readings shows Readings saved.
- [x] Readings and checks remain after switching to Move-out and back, and after switching sections.
- [x] The page fits 320px and 390px without horizontal overflow.

## Limitations and open questions

The SRS has no use case for household planning, so agreement approval and member sign-off are not defined.
The sample dates assume the six-month Capitol Hill sublet starting October 20, 2026.
