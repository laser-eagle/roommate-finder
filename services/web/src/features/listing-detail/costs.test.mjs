import assert from 'node:assert/strict'
import { test } from 'node:test'
import { estimatedMonthlyTotal, formatLocalDate, formatMoney } from './costs.ts'
import { listingForPreview, sampleListing } from './listing.mock.ts'

test('monthly total includes confirmed zero fees and excludes the one-time deposit', () => {
  assert.equal(estimatedMonthlyTotal(sampleListing.costs), 126500)
  assert.equal(estimatedMonthlyTotal({ ...sampleListing.costs, deposit: 999999 }), 126500)
})

test('each unknown recurring cost prevents a complete monthly total', () => {
  for (const field of ['baseRent', 'requiredMonthlyFees', 'utilities']) {
    assert.equal(estimatedMonthlyTotal({ ...sampleListing.costs, [field]: null }), null)
  }
  assert.equal(estimatedMonthlyTotal({ ...sampleListing.costs, deposit: null }), 126500)
})

test('money distinguishes unknown, zero, and fractional dollars', () => {
  assert.equal(formatMoney(null), 'Unknown')
  assert.equal(formatMoney(0), '$0')
  assert.equal(formatMoney(126500), '$1,265')
  assert.equal(formatMoney(118025), '$1,180.25')
})

test('local availability date does not move with the browser timezone', () => {
  assert.equal(formatLocalDate('2026-10-15'), 'October 15, 2026')
  assert.equal(formatLocalDate('2026-01-01'), 'January 1, 2026')
})

test('uncertain costs and availability remove unsupported personalized claims', () => {
  assert.equal(listingForPreview('unknown-costs').match, null)
  assert.equal(listingForPreview('unavailable').match, null)
  const listing = listingForPreview('unconfirmed')
  assert.equal(listing.match, null)
  assert.equal(listing.availability.confirmed, false)
  assert.equal(listing.verification.status, 'expired')
})

test('preview fixtures do not mutate the original listing', () => {
  listingForPreview('unknown-costs')
  listingForPreview('unavailable')
  assert.equal(sampleListing.costs.requiredMonthlyFees, 0)
  assert.equal(sampleListing.status, 'active')
  assert.equal(listingForPreview('contact-blocked').contactAllowed, false)
})
