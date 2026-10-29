# AdminView

## Metadata

- Status: `in-progress`
- Scope: admin tools for reviewing reported content and appeals of moderation decisions
- Routes: `/admin/reports`, `/admin/appeals`; `/admin` shows Reports
- Updated: 2026-10-29
- Files: `AdminView.tsx`, `AdminReports.tsx`, `AdminAppeals.tsx`, `moderation.data.ts`, `AdminView.css`
- Requirements source: SRS Feature 33 Reporting and Moderation, UC-3.5 Report Content; SRS 8.1 conceptual data (Moderation Report, Moderation Action, Moderation Appeal); prototype checklist item 2.23

## Purpose and requirements

Give admins a review queue for reported content and a place to decide appeals.

- [x] Render the admin area with a sidebar (Reports, Appeals) and the count of open items on each link.
- [x] Reach it from the Account sidebar (Open admin tools) or by URL; unknown `/admin` paths show an admin-specific missing-page state.
- [x] Reports: list each report with number, date, content, content type, owner, reason, number of reports, and status.
- [x] Reports: show Hidden pending review for content with several reports (UC-3.5 extension 5a).
- [x] Reports: open a report in a dialog with reason, reporter, number of reports, and date.
- [x] Reports: Dismiss report on open reports sets Resolved: dismissed; dismissing hidden content says it is visible again.
- [x] Reports: resolved reports explain that no further action is needed.
- [x] Appeals: list each appeal with the report number, date, content, appellant, decision, and status.
- [x] Appeals: open an appeal with the decision, date, and the appellant's reason.
- [x] Appeals: Uphold decision or Reverse decision; reversing restores the content.
- [x] Use the workspace styles from `ManagerWorkspace.css` and the notice style from `ManagersView.css`.
- [ ] Reports: Remove content.
- [ ] Reports: Warn the content owner.
- [ ] Reports: Add admin notes to a report's history.
- [ ] Receive new reports from ReportDialog and appeals from the Account Moderation section, and notify the people involved.
- [ ] Restrict the admin area to admin accounts.
- [ ] Analytics (checklist item 2.24).

## Usage

```tsx
<AdminView />
```

App selects the component for the `/admin` prefix. Sidebar links use pushState and Back/Forward is supported. Page titles are `{Tool} | Admin tools`.
AdminView owns the report and appeal records and the notice. AdminReports receives `reports` and `onDismiss(id)`. AdminAppeals receives `appeals` and `onDecide(id, status)`.

## Design and data

`moderation.data.ts` exports the report and appeal types, `openReport`, `initialReports`, `initialAppeals`, and `jordanDecision` (used by the Account Moderation section).

| Report | Content | Reason | Status |
| --- | --- | --- | --- |
| RPT-2041 | Listing: A furnished room on Capitol Hill (Pine Street Homes), reported by Jordan Ellis | Misleading listing | Under review |
| RPT-2039 | Listing: Studio in Belltown, $650 a month (Dana Price), 3 reports | Scam | Hidden pending review |
| RPT-2036 | Message from Kyle Benson, reported by Morgan Lee | Harassment | Under review |
| RPT-2032 | Community post: Earn $500 a week (Quick Cash Rentals), reported by Riley Brooks | Spam | Resolved: content removed |

Appeals: Quick Cash Rentals for RPT-2032, and Jordan Ellis for RPT-2027 (community post Room swap for November?, removed as spam). Both start Under review.
Open items are Under review and Hidden pending review reports (3) and Under review appeals (2).
Tables reuse the workspace queue styles (`ops-panel`, `ops-table`, `ops-tag`, `ops-row-button`). Dialogs use PreviewDialog inside `ops-dialog-host`. After an action, focus moves to the dialog's close button.
Records persist while switching between Reports and Appeals and reset on refresh.

## Acceptance criteria

- [x] Open admin tools on the Account page opens `/admin/reports`, showing Reports 3 and Appeals 2.
- [x] Dismissing RPT-2039 shows Resolved: dismissed and The content is visible again; the Reports count becomes 2.
- [x] Reversing Jordan Ellis's appeal shows The content was restored; upholding Quick Cash Rentals' appeal shows The decision stands; the Appeals count becomes 0.
- [x] Changes remain after switching tools; Back returns to the previous tool.
- [x] `/admin` shows Reports; `/admin/nope` shows Admin page not found.
- [x] Both tools fit 320, 390, 760, 800, 960, and 1280px without horizontal overflow.

## Limitations and open questions

The admin pages do not share state with the listing report dialog or the Account Moderation section. The sample already includes Jordan's report and appeal.
The sidebar's Account settings and Renter site links are hidden below 960px, like the manager workspace.
UC-3.5 leaves open how many reports should hide content before review. TBD.
Who can be an admin, and how admin access is granted, is not defined in the SRS. TBD.
