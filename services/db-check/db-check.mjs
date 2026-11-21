// Saves one row to the team PostgreSQL database and reads it back.
// Run from this folder with `npm run check` after filling in `.env`.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const envPath = fileURLToPath(new URL('.env', import.meta.url));
if (existsSync(envPath)) process.loadEnvFile(envPath);

const required = ['PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD', 'DB_CHECK_MEMBER'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`Missing settings in .env: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and fill in every value.');
  process.exit(1);
}

const memberName = process.env.DB_CHECK_MEMBER;
const note = process.argv.slice(2).join(' ') || 'Environment setup check from VS Code';

// pg reads PGHOST, PGPORT, PGDATABASE, PGUSER, and PGPASSWORD from the environment.
const client = new pg.Client({ connectionTimeoutMillis: 10_000 });

const hints = {
  ECONNREFUSED: 'Nothing is listening at PGHOST:PGPORT. Is the SSH tunnel open?',
  ETIMEDOUT: 'The connection timed out. Check the VPN or SSH tunnel and PGHOST/PGPORT.',
  ENOTFOUND: 'PGHOST could not be resolved. Use 127.0.0.1 when connecting through the SSH tunnel.',
  '28P01': 'The username or password was rejected.',
  '3D000': 'The database named in PGDATABASE does not exist.',
  '42501': 'This database user may not create or write to public.env_check. Ask the database owner for access.',
};

async function main() {
  await client.connect();

  const { rows: [server] } = await client.query(
    'SELECT current_database() AS database, current_user AS "user", version() AS version',
  );
  console.log(`Connected to "${server.database}" as "${server.user}"`);
  console.log(`Server: ${server.version.split(',')[0]}\n`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS public.env_check (
      id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      member_name text        NOT NULL,
      note        text        NOT NULL,
      created_at  timestamptz NOT NULL DEFAULT now()
    )`);

  // SAVE: insert one row with parameters, never string concatenation.
  const { rows: [saved] } = await client.query(
    'INSERT INTO public.env_check (member_name, note) VALUES ($1, $2) RETURNING id',
    [memberName, note],
  );
  console.log(`SAVED     row id ${saved.id} for ${memberName}`);

  // RETRIEVE: read the same row back from the database.
  const { rows: [found] } = await client.query(
    'SELECT id, member_name, note, created_at FROM public.env_check WHERE id = $1',
    [saved.id],
  );
  if (!found) throw new Error(`Row ${saved.id} was saved but could not be read back.`);
  console.log('RETRIEVED', found);

  const { rows: recent } = await client.query(
    'SELECT id, member_name, note, created_at FROM public.env_check ORDER BY id DESC LIMIT 5',
  );
  console.log('\nLatest rows in public.env_check:');
  console.table(recent.map((row) => ({ ...row, created_at: row.created_at.toISOString() })));
}

try {
  await main();
} catch (error) {
  console.error(`\nDatabase check failed: ${error.message}`);
  const hint = hints[error.code];
  if (hint) console.error(`Hint: ${hint}`);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
