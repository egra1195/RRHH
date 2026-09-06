import express from 'express';
import sql from 'mssql';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PUERTO = process.env.PORT_API || process.env.APP_PORT || 4000;

app.use(express.json());
app.use(express.static(__dirname));
app.use('/RRHH', express.static(__dirname));

const dbConfig = {
  user: process.env.DB_USER || process.env.RRHH_DB_USER || 'SARDB',
  password: process.env.DB_PASSWORD || process.env.RRHH_DB_PASS || 'SARDB',
  server: process.env.DB_SERVER || process.env.RRHH_DB_SERVER || '10.16.194.224',
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

// HEALTHCHECK
app.get(['/api/health', '/RRHH/api/health'], async (req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query('SELECT 1 AS ok, DB_NAME() AS db;');
    res.json({ status: 'UP', database: r.recordset[0].db });
  } catch (err) {
    res.status(500).json({ status: 'DOWN', error: err.message });
  }
});

// USUARIOS
app.get(['/api/usuarios', '/RRHH/api/usuarios'], async (req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query(`
      SELECT id, usuario, nombre, email, telefono, rol, cargo_planta, unidad_planta, activo, fecha_creacion
      FROM dbo.sys_users ORDER BY id ASC;
    `);
    res.json({ ok: true, total: r.recordset.length, datos: r.recordset });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PHV: CATALOGOS MAESTROS (CONTEO DINÁMICO)
app.get(['/api/phv/catalogos', '/RRHH/api/phv/catalogos'], async (req, res) => {
  try {
    const p = await getPool();
    const r = await p.request().query(`
      SELECT c.id, c.numero, c.nombre, c.descripcion, c.tabla_origen, c.tipo,
             COUNT(p.id) AS total
      FROM dbo.phv_catalogos c
      LEFT JOIN dbo.phv_parametros p ON c.id = p.catalogo_id AND p.activo = 1
      GROUP BY c.id, c.numero, c.nombre, c.descripcion, c.tabla_origen, c.tipo
      ORDER BY c.numero ASC;
    `);
    res.json({ ok: true, catalogos: r.recordset });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PHV: REGISTROS DE UN CATÁLOGO ESPECÍFICO
app.get(['/api/phv/parametros/:catId', '/RRHH/api/phv/parametros/:catId'], async (req, res) => {
  try {
    const { catId } = req.params;
    const p = await getPool();
    const r = await p.request()
      .input('catId', sql.VarChar, catId)
      .query(`
        SELECT id, catalogo_id, codigo, descripcion, origen, tipo_dato, vinculado, motivo_bloqueo, activo
        FROM dbo.phv_parametros
        WHERE catalogo_id = @catId AND activo = 1
        ORDER BY codigo ASC;
      `);
    res.json({ ok: true, catalogo: catId, total: r.recordset.length, datos: r.recordset });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PUERTO, () => {
  console.log(`[SARA 6] Backend modular activo en puerto: ${PUERTO}`);
});
