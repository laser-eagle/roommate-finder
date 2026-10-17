import { useState } from 'react'
import type { FormEvent } from 'react'
import { PreviewDialog } from '../../components/PreviewDialog/PreviewDialog'
import type { Inquiry, ManagedListing, ManagerDialog as DialogState, Tour } from './managers.mock'

export function ManagerDialog({ dialog, listings, onClose, onSaveListing, onReply, onConfirmTour }: {
  dialog: DialogState
  listings: ManagedListing[]
  onClose: () => void
  onSaveListing: (listing: ManagedListing) => void
  onReply: (inquiryId: string, reply: string) => void
  onConfirmTour: (tourId: string) => void
}) {
  if (dialog.type === 'listing') return <ListingEditor listing={dialog.listing} onClose={onClose} onSave={onSaveListing} />
  if (dialog.type === 'inquiry') return <InquiryPreview inquiry={dialog.inquiry} home={listings.find((listing) => listing.id === dialog.inquiry.listingId)?.title ?? 'Listing unavailable'} onClose={onClose} onReply={onReply} />
  return <TourPreview tour={dialog.tour} home={listings.find((listing) => listing.id === dialog.tour.listingId)?.title ?? 'Listing unavailable'} onClose={onClose} onConfirm={onConfirmTour} />
}

function ListingEditor({ listing, onClose, onSave }: { listing: ManagedListing | null; onClose: () => void; onSave: (listing: ManagedListing) => void }) {
  const [error, setError] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = String(data.get('title')).trim()
    const neighborhood = String(data.get('neighborhood')).trim()
    if (!title || !neighborhood) { setError('Enter a listing name and neighborhood.'); return }
    onSave({
      id: listing?.id ?? `draft-${crypto.randomUUID()}`, title, neighborhood,
      type: String(data.get('type')) as ManagedListing['type'],
      rent: Math.round(Number(data.get('rent')) * 100), available: String(data.get('available')),
      status: listing?.status ?? 'Draft', photo: listing?.photo ?? null,
    })
  }
  return <PreviewDialog title={listing ? 'Edit listing' : 'Create listing draft'} onClose={onClose}>
    <p className="small muted">{listing ? 'Update the listing details.' : 'Enter the listing details to create a draft.'}</p>
    <form onSubmit={submit}>
      <label>Listing name<input name="title" required maxLength={80} defaultValue={listing?.title} placeholder="Ballard private room" /></label>
      <label>Neighborhood and city<input name="neighborhood" required maxLength={80} defaultValue={listing?.neighborhood} placeholder="Ballard, Seattle" /></label>
      <label>Listing type<select name="type" defaultValue={listing?.type ?? 'Private room'}><option>Private room</option><option>Apartment</option><option>Sublet</option></select></label>
      <div className="manager-form-row"><label>Monthly base rent ($)<input name="rent" type="number" required min="1" max="100000" step="0.01" defaultValue={listing ? listing.rent / 100 : undefined} placeholder="1180" /></label><label>Available from<input name="available" type="date" required defaultValue={listing?.available} /></label></div>
      <p className="small muted">Review fees, utilities, photos, and listing authorization before publishing.</p>
      {error && <p role="alert" className="small">{error}</p>}
      <button className="button button-primary" type="submit">{listing ? 'Save changes' : 'Save draft'}</button>
    </form>
  </PreviewDialog>
}

function InquiryPreview({ inquiry, home, onClose, onReply }: { inquiry: Inquiry; home: string; onClose: () => void; onReply: (id: string, reply: string) => void }) {
  const [reply, setReply] = useState(inquiry.reply)
  const [error, setError] = useState('')
  return <PreviewDialog title={`Inquiry from ${inquiry.name}`} onClose={onClose}>
    <p className="small muted">{home} · {inquiry.received}</p>
    <blockquote className="manager-message">{inquiry.message}</blockquote>
    <form onSubmit={(event) => { event.preventDefault(); if (!reply.trim()) { setError('Enter a reply before sending.'); return } onReply(inquiry.id, reply.trim()) }}>
      <label>Your reply<textarea required maxLength={1000} value={reply} onChange={(event) => { setReply(event.target.value); setError('') }} placeholder="Enter your reply" /></label>
      {error && <p className="small" role="alert">{error}</p>}
      <button className="button button-primary" type="submit">Send reply</button>
    </form>
  </PreviewDialog>
}

function TourPreview({ tour, home, onClose, onConfirm }: { tour: Tour; home: string; onClose: () => void; onConfirm: (id: string) => void }) {
  return <PreviewDialog title={`Tour ${tour.confirmed ? 'details' : 'request'}: ${tour.name}`} onClose={onClose}>
    <p className="small muted">{home}</p>
    <dl className="manager-tour-details"><div><dt>Date</dt><dd>{tour.date}</dd></div><div><dt>Time</dt><dd>{tour.time}</dd></div><div><dt>Tour type</dt><dd>{tour.mode}</dd></div><div><dt>Status</dt><dd>{tour.confirmed ? 'Confirmed' : 'Awaiting confirmation'}</dd></div></dl>
    <button className="button button-primary manager-dialog-action" onClick={() => tour.confirmed ? onClose() : onConfirm(tour.id)}>{tour.confirmed ? 'Close' : 'Confirm tour'}</button>
  </PreviewDialog>
}
