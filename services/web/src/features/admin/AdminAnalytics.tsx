import { allListingViews, listingPerformance, notificationDelivery, overallResponse, recentSearchFailures, responseTimes, searchRuns, successfulMatches } from './analytics.data'

const number = (value: number) => value.toLocaleString('en-US')
const percent = (part: number, whole: number) => `${(whole ? (part / whole) * 100 : 0).toFixed(1)}%`

export function AdminAnalytics() {
  const matches = successfulMatches.reduce((sum, item) => sum + item.count, 0)
  const sent = notificationDelivery.reduce((sum, item) => sum + item.sent, 0)
  const delivered = notificationDelivery.reduce((sum, item) => sum + item.delivered, 0)
  const tiles = [
    { label: 'Listing views', value: number(allListingViews), detail: 'All listings' },
    { label: 'Median first reply', value: `${overallResponse.medianHours} h`, detail: `${overallResponse.within24h}% within 24 hours` },
    { label: 'Successful matches', value: number(matches), detail: 'Connections, approvals, and leases' },
    { label: 'Search failure rate', value: percent(searchRuns.failures, searchRuns.runs), detail: `${searchRuns.failures} of ${number(searchRuns.runs)} runs` },
    { label: 'Notification delivery', value: percent(delivered, sent), detail: `${number(delivered)} of ${number(sent)} delivered` },
  ]

  return <>
    <section className="admin-metrics" aria-label="Summary">{tiles.map((tile) => <div key={tile.label}><span>{tile.label}</span><strong>{tile.value}</strong><small>{tile.detail}</small></div>)}</section>
    <div className="admin-analytics-grid">
      <section className="ops-panel admin-analytics-wide" aria-labelledby="analytics-listings"><div className="ops-panel-title"><h2 id="analytics-listings">Listing performance</h2><span>Top five by views</span></div>
        <table className="ops-table admin-analytics-table"><caption className="sr-only">Views, saves, inquiries, and applications by listing</caption>
          <thead><tr><th scope="col">Listing</th><th scope="col">Views</th><th scope="col">Saves</th><th scope="col">Inquiries</th><th scope="col">Applications</th></tr></thead>
          <tbody>{listingPerformance.map((listing) => <tr key={listing.id}><th scope="row">{listing.title}</th><td data-label="Views">{number(listing.views)}</td><td data-label="Saves">{listing.saves}</td><td data-label="Inquiries">{listing.inquiries}</td><td data-label="Applications">{listing.applications}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="ops-panel" aria-labelledby="analytics-response"><div className="ops-panel-title"><h2 id="analytics-response">Response times</h2><span>First reply to an inquiry</span></div>
        <table className="ops-table admin-analytics-table"><caption className="sr-only">Median first reply and replies within 24 hours by lister type</caption>
          <thead><tr><th scope="col">Lister type</th><th scope="col">Median</th><th scope="col">Within 24 h</th></tr></thead>
          <tbody>{responseTimes.map((row) => <tr key={row.group}><th scope="row">{row.group}</th><td data-label="Median">{row.medianHours} h</td><td data-label="Within 24 h">{row.within24h}%</td></tr>)}</tbody>
        </table>
      </section>
      <section className="ops-panel" aria-labelledby="analytics-matches"><div className="ops-panel-title"><h2 id="analytics-matches">Successful matches</h2><span>{matches} total</span></div>
        <table className="ops-table admin-analytics-table"><caption className="sr-only">Successful matches by type</caption>
          <thead><tr><th scope="col">Match</th><th scope="col">Count</th></tr></thead>
          <tbody>{successfulMatches.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td data-label="Count">{row.count}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="ops-panel" aria-labelledby="analytics-searches"><div className="ops-panel-title"><h2 id="analytics-searches">Automated-search failures</h2><span>{searchRuns.failures} of {number(searchRuns.runs)} runs</span></div>
        <table className="ops-table admin-analytics-table"><caption className="sr-only">Recent automated-search failures</caption>
          <thead><tr><th scope="col">Saved search</th><th scope="col">Cause</th><th scope="col">Outcome</th></tr></thead>
          <tbody>{recentSearchFailures.map((row) => <tr key={row.id}><th scope="row">{row.search}<small>{row.ranAt}</small></th><td data-label="Cause">{row.cause}</td><td data-label="Outcome">{row.outcome}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="ops-panel" aria-labelledby="analytics-notifications"><div className="ops-panel-title"><h2 id="analytics-notifications">Notification delivery</h2><span>By channel</span></div>
        <table className="ops-table admin-analytics-table"><caption className="sr-only">Notifications sent, delivered, and failed by channel</caption>
          <thead><tr><th scope="col">Channel</th><th scope="col">Sent</th><th scope="col">Failed</th><th scope="col">Delivered</th></tr></thead>
          <tbody>{notificationDelivery.map((row) => <tr key={row.channel}><th scope="row">{row.channel}</th><td data-label="Sent">{number(row.sent)}</td><td data-label="Failed">{number(row.sent - row.delivered)}</td><td data-label="Delivered">{percent(row.delivered, row.sent)}</td></tr>)}</tbody>
        </table>
      </section>
    </div>
  </>
}
