import { useState } from 'react'
import type { FormEvent } from 'react'
import { formatMoney } from '../listing-detail/costs'
import { householdMembers } from './household.data'
import { balances, initialExpenses, initialSettlements, toCents, today } from './money.data'

export function SharedExpenses() {
  const [expenses, setExpenses] = useState(() => structuredClone(initialExpenses))
  const [settlements, setSettlements] = useState(() => structuredClone(initialSettlements))
  const [reminded, setReminded] = useState('')
  const net = balances(householdMembers, expenses, settlements)
  const debtor = householdMembers.find((member) => net[member] < -0.5)
  const creditor = householdMembers.find((member) => net[member] > 0.5)
  const owed = debtor ? Math.round(-net[debtor]) : 0

  function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const amount = toCents(String(form.get('amount') ?? ''))
    const name = String(form.get('name') ?? '').trim()
    if (!name || !(amount > 0)) return
    setExpenses((current) => [...current, { id: `exp-${Date.now()}`, name, amount, paidBy: String(form.get('paidBy')), date: today() }])
    event.currentTarget.reset()
  }

  function recordPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const amount = toCents(String(form.get('amount') ?? ''))
    const from = String(form.get('from'))
    const to = householdMembers.find((member) => member !== from)!
    if (!(amount > 0)) return
    setSettlements((current) => [...current, { id: `set-${Date.now()}`, from, to, amount, date: today() }])
    setReminded('')
    event.currentTarget.reset()
  }

  return <div className="household-money">
    <section className="household-panel" aria-labelledby="expenses-balance">
      <h2 id="expenses-balance">Balance</h2>
      {debtor && creditor ? <p><strong>{debtor}</strong> owes <strong>{creditor}</strong> {formatMoney(owed)}</p> : <p>All settled up.</p>}
      <dl className="household-dates">{householdMembers.map((member) => <div key={member}><dt>{member}</dt><dd>{net[member] >= 0 ? `Gets back ${formatMoney(Math.round(net[member]))}` : `Owes ${formatMoney(Math.round(-net[member]))}`}</dd></div>)}</dl>
      {debtor && <div className="household-form-actions"><button type="button" className="button" onClick={() => setReminded(debtor)}>Send reminder to {debtor}</button><span className="small" role="status">{reminded ? `Reminder sent to ${reminded}.` : ''}</span></div>}
    </section>
    <section className="household-panel" aria-labelledby="expenses-list">
      <h2 id="expenses-list">Expenses</h2>
      <div className="household-table-wrap"><table className="household-table"><caption className="sr-only">Shared expenses split equally between household members</caption>
        <thead><tr><th scope="col">Expense</th><th scope="col">Paid by</th><th scope="col">Amount</th><th scope="col">Each share</th></tr></thead>
        <tbody>{expenses.map((expense) => <tr key={expense.id}><th scope="row">{expense.name}<span className="small muted">{expense.date}</span></th><td>{expense.paidBy}</td><td>{formatMoney(expense.amount)}</td><td>{formatMoney(Math.round(expense.amount / householdMembers.length))}</td></tr>)}</tbody>
      </table></div>
      <form className="household-item-form" onSubmit={addExpense}>
        <label>Expense<input name="name" type="text" placeholder="For example, cleaning supplies" /></label>
        <label>Amount ($)<input name="amount" type="number" min="0" step="0.01" /></label>
        <label>Paid by<select name="paidBy">{householdMembers.map((member) => <option key={member}>{member}</option>)}</select></label>
        <div className="household-form-actions"><button type="submit" className="button button-primary">Add expense</button><span className="small muted">Split equally between {householdMembers.length} members.</span></div>
      </form>
    </section>
    <section className="household-panel" aria-labelledby="expenses-payments">
      <h2 id="expenses-payments">Recorded payments</h2>
      <ul className="household-items">{settlements.map((settlement) => <li key={settlement.id}><div className="household-item-main"><p>{settlement.from} paid {settlement.to} {formatMoney(settlement.amount)}</p><p className="small muted">{settlement.date}</p></div></li>)}</ul>
      <form className="household-item-form" onSubmit={recordPayment}>
        <label>Paid by<select name="from" defaultValue={debtor ?? householdMembers[1]}>{householdMembers.map((member) => <option key={member}>{member}</option>)}</select></label>
        <label>Amount ($)<input name="amount" type="number" min="0" step="0.01" /></label>
        <div className="household-form-actions"><button type="submit" className="button button-primary">Record payment</button></div>
      </form>
    </section>
  </div>
}
