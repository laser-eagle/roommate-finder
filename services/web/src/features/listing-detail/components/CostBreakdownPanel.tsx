import { estimatedMonthlyTotal, formatMoney } from '../costs'
import type { ListingCosts } from '../listing.types'

export function CostBreakdownPanel({ costs }: { costs: ListingCosts }) {
  const total = estimatedMonthlyTotal(costs)
  const rows = [['Base rent', costs.baseRent], ['Required monthly fees', costs.requiredMonthlyFees], ['Estimated utilities', costs.utilities]] as const
  return (
    <section className="cost-panel panel" aria-labelledby="cost-heading">
      <h2 id="cost-heading">The full cost</h2>
      <dl className="cost-rows small">
        {rows.map(([label, amount]) => <div key={label}><dt className="muted">{label}</dt><dd>{formatMoney(amount, costs.currency)}</dd></div>)}
        <div className="cost-total"><dt>Estimated monthly total</dt><dd>{total === null ? 'Incomplete' : formatMoney(total, costs.currency)}</dd></div>
        <div className="deposit-row"><dt className="muted">Move-in deposit</dt><dd>{formatMoney(costs.deposit, costs.currency)}</dd></div>
      </dl>
      {total === null && <p className="small cost-note">Some monthly costs are unknown. A full total is not available.</p>}
      <p className="small muted cost-note">Utility cost is an estimate. The deposit is a one-time amount.</p>
    </section>
  )
}
