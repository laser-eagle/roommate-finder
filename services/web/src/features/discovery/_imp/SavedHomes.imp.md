# SavedHomes

## Metadata

- Status: `complete`
- Scope: shared session favorite state
- Updated: 2026-09-27
- File: `useSavedHomes.ts`

## Purpose and usage

`useSavedHomes()` returns `savedIds` and `toggleSaved(id)`.
Every page uses the same session-storage key to keep favorite counts consistent across navigation.

## Requirements and design

- [x] Store distinct string IDs under `roommate-finder:saved-homes`.
- [x] Read the older Ballard-only favorite key when no collection exists.
- [x] Preserve an explicitly empty collection rather than restoring an older favorite.
- [x] Support reversible save and unsave actions.
- [x] Keep the active page usable when session storage fails.
- [x] Supply the aggregate count to SiteHeader.

The hook owns a React state array. An effect writes each change to session storage.
Malformed storage values fall back to the older favorite state or an empty collection.
Each route reloads the document and reads the stored collection.

## Testing and acceptance

- [x] The previous Ballard favorite remains saved after migration.
- [x] Saving Green Lake in its detail page adds it to Saved and increments the header count.
- [x] Unsave removes Green Lake from the list and restores the prior count.

## Limitations

This is session persistence, not an authenticated favorites service.
Storage denial preserves changes only for the active page. Cross-tab synchronization is outside this scope.
