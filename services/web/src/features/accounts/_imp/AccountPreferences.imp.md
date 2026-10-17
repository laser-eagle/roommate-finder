# AccountPreferences

## Metadata

- Status: `complete`
- Scope: housing and notification form mockups
- Updated: 2026-09-27
- File: `AccountPreferences.tsx`
- Components: `AccountHousing`, `AccountNotificationSettings`

## Purpose and requirements

- [x] Edit a search location, neighborhoods, monthly budget, move-in date, and housing type.
- [x] Allow an empty neighborhood field to represent a city-wide search.
- [x] Require a location, date, and whole-dollar budget from $1 through $100,000.
- [x] Explain that the monthly budget includes fees and estimated utilities.
- [x] Provide email switches for messages, tour updates, and listing matches.
- [x] Enable the daily or weekly frequency selector only when listing matches are enabled.
- [x] Keep security email status separate from optional notification settings.

## Usage and design

Both forms receive a controlled `value`, `dirty`, `onChange`, `onSave`, and `onDiscard`.
AccountHousing uses HousingPreferences. AccountNotificationSettings uses AccountNotifications.
These data interfaces reside in `accounts.mock.ts`.
The housing form is served at `/account/preferences`; notification settings use `/account/notifications`.

The parent owns both saved and draft settings. Each form saves or discards its own section.
Notification switches expose accessible names, descriptions, and checked state.
Disabling listing matches preserves the last frequency selection.

## Testing and acceptance

- [x] A saved budget appears in the housing summary.
- [x] Saving housing preferences leaves pending profile edits unsaved.
- [x] Notification keyboard interactions and discard pass browser review.
- [x] Invalid budget and responsive form checks pass browser review.

## Limitations

These forms do not request search results, calculate matches, or send notifications.
Production notification delivery and preferences storage remain future work.
