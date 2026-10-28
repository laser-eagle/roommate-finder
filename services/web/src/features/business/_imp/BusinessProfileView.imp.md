# BusinessProfileView

## Metadata

- Status: `in-progress`
- Scope: public business profile that renters see
- Route: `/business/{id}` (sample: `/business/pine-street-homes`)
- Updated: 2026-10-28
- Files: `BusinessProfileView.tsx`, `BusinessProfileView.css`, `business.data.ts`
- Requirements source: SRS Feature 3 Professional Business Profiles, UC-1.5 Manage Business Profile; prototype checklist item 2.5

## Purpose and requirements

Show renters who manages a property: the management company, its contact details, its properties, and its staff.

- [x] Render at `/business/{id}`, including a trailing slash.
- [x] Show the management company name with an initials badge.
- [x] Show one Verified business badge when the business is verified.
- [x] Show contact details: phone, email, and office address.
- [x] Show the property portfolio as property names with neighborhoods.
- [x] Show linked staff members by name.
- [x] Show a Business unavailable state for an unknown or missing ID, with a link back to Homes.
- [x] Link to the profile from listing pages that a business manages (InquiryCard: Managed by).
- [x] Link to the profile from the manager workspace sidebar (Business profile).
- [x] Use the shared tokens and button classes from `index.css`.
- [ ] Load business profiles, portfolios, staff, and verification status from backend services.
- [ ] Future change: reach the profile from the manager workspace on narrow screens (see ManagerWorkspace.imp.md).
- [ ] Future change: review the message button wording on managed sublets (see InquiryCard.imp.md).

## Usage

```tsx
<BusinessProfileView />
```

App selects the component for the `/business` prefix. The component reads the ID from the second path segment and looks it up with `findBusiness`.
The page title is `{business name} | Roommate Finder`, or `Business unavailable | Roommate Finder`.

## Design and data

`business.data.ts` exports the `BusinessProfile` type, the fictional `businesses` list, and `findBusiness(id)`.
The sample business, Pine Street Homes, uses the four properties from the manager workspace fixtures: Greenwood Flats, Market Street, Fremont Court, and Wallingford House.
Contact details and staff names are fictional placeholders.
Listings link to a business through the optional `businessId` field on `Listing`. Only the Capitol Hill sublet sets it.
The page uses a heading row and three surface panels (Contact, Properties, Staff). The panels stack below 960px.

## Acceptance criteria

- [x] `/business/pine-street-homes` shows the name, Verified business, contact details, four properties, and three staff names.
- [x] `/business/unknown` and `/business` show the Business unavailable state.
- [x] The Capitol Hill sublet listing shows Managed by Pine Street Homes, which opens the profile.
- [x] The manager workspace sidebar's Business profile link opens the profile.

## Non-goals

The UC-1.5 edit form, logo upload, description, license number, and years in operation are not part of this mockup.

## Limitations and open questions

The Capitol Hill sublet is not one of the four portfolio properties.
The SRS leaves open which business details can be verified before Phase 4, so the profile shows one badge for the whole business.
The business's listings are not shown on the profile.

## Completion checklist

- [x] Public business profile mockup exists.
- [ ] Backend business data exists.
