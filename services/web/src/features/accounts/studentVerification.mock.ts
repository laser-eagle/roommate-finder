// Fixture adapter only. Production student verification must use a server-owned email check or a verification service.
export const approvedSchools = [{ name: 'California State University, Long Beach', short: 'CSULB', domain: 'csulb.edu' }]
export const studentVerificationCode = '731905'
export const studentVerificationExpires = 'May 31, 2027'

export interface StudentVerification { school: string; expires: string }

export function isApprovedCampusEmail(email: string) {
  const domain = email.trim().toLowerCase().split('@')[1]
  return approvedSchools.some((school) => school.domain === domain)
}
