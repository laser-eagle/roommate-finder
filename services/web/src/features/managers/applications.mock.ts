import type { ApplicationStatus } from '../applications/applications.data'

export interface ApplicationFeedback { id: string; author: string; recommendation?: 'Approve' | 'Decline'; text: string }

export interface ManagerApplication {
  id: string
  name: string
  listingId: string
  submitted: string
  status: ApplicationStatus
  income: string
  address: string
  reference: string
  documents: string[]
  jointWith?: string
  feedback: ApplicationFeedback[]
}

export const openStatuses: ApplicationStatus[] = ['Submitted', 'Under Review', 'Info Requested']

export const initialApplications: ManagerApplication[] = [
  { id: 'mgr-app-1', name: 'Marisol Vega', listingId: 'greenwood-101', submitted: 'Oct 11, 2026', status: 'Submitted', income: '$5,200 / month', address: 'Capitol Hill, Seattle', reference: 'Lena Park', documents: ['Photo ID', 'Pay stub'], feedback: [] },
  { id: 'mgr-app-2', name: 'Jordan Ellis', listingId: 'ballard-room', submitted: 'Oct 2, 2026', status: 'Under Review', income: '$3,400 / month', address: 'Wallingford, Seattle', reference: 'Noah Kim', documents: ['Photo ID', 'Offer letter'], feedback: [
    { id: 'fb-1', author: 'Hannah Wu', recommendation: 'Approve', text: 'Income covers the rent and the reference confirms on-time payments.' },
  ] },
  { id: 'mgr-app-3', name: 'Ethan Park', listingId: 'fremont-302', submitted: 'Oct 8, 2026', status: 'Info Requested', income: '$6,100 / month', address: 'Queen Anne, Seattle', reference: 'Julia Grant', documents: ['Photo ID'], jointWith: 'Sofia Park', feedback: [
    { id: 'fb-2', author: 'Chris Morales', text: 'Waiting on proof of income for the second applicant.' },
  ] },
  { id: 'mgr-app-4', name: 'Grace Liu', listingId: 'greenwood-101', submitted: 'Sep 30, 2026', status: 'Approved', income: '$5,800 / month', address: 'Greenwood, Seattle', reference: 'Mark Ellison', documents: ['Photo ID', 'Pay stub'], feedback: [
    { id: 'fb-3', author: 'Omar Haddad', recommendation: 'Approve', text: 'All documents verified.' },
  ] },
  { id: 'mgr-app-5', name: 'Kofi Mensah', listingId: 'fremont-302', submitted: 'Sep 28, 2026', status: 'Declined', income: '$2,100 / month', address: 'Northgate, Seattle', reference: 'Ruth Adams', documents: ['Photo ID'], feedback: [
    { id: 'fb-4', author: 'Hannah Wu', recommendation: 'Decline', text: 'Income does not meet the listing requirement.' },
  ] },
  { id: 'mgr-app-6', name: 'Nina Rossi', listingId: 'ballard-room', submitted: 'Sep 26, 2026', status: 'Withdrawn', income: '$4,000 / month', address: 'Fremont, Seattle', reference: 'Alan Cho', documents: ['Photo ID', 'Pay stub'], feedback: [] },
]
