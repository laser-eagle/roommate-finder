import type { PreviewState } from '../listing.types'

const previewStates: { value: PreviewState; label: string }[] = [
  { value: 'default', label: 'Available listing' },
  { value: 'missing-photo', label: 'Photo unavailable' },
  { value: 'unknown-costs', label: 'Unknown monthly fees' },
  { value: 'unavailable', label: 'Listing paused' },
  { value: 'unconfirmed', label: 'Unconfirmed availability & authorization' },
  { value: 'no-match', label: 'No personalized search' },
  { value: 'save-failure', label: 'Save failure' },
  { value: 'contact-blocked', label: 'Contact unavailable' },
  { value: 'loading', label: 'Loading' },
  { value: 'not-found', label: 'Listing not found' },
]

export function MockupControls({ state, onChange }: { state: PreviewState; onChange: (state: PreviewState) => void }) {
  return (
    <aside className="mockup-controls container" aria-label="Listing display states">
      <span className="eyebrow">Display state</span>
      <label className="small">State
        <select value={state} onChange={(event) => onChange(event.target.value as PreviewState)}>
          {previewStates.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
    </aside>
  )
}
