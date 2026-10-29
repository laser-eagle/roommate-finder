import type { ReportReason } from '../../components/ReportDialog/reports.data'

export type ReportStatus = 'Under review' | 'Hidden pending review' | 'Resolved: dismissed' | 'Resolved: content removed'
export type AppealStatus = 'Under review' | 'Decision upheld' | 'Decision reversed'

export interface ModerationReport {
  id: string
  number: string
  reason: ReportReason
  contentType: 'Listing' | 'Message' | 'Community post'
  content: string
  owner: string
  reporter: string
  reportCount: number
  submitted: string
  status: ReportStatus
}

export interface ModerationAppeal {
  id: string
  reportNumber: string
  appellant: string
  contentType: ModerationReport['contentType']
  content: string
  decision: string
  submitted: string
  reason: string
  status: AppealStatus
}

export const openReport = (report: ModerationReport) => report.status === 'Under review' || report.status === 'Hidden pending review'

export const initialReports: ModerationReport[] = [
  { id: 'rpt-2041', number: 'RPT-2041', reason: 'Misleading listing', contentType: 'Listing', content: 'A furnished room on Capitol Hill.', owner: 'Pine Street Homes', reporter: 'Jordan Ellis', reportCount: 1, submitted: 'Oct 29, 2026', status: 'Under review' },
  { id: 'rpt-2039', number: 'RPT-2039', reason: 'Scam', contentType: 'Listing', content: 'Studio in Belltown, $650 a month', owner: 'Dana Price', reporter: '3 members', reportCount: 3, submitted: 'Oct 28, 2026', status: 'Hidden pending review' },
  { id: 'rpt-2036', number: 'RPT-2036', reason: 'Harassment', contentType: 'Message', content: 'Message from Kyle Benson', owner: 'Kyle Benson', reporter: 'Morgan Lee', reportCount: 1, submitted: 'Oct 27, 2026', status: 'Under review' },
  { id: 'rpt-2032', number: 'RPT-2032', reason: 'Spam', contentType: 'Community post', content: 'Earn $500 a week', owner: 'Quick Cash Rentals', reporter: 'Riley Brooks', reportCount: 1, submitted: 'Oct 24, 2026', status: 'Resolved: content removed' },
]

export const jordanDecision = {
  reportNumber: 'RPT-2027', contentType: 'Community post' as const, content: 'Room swap for November?',
  decision: 'Content removed · Spam', reason: 'Spam', decided: 'October 26, 2026',
}

export const initialAppeals: ModerationAppeal[] = [
  { id: 'apl-quick-cash', reportNumber: 'RPT-2032', appellant: 'Quick Cash Rentals', contentType: 'Community post', content: 'Earn $500 a week', decision: 'Content removed · Spam', submitted: 'Oct 27, 2026', reason: 'The post advertised a real cleaning job for rental move-outs.', status: 'Under review' },
  { id: 'apl-jordan', reportNumber: jordanDecision.reportNumber, appellant: 'Jordan Ellis', contentType: jordanDecision.contentType, content: jordanDecision.content, decision: jordanDecision.decision, submitted: 'Oct 28, 2026', reason: 'I was asking another renter to swap rooms, not advertising anything.', status: 'Under review' },
]
