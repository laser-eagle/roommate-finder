import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { accountSections } from './accounts.mock'
import type { AccountSection } from './accounts.mock'

function currentSection() {
  const path = window.location.pathname.replace(/\/+$/, '').replace(/^\/accounts(?=\/|$)/, '/account')
  return accountSections.find((item) => item.path === (path === '/account' ? '/account/personal' : path))
}

export function useAccountRoute(onNavigate: () => void) {
  const [section, setSection] = useState<AccountSection | undefined>(() => currentSection()?.id)

  useEffect(() => {
    const route = currentSection()
    if (route && window.location.pathname !== route.path) {
      window.history.replaceState(null, '', `${route.path}${window.location.search}${window.location.hash}`)
    }
    function onPopState() {
      setSection(currentSection()?.id)
      onNavigate()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [onNavigate])

  function navigate(event: MouseEvent<HTMLAnchorElement>, next: AccountSection) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (next === section) return
    window.history.pushState(null, '', accountSections.find((item) => item.id === next)!.path)
    setSection(next)
    onNavigate()
  }

  return { section, navigate }
}
