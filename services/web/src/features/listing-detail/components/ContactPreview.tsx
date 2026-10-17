import { useState } from 'react'
import { PreviewDialog } from '../../../components/PreviewDialog/PreviewDialog'
import type { ContactAction, Listing } from '../listing.types'

export function ContactPreview({ action, listing, onClose }: {
  action: ContactAction; listing: Listing; onClose: () => void
}) {
  const [complete, setComplete] = useState(false)
  const isTour = action === 'tour'
  const recipient = listing.type === 'Apartment' ? 'property manager' : 'household'
  return (
    <PreviewDialog title={complete ? (isTour ? 'Tour request sent' : 'Message sent') : (isTour ? 'Request a tour' : `Message the ${recipient}`)} onClose={onClose}>
      <p className="dialog-context small">{listing.title}<br /><span className="muted">{listing.location.neighborhood}, {listing.location.city} · {listing.type}</span></p>
      {complete ? (
        <div className="dialog-confirmation" role="status">
          <p>{isTour ? `The ${recipient} will review your request and confirm a time with you.` : `We sent your message to the ${recipient}.`}</p>
          <p className="small muted">{isTour ? 'Your tour is not confirmed yet.' : 'You’ll receive a notification when they reply.'}</p>
          <button className="button button-primary" onClick={onClose} autoFocus>Back to the home</button>
        </div>
      ) : (
        <>
          <p className="small muted">{isTour ? `Choose a date to visit. The ${recipient} will confirm a time with you.` : 'Introduce yourself and ask a question about the home.'}</p>
          <form onSubmit={(event) => { event.preventDefault(); setComplete(true) }}>
            {isTour && <label>Preferred date<input type="date" required min={listing.availability.confirmed ? listing.availability.localDate : undefined} /></label>}
            <label>{isTour ? `A note for the ${recipient} (optional)` : 'Your message'}
              <textarea required={!isTour} maxLength={1000} placeholder={isTour ? 'What would you like to know about the home?' : 'Introduce yourself and ask about the home.'} />
            </label>
            <button className="button button-primary" type="submit">{isTour ? 'Send tour request' : 'Send message'}</button>
          </form>
        </>
      )}
    </PreviewDialog>
  )
}
