import { useState } from 'react'
import type { FormEvent } from 'react'
import { agreementCategories, householdMembers, isTask } from './household.data'
import type { AgreementCategory, AgreementItem } from './household.data'

const sectionTitles: Record<AgreementCategory, string> = { Expectation: 'Expectations', 'Shared-space rule': 'Shared-space rules', Chore: 'Chores', Responsibility: 'Responsibilities' }

function ItemForm({ item, onSave, onCancel }: { item?: AgreementItem; onSave: (item: Omit<AgreementItem, 'id'>) => void; onCancel?: () => void }) {
  const [category, setCategory] = useState<AgreementCategory>(item?.category ?? 'Expectation')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = String(form.get('text') ?? '').trim()
    if (!text) return
    onSave(isTask(category) ? { category, text, assignee: String(form.get('assignee')), when: String(form.get('when') ?? '').trim(), done: item?.done ?? false } : { category, text })
    if (!item) event.currentTarget.reset()
  }
  return <form className="household-item-form" onSubmit={submit}>
    <label>Type<select value={category} onChange={(event) => setCategory(event.target.value as AgreementCategory)}>{agreementCategories.map((value) => <option key={value}>{value}</option>)}</select></label>
    <label>Description<input name="text" type="text" defaultValue={item?.text} maxLength={200} /></label>
    {isTask(category) && <>
      <label>Assigned to<select name="assignee" defaultValue={item?.assignee ?? householdMembers[0]}>{householdMembers.map((member) => <option key={member}>{member}</option>)}</select></label>
      <label>When<input name="when" type="text" placeholder="For example, every Sunday" defaultValue={item?.when} /></label>
    </>}
    <div className="household-form-actions">
      <button type="submit" className="button button-primary">{item ? 'Save item' : 'Add item'}</button>
      {onCancel && <button type="button" className="button" onClick={onCancel}>Cancel</button>}
    </div>
  </form>
}

export function HouseholdAgreement({ items, onItems, sharedAt, onShare }: {
  items: AgreementItem[]; onItems: (items: AgreementItem[]) => void; sharedAt: string; onShare: () => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const others = householdMembers.slice(1).join(', ')
  return <div className="household-agreement">
    <div className="household-share">
      <p className="small muted">{sharedAt ? `Shared with ${others} · ${sharedAt}` : `Not shared yet. Members: ${householdMembers.join(', ')}.`}</p>
      <button type="button" className="button" onClick={onShare}>Share with group</button>
    </div>
    {agreementCategories.map((category) => <section key={category} className="household-panel" aria-labelledby={`agreement-${category}`}>
      <h2 id={`agreement-${category}`}>{sectionTitles[category]}</h2>
      <ul className="household-items">{items.filter((item) => item.category === category).map((item) => <li key={item.id}>
        {editingId === item.id ? <ItemForm item={item} onCancel={() => setEditingId(null)} onSave={(next) => { onItems(items.map((entry) => entry.id === item.id ? { ...next, id: item.id } : entry)); setEditingId(null) }} /> : <>
          <div className="household-item-main">
            {isTask(item.category) ? <label className="household-check"><input type="checkbox" checked={!!item.done} onChange={() => onItems(items.map((entry) => entry.id === item.id ? { ...entry, done: !entry.done } : entry))} /><span className={item.done ? 'is-done' : undefined}>{item.text}</span></label> : <p>{item.text}</p>}
            {isTask(item.category) && <p className="small muted">{item.assignee}{item.when ? ` · ${item.when}` : ''}</p>}
          </div>
          <div className="household-item-actions">
            <button type="button" className="household-text-button" onClick={() => setEditingId(item.id)} aria-label={`Edit: ${item.text}`}>Edit</button>
            <button type="button" className="household-text-button" onClick={() => onItems(items.filter((entry) => entry.id !== item.id))} aria-label={`Remove: ${item.text}`}>Remove</button>
          </div>
        </>}
      </li>)}</ul>
    </section>)}
    <section className="household-panel" aria-labelledby="agreement-add"><h2 id="agreement-add">Add an item</h2>
      <ItemForm onSave={(next) => onItems([...items, { ...next, id: `item-${Date.now()}` }])} />
    </section>
  </div>
}
