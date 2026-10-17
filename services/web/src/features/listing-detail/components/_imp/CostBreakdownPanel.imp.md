# CostBreakdownPanel

## Metadata

- Status: `in-progress`
- Updated: 2026-09-27
- File: `CostBreakdownPanel.tsx`
- Dependency: `../costs.ts`

## Purpose

Expose recurring amounts and a separate one-time deposit before the renter makes contact.

## Usage

```tsx
<CostBreakdownPanel costs={listing.costs} />
```

`costs` uses integer cents, explicit `null` values, and the USD currency code.

## Requirements and behavior

- [x] Display rent, required fees, utilities, the monthly total, and the deposit.
- [x] Preserve the estimated label on utilities and the monthly total.
- [x] Display `Unknown` for absent amounts.
- [x] Display `Incomplete` when any monthly input is unknown.
- [x] Explain that the deposit is a one-time amount.
- [x] Keep each amount associated with its label during wrapping.
- [ ] Consume the final inventory cost contract.

The shared CostBreakdown rule calculates the same total for this panel and InquiryCard.
The panel uses a description list with separated total and deposit rows.

## Testing and acceptance

- [x] The sample shows $1,180 + $0 + $85 = $1,265.
- [x] The $400 deposit never contributes to the monthly total.
- [x] Unknown fees appear as `Unknown`, with an incomplete total.
- [x] Labels and amounts remain readable at 320px.

## Limitations and open questions

The fixture uses one utilities estimate. Ranges, fee itemization, and deposit conditions remain TBD.

## Completion checklist

- [x] All mock cost rows and unknown states exist.
- [x] Browser acceptance checks pass.
- [ ] Final production cost contract is integrated.
