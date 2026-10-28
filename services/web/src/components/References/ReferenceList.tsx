import './References.css'

export type Reference = {
  id: string
  author: string
  relationship: 'Former roommate' | 'Former landlord'
  date: string
  text: string
}

export function ReferenceList({ references }: { references: Reference[] }) {
  if (!references.length) return <p className="small muted reference-empty">No references yet.</p>
  return <ul className="reference-list">
    {references.map((reference) => <li key={reference.id} className="reference-item">
      <div>
        <p className="reference-author">{reference.author}</p>
        <p className="small muted">{reference.relationship} · {reference.date}</p>
      </div>
      <p className="small reference-text">{reference.text}</p>
      <button type="button" className="reference-report" aria-label={`Report reference from ${reference.author}`}>Report</button>
    </li>)}
  </ul>
}
