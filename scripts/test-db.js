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

async function main() {
  console.log('Connecting to PostgreSQL...');
  try {
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT version(), current_database(), current_user;');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
}

main();
