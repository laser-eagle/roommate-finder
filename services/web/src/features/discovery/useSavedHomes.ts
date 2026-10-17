import { useEffect, useState } from 'react'

const storageKey = 'roommate-finder:saved-homes'

function readSavedHomes(): string[] {
  try {
    const stored = sessionStorage.getItem(storageKey)
    if (stored) {
      const ids: unknown = JSON.parse(stored)
      if (Array.isArray(ids)) return [...new Set(ids.filter((id): id is string => typeof id === 'string'))]
    }
    return sessionStorage.getItem('roommate-finder:mock:ballard-room:saved') === 'true' ? ['ballard-room'] : []
  } catch { return [] }
}

export function useSavedHomes() {
  const [savedIds, setSavedIds] = useState(readSavedHomes)
  useEffect(() => {
    try { sessionStorage.setItem(storageKey, JSON.stringify(savedIds)) } catch { /* Current page remains usable. */ }
  }, [savedIds])

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }
  return { savedIds, toggleSaved }
}
