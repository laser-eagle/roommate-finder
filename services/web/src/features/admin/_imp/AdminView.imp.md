# AdminView

## Metadata

- Status: `in-progress`
- Scope: admin tools for reviewing reported content, appeals of moderation decisions, and platform analytics
- Routes: `/admin/reports`, `/admin/appeals`, `/admin/analytics`; `/admin` shows Reports
- Updated: 2026-10-29
- Files: `AdminView.tsx`, `AdminReports.tsx`, `AdminAppeals.tsx`, `AdminAnalytics.tsx`, `moderation.data.ts`, `analytics.data.ts`, `AdminView.css`
- Requirements source: SRS Feature 27 Analytics and Administrative Tools; SRS Feature 33 Reporting and Moderation, UC-3.5 Report Content; SRS 8.1 conceptual data (Moderation Report, Moderation Action, Moderation Appeal, Analytics Event); prototype checklist items 2.23 and 2.24

## Purpose and requirements

Give admins a review queue for reported content, a place to decide appeals, and platform analytics.

- [x] Render the admin area with a sidebar (Reports, Appeals, Analytics) and the count of open items on the Reports and Appeals links.
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
- [x] Analytics: show a fixed range (Last 30 days · Sep 30 – Oct 29, 2026) and five summary tiles: listing views, median first reply, successful matches, search failure rate, and notification delivery rate.
- [x] Analytics: listing performance table (views, saves, inquiries, applications) for the top five listings by views.
- [x] Analytics: response times by lister type (median first reply and share replied within 24 hours).
- [x] Analytics: successful matches by type (roommate connections accepted, applications approved, leases signed).
- [x] Analytics: automated-search runs and failures with recent failures (saved search, time, cause, outcome).
- [x] Analytics: notification delivery by channel (in-app, email, web push, SMS) with sent, failed, and delivered rate.
- [ ] Analytics: choose a time range, filter by property or region, and export.
- [ ] Analytics: calculate figures from recorded analytics events (SRS 8.1 Analytics Event).

## Usage

```tsx
<AdminView />
```

App selects the component for the `/admin` prefix. Sidebar links use pushState and Back/Forward is supported. Page titles are `{Tool} | Admin tools`.
AdminView owns the report and appeal records and the notice. AdminReports receives `reports` and `onDismiss(id)`. AdminAppeals receives `appeals` and `onDecide(id, status)`. AdminAnalytics takes no props and reads `analytics.data.ts`.

## Design and data

`moderation.data.ts` exports the report and appeal types, `openReport`, `initialReports`, `initialAppeals`, and `jordanDecision` (used by the Account Moderation section).

| Report | Content | Reason | Status |
| --- | --- | --- | --- |
| RPT-2041 | Listing: A furnished room on Capitol Hill (Pine Street Homes), reported by Jordan Ellis | Misleading listing | Under review |
| RPT-2039 | Listing: Studio in Belltown, $650 a month (Dana Price), 3 reports | Scam | Hidden pending review |
| RPT-2036 | Message from Kyle Benson, reported by Morgan Lee | Harassment | Under review |
| RPT-2032 | Community post: Earn $500 a week (Quick Cash Rentals), reported by Riley Brooks | Spam | Resolved: content removed |

Appeals: Quick Cash Rentals for RPT-2032, and Jordan Ellis for RPT-2027 (community post Room swap for November?, removed as spam). Both start Under review.
Open items are Under review and Hidden pending review reports (3) and Under review appeals (2). Analytics has no count.

`analytics.data.ts` holds sample figures only. Totals, the search failure rate, and delivery rates are calculated from the raw counts.

| Area | Sample figures |
| --- | --- |
| Listing views | 4,820 for all listings. Top five: A quiet room to make your own. 1,240 views, 96 saves, 18 inquiries, 4 applications; A furnished room on Capitol Hill. 980, 74, 12, 3; A studio near Green Lake. 860, 61, 9, 2; Greenwood one-bedroom 640, 38, 7, 2; Fremont two-bedroom 520, 29, 6, 1 |
| Response times | Overall median 3.4 h, 82% within 24 h. Property managers 2.6 h, 89%; roommate households 3.9 h, 80%; individual landlords 5.1 h, 71% |
| Successful matches | 21 roommate connections accepted, 11 applications approved, 5 leases signed (37 total) |
| Automated searches | 2,160 runs, 39 failures (1.8%). Recent failures match the saved-search sample: Apartments under $1,800 and Private rooms in Ballard on Oct 25, 2026, 8:00 AM, both Listing search timed out, Retried |
| Notifications | In-app 6,400 sent, 6,400 delivered; email 3,100, 3,010; web push 1,450, 1,320; SMS 420, 409 (98.0% overall) |

The summary tiles use five columns on wide screens, three below 1200px, two below 760px, and one at 400px and below. Analytics panels use two columns on wide screens and stack below 1200px. Tables become labeled cards below 760px.
Tables reuse the workspace queue styles (`ops-panel`, `ops-table`, `ops-tag`, `ops-row-button`). Dialogs use PreviewDialog inside `ops-dialog-host`. After an action, focus moves to the dialog's close button.
Records persist while switching between Reports and Appeals and reset on refresh.

## Acceptance criteria

- [x] Open admin tools on the Account page opens `/admin/reports`, showing Reports 3 and Appeals 2.
- [x] Dismissing RPT-2039 shows Resolved: dismissed and The content is visible again; the Reports count becomes 2.
- [x] Reversing Jordan Ellis's appeal shows The content was restored; upholding Quick Cash Rentals' appeal shows The decision stands; the Appeals count becomes 0.
- [x] Changes remain after switching tools; Back returns to the previous tool.
- [x] `/admin` shows Reports; `/admin/nope` shows Admin page not found.
- [x] Both tools fit 320, 390, 760, 800, 960, and 1280px without horizontal overflow.
- [x] `/admin/analytics` shows the five tiles (4,820; 3.4 h; 37; 1.8%; 98.0%) and five panels, and fits 320, 390, 600, 760, 800, 960, 1100, and 1280px without horizontal overflow.

## Limitations and open questions

The admin pages do not share state with the listing report dialog or the Account Moderation section. The sample already includes Jordan's report and appeal.
The sidebar's Account settings and Renter site links are hidden below 960px, like the manager workspace.
UC-3.5 leaves open how many reports should hide content before review. TBD.
Who can be an admin, and how admin access is granted, is not defined in the SRS. TBD.
All analytics figures are sample values and do not change with activity elsewhere in the mockup. The SRS does not define how response time or a successful match is measured. TBD.
