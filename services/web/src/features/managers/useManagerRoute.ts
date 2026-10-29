import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'

export const managerPaths = {
  listings: '/managers/listings', vacant: '/managers/vacant', notices: '/managers/notices',
  inquiries: '/managers/inquiries', tours: '/managers/tours', applications: '/managers/applications', maintenance: '/managers/maintenance',
  'pending-inquiries': '/managers/inquiries/pending', 'pending-tours': '/managers/tours/pending',
} as const
export type ManagerPage = keyof typeof managerPaths

function readRoute(): { page: ManagerPage | 'not-found'; listingId: string } {
  const path = window.location.pathname.replace(/\/+$/, '')
  const page = path === '/managers' ? 'listings' : (Object.keys(managerPaths) as ManagerPage[]).find((key) => managerPaths[key] === path)
  return { page: page ?? 'not-found', listingId: new URLSearchParams(window.location.search).get('listing') ?? '' }
}

export function useManagerRoute() {
  const [route, setRoute] = useState(readRoute)
  useEffect(() => {
    const onPopState = () => setRoute(readRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function goTo(page: ManagerPage, listingId = '') {
    const url = `${managerPaths[page]}${listingId ? `?listing=${encodeURIComponent(listingId)}` : ''}`
    if (`${window.location.pathname}${window.location.search}` !== url) window.history.pushState(null, '', url)
    setRoute({ page, listingId })
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#ops-content h1')?.focus())
  }

  function followLink(event: MouseEvent<HTMLAnchorElement>, page: ManagerPage) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    goTo(page)
  }
  return { ...route, goTo, followLink }
}
