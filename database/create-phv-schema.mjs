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

async function migrarPHV() {
  console.log("==================================================");
  console.log("  CAPA 1: CREACION DE TABLAS MODULO PHV EN BD    ");
  console.log("==================================================");

  try {
    const pool = await sql.connect(config);

    // 1. Tablas Maestras
    await pool.request().query(`
      IF OBJECT_ID('dbo.phv_catalogos', 'U') IS NULL
      BEGIN
        CREATE TABLE dbo.phv_catalogos (
          id VARCHAR(50) PRIMARY KEY,
          numero INT NOT NULL,
          nombre VARCHAR(100) NOT NULL,
          descripcion VARCHAR(255) NULL,
          tabla_origen VARCHAR(50) NULL,
          tipo VARCHAR(30) DEFAULT 'texto'
        );
      END

      IF OBJECT_ID('dbo.phv_parametros', 'U') IS NULL
      BEGIN
        CREATE TABLE dbo.phv_parametros (
          id INT IDENTITY(1,1) PRIMARY KEY,
          catalogo_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES dbo.phv_catalogos(id),
          codigo VARCHAR(50) NOT NULL,
          descripcion VARCHAR(255) NOT NULL,
          origen VARCHAR(50) DEFAULT 'DEF',
          tipo_dato VARCHAR(30) DEFAULT 'texto',
          vinculado BIT DEFAULT 0,
          motivo_bloqueo VARCHAR(255) NULL,
          activo BIT DEFAULT 1,
          fecha_registro DATETIME DEFAULT GETDATE(),
          CONSTRAINT UQ_Cat_Codigo UNIQUE (catalogo_id, codigo)
        );
      END
    `);
    console.log("[1] Tablas dbo.phv_catalogos y dbo.phv_parametros listas.");

    // 2. Insertar Catálogos Maestros (14)
    await pool.request().query(`
      MERGE dbo.phv_catalogos AS Target
      USING (VALUES 
        ('caracteristicas', 1, 'Características', 'Campos adicionales de persona o posición', 'CARACTERISTICA_CAR', 'texto'),
        ('tipo_documento', 2, 'Tipo de Documento', 'Cédula V/E, RIF (J), Pasaporte (P)', 'TIPODOCUMENTO_TID', 'texto'),
        ('tematica', 3, 'Temática', 'Agrupación estructural y visualización', 'TEMATICA_TEM', 'texto'),
        ('estado_civil', 4, 'Estado Civil', 'Casado, concubinato, divorciado, soltero, viudo', 'ESTADOCIVIL_ESC', 'texto'),
        ('tipo_relacion', 5, 'Tipo de Relación', 'Empleado, contratado, aspirante, pasante', 'TIPORELACION_TIR', 'texto'),
        ('nivel_academico', 6, 'Nivel Académico', 'Grado de instrucción formal (TSU, Univ, Posgrado)', 'NIVELACADEMICO_NAC', 'texto'),
        ('area_profesion', 7, 'Área de Profesión', 'Profesiones tituladas y oficios técnicos', 'PROFESION_PRO', 'texto'),
        ('idioma', 8, 'Idioma', 'Español, inglés, francés, portugués, italiano', 'IDIOMA_IDI', 'texto'),
        ('caracteristicas_idioma', 9, 'Características de Idioma', 'Lectura técnica, conversación, redacción', 'CARACTERISTICAIDIOMA_CID', 'texto'),
        ('parentesco', 10, 'Parentesco', 'Padres, hijos, cónyuge, hermanos, tíos', 'PARENTESCO_PAR', 'texto'),
        ('area_experiencia', 11, 'Área de Experiencia', 'Áreas clínicas, quirúrgicas y administrativas', 'AREAEXPERIENCIA_AEX', 'texto'),
        ('tipo_bien', 12, 'Tipo Bien', 'Automóvil, bus, camioneta, moto, bicicleta', 'TIPOBIEN_TIB', 'texto'),
        ('tipo_inmueble', 13, 'Tipo Inmueble', 'Apartamento (A), casa (C), habitación (H), quinta (Q)', 'TIPOINMUEBLE_TII', 'texto'),
        ('origen_hoja', 14, 'Origen de Hoja / Canal', 'Portal talento, recomendación interna, ferias', 'ORIGENHOJA_ORH', 'texto')
      ) AS Source (id, numero, nombre, descripcion, tabla_origen, tipo)
      ON Target.id = Source.id
      WHEN NOT MATCHED THEN
        INSERT (id, numero, nombre, descripcion, tabla_origen, tipo)
        VALUES (Source.id, Source.numero, Source.nombre, Source.descripcion, Source.tabla_origen, Source.tipo);
    `);
    console.log("[2] 14 Catálogos maestros asegurados.");

    // 3. Semilla de parámetros reales
    await pool.request().query(`
      IF NOT EXISTS (SELECT 1 FROM dbo.phv_parametros WHERE catalogo_id = 'caracteristicas' AND codigo = 'LIC-01')
      BEGIN
        INSERT INTO dbo.phv_parametros (catalogo_id, codigo, descripcion, origen, tipo_dato, vinculado, motivo_bloqueo)
        VALUES
        ('caracteristicas', 'LIC-01', 'Licencia de Conducir 2do Grado', 'TRANS', 'texto', 1, 'Vinculado a conductores en SARA6'),
        ('caracteristicas', 'SAN-O+', 'Grupo Sanguíneo O Positivo', 'SALUD', 'texto', 1, 'Vinculado a 412 expedientes activos'),
        ('tipo_documento', 'V', 'Cédula Venezolana', 'IDENT', 'numero', 1, 'Documento principal de identidad'),
        ('tipo_documento', 'E', 'Cédula Extranjera', 'IDENT', 'numero', 1, 'Personal extranjero'),
        ('area_profesion', 'MED-CIR', 'Médico Cirujano Especialista', 'SALUD', 'texto', 1, 'Personal médico quirúrgico');
      END
    `);
    console.log("[3] Parámetros semilla insertados.");

    const res = await pool.request().query('SELECT COUNT(*) AS totalCatalogos FROM dbo.phv_catalogos;');
    const resP = await pool.request().query('SELECT COUNT(*) AS totalParams FROM dbo.phv_parametros;');
    console.log(`\n-> CAPA 1 LISTA: ${res.recordset[0].totalCatalogos} Catálogos | ${resP.recordset[0].totalParams} Parámetros cargados.`);

    await pool.close();
  } catch (err) {
    console.error("\n-> [ERROR CAPA 1]:", err.message);
  }
}

migrarPHV();
