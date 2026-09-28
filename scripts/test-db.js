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
