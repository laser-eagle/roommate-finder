import { householdMembers } from '../household/household.data'
import { lease as householdLease } from '../household/lease.data'

export type LeaseStatus = 'Waiting for signatures' | 'Signed' | 'Renewal offered'
export interface LeaseSigner { name: string; signed: string }
export interface RenewalOffer { sent: string; term: string; rent: number; responseDue: string }

export interface ManagerLease {
  id: string
  unit: string
  renters: string[]
  term: string
  rent: number
  deposit: number
  status: LeaseStatus
  signers: LeaseSigner[]
  signedCopy?: string
  copyName: string
  renewalDate: string
  renewalOffer?: RenewalOffer
}

export const leaseLandlord = 'Pine Street Homes'
export const needsAction = (lease: ManagerLease) => lease.status !== 'Signed'

export const initialLeases: ManagerLease[] = [
  {
    id: 'lease-greenwood-101', unit: 'Greenwood Flats · Unit 101', renters: ['Grace Liu'], term: 'November 1, 2026 – October 31, 2027',
    rent: 187500, deposit: 187500, status: 'Waiting for signatures',
    signers: [{ name: 'Grace Liu', signed: 'October 27, 2026' }, { name: leaseLandlord, signed: '' }],
    copyName: 'greenwood-flats-101-lease-signed.pdf', renewalDate: 'August 2, 2027',
  },
  {
    id: 'lease-wallingford', unit: 'Wallingford House · Garden room', renters: ['Theo Grant'], term: 'January 16, 2026 – January 15, 2027',
    rent: 105000, deposit: 105000, status: 'Renewal offered',
    signers: [{ name: 'Theo Grant', signed: 'January 8, 2026' }, { name: leaseLandlord, signed: 'January 9, 2026' }],
    signedCopy: 'wallingford-garden-room-lease-signed.pdf', copyName: 'wallingford-garden-room-lease-signed.pdf', renewalDate: 'October 17, 2026',
    renewalOffer: { sent: 'October 17, 2026', term: 'January 16, 2027 – January 15, 2028', rent: 105000, responseDue: 'November 16, 2026' },
  },
  {
    id: 'lease-capitol', unit: 'Capitol Hill · Room', renters: [...householdMembers], term: householdLease.term,
    rent: householdLease.rent, deposit: householdLease.deposit, status: 'Signed',
    signers: householdLease.signers.map((signer) => ({ ...signer })),
    signedCopy: householdLease.signedCopy, copyName: householdLease.signedCopy, renewalDate: householdLease.renewalOffer,
  },
]
