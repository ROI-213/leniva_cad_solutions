import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host: '168.119.64.101',
  port: 5432,
  user: 'leniv698',
  password: 'hhvu1A8IrRupKLdfEDhnsx9LQ',
  database: 'leniv698',
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
