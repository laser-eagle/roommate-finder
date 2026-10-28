import { useEffect } from 'react'
import type { FormEvent } from 'react'
import { SiteHeader } from '../../components/SiteHeader/SiteHeader'
import { useSavedHomes } from '../discovery/useSavedHomes'
import './AuthForm.css'

type Role = 'renter' | 'roommate-seeker' | 'landlord' | 'property-manager'

const roles: { value: Role; label: string }[] = [
  { value: 'renter', label: 'Renter' },
  { value: 'roommate-seeker', label: 'Roommate seeker' },
  { value: 'landlord', label: 'Landlord' },
  { value: 'property-manager', label: 'Property manager' },
]

function signUpDestination(selected: Role[]) {
  if (selected.includes('renter') || selected.includes('roommate-seeker')) return '/listings'
  if (selected.includes('landlord') || selected.includes('property-manager')) return '/managers'
  return '/listings'
}

export function SignUpView() {
  const { savedIds } = useSavedHomes()
  useEffect(() => {
    const previous = document.title
    document.title = 'Sign up | Roommate Finder'
    return () => { document.title = previous }
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const selected = new FormData(event.currentTarget).getAll('role') as Role[]
    window.location.assign(signUpDestination(selected))
  }

  return <><SiteHeader savedCount={savedIds.length} /><main id="main-content" tabIndex={-1} className="container auth-main">
    <section className="auth-panel" aria-labelledby="signup-heading">
      <h1 id="signup-heading">Sign up</h1>
      <form className="auth-form" noValidate onSubmit={submit}>
        <label>Full name<input name="name" type="text" autoComplete="name" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" /></label>
        <label>Password<input name="password" type="password" autoComplete="new-password" /></label>
        <fieldset className="auth-roles">
          <legend>Roles</legend>
          <p className="small muted">Select one or more.</p>
          {roles.map((role) => <label key={role.value} className="auth-check">
            <input type="checkbox" name="role" value={role.value} />{role.label}
          </label>)}
        </fieldset>
        <button className="button button-primary" type="submit">Create account</button>
      </form>
      <p className="small muted auth-switch">Already have an account? <a href="/login">Log in</a></p>
    </section>
  </main></>
}
