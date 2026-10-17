import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../Icon'
import './PreviewDialog.css'

export function PreviewDialog({ title, children, onClose }: {
  title: string; children: ReactNode; onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const previous = document.activeElement
    const element = dialog.current!
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  return (
    <dialog ref={dialog} className="preview-dialog" aria-labelledby="dialog-title" onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const targets = [...event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href]',
        )]
        const first = targets[0]
        const last = targets[targets.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}>
      <div className="dialog-heading">
        <span className="eyebrow muted">Roommate finder</span>
        <button className="dialog-close" aria-label="Close dialog" onClick={onClose} autoFocus>
          <Icon name="close" />
        </button>
      </div>
      <h2 id="dialog-title">{title}</h2>
      {children}
    </dialog>
  )
}
