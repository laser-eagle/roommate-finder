# ApplicationFormView

## Metadata

- Status: `in-progress`
- Scope: renter's rental application form for one listing
- Route: `/listings/{id}/apply`
- Updated: 2026-10-28
- Files: `ApplicationFormView.tsx`, `Applications.css`
- Requirements source: SRS Feature 17 Reusable Rental Applications, UC-2.3 Submit Rental Application; prototype checklist item 2.13

## Purpose and requirements

Let a renter send an application to the listing they selected Apply on.

- [x] Render at `/listings/{id}/apply`, including a trailing slash.
- [x] Show the listing's title, location, and type.
- [x] Group fields by section: Personal information (Full name), Income (Monthly income), Rental history (Current address), References (Reference name), and Documents (one file upload).
- [x] Offer Apply jointly with my roommate group (Avery Chen).
- [x] Show Application submitted with status Submitted after Submit application, with links to My applications and back to the home.
- [x] Show the unavailable-listing message for an unknown listing ID.
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Save the application for reuse and load it on the next Apply (UC-2.3 step 1).
- [ ] Send the application and documents to the landlord.

## Usage

```tsx
<ApplicationFormView />
```

App selects the component for `/listings/{id}/apply`. It reads the listing ID from the second path segment.
InquiryCard links to this route with its Apply button. Apply is disabled when contact is blocked (paused listing or contact not allowed).

## Design and state

The form is uncontrolled and uses `noValidate`, so Submit always continues.
The file input accepts a selection but nothing is uploaded or stored.
Submitted applications are not added to My applications.

## Acceptance criteria

- [x] Apply on a listing page opens its application form.
- [x] Submit application shows Application submitted and links to `/applications`.
- [x] `/listings/unknown/apply` shows This home could not be found.

## Non-goals

These UC-2.3 flows are not part of this mockup: creating a first saved application (1a), showing an existing application for the same listing (1b), file type and size errors (3a), missing required items (6a), and landlord questions (step 4).

## Limitations and open questions

UC-2.3 leaves open whether application fees are collected in the app, whether joint applications belong in Phase 2, and how long documents are kept.

## Completion checklist

- [x] Application form mockup exists.
- [ ] Reusable saved application and backend submission exist.
