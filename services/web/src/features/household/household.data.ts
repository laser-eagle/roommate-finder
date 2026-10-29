export const householdMembers = ['Jordan Ellis', 'Avery Chen']
export const householdHome = { title: 'A furnished room on Capitol Hill.', href: '/listings/capitol-hill-sublet', manager: 'Pine Street Homes' }

export type AgreementCategory = 'Expectation' | 'Shared-space rule' | 'Chore' | 'Responsibility'
export const agreementCategories: AgreementCategory[] = ['Expectation', 'Shared-space rule', 'Chore', 'Responsibility']
export const isTask = (category: AgreementCategory) => category === 'Chore' || category === 'Responsibility'

export interface AgreementItem { id: string; category: AgreementCategory; text: string; assignee?: string; when?: string; done?: boolean }

export const initialAgreement: AgreementItem[] = [
  { id: 'exp-1', category: 'Expectation', text: 'Quiet hours are 10 PM to 7 AM on weeknights.' },
  { id: 'exp-2', category: 'Expectation', text: 'Let each other know before hosting overnight guests.' },
  { id: 'rule-1', category: 'Shared-space rule', text: 'Clean up the kitchen the same day you cook.' },
  { id: 'rule-2', category: 'Shared-space rule', text: 'Add shared groceries to the list on the fridge.' },
  { id: 'chore-1', category: 'Chore', text: 'Take out trash and recycling', assignee: 'Jordan Ellis', when: 'Every Tuesday', done: false },
  { id: 'chore-2', category: 'Chore', text: 'Clean the bathroom', assignee: 'Avery Chen', when: 'Every other Saturday', done: false },
  { id: 'resp-1', category: 'Responsibility', text: 'Set up internet and utilities accounts', assignee: 'Avery Chen', when: 'Before October 20, 2026', done: true },
  { id: 'resp-2', category: 'Responsibility', text: 'Buy shared cleaning supplies', assignee: 'Jordan Ellis', when: 'Monthly', done: false },
]

export interface ChecklistItem { id: string; kind: 'Task' | 'Key handoff'; text: string; assignee: string; due: string; done: boolean; document?: string }
export interface MoveChecklist { id: 'move-in' | 'move-out'; label: string; date: string; dates: { label: string; date: string }[]; items: ChecklistItem[] }

export const conditionRooms = ['Bedroom', 'Kitchen', 'Bathroom', 'Living room']

export const initialChecklists: MoveChecklist[] = [
  {
    id: 'move-in', label: 'Move-in', date: 'October 20, 2026',
    dates: [{ label: 'Key pickup', date: 'October 20, 2026 · 9:00 AM' }, { label: 'Move-in day', date: 'October 20, 2026' }, { label: 'First rent due', date: 'November 1, 2026' }],
    items: [
      { id: 'in-1', kind: 'Task', text: 'Book a moving van', assignee: 'Jordan Ellis', due: 'October 15, 2026', done: true },
      { id: 'in-2', kind: 'Task', text: 'Confirm the move-in time with Pine Street Homes', assignee: 'Avery Chen', due: 'October 17, 2026', done: false },
      { id: 'in-3', kind: 'Task', text: "Transfer renter's insurance", assignee: 'Jordan Ellis', due: 'October 19, 2026', done: false },
      { id: 'in-4', kind: 'Key handoff', text: 'Pick up two sets of keys from Pine Street Homes', assignee: 'Avery Chen', due: 'October 20, 2026', done: false },
      { id: 'in-5', kind: 'Key handoff', text: 'Collect the mailbox key', assignee: 'Jordan Ellis', due: 'October 20, 2026', done: false },
    ],
  },
  {
    id: 'move-out', label: 'Move-out', date: 'April 19, 2027',
    dates: [{ label: 'Notice deadline', date: 'March 20, 2027' }, { label: 'Final inspection', date: 'April 19, 2027' }, { label: 'Key return', date: 'April 19, 2027' }],
    items: [
      { id: 'out-1', kind: 'Task', text: 'Give move-out notice to Pine Street Homes', assignee: 'Avery Chen', due: 'March 20, 2027', done: false },
      { id: 'out-2', kind: 'Task', text: 'Deep clean the room and shared spaces', assignee: 'Jordan Ellis', due: 'April 18, 2027', done: false },
      { id: 'out-3', kind: 'Task', text: 'Cancel internet service', assignee: 'Avery Chen', due: 'April 19, 2027', done: false },
      { id: 'out-4', kind: 'Key handoff', text: 'Return all keys to Pine Street Homes', assignee: 'Avery Chen', due: 'April 19, 2027', done: false },
    ],
  },
]
