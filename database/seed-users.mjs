import sql from 'mssql';

const config = {
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

async function crearEsquemaYSemilla() {
  console.log("==================================================");
  console.log("  CAPA 1: CREACION DE TABLA BASE Y SEMILLA DBO   ");
  console.log("==================================================");

  try {
    const pool = await sql.connect(config);
    console.log("[1] Conectado a SARA6_DEV.");

    // 1. Crear tabla sys_users limpia desde cero
    const ddl = `
      IF OBJECT_ID('dbo.sys_users', 'U') IS NULL
      BEGIN
        CREATE TABLE dbo.sys_users (
          id INT IDENTITY(1,1) PRIMARY KEY,
          usuario VARCHAR(50) NOT NULL UNIQUE,
          clave_hash VARCHAR(64) NOT NULL,
          nombre VARCHAR(120) NOT NULL,
          email VARCHAR(120) NULL,
          telefono VARCHAR(30) NULL,
          rol VARCHAR(50) NOT NULL DEFAULT 'Usuario',
          cargo_planta VARCHAR(120) NULL,
          unidad_planta VARCHAR(120) NULL,
          activo BIT NOT NULL DEFAULT 1,
          fecha_creacion DATETIME NOT NULL DEFAULT GETDATE()
        );
        PRINT 'Tabla dbo.sys_users creada.';
      END
    `;
    await pool.request().query(ddl);
    console.log("[2] Estructura dbo.sys_users verificada.");

    // 2. Insertar registros semilla de prueba
    const seed = `
      IF NOT EXISTS (SELECT 1 FROM dbo.sys_users WHERE usuario = '22382666')
      BEGIN
        INSERT INTO dbo.sys_users (usuario, clave_hash, nombre, email, telefono, rol, cargo_planta, unidad_planta, activo)
        VALUES 
        ('22382666', 'e10adc3949ba59abbe56e057f20f883e', 'Edixon Rodriguez', 'erodriguez@grupomedsp.com', '0412-5551234', 'Web Master', 'Super Usuario / Analista de Sistemas', 'Tecnología y Sistemas', 1),
        ('14520331', 'e10adc3949ba59abbe56e057f20f883e', 'Dr. Carlos Mendoza', 'cmendoza@grupomedsp.com', '0414-2231945', 'Supervisor', 'Médico Especialista Quirúrgico', 'Dirección Médica', 1);
        PRINT 'Usuarios semilla insertados.';
      END
    `;
    await pool.request().query(seed);
    console.log("[3] Registros semilla asegurados.");

    // 3. Consultar y verificar el contenido real
    const resultado = await pool.request().query(`
      SELECT id, usuario, nombre, rol, cargo_planta, activo, fecha_creacion 
      FROM dbo.sys_users;
    `);

    console.log("\n-> DATOS REALES EN SARA6_DEV (CAPA 1 CERRADA):");
    console.table(resultado.recordset);

    await pool.close();
  } catch (err) {
    console.error("\n-> [ERROR]:", err.message);
  }
}

crearEsquemaYSemilla();
