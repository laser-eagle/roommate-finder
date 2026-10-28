import { useEffect } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { useSavedHomes } from '../discovery/useSavedHomes'
import './WelcomeView.css'

export function WelcomeView() {
  const { savedIds } = useSavedHomes()
  useEffect(() => {
    const previous = document.title
    document.title = 'Welcome | Roommate Finder'
    return () => { document.title = previous }
  }, [])
  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container welcome-main">
    <section className="welcome-intro" aria-labelledby="welcome-heading">
      <h1 id="welcome-heading">Welcome to Roommate Finder</h1>
      <p className="welcome-lead">Roommate Finder is a housing and roommate-finding platform designed to support students, renters, landlords, and property managers within a campus-centered housing network.</p>
      <p className="muted">It focuses on students searching for off-campus housing near their university. Students may need a place to live, already have a place and need a roommate, or want to form a roommate group before searching for housing together.</p>
      <div className="welcome-actions">
        <a className="button button-primary" href="/signup">Sign up</a>
        <a className="button" href="/login">Log in</a>
      </div>
    </section>
  </main></>
}
