import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { formatMoney } from '../listing-detail/costs'
import { householdMembers } from './household.data'
import { initialCharges, initialRentPayments, rentLease, toCents, today } from './money.data'
import type { RentPayment } from './money.data'

export function RentPayments() {
  const [charges, setCharges] = useState(() => structuredClone(initialCharges))
  const [payments, setPayments] = useState(() => structuredClone(initialRentPayments))
  const [payingId, setPayingId] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<RentPayment | null>(null)
  const paid = (id: string) => payments.filter((payment) => payment.chargeId === id).reduce((sum, payment) => sum + payment.amount, 0)
  const totalDue = charges.reduce((sum, charge) => sum + Math.max(charge.amount - paid(charge.id), 0), 0)
  const paying = charges.find((charge) => charge.id === payingId)
  const chargeLabel = (id: string) => charges.find((charge) => charge.id === id)?.label ?? 'Charge'

  function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!paying) return
    const form = new FormData(event.currentTarget)
    const remaining = paying.amount - paid(paying.id)
    const amount = Math.min(toCents(String(form.get('amount') ?? '')), remaining)
    if (!(amount > 0)) return
    setPayments((current) => [...current, { id: `pay-${Date.now()}`, receipt: `R-${1001 + current.length}`, chargeId: paying.id, payer: String(form.get('payer')), amount, date: today() }])
    setPayingId(null)
  }

  return <div className="household-money">
    <section className="household-panel" aria-labelledby="rent-lease">
      <h2 id="rent-lease">Lease</h2>
      <p>{rentLease.home} · {rentLease.landlord}</p>
      <p className="small muted">{rentLease.term}</p>
      <p><strong>Balance due: {formatMoney(totalDue)}</strong></p>
    </section>
    <section className="household-panel" aria-labelledby="rent-charges">
      <h2 id="rent-charges">Charges</h2>
      <ul className="household-items">{charges.map((charge) => {
        const remaining = charge.amount - paid(charge.id)
        return <li key={charge.id}>
          <div className="household-item-main">
            <p><strong>{charge.label}</strong> · {formatMoney(charge.amount)}</p>
            <p className="small muted">Due {charge.due} · {remaining <= 0 ? 'Paid in full' : paid(charge.id) ? `Partially paid · ${formatMoney(remaining)} remaining` : `${formatMoney(remaining)} due`}</p>
            {remaining > 0 && <label className="household-check small"><input type="checkbox" checked={charge.remind} onChange={() => setCharges((current) => current.map((entry) => entry.id === charge.id ? { ...entry, remind: !entry.remind } : entry))} />Remind me 3 days before</label>}
          </div>
          {remaining > 0 && <button type="button" className="button button-primary" onClick={() => setPayingId(charge.id)} aria-label={`Pay ${charge.label}`}>Pay</button>}
        </li>
      })}</ul>
    </section>
    <section className="household-panel" aria-labelledby="rent-receipts">
      <h2 id="rent-receipts">Receipts</h2>
      <ul className="household-items">{payments.map((payment) => <li key={payment.id}>
        <div className="household-item-main"><p>{formatMoney(payment.amount)} · {chargeLabel(payment.chargeId)}</p><p className="small muted">{payment.date} · Paid by {payment.payer}</p></div>
        <button type="button" className="household-text-button" onClick={() => setReceipt(payment)} aria-label={`View receipt ${payment.receipt}`}>View receipt</button>
      </li>)}</ul>
    </section>
    {paying && <PreviewDialog title={`Pay ${paying.label}`} onClose={() => setPayingId(null)}>
      <p className="dialog-context small">{formatMoney(paying.amount - paid(paying.id))} remaining · Due {paying.due}</p>
      <form onSubmit={pay}>
        <label>Paid by<select name="payer">{householdMembers.map((member) => <option key={member}>{member}</option>)}</select></label>
        <label>Amount ($)<input name="amount" type="number" min="0" step="0.01" defaultValue={((paying.amount - paid(paying.id)) / 100).toFixed(2)} autoFocus /></label>
        <p className="small muted">Pay the full amount or enter a partial payment.</p>
        <button type="submit" className="button button-primary">Pay now</button>
      </form>
    </PreviewDialog>}
    {receipt && <PreviewDialog title={`Receipt ${receipt.receipt}`} onClose={() => setReceipt(null)}>
      <dl className="household-dates">
        <div><dt>Charge</dt><dd>{chargeLabel(receipt.chargeId)}</dd></div>
        <div><dt>Amount</dt><dd>{formatMoney(receipt.amount)}</dd></div>
        <div><dt>Paid by</dt><dd>{receipt.payer}</dd></div>
        <div><dt>Paid to</dt><dd>{rentLease.landlord}</dd></div>
        <div><dt>Date</dt><dd>{receipt.date}</dd></div>
      </dl>
    </PreviewDialog>}
  </div>
}
