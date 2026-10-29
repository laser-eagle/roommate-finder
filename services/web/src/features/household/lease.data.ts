import { householdMembers } from './household.data'
import { rentLease } from './money.data'

export interface LeaseSigner { name: string; signed: string }
export interface LeaseDate { id: string; label: string; date: string; past: boolean; remind: boolean }

export const lease = {
  ...rentLease,
  rent: 250000,
  deposit: 100000,
  covers: `All roommates together (${householdMembers.join(' and ')})`,
  signers: [
    { name: 'Jordan Ellis', signed: 'October 14, 2026' },
    { name: 'Avery Chen', signed: 'October 15, 2026' },
    { name: 'Pine Street Homes', signed: 'October 16, 2026' },
  ] as LeaseSigner[],
  signedCopy: 'capitol-hill-lease-signed.pdf',
  renewalOffer: 'January 19, 2027',
}

export const initialLeaseDates: LeaseDate[] = [
  { id: 'lease-start', label: 'Lease start', date: 'October 20, 2026', past: true, remind: false },
  { id: 'renewal-offer', label: 'Renewal offer', date: 'January 19, 2027', past: false, remind: false },
  { id: 'renewal-response', label: 'Renewal response due', date: 'February 18, 2027', past: false, remind: false },
  { id: 'lease-end', label: 'Lease end', date: 'April 19, 2027', past: false, remind: false },
]
