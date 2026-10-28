export type Vote = 'Yes' | 'No'

export interface ShortlistMember { id: string; name: string; you?: boolean }

export interface ShortlistItem {
  homeId: string
  addedBy: string
  votes: Record<string, Vote>
  comments: { id: string; author: string; text: string }[]
}

export const members: ShortlistMember[] = [
  { id: 'jordan', name: 'Jordan Ellis', you: true },
  { id: 'avery', name: 'Avery Chen' },
]

export const initialShortlist: ShortlistItem[] = [
  {
    homeId: 'ballard-room', addedBy: 'jordan', votes: { avery: 'No' },
    comments: [
      { id: 'ballard-1', author: 'jordan', text: 'Adding this in case one of us finds a separate room nearby.' },
      { id: 'ballard-2', author: 'avery', text: 'The room looks great, but we would need a second bedroom to live together.' },
    ],
  },
  {
    homeId: 'capitol-hill-sublet', addedBy: 'avery', votes: { avery: 'Yes' },
    comments: [{ id: 'capitol-1', author: 'avery', text: 'Six months works with my lease timing, and it is close to light rail.' }],
  },
  {
    homeId: 'green-lake-studio', addedBy: 'avery', votes: { avery: 'No' },
    comments: [{ id: 'green-1', author: 'avery', text: 'Probably too small for two of us, but the location is good.' }],
  },
]
