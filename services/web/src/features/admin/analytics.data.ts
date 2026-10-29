export const analyticsRange = 'Last 30 days · Sep 30 – Oct 29, 2026'

export const listingPerformance = [
  { id: 'ballard-room', title: 'A quiet room to make your own.', views: 1240, saves: 96, inquiries: 18, applications: 4 },
  { id: 'capitol-hill-sublet', title: 'A furnished room on Capitol Hill.', views: 980, saves: 74, inquiries: 12, applications: 3 },
  { id: 'green-lake-studio', title: 'A studio near Green Lake.', views: 860, saves: 61, inquiries: 9, applications: 2 },
  { id: 'greenwood-101', title: 'Greenwood one-bedroom', views: 640, saves: 38, inquiries: 7, applications: 2 },
  { id: 'fremont-302', title: 'Fremont two-bedroom', views: 520, saves: 29, inquiries: 6, applications: 1 },
]
export const allListingViews = 4820

export const responseTimes = [
  { group: 'Property managers', medianHours: 2.6, within24h: 89 },
  { group: 'Roommate households', medianHours: 3.9, within24h: 80 },
  { group: 'Individual landlords', medianHours: 5.1, within24h: 71 },
]
export const overallResponse = { medianHours: 3.4, within24h: 82 }

export const successfulMatches = [
  { label: 'Roommate connections accepted', count: 21 },
  { label: 'Applications approved', count: 11 },
  { label: 'Leases signed', count: 5 },
]

export const searchRuns = { runs: 2160, failures: 39 }
export const recentSearchFailures = [
  { id: 'fail-apt', ranAt: 'Oct 25, 2026, 8:00 AM', search: 'Apartments under $1,800', cause: 'Listing search timed out', outcome: 'Retried' },
  { id: 'fail-room', ranAt: 'Oct 25, 2026, 8:00 AM', search: 'Private rooms in Ballard', cause: 'Listing search timed out', outcome: 'Retried' },
]

export const notificationDelivery = [
  { channel: 'In-app', sent: 6400, delivered: 6400 },
  { channel: 'Email', sent: 3100, delivered: 3010 },
  { channel: 'Web push', sent: 1450, delivered: 1320 },
  { channel: 'SMS', sent: 420, delivered: 409 },
]
