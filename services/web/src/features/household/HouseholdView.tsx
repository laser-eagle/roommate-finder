import { useEffect, useState } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { useSavedHomes } from '../discovery/useSavedHomes'
import { HouseholdAgreement } from './HouseholdAgreement'
import { MoveChecklists } from './MoveChecklists'
import { SharedExpenses } from './SharedExpenses'
import { RentPayments } from './RentPayments'
import { Maintenance } from './Maintenance'
import { Lease } from './Lease'
import { householdHome, householdMembers, initialAgreement, initialChecklists } from './household.data'
import './Household.css'

export function HouseholdView() {
  const { savedIds } = useSavedHomes()
  const [tab, setTab] = useState<'agreement' | 'checklists' | 'expenses' | 'rent' | 'lease' | 'maintenance'>('agreement')
  const [agreement, setAgreement] = useState(() => structuredClone(initialAgreement))
  const [checklists, setChecklists] = useState(() => structuredClone(initialChecklists))
  const [sharedAt, setSharedAt] = useState('')
  useEffect(() => {
    const previous = document.title
    document.title = 'Household planning | Roommate Finder'
    return () => { document.title = previous }
  }, [])

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container household-main">
    <div className="household-heading">
      <span className="eyebrow muted">Your household</span>
      <h1>Household planning</h1>
      <p className="muted">{householdMembers.join(' and ')} · <a href={householdHome.href}>{householdHome.title}</a></p>
    </div>
    <div className="household-switch household-tabs" role="group" aria-label="Household planning sections">
      <button type="button" aria-pressed={tab === 'agreement'} onClick={() => setTab('agreement')}>Household agreement</button>
      <button type="button" aria-pressed={tab === 'checklists'} onClick={() => setTab('checklists')}>Move checklists</button>
      <button type="button" aria-pressed={tab === 'expenses'} onClick={() => setTab('expenses')}>Shared expenses</button>
      <button type="button" aria-pressed={tab === 'rent'} onClick={() => setTab('rent')}>Rent payments</button>
      <button type="button" aria-pressed={tab === 'lease'} onClick={() => setTab('lease')}>Lease</button>
      <button type="button" aria-pressed={tab === 'maintenance'} onClick={() => setTab('maintenance')}>Maintenance</button>
    </div>
    <div hidden={tab !== 'agreement'}><HouseholdAgreement items={agreement} onItems={setAgreement} sharedAt={sharedAt}
      onShare={() => setSharedAt(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date()))} /></div>
    <div hidden={tab !== 'expenses'}><SharedExpenses /></div>
    <div hidden={tab !== 'rent'}><RentPayments /></div>
    <div hidden={tab !== 'lease'}><Lease /></div>
    <div hidden={tab !== 'maintenance'}><Maintenance /></div>
    <div hidden={tab !== 'checklists'}><MoveChecklists checklists={checklists} onChecklist={(next) => setChecklists((current) => current.map((entry) => entry.id === next.id ? next : entry))} /></div>
  </main></>
}
