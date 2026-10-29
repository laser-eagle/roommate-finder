import { useEffect, useState } from 'react'
import { Icon } from '../../components/Icon'
import { ManagerInventory } from './ManagerInventory'
import { initialInventoryFilters } from './inventoryFilters'
import { ManagerWorkQueues } from './ManagerWorkQueues'
import { ManagerUnitReport } from './ManagerUnitReport'
import { ManagerApplications } from './ManagerApplications'
import { ManagerMaintenance } from './ManagerMaintenance'
import type { ManagerRequest } from './maintenance.mock'
import { ManagerTeam } from './ManagerTeam'
import type { TeamMember } from './team.mock'
import { openStatuses } from './applications.mock'
import type { ManagerApplication } from './applications.mock'
import type { ApplicationStatus } from '../applications/applications.data'
import { managerPaths, useManagerRoute } from './useManagerRoute'
import { unitDetails, unitLabel } from './operations.data'
import type { Inquiry, ListingStatus, ManagedListing, Tour } from './managers.mock'
import './ManagerWorkspace.css'

const labels = { listings: 'Listings', inquiries: 'Inquiries', tours: 'Tours', applications: 'Applications', maintenance: 'Maintenance', team: 'Team', vacant: 'Vacant units', notices: 'Notice given', 'pending-inquiries': 'Inquiries to reply', 'pending-tours': 'Tours to confirm', 'not-found': 'Manager page not found' }

export function ManagerWorkspace({ listings, inquiries, tours, applications, requests, team, notice, onDismiss, onCreate, onEdit, onInquiry, onTour, onBulkStatus, onApplicationStatus, onApplicationNote, onRequestUpdate, onTeamAdd, onTeamRemove }: {
  listings: ManagedListing[]; inquiries: Inquiry[]; tours: Tour[]; applications: ManagerApplication[]; requests: ManagerRequest[]; team: TeamMember[]; notice: string
  onTeamAdd: (member: TeamMember) => void; onTeamRemove: (id: string) => void
  onRequestUpdate: (id: string, change: Partial<ManagerRequest>, update: string) => void
  onApplicationStatus: (id: string, status: ApplicationStatus) => void; onApplicationNote: (id: string, text: string) => void
  onDismiss: () => void; onCreate: () => void; onEdit: (listing: ManagedListing) => void
  onInquiry: (inquiry: Inquiry) => void; onTour: (tour: Tour) => void; onBulkStatus: (ids: string[], status: ListingStatus) => void
}) {
  const { page, listingId, goTo, followLink } = useManagerRoute()
  const [filters, setFilters] = useState(() => structuredClone(initialInventoryFilters))
  const pendingInquiries = inquiries.filter((inquiry) => !inquiry.reply)
  const pendingTours = tours.filter((tour) => !tour.confirmed)
  const drafts = listings.filter((listing) => listing.status === 'Draft')
  const vacancies = listings.filter((listing) => unitDetails[listing.id]?.occupancy === 'Vacant')
  const notices = listings.filter((listing) => unitDetails[listing.id]?.occupancy === 'Notice given')
  const totalTasks = pendingInquiries.length + pendingTours.length + drafts.length

  function openActivity(next: 'inquiries' | 'tours', id: string) { goTo(next === 'inquiries' ? 'pending-inquiries' : 'tours', id) }
  const descriptions = { vacant: 'Vacancy dates, unit preparation, and leasing activity.', notices: 'Move-out dates, turnover plans, and upcoming availability.', 'pending-inquiries': 'Renter inquiries awaiting a response.', 'pending-tours': 'Tour requests awaiting confirmation.', applications: 'Rental applications for your listings.', maintenance: 'Repair requests from residents and building announcements.', team: 'Staff roles, permissions, and property access.' }
  const section = page.includes('inquiries') ? 'inquiries' : page.includes('tours') ? 'tours' : page === 'applications' ? 'applications' : page === 'maintenance' ? 'maintenance' : page === 'team' ? 'team' : 'listings'
  const pendingOnly = page.startsWith('pending-')
  useEffect(() => { document.title = `${labels[page]} | Property management` }, [page])

  return <main id="main-content" tabIndex={-1} className="ops-main">
    <aside className="ops-sidebar" aria-label="Manager workspace navigation"><div className="ops-organization"><span className="ops-organization-icon"><Icon name="home" /></span><div><strong>Property management</strong><span>Seattle portfolio</span></div></div>
      <nav aria-label="Manager tools">{(['listings', 'inquiries', 'tours', 'applications', 'maintenance', 'team'] as const).map((item) => <a key={item} href={managerPaths[item]} aria-current={section === item && page !== 'not-found' ? 'page' : undefined} onClick={(event) => followLink(event, item)}><Icon name={item === 'listings' ? 'list' : item === 'inquiries' ? 'inbox' : item === 'tours' ? 'calendar' : item === 'applications' ? 'edit' : item === 'maintenance' ? 'home' : 'lock'} /><span>{labels[item]}</span><b>{item === 'listings' ? listings.length : item === 'inquiries' ? pendingInquiries.length : item === 'tours' ? pendingTours.length : item === 'applications' ? applications.filter((application) => openStatuses.includes(application.status)).length : item === 'team' ? team.length : requests.filter((request) => request.status === 'Open' || request.status === 'In Progress').length}</b></a>)}</nav>
      <div className="ops-sidebar-links"><a href="/business/pine-street-homes">Business profile<Icon name="arrow" /></a><a href="/account/personal">Account settings<Icon name="arrow" /></a><a href="/listings">Renter site<Icon name="arrow" /></a></div>
    </aside>
    <div id="ops-content" className="ops-content"><header className="ops-heading"><div><span className="ops-breadcrumb">Management / {labels[page]}</span><h1 tabIndex={-1}>{labels[page]}</h1>{page in descriptions && <p className="ops-page-description">{descriptions[page as keyof typeof descriptions]}</p>}</div><div className="ops-heading-actions">{page !== 'listings' ? <a href={managerPaths.listings} className="button ops-back-link" onClick={(event) => followLink(event, 'listings')}>Back to listings</a> : <nav className="manager-view-switch" aria-label="Manager layout"><a href={managerPaths.listings} aria-current="page" onClick={(event) => followLink(event, 'listings')}>Workspace</a><a href="/managers">Overview</a></nav>}<button className="button button-primary" onClick={() => { setFilters(structuredClone(initialInventoryFilters)); goTo('listings'); onCreate() }}><span aria-hidden="true">＋</span>Add listing</button></div></header>
      <section className="ops-metrics" aria-label="Portfolio work summary">
        <a href={managerPaths.vacant} aria-current={page === 'vacant' ? 'page' : undefined} onClick={(event) => followLink(event, 'vacant')}><span>Vacant units</span><strong>{vacancies.length}</strong><small>View unit details<Icon name="arrow" /></small></a>
        <a href={managerPaths.notices} aria-current={page === 'notices' ? 'page' : undefined} onClick={(event) => followLink(event, 'notices')}><span>Notice given</span><strong>{notices.length}</strong><small>View move-out plans<Icon name="arrow" /></small></a>
        <a href={managerPaths['pending-inquiries']} aria-current={page === 'pending-inquiries' ? 'page' : undefined} onClick={(event) => followLink(event, 'pending-inquiries')}><span>Inquiries to reply</span><strong>{pendingInquiries.length}</strong><small>View pending inquiries<Icon name="arrow" /></small></a>
        <a href={managerPaths['pending-tours']} aria-current={page === 'pending-tours' ? 'page' : undefined} onClick={(event) => followLink(event, 'pending-tours')}><span>Tours to confirm</span><strong>{pendingTours.length}</strong><small>View tour requests<Icon name="arrow" /></small></a>
      </section>
      {page === 'listings' ? <>
        <ManagerInventory listings={listings} inquiries={inquiries} tours={tours} filters={filters} onFilters={setFilters} onEdit={onEdit} onActivity={openActivity} onBulkStatus={onBulkStatus} />
        <div className="ops-bottom-grid"><section className="ops-panel ops-task-panel" aria-labelledby="ops-actions-title"><div className="ops-panel-title"><h2 id="ops-actions-title">Needs attention</h2><span>{totalTasks} open items</span></div><ul>
          <li><span className="ops-task-icon"><Icon name="inbox" /></span><div><strong>{pendingInquiries.length} inquiries awaiting a reply</strong><span>Answer renter questions and arrange next steps.</span></div><button onClick={() => goTo('pending-inquiries')}>Open inbox<Icon name="arrow" /></button></li>
          <li><span className="ops-task-icon"><Icon name="calendar" /></span><div><strong>{pendingTours.length} tour requests to confirm</strong><span>Check the requested time and tour type.</span></div><button onClick={() => goTo('pending-tours')}>Review<Icon name="arrow" /></button></li>
          {drafts.map((listing) => <li key={listing.id}><span className="ops-task-icon"><Icon name="edit" /></span><div><strong>{unitLabel(listing)}</strong><span>Draft · Review rent and availability</span></div><button onClick={() => onEdit(listing)}>Edit draft<Icon name="arrow" /></button></li>)}
        </ul></section>
        <section className="ops-panel ops-schedule-panel" aria-labelledby="ops-schedule-title"><div className="ops-panel-title"><h2 id="ops-schedule-title">Upcoming tours</h2><button onClick={() => goTo('tours')}>View all<Icon name="arrow" /></button></div><ul>{tours.slice(0, 3).map((tour) => { const listing = listings.find((item) => item.id === tour.listingId); return <li key={tour.id}><span className="ops-date"><strong>{tour.day}</strong>{tour.month}</span><div><strong>{tour.name}</strong><span>{listing ? unitLabel(listing) : 'Listing unavailable'}</span><small>{tour.time}</small></div><button className={`ops-tag ${tour.confirmed ? '' : 'needs-action'}`} onClick={() => onTour(tour)} aria-label={`Review tour with ${tour.name}`}>{tour.confirmed ? 'Confirmed' : 'Confirm'}</button></li> })}</ul></section>
        </div>
      </> : page === 'vacant' || page === 'notices' ? <ManagerUnitReport key={page} kind={page} listings={listings} inquiries={inquiries} tours={tours} onEdit={onEdit} onActivity={openActivity} />
        : page === 'team' ? <ManagerTeam team={team} onAdd={onTeamAdd} onRemove={onTeamRemove} />
        : page === 'maintenance' ? <ManagerMaintenance requests={requests} onUpdate={onRequestUpdate} />
        : page === 'applications' ? <ManagerApplications applications={applications} listings={listings} onStatus={onApplicationStatus} onNote={onApplicationNote} />
        : section === 'inquiries' || section === 'tours' ? <ManagerWorkQueues key={page} section={section} listings={listings} inquiries={inquiries} tours={tours} listingId={listingId} onListing={(id) => goTo(page as 'inquiries' | 'tours' | 'pending-inquiries' | 'pending-tours', id)} pendingOnly={pendingOnly} onPending={(pending) => goTo(pending ? (section === 'inquiries' ? 'pending-inquiries' : 'pending-tours') : section, listingId)} onClear={() => goTo(section)} onInquiry={onInquiry} onTour={onTour} />
          : <section className="ops-panel ops-empty"><h2>Page not found</h2><p>Use the manager navigation or return to your listings.</p><a className="button" href={managerPaths.listings} onClick={(event) => followLink(event, 'listings')}>Go to listings</a></section>}
      <div className={`manager-notice ${notice ? 'has-notice' : ''}`} role="status">{notice}{notice && <button aria-label="Dismiss notification" onClick={onDismiss}><Icon name="close" /></button>}</div>
    </div>
  </main>
}
