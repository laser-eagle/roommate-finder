export type RequestStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed'
export const requestCategories = ['Plumbing', 'Electrical', 'Appliance', 'Heating and cooling', 'Other']
export const urgencyLevels = ['Low', 'Medium', 'High']

export interface MaintenanceRequest {
  id: string; number: number; category: string; description: string; urgency: string; entryAllowed: boolean; photos: string[]
  status: RequestStatus; submitted: string; assignedTo?: string; scheduled?: string
  updates: { id: string; date: string; author: string; text: string }[]
}

export const announcements = [
  { id: 'ann-1', title: 'Water shutoff', date: 'November 3, 2026 · 9:00 AM – 12:00 PM', from: 'Pine Street Homes', text: 'Water will be off in the building while pipes are serviced. Please store water ahead of time.' },
]

export const initialRequests: MaintenanceRequest[] = [
  {
    id: 'req-1042', number: 1042, category: 'Plumbing', description: 'The kitchen faucet is leaking under the sink.', urgency: 'Medium', entryAllowed: true, photos: ['faucet-leak.jpg'],
    status: 'In Progress', submitted: 'Oct 26, 2026', assignedTo: 'Omar Haddad', scheduled: 'October 31, 2026',
    updates: [
      { id: 'u1', date: 'Oct 26, 2026', author: 'You', text: 'Request submitted.' },
      { id: 'u2', date: 'Oct 27, 2026', author: 'Pine Street Homes', text: 'Assigned to Omar Haddad. Repair scheduled for October 31.' },
    ],
  },
  {
    id: 'req-1038', number: 1038, category: 'Electrical', description: 'The bathroom exhaust fan does not turn on.', urgency: 'Low', entryAllowed: true, photos: [],
    status: 'Resolved', submitted: 'Oct 21, 2026', assignedTo: 'Omar Haddad', scheduled: 'October 24, 2026',
    updates: [
      { id: 'u3', date: 'Oct 21, 2026', author: 'You', text: 'Request submitted.' },
      { id: 'u4', date: 'Oct 22, 2026', author: 'Pine Street Homes', text: 'Assigned to Omar Haddad. Repair scheduled for October 24.' },
      { id: 'u5', date: 'Oct 24, 2026', author: 'Omar Haddad', text: 'Replaced the fan switch. Please confirm the fix.' },
    ],
  },
]
