import express from 'express';
import sql from 'mssql';

const app = express();
const PUERTO = process.env.PORT_API || 4000;

app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER || 'SARDB',
  password: process.env.DB_PASSWORD || 'SARDB',
  server: process.env.DB_SERVER || '10.16.194.224',
  database: 'SARA6_DEV',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 15000
  }
};

let pool;
async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
}

// Endpoint 1: Healthcheck
app.get('/api/health', async (req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query('SELECT 1 AS ok, DB_NAME() AS db;');
    res.json({ status: 'UP', database: r.recordset[0].db });
  } catch (err) {
    res.status(500).json({ status: 'DOWN', error: err.message });
  }
});

// Endpoint 2: Usuarios reales desde dbo.sys_users
app.get('/api/usuarios', async (req, res) => {
  try {
    const p = await getPool();
    const resultado = await p.request().query(`
      SELECT id, usuario, nombre, email, telefono, rol, cargo_planta, unidad_planta, activo, fecha_creacion
      FROM dbo.sys_users
      ORDER BY id ASC;
    `);
    res.json({ ok: true, total: resultado.recordset.length, datos: resultado.recordset });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PUERTO, () => {
  console.log(`[CAPA 2] Micro-Backend escuchando en http://localhost:${PUERTO}`);
});
