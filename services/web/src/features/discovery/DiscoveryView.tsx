import { useEffect } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { HomesBrowse } from './HomesBrowse'
import { RoommatesBrowse } from './RoommatesBrowse'
import { CommunityFeed } from './CommunityFeed'
import { useSavedHomes } from './useSavedHomes'
import './DiscoveryView.css'

export function DiscoveryView({ page }: { page: 'listings' | 'saved' | 'roommates' | 'community' }) {
  const { savedIds, toggleSaved } = useSavedHomes()
  useEffect(() => {
    const previous = document.title
    const title = { listings: 'Find a home', saved: 'Saved homes', roommates: 'Find a roommate', community: 'Community' }[page]
    document.title = `${title} | Roommate Finder`
    return () => { document.title = previous }
  }, [page])
  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container discovery-main">
    {page === 'roommates' ? <RoommatesBrowse /> : page === 'community' ? <CommunityFeed /> : <HomesBrowse savedOnly={page === 'saved'} savedIds={savedIds} onSave={toggleSaved} />}
  </main></>
}
