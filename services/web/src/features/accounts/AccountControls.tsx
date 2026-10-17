import { useId } from 'react'
import { Icon } from '../../components/Icon'

export function AccountSaveBar({ dirty, onDiscard }: { dirty: boolean; onDiscard: () => void }) {
  return <div className="account-save-bar">
    <span className="small muted">{dirty ? 'Unsaved changes' : 'No unsaved changes'}</span>
    <div><button type="button" className="account-text-button" disabled={!dirty} onClick={onDiscard}>Discard</button>
      <button type="submit" className="button button-primary" disabled={!dirty}>Save changes</button></div>
  </div>
}

export function AccountToggle({ title, description, checked, onChange }: {
  title: string; description: string; checked: boolean; onChange: (checked: boolean) => void
}) {
  const id = useId()
  return <div className="account-toggle-row">
    <div><label id={`${id}-label`} htmlFor={id}>{title}</label><p id={`${id}-description`} className="small muted">{description}</p></div>
    <button id={id} type="button" role="switch" aria-checked={checked} aria-labelledby={`${id}-label`}
      aria-describedby={`${id}-description`} className="account-switch" onClick={() => onChange(!checked)}>
      <span>{checked && <Icon name="check" />}</span>
    </button>
  </div>
}
