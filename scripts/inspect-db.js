import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'leniv698',
  password: process.env.PGPASSWORD || 'hhvu1A8IrRupKLdfEDhnsx9LQ',
  database: process.env.PGDATABASE || 'leniv698',
  ssl: false,
});

async function inspect() {
  await client.connect();
  const tables = await client.query(`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema NOT IN ('information_schema', 'pg_catalog')
    ORDER BY table_schema, table_name;
  `);
  console.log('Tables in database:', tables.rows);
  await client.end();
}

inspect().catch(console.error);
