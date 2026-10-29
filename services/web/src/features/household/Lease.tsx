import { useState } from 'react'
import { formatMoney } from '../listing-detail/costs'
import { initialLeaseDates, lease } from './lease.data'

const listNames = (names: string[]) => names.length > 1 ? `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}` : names.join('')

export function Lease() {
  const [dates, setDates] = useState(() => structuredClone(initialLeaseDates))
  const signed = lease.signers.every((signer) => signer.signed)

  return <div className="household-money">
    <section className="household-panel" aria-labelledby="lease-details">
      <h2 id="lease-details">Lease</h2>
      <p>{lease.home} · {lease.landlord}</p>
      <dl className="household-dates">
        <div><dt>Term</dt><dd>{lease.term}</dd></div>
        <div><dt>Rent</dt><dd>{formatMoney(lease.rent)} per month</dd></div>
        <div><dt>Deposit</dt><dd>{formatMoney(lease.deposit)}</dd></div>
        <div><dt>Covers</dt><dd>{lease.covers}</dd></div>
        <div><dt>Status</dt><dd>{signed ? 'Signed' : 'Waiting for signatures'}</dd></div>
      </dl>
    </section>
    <section className="household-panel" aria-labelledby="lease-signatures">
      <h2 id="lease-signatures">Signatures</h2>
      <ul className="household-items">{lease.signers.map((signer) => <li key={signer.name}>
        <div className="household-item-main"><p><strong>{signer.name}</strong></p><p className="small muted">{signer.signed ? `Signed ${signer.signed}` : 'Waiting to sign'}</p></div>
      </li>)}</ul>
      <p className="small">Signed copy: {lease.signedCopy}<br /><span className="muted">Shared with {listNames(lease.signers.map((signer) => signer.name))}.</span></p>
    </section>
    <section className="household-panel" aria-labelledby="lease-renewal">
      <h2 id="lease-renewal">Renewal</h2>
      <p>{lease.landlord} will send a renewal offer on {lease.renewalOffer}, 90 days before the lease ends.</p>
    </section>
    <section className="household-panel" aria-labelledby="lease-key-dates">
      <h2 id="lease-key-dates">Key dates</h2>
      <ul className="household-items">{dates.map((entry) => <li key={entry.id}>
        <div className="household-item-main">
          <p><strong>{entry.label}</strong> · {entry.date}</p>
          {entry.past ? <p className="small muted">Passed</p> : <label className="household-check small"><input type="checkbox" checked={entry.remind}
            onChange={() => setDates((current) => current.map((item) => item.id === entry.id ? { ...item, remind: !item.remind } : item))} />Remind me 3 days before</label>}
        </div>
      </li>)}</ul>
    </section>
  </div>
}
