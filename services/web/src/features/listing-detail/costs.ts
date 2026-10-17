import type { ListingCosts } from './listing.types'

export function estimatedMonthlyTotal(costs: ListingCosts): number | null {
  const { baseRent, requiredMonthlyFees, utilities } = costs
  if (baseRent === null || requiredMonthlyFees === null || utilities === null) return null
  return baseRent + requiredMonthlyFees + utilities
}

export function formatMoney(amount: number | null, currency = 'USD'): string {
  if (amount === null) return 'Unknown'
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}

export function formatLocalDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`))
}
