import { useEffect } from 'react'
import type { FormEvent } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { useSavedHomes } from '../discovery/useSavedHomes'
import './AuthForm.css'

export function LogInView() {
  const { savedIds } = useSavedHomes()
  useEffect(() => {
    const previous = document.title
    document.title = 'Log in | Roommate Finder'
    return () => { document.title = previous }
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.assign('/listings')
  }

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container auth-main">
    <section className="auth-panel" aria-labelledby="login-heading">
      <h1 id="login-heading">Log in</h1>
      <form className="auth-form" noValidate onSubmit={submit}>
        <label>Email<input name="email" type="email" autoComplete="email" /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" /></label>
        <button className="button button-primary" type="submit">Log in</button>
      </form>
      <p className="small muted auth-switch">Don’t have an account? <a href="/signup">Sign up</a></p>
    </section>
  </main></>
}
