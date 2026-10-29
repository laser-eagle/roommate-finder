export const reportReasons = ['Scam', 'Misleading listing', 'Harassment', 'Spam'] as const
export type ReportReason = typeof reportReasons[number]
export interface SubmittedReport { number: string; reason: ReportReason }
