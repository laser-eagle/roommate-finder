import { Icon } from '../Icon'
import './StudentBadge.css'

export function StudentBadge({ detail }: { detail?: string }) {
  return <span className="student-badge"><Icon name="verified" />Verified student{detail && <span className="student-badge-detail"> · {detail}</span>}</span>
}
