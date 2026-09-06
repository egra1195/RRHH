import sql from 'mssql';

// CONFIGURACIÃ“N LIMPIA PARA CAPA 1 (BASE DE DATOS PURA)
const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'TuPassword',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'master', // Inicialmente conectamos a master para crear la nueva BD
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function testConexion() {
  console.log("Iniciando prueba de conexiÃ³n - Capa 1...");
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT 1 AS conexion_exitosa, @@VERSION AS version_motor;');
    console.log("-> CONEXIÃ“N EXITOSA:");
    console.table(result.recordset);
    await pool.close();
  } catch (err) {
    console.error("-> ERROR EN CAPA 1 (Verifica credenciales o puerto):", err.message);
  }
}

testConexion();