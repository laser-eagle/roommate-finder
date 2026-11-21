# DbCheck

## Metadata

- Status: `in-progress`
- Type: `infrastructure`
- Owner: Stephanie Noe
- Updated: 2026-11-21
- Files: `db-check.mjs`, `package.json`, `.env.example`

## Purpose and usage

DbCheck verifies that a developer's computer can save data to the central PostgreSQL database and retrieve it.
It is a development tool, not part of the application, and has no feature ID.

Run `npm run check` from `services/db-check` after filling in `.env`.
Arguments after `--` become the saved note.

## Requirements and design

- [x] Read connection settings from a local `.env` file that git ignores.
- [x] Stop with a list of missing settings before connecting.
- [x] Report the connected database, user, and server version.
- [x] Create `public.env_check` when it does not exist.
- [x] Insert one row with parameterized values and print its id.
- [x] Read the same row back by id and print it.
- [x] Print the five latest rows.
- [x] Print a hint for refused connections, timeouts, bad credentials, a missing database, and missing permissions.
- [ ] Verified against the team database.

The script uses the `pg` client and Node's built-in `.env` loader, so it needs Node 20.12 or later.
It writes only to `public.env_check` and never touches the `accounts` schema.

## Data model

| Column        | Type          | Notes                        |
| ------------- | ------------- | ---------------------------- |
| `id`          | `bigint`      | Identity primary key         |
| `member_name` | `text`        | From `DB_CHECK_MEMBER`       |
| `note`        | `text`        | Command-line note or default |
| `created_at`  | `timestamptz` | Defaults to `now()`          |

## Assumptions

- The database is reached through an SSH tunnel to the team server at 10.77.0.1.
- The `roommate` user may create tables in the `public` schema.

## Open Questions

- [ ] Which address and port does PostgreSQL listen on inside the team server?
- [ ] Should `public.env_check` be dropped once every member has demonstrated access?
