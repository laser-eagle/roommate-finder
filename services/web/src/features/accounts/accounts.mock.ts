import type { Reference } from '../../components/References/ReferenceList'

export type SettingsSection = 'profile' | 'housing' | 'notifications' | 'privacy'
export type AccountSection = SettingsSection | 'moderation'

export interface AccountProfile {
  fullName: string
  displayName: string
  city: string
  bio: string
}

export interface HousingPreferences {
  location: string
  neighborhoods: string
  budget: string
  moveIn: string
  homeType: string
}

export interface AccountNotifications {
  messages: boolean
  tours: boolean
  matches: boolean
  frequency: string
}

export interface AccountSettings {
  profile: AccountProfile
  housing: HousingPreferences
  notifications: AccountNotifications
  privacy: { profileVisible: boolean }
}

export const accountEmail = 'jordan.ellis@example.com'
export const accountEmailVerified = true

export const accountSections: { id: AccountSection; label: string; path: string }[] = [
  { id: 'profile', label: 'Personal details', path: '/account/personal' },
  { id: 'housing', label: 'Housing preferences', path: '/account/preferences' },
  { id: 'notifications', label: 'Notifications', path: '/account/notifications' },
  { id: 'privacy', label: 'Security & privacy', path: '/account/security' },
  { id: 'moderation', label: 'Moderation', path: '/account/moderation' },
]

export const initialAccount: AccountSettings = {
  profile: {
    fullName: 'Jordan Ellis', displayName: 'Jordan', city: 'Seattle, WA',
    bio: 'Looking for a private room in Seattle. I keep shared spaces tidy and enjoy cooking, reading, and weekend hikes.',
  },
  housing: {
    location: 'Seattle, WA', neighborhoods: 'Ballard, Fremont, Wallingford',
    budget: '1400', moveIn: '2026-10-15', homeType: 'Private room',
  },
  notifications: { messages: true, tours: true, matches: false, frequency: 'Daily' },
  privacy: { profileVisible: true },
}

export const accountReferences: Reference[] = [
  { id: 'jordan-noah', author: 'Noah Kim', relationship: 'Former roommate', date: 'July 2026', text: 'Jordan and I shared an apartment in Wallingford for two years. Jordan kept shared spaces tidy, often cooked for the household, and always paid their share on time.' },
]
