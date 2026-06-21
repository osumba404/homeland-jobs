import mysql from 'mysql2/promise'

// Singleton connection pool — reused across hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined
}

function createPool() {
  return mysql.createPool({
    host:            process.env.DB_HOST     ?? 'localhost',
    port:            Number(process.env.DB_PORT ?? 3306),
    user:            process.env.DB_USER     ?? 'root',
    password:        process.env.DB_PASSWORD ?? '',
    database:        process.env.DB_NAME     ?? 'homeland_jobs',
    waitForConnections: true,
    connectionLimit:    10,
    queueLimit:         0,
    // Return plain objects instead of RowDataPacket wrappers
    rowsAsArray: false,
  })
}

const pool = global._mysqlPool ?? createPool()

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool
}

export default pool

/** Convenience: run a query and get typed rows back */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params = any[]

export async function query<T = mysql.RowDataPacket>(
  sql: string,
  params?: Params,
): Promise<T[]> {
  const [rows] = await pool.execute<mysql.RowDataPacket[]>(sql, params)
  return rows as T[]
}

/** Run a query that mutates data (INSERT / UPDATE / DELETE) */
export async function execute(
  sql: string,
  params?: Params,
): Promise<mysql.ResultSetHeader> {
  const [result] = await pool.execute<mysql.ResultSetHeader>(sql, params)
  return result
}
