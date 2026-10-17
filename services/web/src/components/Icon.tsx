type IconName = 'heart' | 'arrow' | 'check' | 'close' | 'menu' | 'home' | 'lock' | 'unlock' | 'edit' | 'verified' | 'list' | 'inbox' | 'calendar' | 'search'

const paths: Record<IconName, string> = {
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  check: 'm5 12 4 4L19 6',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  home: 'm3 10 9-7 9 7v11h-7v-7h-4v7H3Z',
  lock: 'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5Zm7 4v3',
  unlock: 'M7 10V7a5 5 0 0 1 9.5-2M5 10h14v11H5Zm7 4v3',
  edit: 'm15 4 5 5M4 20l5-1L21 7a2.1 2.1 0 0 0-5-5L4 14Z',
  verified: 'm12 2 3 2 3.5.5.5 3.5 2 4-2 3-.5 3.5-3.5.5-3 3-3-3-3.5-.5L4 15l-2-3 2-4 .5-3.5L8 4Zm-5 10 3 3 7-7',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  inbox: 'm3 4-2 10v6h22v-6L21 4ZM1 14h6l2 3h6l2-3h6',
  calendar: 'M4 5h16v16H4ZM4 10h16M8 2v6M16 2v6M8 14h2M14 14h2',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
}

export function Icon({ name, filled = false }: { name: IconName; filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}
