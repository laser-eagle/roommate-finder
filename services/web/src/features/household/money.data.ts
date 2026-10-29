export interface SharedExpense { id: string; name: string; amount: number; paidBy: string; date: string }
export interface Settlement { id: string; from: string; to: string; amount: number; date: string }
export interface RentCharge { id: string; label: string; due: string; amount: number; remind: boolean }
export interface RentPayment { id: string; receipt: string; chargeId: string; payer: string; amount: number; date: string }

export const initialExpenses: SharedExpense[] = [
  { id: 'exp-rent', name: 'Rent', amount: 250000, paidBy: 'Jordan Ellis', date: 'Nov 1, 2026' },
  { id: 'exp-utilities', name: 'Utilities', amount: 15000, paidBy: 'Avery Chen', date: 'Oct 28, 2026' },
  { id: 'exp-internet', name: 'Internet', amount: 6000, paidBy: 'Avery Chen', date: 'Oct 22, 2026' },
  { id: 'exp-groceries', name: 'Shared groceries', amount: 12000, paidBy: 'Avery Chen', date: 'Oct 21, 2026' },
]

export const initialSettlements: Settlement[] = [
  { id: 'set-1', from: 'Avery Chen', to: 'Jordan Ellis', amount: 50000, date: 'Oct 25, 2026' },
]

export const rentLease = { home: 'A furnished room on Capitol Hill.', landlord: 'Pine Street Homes', term: 'October 20, 2026 – April 19, 2027' }

export const initialCharges: RentCharge[] = [
  { id: 'charge-oct', label: 'October rent (Oct 20–31)', due: 'Oct 20, 2026', amount: 96800, remind: false },
  { id: 'charge-nov', label: 'November rent', due: 'Nov 1, 2026', amount: 250000, remind: true },
  { id: 'charge-dec', label: 'December rent', due: 'Dec 1, 2026', amount: 250000, remind: false },
]

export const initialRentPayments: RentPayment[] = [
  { id: 'pay-1', receipt: 'R-1001', chargeId: 'charge-oct', payer: 'Jordan Ellis', amount: 96800, date: 'Oct 20, 2026' },
  { id: 'pay-2', receipt: 'R-1002', chargeId: 'charge-nov', payer: 'Avery Chen', amount: 125000, date: 'Oct 28, 2026' },
]

export function balances(members: string[], expenses: SharedExpense[], settlements: Settlement[]) {
  const net = Object.fromEntries(members.map((member) => [member, 0])) as Record<string, number>
  for (const expense of expenses) {
    const share = expense.amount / members.length
    net[expense.paidBy] += expense.amount
    for (const member of members) net[member] -= share
  }
  for (const settlement of settlements) { net[settlement.from] += settlement.amount; net[settlement.to] -= settlement.amount }
  return net
}

export const toCents = (value: string) => Math.round(Number(value) * 100)
export const today = () => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())
