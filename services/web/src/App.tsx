import { ListingDetailView } from './features/listing-detail/ListingDetailView'
import { ManagersView } from './features/managers/ManagersView'
import { AccountsView } from './features/accounts/AccountsView'
import { DiscoveryView } from './features/discovery/DiscoveryView'
import { WelcomeView } from './features/auth/WelcomeView'
import { SignUpView } from './features/auth/SignUpView'
import { LogInView } from './features/auth/LogInView'
import { BusinessProfileView } from './features/business/BusinessProfileView'
import { ShortlistView } from './features/shortlist/ShortlistView'
import { ApplicationFormView } from './features/applications/ApplicationFormView'
import { ApplicationsView } from './features/applications/ApplicationsView'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return <WelcomeView />
  if (path === '/signup') return <SignUpView />
  if (path === '/login') return <LogInView />
  if (/^\/business(\/|$)/.test(path)) return <BusinessProfileView />
  if (path === '/shortlist') return <ShortlistView />
  if (/^\/listings\/[^/]+\/apply$/.test(path)) return <ApplicationFormView />
  if (path === '/applications') return <ApplicationsView />
  if (/^\/accounts?(\/|$)/.test(path)) return <AccountsView />
  if (/^\/managers(\/|$)/.test(path)) return <ManagersView />
  if (path === '/listings' || path === '/saved' || path === '/roommates' || path === '/community') {
    return <DiscoveryView page={path.slice(1) as 'listings' | 'saved' | 'roommates' | 'community'} />
  }
  return <ListingDetailView />
}
