import { ListingDetailView } from './features/listing-detail/ListingDetailView'
import { ManagersView } from './features/managers/ManagersView'
import { AccountsView } from './features/accounts/AccountsView'
import { DiscoveryView } from './features/discovery/DiscoveryView'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (/^\/accounts?(\/|$)/.test(path)) return <AccountsView />
  if (/^\/managers(\/|$)/.test(path)) return <ManagersView />
  if (path === '/listings' || path === '/saved' || path === '/roommates' || path === '/community') {
    return <DiscoveryView page={path.slice(1) as 'listings' | 'saved' | 'roommates' | 'community'} />
  }
  return <ListingDetailView />
}
