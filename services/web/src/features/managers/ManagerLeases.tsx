import { useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { formatMoney } from '../listing-detail/costs'
import { leaseLandlord } from './leases.mock'
import type { ManagerLease } from './leases.mock'

const listNames = (names: string[]) => names.length > 2 ? `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}` : names.join(' and ')

export function ManagerLeases({ leases, onSign }: { leases: ManagerLease[]; onSign: (id: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const selected = leases.find((lease) => lease.id === openId) ?? null
  const canSign = selected && selected.status === 'Waiting for signatures'
    && selected.signers.every((signer) => signer.name === leaseLandlord || signer.signed)
    && !selected.signers.find((signer) => signer.name === leaseLandlord)?.signed

  return <>
    <section className="ops-panel" aria-label="Leases">
      <div className="ops-filter-row"><span role="status">{leases.length} leases</span></div>
      <table className="ops-table ops-activity-table"><caption className="sr-only">Leases, terms, and signing status</caption>
        <thead><tr><th scope="col">Unit</th><th scope="col">Renters</th><th scope="col">Term</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
        <tbody>{leases.map((lease) => <tr key={lease.id}>
          <th scope="row"><strong>{lease.unit}</strong><small>{formatMoney(lease.rent)} per month</small></th>
          <td data-label="Renters">{listNames(lease.renters)}</td>
          <td data-label="Term">{lease.term}</td>
          <td data-label="Status"><span className={`ops-tag ${lease.status === 'Signed' ? '' : 'needs-action'}`}>{lease.status}</span></td>
          <td><button className="ops-row-button" onClick={() => setOpenId(lease.id)} aria-label={`Review lease for ${lease.unit}`}>Review</button></td>
        </tr>)}</tbody>
      </table>
    </section>
    {selected && <div className="ops-dialog-host"><PreviewDialog title="Lease" onClose={() => setOpenId(null)}>
      <p className="dialog-context small">{selected.unit} · {listNames(selected.renters)}<br /><span className="muted">Status: {selected.status}</span></p>
      <dl className="manager-application-details">
        <div><dt>Term</dt><dd>{selected.term}</dd></div>
        <div><dt>Rent</dt><dd>{formatMoney(selected.rent)} per month</dd></div>
        <div><dt>Deposit</dt><dd>{formatMoney(selected.deposit)}</dd></div>
        <div><dt>Signed copy</dt><dd>{selected.signedCopy ?? 'Not signed yet'}</dd></div>
      </dl>
      <section className="manager-application-feedback" aria-labelledby="lease-signers-heading">
        <h3 id="lease-signers-heading">Signatures</h3>
        <ul>{selected.signers.map((signer) => <li key={signer.name}><strong>{signer.name}</strong><span className="small muted">{signer.signed ? `Signed ${signer.signed}` : 'Waiting to sign'}</span></li>)}</ul>
        {selected.signedCopy && <p className="small muted">Shared with {listNames(selected.signers.map((signer) => signer.name))}.</p>}
      </section>
      <section className="manager-application-feedback manager-lease-renewal" aria-labelledby="lease-renewal-heading">
        <h3 id="lease-renewal-heading">Renewal</h3>
        {selected.renewalOffer ? <p className="small">Offer sent {selected.renewalOffer.sent}: {selected.renewalOffer.term} at {formatMoney(selected.renewalOffer.rent)} per month. Response due {selected.renewalOffer.responseDue}.</p>
          : <p className="small">Renewal offer on {selected.renewalDate}, 90 days before the lease ends.</p>}
      </section>
      {canSign && <div className="manager-lease-actions">
        <p className="small muted">All renters have signed. Sign as {leaseLandlord} to complete the lease.</p>
        <button type="button" className="button button-primary" onClick={() => { onSign(selected.id); requestAnimationFrame(() => document.querySelector<HTMLElement>('dialog .dialog-close')?.focus()) }}>Sign lease</button>
      </div>}
    </PreviewDialog></div>}
  </>
}
