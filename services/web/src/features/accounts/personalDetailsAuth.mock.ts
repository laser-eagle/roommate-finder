// Fixture adapter only. Production challenges and edit authorization must be server-owned.
export const verificationCode = '482631'
export const authWindowMs = 5 * 60 * 1000

export interface PersonalDetailsChallenge { expiresAt: number; attempts: number }
export type VerificationResult = 'verified' | 'invalid' | 'expired' | 'locked'

export function createChallenge(now = Date.now()): PersonalDetailsChallenge {
  return { expiresAt: now + authWindowMs, attempts: 0 }
}

export function verifyChallenge(challenge: PersonalDetailsChallenge, code: string, now = Date.now()): VerificationResult {
  if (now >= challenge.expiresAt) return 'expired'
  if (challenge.attempts >= 3) return 'locked'
  if (code === verificationCode) return 'verified'
  return challenge.attempts >= 2 ? 'locked' : 'invalid'
}

export function canEditPersonalDetails(expiresAt: number, now = Date.now()) {
  return expiresAt > now
}
