# InquiryCard

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `InquiryCard.tsx`

## Purpose

Give the renter a clear price, availability summary, lease summary, and contact path.
This unit includes the rent, monthly estimate, tour button, message button, and verification line.

## Usage

```tsx
<InquiryCard listing={listing} onContact={setContact} />
```

`onContact` receives `tour` or `message`. The parent owns the contact dialog.

## Requirements and behavior

- [x] Display base rent separately from the estimated monthly total.
- [x] Calculate the estimate through the shared CostBreakdown rule.
- [x] Format the fixture date as a local calendar date.
- [x] Replace an unconfirmed availability date with an explicit status.
- [x] Disable both contact actions for paused listings or denied contact permission.
- [x] Show the reason next to disabled controls.
- [x] Replace the verification claim when authorization is expired.
- [ ] Derive permissions and verification freshness from production services.
- [ ] Create real tour requests and authorized conversations.

## Design

The panel aligns with the photo on desktop and follows it on mobile.
The tour button uses the primary color. The message button uses an outline.
The component emits actions only. It does not submit forms or infer permissions.
The fixture marks its authorization record as current or expired.

## Testing and acceptance

- [x] The sample shows $1,180 and an estimated $1,265 monthly total.
- [x] A paused or blocked fixture disables both actions and explains why.
- [x] Unconfirmed availability displays no old date as current.
- [x] Expired authorization displays no verified claim.
- [x] Both enabled actions open their corresponding local preview.

## Limitations and open questions

Authorization expiry rules and service timestamps remain TBD.
The unknown-total copy indicates that at least one recurring cost is missing.
Tour types and appointment slots are absent, so the mockup makes no slot-availability claim.

## Completion checklist

- [x] Card presentation and fixture permissions exist.
- [x] Browser acceptance checks pass.
- [ ] Production permissions and contact flows exist.
