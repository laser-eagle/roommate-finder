import test from 'node:test'
import assert from 'node:assert/strict'
import { canEditPersonalDetails, createChallenge, verifyChallenge } from './personalDetailsAuth.mock.ts'

test('personal details require a current edit authorization', () => {
  assert.equal(canEditPersonalDetails(0, 1000), false)
  assert.equal(canEditPersonalDetails(1001, 1000), true)
  assert.equal(canEditPersonalDetails(1000, 1000), false)
  assert.equal(canEditPersonalDetails(999, 1000), false)
})

test('wrong or incomplete codes never authorize editing', () => {
  const challenge = createChallenge(1000)
  for (const code of ['', '48263', '000000', '4826310']) {
    assert.equal(verifyChallenge(challenge, code, 1001), 'invalid')
  }
  assert.equal(verifyChallenge(challenge, '482631', 1001), 'verified')
})

test('an expired challenge rejects even the correct code', () => {
  const challenge = createChallenge(1000)
  assert.equal(verifyChallenge(challenge, '482631', challenge.expiresAt - 1), 'verified')
  assert.equal(verifyChallenge(challenge, '482631', challenge.expiresAt), 'expired')
})

test('three incorrect attempts require a new challenge', () => {
  const challenge = createChallenge(1000)
  assert.equal(verifyChallenge({ ...challenge, attempts: 2 }, '000000', 1001), 'locked')
  assert.equal(verifyChallenge({ ...challenge, attempts: 3 }, '482631', 1001), 'locked')
  assert.equal(verifyChallenge(createChallenge(2000), '482631', 2001), 'verified')
})
