import { useEffect, useState } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { Icon } from '../../components/Icon'
import { ManagerListings } from './ManagerListings'
import type { ListingFilter } from './ManagerListings'
import { ManagerInbox, ManagerTours, ListingReadiness } from './ManagerActivity'
import { ManagerDialog } from './ManagerDialog'
import { ManagerWorkspace } from './ManagerWorkspace'
import { operationsInquiries, operationsListings, operationsTours } from './operations.data'
import { initialInquiries, initialListings, initialTours } from './managers.mock'
import { initialApplications } from './applications.mock'
import { initialManagerRequests } from './maintenance.mock'
import type { ManagedListing, ManagerDialog as DialogState } from './managers.mock'
import { useSavedHomes } from '../discovery/useSavedHomes'
import './ManagersView.css'

export function ManagersView() {
  const workspace = window.location.pathname.replace(/\/+$/, '').startsWith('/managers/') || new URLSearchParams(window.location.search).get('view') === 'workspace'
  const [listings, setListings] = useState(() => structuredClone(workspace ? operationsListings : initialListings))
  const [inquiries, setInquiries] = useState(() => structuredClone(workspace ? operationsInquiries : initialInquiries))
  const [tours, setTours] = useState(() => structuredClone(workspace ? operationsTours : initialTours))
  const [applications, setApplications] = useState(() => structuredClone(initialApplications))
  const [requests, setRequests] = useState(() => structuredClone(initialManagerRequests))
  const [filter, setFilter] = useState<ListingFilter>('All')
  const [query, setQuery] = useState('')
  const [dialog, setDialog] = useState<DialogState | null>(null)
  const [notice, setNotice] = useState('')
  const { savedIds } = useSavedHomes()

  useEffect(() => {
    const title = document.title
    if (!workspace) document.title = 'Property management | Roommate Finder'
    return () => { document.title = title }
  }, [workspace])

  function closeDialog() {
    setDialog(null)
    if (workspace) requestAnimationFrame(() => {
      if (document.activeElement === document.body) document.querySelector<HTMLElement>('#ops-content h1')?.focus()
    })
  }

  function saveListing(listing: ManagedListing) {
    const exists = listings.some((item) => item.id === listing.id)
    setListings((current) => exists ? current.map((item) => item.id === listing.id ? listing : item) : [...current, listing])
    setFilter('All')
    setQuery('')
    closeDialog()
    setNotice(exists ? 'Listing changes saved.' : 'Draft created. Not published.')
  }

  function toggleListing(listing: ManagedListing) {
    const status = listing.status === 'Live' ? 'Paused' : 'Live'
    setListings((current) => current.map((item) => item.id === listing.id ? { ...item, status } : item))
    setNotice(`${listing.title}: ${status.toLowerCase()}.`)
  }

  const draftCount = listings.filter((listing) => listing.status === 'Draft').length
  const pausedCount = listings.filter((listing) => listing.status === 'Paused').length
  const stats = [
    { label: 'Total listings', value: listings.length, detail: `${draftCount} ${draftCount === 1 ? 'draft' : 'drafts'} · ${pausedCount} paused`, href: '#manager-listings' },
    { label: 'Live listings', value: listings.filter((listing) => listing.status === 'Live').length, detail: 'Visible to renters', href: '#manager-listings' },
    { label: 'Pending replies', value: inquiries.filter((inquiry) => !inquiry.reply).length, detail: 'Review renter inquiries', href: '#manager-inquiries' },
    { label: 'Upcoming tours', value: tours.length, detail: `${tours.filter((tour) => !tour.confirmed).length} awaiting confirmation`, href: '#manager-tours' },
  ]

  return <>
    <SiteHeader savedCount={savedIds.length} />
    {workspace ? <ManagerWorkspace listings={listings} inquiries={inquiries} tours={tours} applications={applications} requests={requests} notice={notice}
      onRequestUpdate={(id, change, update) => { setRequests((current) => current.map((request) => request.id === id ? { ...request, ...change, updates: [...request.updates, { id: `mu-${Date.now()}`, date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()), author: 'Pine Street Homes', text: update }] } : request)); setNotice(update) }}
      onApplicationStatus={(id, status) => { setApplications((current) => current.map((application) => application.id === id ? { ...application, status } : application)); if (status !== 'Under Review') setNotice(status === 'Info Requested' ? 'Information requested from the applicant.' : `Decision sent: ${status}.`) }}
      onApplicationNote={(id, text) => { if (!text.trim()) return; setApplications((current) => current.map((application) => application.id === id ? { ...application, feedback: [...application.feedback, { id: `note-${Date.now()}`, author: 'You', text: text.trim() }] } : application)); setNotice('Note added.') }} onDismiss={() => setNotice('')}
      onCreate={() => setDialog({ type: 'listing', listing: null })} onEdit={(listing) => setDialog({ type: 'listing', listing })}
      onInquiry={(inquiry) => setDialog({ type: 'inquiry', inquiry })} onTour={(tour) => setDialog({ type: 'tour', tour })}
      onBulkStatus={(ids, status) => { setListings((current) => current.map((listing) => ids.includes(listing.id) && listing.status !== 'Draft' ? { ...listing, status } : listing)); setNotice(`${ids.length} ${ids.length === 1 ? 'listing' : 'listings'} ${status === 'Live' ? 'resumed' : 'paused'}.`) }} /> : <main id="main-content" className="container manager-main" tabIndex={-1}>
      <div className="manager-topline"><span className="eyebrow muted">Managers / Overview</span><nav className="manager-view-switch" aria-label="Manager layout"><a href="/managers?view=workspace">Workspace</a><a href="/managers" aria-current="page">Overview</a></nav></div>
      <div className="manager-heading"><div><h1>Property management</h1><p className="muted">Manage listings, respond to inquiries, and review tour requests.</p></div><button className="button button-primary" onClick={() => setDialog({ type: 'listing', listing: null })}><span aria-hidden="true">＋</span>Add listing</button></div>
      <nav className="manager-navigation" aria-label="Workspace sections"><a href="#manager-overview">Overview</a><a href="#manager-listings">Listings</a><a href="#manager-inquiries">Inquiries</a><a href="#manager-tours">Tours</a></nav>
      <section id="manager-overview" className="manager-stats" aria-label="Portfolio overview">
        {stats.map((stat) => <a key={stat.label} href={stat.href} className="manager-stat"><span className="small muted">{stat.label}</span><strong>{stat.value}</strong><span className="manager-stat-bottom small muted">{stat.detail}<Icon name="arrow" /></span></a>)}
      </section>
      <div className="manager-workspace">
        <div className="manager-primary">
          <ManagerListings listings={listings} filter={filter} query={query} onFilter={setFilter} onQuery={setQuery}
            onEdit={(listing) => setDialog({ type: 'listing', listing })} onToggle={toggleListing} onCreate={() => setDialog({ type: 'listing', listing: null })} />
          <ManagerInbox inquiries={inquiries} listings={listings} onOpen={(inquiry) => setDialog({ type: 'inquiry', inquiry })} />
        </div>
        <div className="manager-secondary"><ManagerTours tours={tours} listings={listings} onOpen={(tour) => setDialog({ type: 'tour', tour })} /><ListingReadiness /></div>
      </div>
      <div className={`manager-notice ${notice ? 'has-notice' : ''}`} role="status">{notice}{notice && <button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" /></button>}</div>
    </main>}
    {dialog && <div className={workspace ? 'ops-dialog-host' : undefined}><ManagerDialog dialog={dialog} listings={listings} onClose={closeDialog} onSaveListing={saveListing}
      onReply={(id, reply) => { setInquiries((current) => current.map((inquiry) => inquiry.id === id ? { ...inquiry, reply } : inquiry)); closeDialog(); setNotice('Reply sent.') }}
      onConfirmTour={(id) => { setTours((current) => current.map((tour) => tour.id === id ? { ...tour, confirmed: true } : tour)); closeDialog(); setNotice('Tour confirmed.') }} /></div>}
  </>
}
