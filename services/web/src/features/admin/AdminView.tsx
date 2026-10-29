import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { Icon } from '../../components/Icon'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { AdminReports } from './AdminReports'
import { AdminAppeals } from './AdminAppeals'
import { AdminAnalytics } from './AdminAnalytics'
import { analyticsRange } from './analytics.data'
import { initialAppeals, initialReports, openReport } from './moderation.data'
import type { AppealStatus } from './moderation.data'
import '../managers/ManagerWorkspace.css'
import '../managers/ManagersView.css'
import './AdminView.css'

const adminPaths = { reports: '/admin/reports', appeals: '/admin/appeals', analytics: '/admin/analytics' } as const
type AdminPage = keyof typeof adminPaths
const labels = { reports: 'Reports', appeals: 'Appeals', analytics: 'Analytics', 'not-found': 'Admin page not found' }
const descriptions = { reports: 'Reported content waiting for review.', appeals: 'Requests to review a moderation decision again.', analytics: analyticsRange }

function readPage(): AdminPage | 'not-found' {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/admin') return 'reports'
  return (Object.keys(adminPaths) as AdminPage[]).find((key) => adminPaths[key] === path) ?? 'not-found'
}

export function AdminView() {
  const { savedIds } = useSavedHomes()
  const [page, setPage] = useState(readPage)
  const [reports, setReports] = useState(() => structuredClone(initialReports))
  const [appeals, setAppeals] = useState(() => structuredClone(initialAppeals))
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const onPopState = () => setPage(readPage())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => {
    const previous = document.title
    document.title = `${labels[page]} | Admin tools`
    return () => { document.title = previous }
  }, [page])

  function followLink(event: MouseEvent<HTMLAnchorElement>, next: AdminPage) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (window.location.pathname !== adminPaths[next]) window.history.pushState(null, '', adminPaths[next])
    setPage(next)
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#ops-content h1')?.focus())
  }

  function dismiss(id: string) {
    const report = reports.find((item) => item.id === id)
    setReports((current) => current.map((item) => item.id === id ? { ...item, status: 'Resolved: dismissed' } : item))
    setNotice(report?.status === 'Hidden pending review' ? `${report.number} dismissed. The content is visible again.` : `${report?.number} dismissed.`)
  }

  function decide(id: string, status: AppealStatus) {
    const appeal = appeals.find((item) => item.id === id)
    setAppeals((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    setNotice(status === 'Decision reversed' ? `Appeal for ${appeal?.reportNumber} accepted. The content was restored.` : `Appeal for ${appeal?.reportNumber} declined. The decision stands.`)
  }

  const counts: Partial<Record<AdminPage, number>> = { reports: reports.filter(openReport).length, appeals: appeals.filter((appeal) => appeal.status === 'Under review').length }

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="ops-main">
    <aside className="ops-sidebar" aria-label="Admin navigation"><div className="ops-organization"><span className="ops-organization-icon"><Icon name="lock" /></span><div><strong>Admin tools</strong><span>Trust and safety</span></div></div>
      <nav aria-label="Admin tools">{(Object.keys(adminPaths) as AdminPage[]).map((item) => <a key={item} href={adminPaths[item]} aria-current={page === item ? 'page' : undefined} onClick={(event) => followLink(event, item)}>
        <Icon name={item === 'reports' ? 'inbox' : item === 'appeals' ? 'edit' : 'list'} /><span>{labels[item]}</span>{counts[item] !== undefined && <b>{counts[item]}</b>}</a>)}</nav>
      <div className="ops-sidebar-links"><a href="/account/personal">Account settings<Icon name="arrow" /></a><a href="/listings">Renter site<Icon name="arrow" /></a></div>
    </aside>
    <div id="ops-content" className="ops-content">
      <header className="ops-heading"><div><span className="ops-breadcrumb">Admin / {labels[page]}</span><h1 tabIndex={-1}>{labels[page]}</h1>{page !== 'not-found' && <p className="ops-page-description">{descriptions[page]}</p>}</div></header>
      {page === 'reports' ? <AdminReports reports={reports} onDismiss={dismiss} />
        : page === 'appeals' ? <AdminAppeals appeals={appeals} onDecide={decide} />
        : page === 'analytics' ? <AdminAnalytics />
          : <section className="ops-panel ops-empty"><h2>Page not found</h2><p>Use the admin navigation or return to reports.</p><a className="button" href={adminPaths.reports} onClick={(event) => followLink(event, 'reports')}>Go to reports</a></section>}
      <div className={`manager-notice ${notice ? 'has-notice' : ''}`} role="status">{notice}{notice && <button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" /></button>}</div>
    </div>
  </main></>
}
