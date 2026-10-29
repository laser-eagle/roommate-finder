import { announcements, initialRequests } from '../household/maintenance.data'
import type { MaintenanceRequest } from '../household/maintenance.data'

export interface ManagerRequest extends MaintenanceRequest { unit: string; resident: string }

export const maintenanceStaff = ['Chris Morales', 'Hannah Wu', 'Omar Haddad']
export const managerAnnouncements = announcements.map((item) => ({ ...item, property: 'Capitol Hill' }))

const portfolioRequests: ManagerRequest[] = [
  {
    id: 'mreq-1045', number: 1045, unit: 'Fremont Court · Unit 302', resident: 'Leah Morris', category: 'Heating and cooling', description: 'The heater makes a loud clicking noise when it turns on.',
    urgency: 'High', entryAllowed: true, photos: [], status: 'Open', submitted: 'Oct 28, 2026',
    updates: [{ id: 'mu1', date: 'Oct 28, 2026', author: 'Leah Morris', text: 'Request submitted.' }],
  },
  {
    id: 'mreq-1040', number: 1040, unit: 'Wallingford House · Garden room', resident: 'Theo Grant', category: 'Appliance', description: 'The refrigerator is not keeping food cold.',
    urgency: 'Medium', entryAllowed: false, photos: ['fridge.jpg'], status: 'In Progress', submitted: 'Oct 23, 2026', assignedTo: 'Chris Morales', scheduled: 'October 30, 2026',
    updates: [
      { id: 'mu2', date: 'Oct 23, 2026', author: 'Theo Grant', text: 'Request submitted.' },
      { id: 'mu3', date: 'Oct 24, 2026', author: 'Pine Street Homes', text: 'Assigned to Chris Morales. Repair scheduled for October 30.' },
    ],
  },
  {
    id: 'mreq-1035', number: 1035, unit: 'Fremont Court · Unit 204', resident: 'Ivy Nguyen', category: 'Plumbing', description: 'The shower drain is slow.',
    urgency: 'Low', entryAllowed: true, photos: [], status: 'Resolved', submitted: 'Oct 12, 2026', assignedTo: 'Omar Haddad', scheduled: 'October 15, 2026',
    updates: [
      { id: 'mu4', date: 'Oct 12, 2026', author: 'Ivy Nguyen', text: 'Request submitted.' },
      { id: 'mu5', date: 'Oct 13, 2026', author: 'Pine Street Homes', text: 'Assigned to Omar Haddad. Repair scheduled for October 15.' },
      { id: 'mu6', date: 'Oct 15, 2026', author: 'Omar Haddad', text: 'Cleared the drain. Marked resolved.' },
    ],
  },
]

const residentRequests: ManagerRequest[] = initialRequests.map((request) => ({
  ...request, id: `m${request.id}`, unit: 'Capitol Hill · Room', resident: 'Jordan Ellis',
  updates: request.updates.map((update) => ({ ...update, author: update.author === 'You' ? 'Jordan Ellis' : update.author })),
}))

export const initialManagerRequests: ManagerRequest[] = [...portfolioRequests, ...residentRequests].sort((a, b) => b.number - a.number)
