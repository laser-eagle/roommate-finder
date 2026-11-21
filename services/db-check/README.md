# Database check

Saves one row to the team PostgreSQL database and reads it back.
It proves that a team member's computer can write to and read from the central database.

## Setup

From `services/db-check`, run:

```sh
npm ci
cp .env.example .env
```

Fill in every value in `.env`. Never commit `.env`; it holds the database password.

The database is not exposed to the internet. Open an SSH tunnel in a separate terminal first and keep it open:

```sh
ssh -N -L 5433:<postgres-address-on-server>:5432 <ssh-user>@10.77.0.1
```

Ask the database owner for the Postgres address on the server and for your SSH user.

## Run

```sh
npm run check
npm run check -- "optional note to save"
```

The script prints the saved row id, the row it read back, and the five latest rows.
Each run adds one row to `public.env_check`, which the script creates if it does not exist.
The row also appears in Adminer under the `public` schema.
