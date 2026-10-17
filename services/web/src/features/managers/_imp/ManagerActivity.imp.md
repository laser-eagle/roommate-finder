# ManagerActivity

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- Files: `ManagerActivity.tsx`, related styles in `ManagersView.css`

## Purpose

Show renter follow-ups, tour requests, and guidance for complete listings.
This unit includes ManagerInbox, ManagerTours, and ListingReadiness.

## Usage

```tsx
<ManagerInbox inquiries={inquiries} listings={listings} onOpen={openInquiry} />
<ManagerTours tours={tours} listings={listings} onOpen={openTour} />
<ListingReadiness />
```

The parent supplies records and handles selected inquiries or tours.
Related home names resolve through stable listing IDs.

## Requirements and behavior

- [x] Show fictional renter names, listing context, and message excerpts.
- [x] Distinguish Awaiting reply from Replied using local reply state.
- [x] Show tour dates, Pacific times, modes, and confirmation state.
- [x] Show the fixed tour week and confirmation status without sample-data qualifiers.
- [x] Provide keyboard-operable controls with person-specific labels.
- [x] Present publication guidance as advice, not completed verification checks.
- [ ] Respect production message consent, blocking, and team access.
- [ ] Read current appointments and timezone-aware availability from services.

## Design

Inbox rows are buttons that open a conversation preview.
Tour cards open detail dialogs. They do not open calendars or send invitations.
The readiness panel describes full costs, availability, photos, and authorization.
Its heading is Required listing details. The list names the fields required before publication.
It has no inferred completion percentage or verified badge.

## Testing and acceptance

- [x] Saving a local reply reduces the unanswered count.
- [x] Confirming a sample tour removes its pending state.
- [x] Mobile presentation preserves full detail through the dialogs.
- [ ] Production contact and appointment rules are complete.

## Limitations

The fixture uses one timezone and a fixed sample week.
No real personal information, conversation, or appointment appears here.

## Completion checklist

- [x] Activity previews exist.
- [x] Mobile review passes.
- [ ] Production service integration is complete.
