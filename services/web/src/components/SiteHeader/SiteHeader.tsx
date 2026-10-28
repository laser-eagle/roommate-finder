import { useRef, useState } from 'react'
import { Icon } from '../Icon'
import './SiteHeader.css'

const navigation = [
  ['Homes', '/listings'], ['Roommates', '/roommates'], ['Community', '/community'],
  ['For managers', '/managers'], ['Saved', '/saved'], ['Account', '/account/personal'],
] as const
const authLinks = [['Log in', '/login'], ['Sign up', '/signup']] as const
const authPaths = ['/', '/login', '/signup']

export function SiteHeader({ savedCount }: { savedCount: number }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const isHome = pathname.startsWith('/listings/')
  const showAuth = authPaths.includes(pathname)

  return (
    <header className="site-header">
      <a className="button skip-link" href="#main-content">Skip to content</a>
      <div className="container header-inner" onKeyDown={(event) => {
        if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
      }}>
        <a className="wordmark" href="/">roommate finder<span aria-hidden="true">.</span></a>
        <button ref={menuButton} className="menu-button" aria-controls="site-navigation" aria-expanded={open}
          onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}<Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav id="site-navigation" className={open ? 'site-navigation is-open' : 'site-navigation'} aria-label="Main">
          {navigation.map(([label, href], index) => (
            <a key={href} href={href} className={index === 4 ? 'account-start' : undefined}
              aria-current={(pathname === href || (label === 'Homes' && isHome) || (label === 'For managers' && pathname.startsWith('/managers/')) || (label === 'Account' && /^\/accounts?(\/|$)/.test(pathname))) ? 'page' : undefined}>
              {label === 'Saved' && <Icon name="heart" filled={savedCount > 0} />}
              {label}{label === 'Saved' && savedCount > 0 && <span className="saved-count">{savedCount}</span>}
            </a>
          ))}
          {showAuth && authLinks.map(([label, href]) => (
            <a key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
