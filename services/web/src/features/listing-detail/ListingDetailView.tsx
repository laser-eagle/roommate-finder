import { useEffect, useRef, useState } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { listingForPreview } from './listing.mock'
import { homes } from '../discovery/housing.data'
import { useSavedHomes } from '../discovery/useSavedHomes'
import type { ContactAction, PreviewState } from './listing.types'
import { ListingHeading } from './components/ListingHeading'
import { ListingPhotoGallery } from './components/ListingPhotoGallery'
import { InquiryCard } from './components/InquiryCard'
import { AboutHomeSection } from './components/AboutHomeSection'
import { MatchExplanationPanel } from './components/MatchExplanationPanel'
import { CostBreakdownPanel } from './components/CostBreakdownPanel'
import { ContactPreview } from './components/ContactPreview'
import { MockupControls } from './components/MockupControls'
import { ListingLoading, ListingNotFound } from './components/ListingStates'
import './ListingDetailView.css'

export function ListingDetailView() {
  const [preview, setPreview] = useState<PreviewState>('default')
  const { savedIds, toggleSaved } = useSavedHomes()
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState('')
  const [contact, setContact] = useState<ContactAction | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const source = path === '/' ? homes[0] : homes.find((home) => path === `/listings/${home.id}`)
  const listing = listingForPreview(preview, source)
  const saved = savedIds.includes(listing.id)
  const isDetail = Boolean(source)
  const showReviewControls = new URLSearchParams(window.location.search).get('review') === '1'

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => {
    const previous = document.title
    document.title = `${source ? source.title : 'Listing unavailable'} | Roommate Finder`
    return () => { document.title = previous }
  }, [source])

  function saveHome() {
    if (pending) return
    setPending(true)
    setNotice('')
    timer.current = setTimeout(() => {
      setPending(false)
      if (preview === 'save-failure') {
        setNotice('Could not save this home. Try again.')
        return
      }
      const next = !saved
      toggleSaved(listing.id)
      setNotice(next ? 'Home saved.' : 'Removed from saved homes.')
    }, 450)
  }

  function changePreview(next: PreviewState) {
    if (timer.current) clearTimeout(timer.current)
    setPending(false)
    setNotice('')
    setContact(null)
    setPreview(next)
  }

  return (
    <>
      <SiteHeader savedCount={savedIds.length} />
      <main id="main-content" className="container listing-main" tabIndex={-1}>
        {!isDetail || preview === 'not-found' ? <ListingNotFound /> : preview === 'loading' ? <ListingLoading /> : (
          <>
            <ListingHeading listing={listing} saved={saved} pending={pending} notice={notice} onSave={saveHome} />
            {listing.status !== 'active' && <p className="unavailable-banner" role="status">This home is currently paused.</p>}
            <div className="listing-layout">
              <ListingPhotoGallery photo={listing.photo} caption={`${listing.location.neighborhood}, ${listing.location.city} · ${listing.type}`} />
              <InquiryCard listing={listing} onContact={setContact} />
              <AboutHomeSection listing={listing} />
              <MatchExplanationPanel match={listing.match} />
              <CostBreakdownPanel costs={listing.costs} />
            </div>
          </>
        )}
      </main>
      {isDetail && showReviewControls && <MockupControls state={preview} onChange={changePreview} />}
      {contact && <ContactPreview action={contact} listing={listing} onClose={() => setContact(null)} />}
    </>
  )
}
