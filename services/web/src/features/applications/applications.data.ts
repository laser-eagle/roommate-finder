export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Info Requested' | 'Approved' | 'Declined' | 'Withdrawn'

export interface RentalApplication {
  id: string
  homeId: string
  submitted: string
  status: ApplicationStatus
  history: { status: ApplicationStatus; date: string }[]
  messages: { id: string; from: string; date: string; text: string }[]
}

export const applications: RentalApplication[] = [
  {
    id: 'app-ballard', homeId: 'ballard-room', submitted: 'October 2, 2026', status: 'Under Review',
    history: [{ status: 'Submitted', date: 'October 2, 2026' }, { status: 'Under Review', date: 'October 4, 2026' }],
    messages: [],
  },
  {
    id: 'app-capitol', homeId: 'capitol-hill-sublet', submitted: 'October 5, 2026', status: 'Info Requested',
    history: [{ status: 'Submitted', date: 'October 5, 2026' }, { status: 'Under Review', date: 'October 6, 2026' }, { status: 'Info Requested', date: 'October 7, 2026' }],
    messages: [{ id: 'capitol-msg-1', from: 'Pine Street Homes', date: 'October 7, 2026', text: 'Please upload proof of income, such as a recent pay stub or an offer letter.' }],
  },
  {
    id: 'app-green', homeId: 'green-lake-studio', submitted: 'October 9, 2026', status: 'Submitted',
    history: [{ status: 'Submitted', date: 'October 9, 2026' }],
    messages: [],
  },
]
