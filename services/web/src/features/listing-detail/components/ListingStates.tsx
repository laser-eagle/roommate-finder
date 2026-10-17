export function ListingLoading() {
  return (
    <div className="loading-state" aria-busy="true" aria-label="Listing loading">
      <p role="status" className="muted">Loading listing details…</p>
      <div className="skeleton skeleton-title" /><div className="skeleton skeleton-subtitle" />
      <div className="skeleton-grid"><div className="skeleton" /><div className="skeleton" /></div>
    </div>
  )
}

export function ListingNotFound() {
  return <section className="empty-state"><span className="eyebrow muted">Listing unavailable</span><h1>This home could not be found.</h1><p className="muted">It may no longer be listed. Explore homes to find another place.</p><a className="button button-primary" href="/listings">Back to Homes</a></section>
}

