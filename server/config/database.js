import './loadEnv.js'
import pg from 'pg'

const { Pool } = pg

let pool

function sslConfig(connectionString) {
  if (!connectionString) return false

  return connectionString.includes('render.com') ? { rejectUnauthorized: false } : false
}

export function getPool() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: sslConfig(connectionString),
    })
  }

  return pool
}

export function query(text, params) {
  return getPool().query(text, params)
}
