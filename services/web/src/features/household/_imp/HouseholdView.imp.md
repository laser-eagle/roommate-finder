# HouseholdView

## Metadata

- Status: `in-progress`
- Scope: household agreement, move-in/move-out checklists, shared expenses, rent payments, lease details, and resident maintenance requests for a roommate household
- Route: `/household`
- Updated: 2026-10-29
- Files: `HouseholdView.tsx`, `HouseholdAgreement.tsx`, `MoveChecklists.tsx`, `SharedExpenses.tsx`, `RentPayments.tsx`, `Lease.tsx`, `Maintenance.tsx`, `household.data.ts`, `money.data.ts`, `lease.data.ts`, `maintenance.data.ts`, `Household.css`
- Requirements source: SRS Features 1 Household Planning Tools, 5 Move-in and Move-out Checklists, 20 Shared Expense Tracking, 21 Resident Service Portal, 44 Lease and Renewal Workflows, and 46 Rent Collection and Payment Records; UC-2.6 Resolve Maintenance Request; UC-4.7 Sign or Renew Lease; SRS 8.1 conceptual data (Household, Household Rule, Household Task, Move Checklist, Checklist Item, Condition Record, Shared Expense, Expense Share, Payment Record, Charge, Receipt); prototype checklist items 2.18, 2.19, 2.20, and 2.22

## Purpose and requirements

Help roommates agree on how they will share a home and organize moving in and out.

- [x] Render at `/household`, linked from the Account sidebar (Household planning).
- [x] Show the members (Jordan Ellis and Avery Chen) and the home (Capitol Hill sublet, linked).
- [x] Switch between Household agreement, Move checklists, Shared expenses, Rent payments, Lease, and Maintenance without losing changes.
- [x] Agreement: list Expectations, Shared-space rules, Chores, and Responsibilities.
- [x] Agreement: add, edit, and remove items. Chores and responsibilities have an assignee and a When field.
- [x] Agreement: check off chores and responsibilities.
- [x] Agreement: Share with group shows `Shared with Avery Chen · {time}`.
- [x] Checklists: switch between Move-in (October 20, 2026) and Move-out (April 19, 2027), with a completed-items count.
- [x] Checklists: list Important dates, Tasks, and Key handoffs with assignee and due date.
- [x] Checklists: check off tasks and key handoffs and attach a document to each (file name shown).
- [x] Checklists: add condition photos per room (Bedroom, Kitchen, Bathroom, Living room); file names shown.
- [x] Checklists: enter Electricity (kWh), Water, and Reading date, and Save readings.
- [x] Expenses: list expenses with who paid, the amount, and each member's equal share.
- [x] Expenses: show the balance (who owes whom) and each member's net amount, or All settled up.
- [x] Expenses: add an expense (name, amount, paid by) split equally, and record a payment between members; balances update.
- [x] Expenses: Send reminder to the member who owes shows `Reminder sent to {name}.`
- [x] Rent: show the lease summary (home, Pine Street Homes, October 20, 2026 – April 19, 2027) and the balance due.
- [x] Rent: list charges with due date and status (Paid in full, Partially paid with remaining amount, or amount due).
- [x] Rent: pay a charge in full or partially from a Pay dialog (payer and amount, defaulting to the remaining amount; amounts above the remaining balance are capped).
- [x] Rent: Remind me 3 days before on each unpaid charge.
- [x] Rent: list receipts and open a receipt dialog (charge, amount, payer, recipient, date).
- [x] Lease: show the home, landlord, term, rent ($2,500 per month), deposit ($1,000), who the lease covers, and the status (Signed).
- [x] Lease: list each signer (Jordan Ellis, Avery Chen, Pine Street Homes) with the date signed, and the signed copy's file name and the parties it is shared with (UC-4.7 step 7).
- [x] Lease: say when the renewal offer will be sent (January 19, 2027, 90 days before the lease ends).
- [x] Lease: list key dates (lease start, renewal offer, renewal response due, lease end). Past dates show Passed; future dates have Remind me 3 days before (UC-4.7 step 8).
- [x] Maintenance: show building announcements from Pine Street Homes.
- [x] Maintenance: submit a request with category (Plumbing, Electrical, Appliance, Heating and cooling, Other), description, photos (file names), urgency (Low, Medium, High), and entry permission. New requests get the next number and status Open.
- [x] Maintenance: list requests with number, category, status, details, assigned staff, scheduled repair date, and updates.
- [x] Maintenance: on a Resolved request, Confirm fix closes it and Not fixed reopens it (UC-2.6 steps 10–11 and extension 11a).
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Lease: accept, decline, or propose changes to a renewal offer (UC-4.7 extension 1a), once the offer is sent.
- [ ] Lease: sign through an e-signature service, download the signed copy, and send date reminders through backend services.
- [ ] Send maintenance requests to the manager workspace and notify residents of updates.
- [ ] Collect rent through a payment provider, record reimbursements, and send reminders through backend services.
- [ ] Share the agreement with members, store files, and send reminders through backend services.
- [ ] Add your own checklist items.

## Usage

```tsx
<HouseholdView />
```

App selects the component for `/household`. The page title is `Household planning | Roommate Finder`.
HouseholdView owns agreement items, checklists, and the shared time, and passes them to HouseholdAgreement and MoveChecklists.
MoveChecklists owns the selected checklist, photo file names, and meter readings per checklist.
SharedExpenses owns expenses and recorded payments. RentPayments owns charges and rent payments. Lease owns the key-date reminder choices. Maintenance owns requests and the selected photo names.

## Design and data

`household.data.ts` defines the members, the home, agreement categories, eight sample agreement items, the condition rooms, and the two sample checklists with their important dates, tasks, and key handoffs.
`money.data.ts` defines sample expenses (rent $2,500 paid by Jordan; utilities $150, internet $60, and shared groceries $120 paid by Avery), one recorded payment of $500 from Avery to Jordan, the lease summary, three rent charges (October prorated $968 paid; November $2,500 partially paid $1,250; December $2,500 due), two receipts, and the `balances` calculation.
Amounts are stored in cents. Rent is the household's two rooms at the listing's $1,250 each.
`lease.data.ts` defines the Capitol Hill lease, reusing the home, landlord, and term from `money.data.ts`. It covers both roommates together (UC-4.7 sub-variation 1). The deposit is $500 per roommate. Signatures are dated October 14–16, 2026, and the signed copy is capitol-hill-lease-signed.pdf. Key dates start with reminders off.
`maintenance.data.ts` defines the categories, urgency levels, one announcement (water shutoff on November 3, 2026), and two requests: #1042 Plumbing (In Progress, Omar Haddad, scheduled October 31, 2026) and #1038 Electrical (Resolved, awaiting confirmation).
The request form uses `noValidate`; an empty description is accepted and shown as No description provided.
All sections stay mounted and inactive ones are `hidden`, so changes survive switching. All state resets on refresh.
Agreement items are added with an empty description ignored. The item form shows Assigned to and When only for chores and responsibilities.
File inputs are visually hidden inside labeled buttons (Attach document, Add photos); nothing is uploaded.
Panels are surface cards. The checklist panels use two columns on wide screens and stack below 960px.

## Acceptance criteria

- [x] The Account sidebar link opens `/household` with four agreement sections and the add form.
- [x] Editing Clean the bathroom changes its text and assignee; removing a rule removes it; adding Water the plants as a chore lists it under Chores.
- [x] Checking Transfer renter's insurance changes the move-in count from 1 of 5 to 2 of 5.
- [x] An attached document and a kitchen photo show their file names; Save readings shows Readings saved.
- [x] Readings and checks remain after switching to Move-out and back, and after switching sections.
- [x] Shared expenses start with Avery Chen owes Jordan Ellis $585; adding a $40 expense paid by Jordan makes it $605; recording a $605 payment shows All settled up and removes Send reminder.
- [x] Rent starts with a $3,750 balance; paying $500 toward November leaves $750 remaining; paying more than the remaining amount marks it Paid in full.
- [x] Receipt R-1002 shows November rent, $1,250, Avery Chen, Pine Street Homes, and October 28, 2026.
- [x] Submitting an Appliance request adds #1043 as Open with its urgency, entry permission, and photo name.
- [x] Not fixed on #1038 reopens it as Open; Confirm fix closes it and adds an update.
- [x] The Lease tab shows Signed, three signers, the January 19, 2027 renewal date, and four key dates with Lease start marked Passed.
- [x] A key-date reminder stays checked after switching tabs.
- [x] All six tabs fit 320px, 390px, and 1280px without horizontal overflow.

## Limitations and open questions

The SRS has no use case for household planning, so agreement approval and member sign-off are not defined.
The sample dates assume the six-month Capitol Hill sublet starting October 20, 2026.
Expenses are always split equally. UC-2.6 emergency handling (4a), the empty-description prompt (5a), comments, and cancelling are not part of this mockup. The rent tab shows a lease summary; the Lease tab has the full lease.
The SRS does not give a renewal response window. The 30-day response date (February 18, 2027) is a proposal for this mockup. TBD.
UC-4.7 open issues remain: which e-signature provider to use, and whether lease templates are provided and who is responsible for their content.
