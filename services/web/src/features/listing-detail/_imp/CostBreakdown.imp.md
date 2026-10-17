# CostBreakdown

## Metadata

- Status: `complete`
- Scope: shared mock presentation rule
- Updated: 2026-09-27
- Files: `costs.ts`, `costs.test.mjs`, `listing.types.ts`

## Purpose

Calculate a monthly total without mixing recurring charges and the one-time deposit.
Both price panels consume this rule.

## Requirements and behavior

- [x] Store and add amounts in integer cents.
- [x] Include base rent, required monthly fees, and estimated utilities.
- [x] Exclude the deposit from the monthly sum.
- [x] Return `null` when any recurring input is unknown.
- [x] Preserve the distinction between zero and unknown.
- [x] Preserve cents in formatted fractional amounts.
- [x] Format local date strings without a timezone date shift.

## Usage

```ts
const total = estimatedMonthlyTotal(listing.costs)
const label = formatMoney(total, listing.costs.currency)
const date = formatLocalDate(listing.availability.localDate)
```

`estimatedMonthlyTotal` accepts `ListingCosts` and returns integer cents or `null`.
`formatMoney` returns `Unknown` for `null` and uses the `en-US` locale.
`formatLocalDate` accepts a valid ISO calendar date and formats it in UTC.

## Assumptions and limitations

The fixture provides nonnegative, finite integer amounts and valid ISO dates.
The presentation model supports USD and a single utilities estimate.
Production input validation, currency negotiation, and estimate ranges remain outside this rule.

## Testing and acceptance

- [x] Regression tests pass for missing inputs, zero fees, deposit exclusion, cents, dates, and fixture isolation.
- [x] The sample monthly total is 126500 cents.
- [x] Changing the deposit cannot change that monthly total.

## Decisions

Integer cents avoid floating-point addition errors for ordinary currency amounts.
Unknown inputs prevent a complete total instead of producing a misleading partial amount.

## Completion checklist

- [x] Current presentation rule is implemented.
- [x] Automated behavior checks pass.
