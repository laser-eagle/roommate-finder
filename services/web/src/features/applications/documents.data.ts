export interface DocumentGrant {
  id: string
  recipient: string
  applicationId?: string
  expires: string
  revoked?: string
}

export interface StoredDocument {
  id: string
  name: string
  fileName: string
  added: string
  grants: DocumentGrant[]
}

export const storedDocuments: StoredDocument[] = [
  {
    id: 'doc-photo-id', name: 'Photo ID', fileName: 'photo-id.pdf', added: 'October 2, 2026',
    grants: [{ id: 'grant-photo-pine', recipient: 'Pine Street Homes', applicationId: 'app-ballard', expires: 'December 31, 2026' }],
  },
  {
    id: 'doc-pay-stub', name: 'Pay stub (October 2026)', fileName: 'pay-stub-october-2026.pdf', added: 'October 8, 2026',
    grants: [
      { id: 'grant-pay-pine', recipient: 'Pine Street Homes', applicationId: 'app-capitol', expires: 'November 30, 2026' },
      { id: 'grant-pay-avery', recipient: 'Avery Chen', expires: 'November 30, 2026' },
    ],
  },
  {
    id: 'doc-rental-history', name: 'Rental history letter', fileName: 'rental-history-letter.pdf', added: 'October 2, 2026',
    grants: [{ id: 'grant-history-pine', recipient: 'Pine Street Homes', applicationId: 'app-ballard', expires: 'January 15, 2027' }],
  },
]
