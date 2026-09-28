import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'leniv698',
  password: process.env.PGPASSWORD || 'hhvu1A8IrRupKLdfEDhnsx9LQ',
  database: process.env.PGDATABASE || 'leniv698',
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err)
})

export default pool
