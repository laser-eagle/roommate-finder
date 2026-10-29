import { useEffect, useState } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import { homes } from '../discovery/housing.data'
import { applications } from './applications.data'
import { storedDocuments } from './documents.data'
import type { DocumentGrant, StoredDocument } from './documents.data'

const today = () => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())

const grantContext = (grant: DocumentGrant) => {
  if (!grant.applicationId) return 'Joint applicant'
  const application = applications.find((item) => item.id === grant.applicationId)
  const home = homes.find((item) => item.id === application?.homeId)
  return home ? `Application: ${home.title}` : 'Application'
}

export function SharedDocuments() {
  const [documents, setDocuments] = useState<StoredDocument[]>(storedDocuments)
  const [pending, setPending] = useState<{ document: StoredDocument; grant: DocumentGrant } | null>(null)
  const [notice, setNotice] = useState('')
  const [focusId, setFocusId] = useState('')

  useEffect(() => {
    if (focusId) document.getElementById(focusId)?.focus()
  }, [focusId, documents])

  const revoke = () => {
    if (!pending) return
    const date = today()
    setDocuments((current) => current.map((document) => document.id !== pending.document.id ? document : {
      ...document,
      grants: document.grants.map((grant) => grant.id === pending.grant.id ? { ...grant, revoked: date } : grant),
    }))
    setNotice(`${pending.grant.recipient} can no longer see ${pending.document.name}.`)
    setFocusId(`${pending.document.id}-heading`)
    setPending(null)
  }

  return <section className="shared-documents" aria-labelledby="shared-documents-heading">
    <div className="shared-documents-heading">
      <h2 id="shared-documents-heading">Shared documents</h2>
      <p className="small muted">Documents stored with your applications, who can see each one, and when access expires.</p>
    </div>
    <p className="small shared-documents-notice" role="status">{notice}</p>
    <ul className="shared-documents-list">{documents.map((document) => <li key={document.id} className="shared-document">
      <div>
        <h3 id={`${document.id}-heading`} tabIndex={-1}>{document.name}</h3>
        <p className="small muted">{document.fileName} · Added {document.added}</p>
      </div>
      <ul className="document-grants" aria-label={`Who can see ${document.name}`}>{document.grants.map((grant) => <li key={grant.id}>
        <div>
          <strong className="small">{grant.recipient}</strong>
          <span className="small muted">{grantContext(grant)}</span>
          <span className="small">{grant.revoked ? `Access revoked on ${grant.revoked}` : `Expires ${grant.expires}`}</span>
        </div>
        {!grant.revoked && <button type="button" className="button" onClick={() => { setFocusId(''); setPending({ document, grant }) }}
          aria-label={`Revoke ${grant.recipient}'s access to ${document.name}`}>Revoke access</button>}
      </li>)}</ul>
    </li>)}</ul>
    {pending && <PreviewDialog title="Revoke access" onClose={() => setPending(null)}>
      <p className="dialog-context">Revoke {pending.grant.recipient}'s access to {pending.document.name}?</p>
      <div className="document-revoke-actions">
        <button type="button" className="button" onClick={() => setPending(null)}>Cancel</button>
        <button type="button" className="button button-primary" onClick={revoke}>Revoke access</button>
      </div>
    </PreviewDialog>}
  </section>
}
