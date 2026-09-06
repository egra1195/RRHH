import sql from 'mssql';

const serverIp = process.env.DB_SERVER || '10.16.194.224';
const dbUser = process.env.DB_USER || 'SARDB';
const dbPassword = process.env.DB_PASSWORD || 'SARDB';
const newDbName = 'SARA6_DEV';

const baseConfig = {
  user: dbUser,
  password: dbPassword,
  server: serverIp,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 15000
  }
};

async function inicializarBaseDeDatos() {
  console.log("==================================================");
  console.log("  CAPA 1: INICIALIZACION Y CONEXION PURA SQL SERVER");
  console.log("==================================================");
  console.log(`[1] Conectando a ${serverIp} (base master)...`);

  let poolMaster;
  try {
    poolMaster = await sql.connect({ ...baseConfig, database: 'master' });
    console.log("  -> [OK] Conexion establecida con el motor SQL Server.");

    // Verificar si ya existe SARA6_DEV
    const checkDb = await poolMaster.request().query(`
      SELECT name FROM sys.databases WHERE name = '${newDbName}';
    `);

    if (checkDb.recordset.length === 0) {
      console.log(`[2] Creando base de datos limpia: [${newDbName}]...`);
      await poolMaster.request().query(`CREATE DATABASE [${newDbName}];`);
      console.log(`  -> [OK] Base de datos [${newDbName}] creada con exito.`);
    } else {
      console.log(`[2] La base de datos [${newDbName}] ya existe.`);
    }

    await poolMaster.close();

    // Probar conexión directa a la nueva base de datos
    console.log(`[3] Validando conexion directa a [${newDbName}]...`);
    const poolDev = await sql.connect({ ...baseConfig, database: newDbName });
    const testResult = await poolDev.request().query(`
      SELECT 
        1 AS conexion_exitosa,
        DB_NAME() AS base_activa,
        CURRENT_USER AS usuario_actual,
        GETDATE() AS fecha_servidor;
    `);

    console.log("\n-> PRUEBA CAPA 1 SUPERADA EXITOSAMENTE:");
    console.table(testResult.recordset);
    await poolDev.close();

  } catch (error) {
    console.error("\n-> [FALLO CAPA 1]:", error.message);
  }
}

inicializarBaseDeDatos();
