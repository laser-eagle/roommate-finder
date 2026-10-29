# ReportDialog

## Metadata

- Status: `in-progress`
- Scope: shared dialog for reporting content and showing the report confirmation
- Updated: 2026-10-29
- Files: `ReportDialog.tsx`, `ReportDialog.css`, `reports.data.ts`
- Requirements source: SRS Feature 33 Reporting and Moderation, UC-3.5 Report Content; prototype checklist item 2.23

## Purpose and requirements

Let a user report a scam, misleading listing, harassment, or spam so an admin can review it.

- [x] Show the reported content's name and a reason choice: Scam, Misleading listing, Harassment, or Spam (UC-3.5 steps 1–2).
- [x] Accept optional details and screenshots; screenshot file names are shown and nothing is uploaded (step 3).
- [x] Require a reason; Submit report without one shows Choose a reason for your report.
- [x] Confirm with Report received, the report number, the reason, and Status: Under review (step 6 and sub-variation 1).
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Save the report, link it to the content, and add it to the admin review queue (step 5). The queue exists at `/admin/reports` with sample reports, but this dialog does not add to it.
- [ ] When the reason is Harassment, offer to block the other user and show safety resources (extension 2a). The safety resource content is TBD.
- [ ] Hide content that gets many reports in a short time until an admin reviews it (extension 5a).
- [ ] Let users check the status of their reports after the dialog closes.
- [ ] Open from profiles, posts, messages, groups, and the existing reference Report button.

## Usage

```tsx
<ReportDialog title="Report listing" subject={listing.title} number="RPT-2041" onSubmit={(report) => setReported(report.number)} onClose={close} />
```

`subject` names the reported content. `number` is the report number shown on confirmation.
`onSubmit(report)` receives `{ number, reason }` when the form is valid. The dialog then shows the confirmation; Done calls `onClose`.

## Design and data

`reports.data.ts` exports `reportReasons`, the `ReportReason` type, and the `SubmittedReport` type, so other screens can reuse the reason list.
The dialog uses PreviewDialog. The form uses `noValidate`. Reasons are a radio group with 44px rows. The confirmation uses a label/value list like the household date lists.
The details text is not kept after submit.

## Acceptance criteria

- [x] Submit report with no reason shows an error; choosing a reason clears it.
- [x] Choosing Misleading listing, adding details and a screenshot, and submitting shows RPT-2041, Misleading listing, and Under review.
- [x] The dialog fits 320px without horizontal overflow.

## Limitations and open questions

UC-3.5 leaves open how many reports should hide content before review. TBD.
Report numbers are fixed per screen in this mockup.
