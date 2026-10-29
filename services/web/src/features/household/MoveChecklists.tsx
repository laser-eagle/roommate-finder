import { useState } from 'react'
import { conditionRooms } from './household.data'
import type { MoveChecklist } from './household.data'

export function MoveChecklists({ checklists, onChecklist }: { checklists: MoveChecklist[]; onChecklist: (checklist: MoveChecklist) => void }) {
  const [activeId, setActiveId] = useState<MoveChecklist['id']>('move-in')
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [readings, setReadings] = useState<Record<string, { electricity: string; water: string; date: string; saved: boolean }>>({})
  const checklist = checklists.find((entry) => entry.id === activeId)!
  const done = checklist.items.filter((item) => item.done).length
  const reading = readings[checklist.id] ?? { electricity: '', water: '', date: '', saved: false }
  const setReading = (change: Partial<typeof reading>) => setReadings((current) => ({ ...current, [checklist.id]: { ...reading, saved: false, ...change } }))
  const update = (id: string, change: Partial<MoveChecklist['items'][number]>) => onChecklist({ ...checklist, items: checklist.items.map((item) => item.id === id ? { ...item, ...change } : item) })

  return <div className="household-checklists">
    <div className="household-switch" role="group" aria-label="Checklist">{checklists.map((entry) => <button key={entry.id} type="button" aria-pressed={entry.id === activeId} onClick={() => setActiveId(entry.id)}>{entry.label}</button>)}</div>
    <p className="household-checklist-summary"><strong>{checklist.label} · {checklist.date}</strong><span className="small muted">{done} of {checklist.items.length} items complete</span></p>
    <div className="household-checklist-grid">
      <section className="household-panel" aria-labelledby="checklist-dates"><h2 id="checklist-dates">Important dates</h2>
        <dl className="household-dates">{checklist.dates.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.date}</dd></div>)}</dl>
      </section>
      {(['Task', 'Key handoff'] as const).map((kind) => <section key={kind} className="household-panel" aria-labelledby={`checklist-${kind}`}>
        <h2 id={`checklist-${kind}`}>{kind === 'Task' ? 'Tasks' : 'Key handoffs'}</h2>
        <ul className="household-items">{checklist.items.filter((item) => item.kind === kind).map((item) => <li key={item.id}>
          <div className="household-item-main">
            <label className="household-check"><input type="checkbox" checked={item.done} onChange={() => update(item.id, { done: !item.done })} /><span className={item.done ? 'is-done' : undefined}>{item.text}</span></label>
            <p className="small muted">{item.assignee} · Due {item.due}</p>
            {item.document && <p className="small">Attached: {item.document}</p>}
          </div>
          <label className="household-attach">Attach document<input type="file" className="sr-only" onChange={(event) => update(item.id, { document: event.target.files?.[0]?.name })} /></label>
        </li>)}</ul>
      </section>)}
      <section className="household-panel" aria-labelledby="checklist-photos"><h2 id="checklist-photos">Condition photos</h2>
        <ul className="household-items">{conditionRooms.map((room) => { const key = `${checklist.id}-${room}`; return <li key={room}>
          <div className="household-item-main"><p>{room}</p><p className="small muted">{photos[key]?.length ? photos[key].join(', ') : 'No photos added'}</p></div>
          <label className="household-attach">Add photos<input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => setPhotos((current) => ({ ...current, [key]: [...(event.target.files ?? [])].map((file) => file.name) }))} /></label>
        </li> })}</ul>
      </section>
      <section className="household-panel" aria-labelledby="checklist-meters"><h2 id="checklist-meters">Meter readings</h2>
        <form className="household-item-form" onSubmit={(event) => { event.preventDefault(); setReading({ saved: true }) }}>
          <label>Electricity (kWh)<input name="electricity" type="number" min="0" value={reading.electricity} onChange={(event) => setReading({ electricity: event.target.value })} /></label>
          <label>Water<input name="water" type="number" min="0" value={reading.water} onChange={(event) => setReading({ water: event.target.value })} /></label>
          <label>Reading date<input name="reading-date" type="date" value={reading.date} onChange={(event) => setReading({ date: event.target.value })} /></label>
          <div className="household-form-actions"><button type="submit" className="button button-primary">Save readings</button><span className="small" role="status">{reading.saved ? 'Readings saved.' : ''}</span></div>
        </form>
      </section>
    </div>
  </div>
}
