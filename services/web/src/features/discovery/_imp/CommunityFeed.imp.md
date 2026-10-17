# CommunityFeed

## Metadata

- Status: `in-progress`
- Scope: community feed and group interactions
- Updated: 2026-09-27
- File: `CommunityFeed.tsx`

## Purpose and requirements

- [x] Show housing searches, available rooms, and neighborhood discussions.
- [x] Filter the feed by category.
- [x] Toggle likes and update the displayed count.
- [x] Open existing comments and add a local reply.
- [x] Create a post with a category, title, and body.
- [x] Reject blank titles, bodies, and comments.
- [x] Show three local groups with join and leave states.
- [x] Link an available-room post to the corresponding listing.
- [ ] Connect authorized publishing, moderation, membership, and messaging services.

## Usage and design

`<CommunityFeed />` owns posts, selected category, liked IDs, joined groups, dialog state, and feedback.
New posts use the placeholder account name Jordan and appear first in All posts.
Post titles permit 100 characters. Bodies permit 2,000 characters. Comments permit 1,000 characters.
Whitespace-only submissions show an error in the active dialog.
Comment submission updates the selected post and clears the composer.
Likes and memberships use reversible local toggles. These actions produce no network traffic.
The shared dialog supplies keyboard navigation and modal focus behavior.

## Testing and acceptance

- [x] Initial content and group layout pass desktop review.
- [x] Filtering, posts, comments, likes, and group toggles pass browser checks.
- [x] Narrow layouts and dialog validation pass browser checks.

## Limitations

Content, counts, and relative timestamps are placeholders.
All changes reset on navigation or refresh. No messages or posts are published externally.
Production reporting, moderation, recipient permissions, and pagination remain future work.
