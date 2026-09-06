(function() {
  'use strict';

  // 1. DEFINICION DE MODULOS DEL SISTEMA
  var MODULOS = [
    { codigo: 'phv', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Parámetros Hoja de Vida', icono: '⚙', tabla: 'PARAMETROHOJAVIDA_PHV', desc: '14 Catálogos maestros parametrizables con centralización multiempresa' },
    { codigo: 'pco', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Parámetros de Costeo', icono: '📊', tabla: 'CENTROCOSTO_CEC', desc: 'Centros de costo, cuentas contables y distribución presupuestaria' },
    { codigo: 'car', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Manual de Cargos', icono: '🎖', tabla: 'CARGO_CAR', desc: 'Descripciones de puestos, perfiles y bandas salariales' },
    { codigo: 'org', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Organigrama Funcional', icono: '🏛', tabla: 'UNIDAD_UNI', desc: 'Estructura organizacional, gerencias y dependencias' },

    { codigo: 'hov', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Hoja de Vida', icono: '👤', tabla: 'HOJAVIDA_HOV', desc: 'Expedientes biográficos, datos personales, académicos y familiares' },
    { codigo: 'eml', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Datos Laborales', icono: '💼', tabla: 'EMPLEADO_EML', desc: 'Ficha de contratación, cargos, salarios y afiliaciones' },
    { codigo: 'pla', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Planta Activa', icono: '👥', tabla: 'EMPLEADO_EML', desc: 'Censo del personal en servicio activo y distribución departamental' },
    { codigo: 'put', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Planta de Personal', icono: '🏢', tabla: 'PUESTOTRABAJO_PUT', desc: 'Posiciones de trabajo aprobadas, ocupadas y vacantes' },
    { codigo: 'cem', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Actos y Movimientos', icono: '📝', tabla: 'ACTOCAMBIOEMP_ACE', desc: 'Resoluciones administrativas, ascensos, transferencias y cambios' },
    { codigo: 'che', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Histórico Empleado', icono: '📜', tabla: 'CAMBIOEMPLEADO_CEM', desc: 'Línea de tiempo de cambios contractuales y ajustes de sueldo' },

    { codigo: 'lic', seccion: 'CONTROL DE AUSENCIAS', subseccion: '', nombre: 'Licencias y Permisos', icono: '📋', tabla: 'LIBROAUSENCIA_LIA', desc: 'Permisos remunerados y no remunerados, maternidad/paternidad' },
    { codigo: 'inc', seccion: 'CONTROL DE AUSENCIAS', subseccion: '', nombre: 'Incapacidades y Reposos', icono: '🩺', tabla: 'LIBROAUSENCIA_LIA', desc: 'Validación médica IVSS, reposos ambulatorios y hospitalarios' },
    { codigo: 'vac', seccion: 'CONTROL DE AUSENCIAS', subseccion: '', nombre: 'Vacaciones', icono: '🌴', tabla: 'LIBROAUSENCIA_LIA', desc: 'Registro de periodos vacacionales, días hábiles y disfrute' },

    { codigo: 'vaf', seccion: 'NOMINA Y COMPENSACIONES', subseccion: '', nombre: 'Variables Fijas', icono: '💲', tabla: 'VARIABLEPERIOD_VAP', desc: 'Conceptos fijos por empleado (primas, bonos, deducciones recurrentes)' },
    { codigo: 'bqn', seccion: 'NOMINA Y COMPENSACIONES', subseccion: '', nombre: 'Buscar Quincena', icono: '📅', tabla: 'PERIODO_PER', desc: 'Calendario de nómina y control de periodos de pago' },
    { codigo: 'rec', seccion: 'NOMINA Y COMPENSACIONES', subseccion: '', nombre: 'Comprobantes de Pago', icono: '🧾', tabla: 'NOMINA_NOM', desc: 'Recibos de pago individuales con desglose de asignaciones y deducciones' }
  ];

  // 2. ESTADO GLOBAL DE LA APLICACION
  var state = {
    autenticado: true,
    usuario: 'edixon.rodriguez',
    nombreUsuario: 'Edixon Rodríguez',
    rol: 'Coordinador de Nómina',
    empresa: '01 - Grupo Médico Santa Paula S.A.',
    moduloActivo: 'phv',
    busquedaModulo: '',
    
    // Estado de PHV
    catalogoActivo: 'caracteristicas',
    busquedaPHV: '',
    filtroCatalogo: '',
    filtroTipoPHV: '',
    paginaPHV: 1,
    limitePHV: 10,
    drawerPHV: false,
    modoEdicionPHV: false,
    formPHV: { cod: '', desc: '', orig: '', tipo: 'texto', act: true },
    
    // Modal Administrador de Catalogos (Añadir / Modificar Catalogos)
    modalCatalogoAbierto: false,
    modoEdicionCatalogo: false,
    formCatalogo: { id: '', numero: 0, nombre: '', desc: '', tabla: '', tipo: 'texto' },

    // Catalogos Maestros de PHV (Dinamicos y editables)
    catalogosPHV: [
      { id: 'caracteristicas', numero: 1, nombre: 'Características', desc: 'Campos adicionales de persona o posición', tabla: 'CARACTERISTICA_CAR', tipo: 'texto' },
      { id: 'tipo_documento', numero: 2, nombre: 'Tipo de Documento', desc: 'Cédula V/E, RIF (J), Pasaporte (P)', tabla: 'TIPODOCUMENTO_TID', tipo: 'texto' },
      { id: 'tematica', numero: 3, nombre: 'Temática', desc: 'Agrupación estructural y visualización', tabla: 'TEMATICA_TEM', tipo: 'texto' },
      { id: 'estado_civil', numero: 4, nombre: 'Estado Civil', desc: 'Casado, concubinato, divorciado, soltero, viudo', tabla: 'ESTADOCIVIL_ESC', tipo: 'texto' },
      { id: 'tipo_relacion', numero: 5, nombre: 'Tipo de Relación', desc: 'Empleado, contratado, aspirante, pasante', tabla: 'TIPORELACION_TIR', tipo: 'texto' },
      { id: 'nivel_academico', numero: 6, nombre: 'Nivel Académico', desc: 'Grado de instrucción (TSU, Univ, Posgrado)', tabla: 'NIVELACADEMICO_NAC', tipo: 'texto' },
      { id: 'area_profesion', numero: 7, nombre: 'Área de Profesión', desc: 'Profesiones tituladas y oficios técnicos', tabla: 'PROFESION_PRO', tipo: 'texto' },
      { id: 'idioma', numero: 8, nombre: 'Idioma', desc: 'Español, inglés, francés, portugués, italiano', tabla: 'IDIOMA_IDI', tipo: 'texto' },
      { id: 'caracteristicas_idioma', numero: 9, nombre: 'Características de Idioma', desc: 'Lectura técnica, conversación, redacción', tabla: 'CARACTERISTICAIDIOMA_CID', tipo: 'texto' },
      { id: 'parentesco', numero: 10, nombre: 'Parentesco', desc: 'Padres, hijos, cónyuge, hermanos, tíos', tabla: 'PARENTESCO_PAR', tipo: 'texto' },
      { id: 'area_experiencia', numero: 11, nombre: 'Área de Experiencia', desc: 'Áreas clínicas, quirúrgicas y administrativas', tabla: 'AREAEXPERIENCIA_AEX', tipo: 'texto' },
      { id: 'tipo_bien', numero: 12, nombre: 'Tipo Bien', desc: 'Automóvil, bus, camioneta, moto, bicicleta', tabla: 'TIPOBIEN_TIB', tipo: 'texto' },
      { id: 'tipo_inmueble', numero: 13, nombre: 'Tipo Inmueble', desc: 'Apartamento (A), casa (C), habitación (H), quinta (Q)', tabla: 'TIPOINMUEBLE_TII', tipo: 'texto' },
      { id: 'origen_hoja', numero: 14, nombre: 'Origen de Hoja', desc: 'Portal talento, recomendación interna, ferias', tabla: 'ORIGENHOJA_ORH', tipo: 'texto' }
    ],

    // Datos de Parametros PHV
    datosPHV: [
      { cat: 'caracteristicas', cod: 'LIC-01', desc: 'Licencia de Conducir 2do Grado', orig: 'TRANS', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a 14 choferes y mensajeros en SARA6' },
      { cat: 'caracteristicas', cod: 'LIC-02', desc: 'Licencia de Conducir 3er Grado', orig: 'TRANS', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a 28 empleados de servicios generales' },
      { cat: 'caracteristicas', cod: 'SAN-O+', desc: 'Grupo Sanguíneo O Positivo', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a 412 expedientes de personal en SARA6' },
      { cat: 'caracteristicas', cod: 'SAN-A+', desc: 'Grupo Sanguíneo A Positivo', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a 198 expedientes médicos' },
      { cat: 'caracteristicas', cod: 'EST-SOC', desc: 'Estatus Socioeconómico Aceptado', orig: 'RRHH', tipo: 'texto', act: true, vinc: false },

      { cat: 'tipo_documento', cod: 'V', desc: 'Cédula de Identidad Venezolana', orig: 'IDENT', tipo: 'numero', act: true, vinc: true, mot: 'Clave principal de identificación en toda la base SARA6' },
      { cat: 'tipo_documento', cod: 'E', desc: 'Cédula de Identidad Extranjera', orig: 'IDENT', tipo: 'numero', act: true, vinc: true, mot: 'Vinculado a 85 expedientes de personal extranjero' },
      { cat: 'tipo_documento', cod: 'P', desc: 'Pasaporte Internacional', orig: 'IDENT', tipo: 'mixto', act: true, vinc: true, mot: 'Vinculado a contratos diplomáticos y especiales' },
      { cat: 'tipo_documento', cod: 'J', desc: 'Registro de Información Fiscal (RIF)', orig: 'FISCAL', tipo: 'mixto', act: true, vinc: true, mot: 'Utilizado en declaraciones SENIAT y parafiscales' },

      { cat: 'tematica', cod: 'TEM-ADM', desc: 'Personal Administrativo y Finanzas', orig: 'ESTRUCT', tipo: 'texto', act: true, vinc: true, mot: 'Estructura de puestos administrativos' },
      { cat: 'tematica', cod: 'TEM-MED', desc: 'Cuerpo Médico Asistencial y Quirúrgico', orig: 'ESTRUCT', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a coordinaciones médicas' },
      { cat: 'tematica', cod: 'TEM-ENF', desc: 'Enfermería y Cuidados Intensivos', orig: 'ESTRUCT', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a roles de guardia y turnos' },

      { cat: 'estado_civil', cod: 'S', desc: 'Soltero(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true, mot: 'Declaraciones de retención ISLR' },
      { cat: 'estado_civil', cod: 'C', desc: 'Casado(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true, mot: 'Póliza de seguro de carga familiar' },
      { cat: 'estado_civil', cod: 'U', desc: 'Concubinato / Unión Estable de Hecho', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true, mot: 'Reconocido legalmente ante seguro HCM' },
      { cat: 'estado_civil', cod: 'D', desc: 'Divorciado(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: false },
      { cat: 'estado_civil', cod: 'V', desc: 'Viudo(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: false },

      { cat: 'tipo_relacion', cod: 'EMP', desc: 'Empleado de Nómina Regular', orig: 'CONTRAT', tipo: 'texto', act: true, vinc: true, mot: '1.450 empleados activos vinculados' },
      { cat: 'tipo_relacion', cod: 'CON', desc: 'Contratado por Honorarios Profesionales', orig: 'CONTRAT', tipo: 'texto', act: true, vinc: true, mot: 'Módulo de honorarios médicos' },
      { cat: 'tipo_relacion', cod: 'ASP', desc: 'Aspirante en Proceso de Selección', orig: 'RECLUT', tipo: 'texto', act: true, vinc: false },
      { cat: 'tipo_relacion', cod: 'PAS', desc: 'Pasante Universitario / Técnico', orig: 'ACADEM', tipo: 'texto', act: true, vinc: true, mot: 'Convenios institucionales' },

      { cat: 'nivel_academico', cod: 'BAC', desc: 'Bachiller de la República', orig: 'EDUC', tipo: 'texto', act: true, vinc: true, mot: 'Requisito de cargos operativos' },
      { cat: 'nivel_academico', cod: 'TSU', desc: 'Técnico Superior Universitario', orig: 'EDUC', tipo: 'texto', act: true, vinc: true, mot: 'Personal de laboratorio y radiología' },
      { cat: 'nivel_academico', cod: 'UNI', desc: 'Universitario / Licenciatura / Ingeniería', orig: 'EDUC', tipo: 'texto', act: true, vinc: true, mot: 'Cargos profesionales y jefaturas' },
      { cat: 'nivel_academico', cod: 'ESP', desc: 'Especialización Médica / Clínica', orig: 'POST', tipo: 'texto', act: true, vinc: true, mot: 'Baremo de credenciales médicas' },
      { cat: 'nivel_academico', cod: 'DOC', desc: 'Doctorado / PhD', orig: 'POST', tipo: 'texto', act: true, vinc: false },

      { cat: 'area_profesion', cod: 'MED-CIR', desc: 'Médico Cirujano Especialista', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: '320 especialistas en SARA6' },
      { cat: 'area_profesion', cod: 'ENF-LIC', desc: 'Licenciado(a) en Enfermería', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: '180 enfermeros asistenciales' },
      { cat: 'area_profesion', cod: 'ADM-EMP', desc: 'Administrador de Empresas', orig: 'ADMIN', tipo: 'texto', act: true, vinc: true, mot: 'Coordinaciones administrativas' },
      { cat: 'area_profesion', cod: 'TEC-MAN', desc: 'Técnico de Electromedicina', orig: 'TECNIC', tipo: 'texto', act: true, vinc: true, mot: 'Cuadrilla de infraestructura' },

      { cat: 'idioma', cod: 'ES', desc: 'Español (Lengua Materna)', orig: 'LING', tipo: 'texto', act: true, vinc: true, mot: 'Idioma nativo por defecto en SARA6' },
      { cat: 'idioma', cod: 'EN', desc: 'Inglés (Británico / Americano)', orig: 'LING', tipo: 'texto', act: true, vinc: true, mot: 'Exigido en atención internacional' },
      { cat: 'idioma', cod: 'FR', desc: 'Francés', orig: 'LING', tipo: 'texto', act: true, vinc: false },
      { cat: 'idioma', cod: 'PT', desc: 'Portugués', orig: 'LING', tipo: 'texto', act: true, vinc: false },
      { cat: 'idioma', cod: 'IT', desc: 'Italiano', orig: 'LING', tipo: 'texto', act: true, vinc: false },

      { cat: 'caracteristicas_idioma', cod: 'LEC-TEC', desc: 'Lectura Fluida de Manuales Técnicos', orig: 'HABIL', tipo: 'texto', act: true, vinc: true, mot: 'Soporte electromédico' },
      { cat: 'caracteristicas_idioma', cod: 'CONV-AV', desc: 'Conversación y Negociación Avanzada', orig: 'HABIL', tipo: 'texto', act: true, vinc: false },
      { cat: 'caracteristicas_idioma', cod: 'RED-PUB', desc: 'Redacción de Publicaciones Científicas', orig: 'HABIL', tipo: 'texto', act: true, vinc: false },

      { cat: 'parentesco', cod: 'PAD', desc: 'Padre / Madre', orig: 'FAM', tipo: 'texto', act: true, vinc: true, mot: 'Cobertura HCM ascendientes' },
      { cat: 'parentesco', cod: 'HIJ', desc: 'Hijo / Hija', orig: 'FAM', tipo: 'texto', act: true, vinc: true, mot: 'Bono escolar y guardería' },
      { cat: 'parentesco', cod: 'CON', desc: 'Cónyuge / Pareja Registrada', orig: 'FAM', tipo: 'texto', act: true, vinc: true, mot: 'Titular póliza familiar' },
      { cat: 'parentesco', cod: 'HER', desc: 'Hermano / Hermana', orig: 'FAM', tipo: 'texto', act: true, vinc: false },

      { cat: 'area_experiencia', cod: 'EXP-UCI', desc: 'Cuidados Intensivos Adulto y Pediátrico', orig: 'CLINIC', tipo: 'texto', act: true, vinc: true, mot: 'Hospitalización crítica' },
      { cat: 'area_experiencia', cod: 'EXP-QX', desc: 'Instrumentación Quirúrgica', orig: 'CLINIC', tipo: 'texto', act: true, vinc: true, mot: 'Protocolos de quirófano' },
      { cat: 'area_experiencia', cod: 'EXP-NOM', desc: 'Gestión y Procesamiento de Nómina', orig: 'ADMIN', tipo: 'texto', act: true, vinc: false },

      { cat: 'tipo_bien', cod: 'AUT', desc: 'Automóvil Particular / Sedán', orig: 'VEHIC', tipo: 'texto', act: true, vinc: true, mot: 'Puesto de estacionamiento' },
      { cat: 'tipo_bien', cod: 'MOT', desc: 'Motocicleta / Scooter', orig: 'VEHIC', tipo: 'texto', act: true, vinc: true, mot: 'Control de acceso vial' },
      { cat: 'tipo_bien', cod: 'CAM', desc: 'Camioneta / SUV Oficial', orig: 'VEHIC', tipo: 'texto', act: true, vinc: false },

      { cat: 'tipo_inmueble', cod: 'APT', desc: 'Apartamento Residencial', orig: 'VIV', tipo: 'texto', act: true, vinc: true, mot: 'Dirección fiscal principal' },
      { cat: 'tipo_inmueble', cod: 'CAS', desc: 'Casa Unifamiliar', orig: 'VIV', tipo: 'texto', act: true, vinc: true, mot: 'Verificación domiciliaria' },
      { cat: 'tipo_inmueble', cod: 'QUI', desc: 'Quinta Residencial', orig: 'VIV', tipo: 'texto', act: true, vinc: false },
      { cat: 'tipo_inmueble', cod: 'HAB', desc: 'Habitación / Anexo', orig: 'VIV', tipo: 'texto', act: true, vinc: false },

      { cat: 'origen_hoja', cod: 'PORT-TAL', desc: 'Portal Web de Talento GMSP', orig: 'DIGIT', tipo: 'texto', act: true, vinc: true, mot: 'Postulaciones digitales' },
      { cat: 'origen_hoja', cod: 'REC-INT', desc: 'Recomendación Interna por Empleado', orig: 'REFER', tipo: 'texto', act: true, vinc: true, mot: 'Programa de referidos' },
      { cat: 'origen_hoja', cod: 'FER-EMP', desc: 'Feria Universitaria de Empleo', orig: 'EVENT', tipo: 'texto', act: true, vinc: false }
    ],

    // Datos maestros de los demas modulos del sistema
    datosGenerales: {
      // Hoja de Vida (HOV)
      hov: [
        { cedula: 'V-14520331', nombres: 'Carlos Eduardo', apellidos: 'Mendoza Silva', sexo: 'M', estadoCivil: 'Casado', nacim: '1982-05-14', profesion: 'Médico Cirujano', telf: '0414-2231945', email: 'cmendoza@grupomedsp.com' },
        { cedula: 'V-18942104', nombres: 'María Gabriela', apellidos: 'Torres Peña', sexo: 'F', estadoCivil: 'Soltera', nacim: '1989-11-20', profesion: 'Lic. Enfermería', telf: '0424-9182341', email: 'mtorres@grupomedsp.com' },
        { cedula: 'V-16854210', nombres: 'Alejandro José', apellidos: 'Paredes Rivas', sexo: 'M', estadoCivil: 'Casado', nacim: '1985-03-08', profesion: 'Administrador', telf: '0412-5551982', email: 'aparedes@grupomedsp.com' },
        { cedula: 'V-22104921', nombres: 'Daniela Sofía', apellidos: 'Gómez Blanco', sexo: 'F', estadoCivil: 'Soltera', nacim: '1994-08-12', profesion: 'Bioanalista', telf: '0416-8821903', email: 'dgomez@grupomedsp.com' },
        { cedula: 'V-13490128', nombres: 'Roberto Antonio', apellidos: 'Vargas Luna', sexo: 'M', estadoCivil: 'Casado', nacim: '1979-01-25', profesion: 'Técnico Electromedicina', telf: '0414-1192837', email: 'rvargas@grupomedsp.com' }
      ],
      // Datos Laborales (EML)
      eml: [
        { ficha: 'E-01042', cedula: 'V-14520331', empleado: 'Dr. Carlos Mendoza', cargo: 'Coordinador Quirúrgico', depto: 'Cirugía General', ingreso: '2016-02-01', sueldo: '$ 1.850,00', estatus: 'Activo' },
        { ficha: 'E-01289', cedula: 'V-18942104', empleado: 'Lic. María Torres', cargo: 'Jefe de Guardia UCI', depto: 'Cuidados Intensivos', ingreso: '2019-06-15', sueldo: '$ 950,00', estatus: 'Activo' },
        { ficha: 'E-00892', cedula: 'V-16854210', empleado: 'Lic. Alejandro Paredes', cargo: 'Analista Senior de Nómina', depto: 'Recursos Humanos', ingreso: '2014-10-10', sueldo: '$ 1.100,00', estatus: 'Activo' },
        { ficha: 'E-01450', cedula: 'V-22104921', empleado: 'Lic. Daniela Gómez', cargo: 'Bioanalista Asistencial', depto: 'Laboratorio Clínico', ingreso: '2021-03-01', sueldo: '$ 800,00', estatus: 'Activo' },
        { ficha: 'E-00711', cedula: 'V-13490128', empleado: 'TSU Roberto Vargas', cargo: 'Supervisor de Infraestructura', depto: 'Servicios Generales', ingreso: '2012-08-16', sueldo: '$ 850,00', estatus: 'Activo' }
      ],
      // Licencias (LIC)
      lic: [
        { id: 'LIC-2026-089', ficha: 'E-01042', empleado: 'Dr. Carlos Mendoza', tipo: 'Congreso Médico Quirúrgico', desde: '2026-08-10', hasta: '2026-08-15', dias: 5, remunerado: 'Sí', estado: 'Aprobado' },
        { id: 'LIC-2026-092', ficha: 'E-01289', empleado: 'Lic. María Torres', tipo: 'Permiso de Estudios de Posgrado', desde: '2026-08-18', hasta: '2026-08-19', dias: 2, remunerado: 'Sí', estado: 'Aprobado' },
        { id: 'LIC-2026-095', ficha: 'E-00892', empleado: 'Lic. Alejandro Paredes', tipo: 'Diligencia Personal Justificada', desde: '2026-08-25', hasta: '2026-08-25', dias: 1, remunerado: 'No', estado: 'Pendiente' }
      ],
      // Incapacidades y Reposos (INC)
      inc: [
        { id: 'REP-4819', ficha: 'E-01450', empleado: 'Lic. Daniela Gómez', diag: 'CIE-10 J06.9 Infección Respiratoria', centro: 'IVSS Chacao', desde: '2026-08-01', hasta: '2026-08-04', dias: 3, estado: 'Validado' },
        { id: 'REP-4822', ficha: 'E-00711', empleado: 'TSU Roberto Vargas', diag: 'CIE-10 M54.5 Lumbago no especificado', centro: 'Centro Médico GMSP', desde: '2026-08-12', hasta: '2026-08-16', dias: 5, estado: 'Validado' }
      ],
      // Vacaciones (VAC)
      vac: [
        { id: 'VAC-2026-031', ficha: 'E-01042', empleado: 'Dr. Carlos Mendoza', periodo: '2024-2025', salida: '2026-09-01', reintegro: '2026-09-22', diasHabiles: 15, bonoVac: 'Sí', estado: 'Programada' },
        { id: 'VAC-2026-034', ficha: 'E-00892', empleado: 'Lic. Alejandro Paredes', periodo: '2025-2026', salida: '2026-10-05', reintegro: '2026-10-26', diasHabiles: 15, bonoVac: 'Sí', estado: 'Aprobada' }
      ],
      // Parámetros de Costeo (PCO)
      pco: [
        { codigo: 'CC-1001', nombre: 'Dirección Médica y Quirófanos', cuenta: '6.1.01.01.001', resp: 'Dr. Carlos Mendoza', tipo: 'Operativo', estatus: 'Activo' },
        { codigo: 'CC-1002', nombre: 'Unidad de Cuidados Intensivos (UCI)', cuenta: '6.1.01.01.002', resp: 'Dra. Patricia Colmenares', tipo: 'Operativo', estatus: 'Activo' },
        { codigo: 'CC-2001', nombre: 'Recursos Humanos y Nómina', cuenta: '6.2.01.02.001', resp: 'Lic. Alejandro Paredes', tipo: 'Administrativo', estatus: 'Activo' },
        { codigo: 'CC-3001', nombre: 'Laboratorio Clínico y Banco de Sangre', cuenta: '6.1.01.03.001', resp: 'Lic. Daniela Gómez', tipo: 'Operativo', estatus: 'Activo' }
      ],
      // Manual de Cargos (CAR)
      car: [
        { codigo: 'CAR-001', titulo: 'Médico Especialista Quirúrgico', nivel: 'Profesional Asistencial', grado: 'G-14', minSal: '$ 1.600', maxSal: '$ 2.400', plazas: 45 },
        { codigo: 'CAR-002', titulo: 'Enfermero(a) Especialista UCI', nivel: 'Técnico / Asistencial', grado: 'G-09', minSal: '$ 800', maxSal: '$ 1.200', plazas: 32 },
        { codigo: 'CAR-003', titulo: 'Coordinador de Nómina y Compensaciones', nivel: 'Jefatura Administrativa', grado: 'G-11', minSal: '$ 1.000', maxSal: '$ 1.500', plazas: 2 },
        { codigo: 'CAR-004', titulo: 'Bioanalista Asistencial', nivel: 'Profesional', grado: 'G-08', minSal: '$ 750', maxSal: '$ 1.050', plazas: 18 }
      ],
      // Organigrama (ORG)
      org: [
        { id: 'DIR-01', unidad: 'Dirección General de Salud', nivel: 'Nivel 1 (Dirección)', jefe: 'Dra. Carmen Rivas', dependientes: 4 },
        { id: 'GER-02', unidad: 'Gerencia Médica Quirúrgica', nivel: 'Nivel 2 (Gerencia)', jefe: 'Dr. Carlos Mendoza', dependientes: 6 },
        { id: 'GER-03', unidad: 'Gerencia de Gestión Humana', nivel: 'Nivel 2 (Gerencia)', jefe: 'Lic. Sonia Alfonzo', dependientes: 3 },
        { id: 'COO-04', unidad: 'Coordinación de Nómina', nivel: 'Nivel 3 (Coordinación)', jefe: 'Lic. Alejandro Paredes', dependientes: 4 }
      ],
      // Planta de Personal (PUT)
      put: [
        { puesto: 'PUT-MED-01', cargo: 'Médico Cirujano Staff', depto: 'Cirugía', aprobadas: 20, ocupadas: 18, vacantes: 2 },
        { puesto: 'PUT-ENF-02', cargo: 'Enfermero de Guardia UCI', depto: 'UCI', aprobadas: 25, ocupadas: 24, vacantes: 1 },
        { puesto: 'PUT-ADM-03', cargo: 'Analista de Nómina', depto: 'RRHH', aprobadas: 3, ocupadas: 3, vacantes: 0 }
      ],
      // Actos y Movimientos (CEM)
      cem: [
        { acto: 'ACT-2026-104', ficha: 'E-01289', empleado: 'María Torres', tipo: 'Ascenso a Jefe de Guardia', fecha: '2026-07-01', antSueldo: '$ 800', nvoSueldo: '$ 950', resol: 'RES-GGH-042' },
        { acto: 'ACT-2026-112', ficha: 'E-00892', empleado: 'Alejandro Paredes', tipo: 'Ajuste Escala Salarial', fecha: '2026-08-01', antSueldo: '$ 980', nvoSueldo: '$ 1.100', resol: 'RES-GGH-058' }
      ],
      // Histórico Empleado (CHE)
      che: [
        { reg: 'HST-901', ficha: 'E-01042', fecha: '2016-02-01', evento: 'Ingreso a Nómina Regular', cargo: 'Médico Asistente', salario: '$ 900' },
        { reg: 'HST-902', ficha: 'E-01042', fecha: '2020-04-15', evento: 'Ascenso Coordinación Quirúrgica', cargo: 'Coordinador Quirúrgico', salario: '$ 1.450' },
        { reg: 'HST-903', ficha: 'E-01042', fecha: '2024-01-01', evento: 'Ajuste Salarial Anual', cargo: 'Coordinador Quirúrgico', salario: '$ 1.850' }
      ],
      // Variables Fijas (VAF)
      vaf: [
        { cod: 'VAF-01', concepto: 'Prima de Especialización Médica', tipo: 'Asignación Fija', base: 'Porcentual 25%', formula: 'SUELDO_BASE * 0.25', beneficiarios: 42 },
        { cod: 'VAF-02', concepto: 'Bono de Transporte Asistencial', tipo: 'Asignación Fija', base: 'Monto Fijo $80', formula: 'MONTO_FIJO', beneficiarios: 380 },
        { cod: 'VAF-03', concepto: 'Fondo de Ahorro Habitacional (FAOV)', tipo: 'Deducción Ley', base: '1% Trabajador', formula: 'SUELDO_BASE * 0.01', beneficiarios: 650 }
      ],
      // Buscar Quincena (BQN)
      bqn: [
        { quincena: '2026-15', periodo: '01/08/2026 al 15/08/2026', tipo: '1ra Quincena Agosto 2026', totalNomina: '$ 142.850,00', empleados: 642, estado: 'Cerrada y Pagada' },
        { quincena: '2026-16', periodo: '16/08/2026 al 31/08/2026', tipo: '2da Quincena Agosto 2026', totalNomina: '$ 154.200,00', empleados: 645, estado: 'En Proceso de Pre-Nómina' },
        { quincena: '2026-17', periodo: '01/09/2026 al 15/09/2026', tipo: '1ra Quincena Septiembre 2026', totalNomina: '$ 0,00', empleados: 0, estado: 'Abierta para Novedades' }
      ],
      // Planta Activa (PLA)
      pla: [
        { ficha: 'E-01042', nombre: 'Dr. Carlos Mendoza', unidad: 'Cirugía', sede: 'GMSP Torre Médica', turno: 'Diurno', estatus: 'Activo' },
        { ficha: 'E-01289', nombre: 'Lic. María Torres', unidad: 'Cuidados Intensivos', sede: 'GMSP Principal', turno: 'Rotativo', estatus: 'Activo' },
        { ficha: 'E-00892', nombre: 'Lic. Alejandro Paredes', unidad: 'RRHH', sede: 'GMSP Administrativa', turno: 'Diurno', estatus: 'Activo' },
        { ficha: 'E-01450', nombre: 'Lic. Daniela Gómez', unidad: 'Laboratorio', sede: 'GMSP Principal', turno: 'Vespertino', estatus: 'Activo' },
        { ficha: 'E-00711', nombre: 'TSU Roberto Vargas', unidad: 'Servicios', sede: 'GMSP Integral', turno: 'Diurno', estatus: 'Activo' }
      ],
      // Comprobantes de Pago (REC)
      rec: [
        { recibo: 'REC-2026-15-01042', ficha: 'E-01042', empleado: 'Dr. Carlos Mendoza', quincena: '1ra Quincena Agosto 2026', asignaciones: '$ 1.156,25', deducciones: '$ 84,20', neto: '$ 1.072,05', estatus: 'Emitido' },
        { recibo: 'REC-2026-15-01289', ficha: 'E-01289', empleado: 'Lic. María Torres', quincena: '1ra Quincena Agosto 2026', asignaciones: '$ 593,75', deducciones: '$ 42,10', neto: '$ 551,65', estatus: 'Emitido' },
        { recibo: 'REC-2026-15-00892', ficha: 'E-00892', empleado: 'Lic. Alejandro Paredes', quincena: '1ra Quincena Agosto 2026', asignaciones: '$ 687,50', deducciones: '$ 51,30', neto: '$ 636,20', estatus: 'Emitido' }
      ]
    }
  };

  // 3. FUNCION PRINCIPAL DE RENDERIZADO
  function renderApp() {
    var root = document.getElementById('root');
    if (!root) return;

    if (!state.autenticado) {
      renderLogin(root);
      return;
    }

    var modActivo = null;
    for (var i = 0; i < MODULOS.length; i++) {
      if (MODULOS[i].codigo.toLowerCase() === state.moduloActivo.toLowerCase()) {
        modActivo = MODULOS[i];
        break;
      }
    }
    if (!modActivo) modActivo = MODULOS[0];

    var html = '';
    html += '<div style="display:flex;flex-direction:column;width:100vw;height:100vh;overflow:hidden;background:#090D16;color:#F1F5F9;font-family:sans-serif;">';

    // 3.1 TOP BAR CON BRANDING, ACCESO RAPIDO Y SESION
    html += '<header style="height:56px;background:#0F172A;border-bottom:1px solid rgba(51,65,85,0.7);display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:20;">';
    html += '<div style="display:flex;align-items:center;gap:12px;">';
    html += '<div style="width:36px;height:36px;border-radius:8px;background:rgba(37,99,235,0.25);border:1px solid rgba(59,130,246,0.5);display:flex;align-items:center;justify-content:center;color:#38BDF8;font-weight:800;font-size:16px;">GMSP</div>';
    html += '<div><div style="font-size:15px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">SARA v7.0 • RRHH & Nómina</div>';
    html += '<div style="font-size:11px;color:#64748B;">Grupo Médico Santa Paula • SQL Server 2019</div></div>';
    html += '</div>';

    // Acceso rapido
    html += '<div style="display:flex;align-items:center;gap:8px;">';
    html += '<div style="display:flex;align-items:center;gap:6px;background:#1E293B;padding:4px 10px;border-radius:8px;border:1px solid rgba(71,85,105,0.6);">';
    html += '<span style="font-size:11px;color:#94A3B8;font-weight:600;">Ir a:</span>';
    html += '<input id="quickJump" type="text" placeholder="PHV" maxlength="4" style="background:transparent;border:none;color:#38BDF8;width:45px;font-size:13px;font-weight:700;outline:none;text-transform:uppercase;font-family:monospace;" />';
    html += '</div>';

    html += '<button id="btnQuickPHV" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;cursor:pointer;background:' + (state.moduloActivo === 'phv' ? 'rgba(37,99,235,0.3)' : 'rgba(30,41,59,0.6)') + ';border:' + (state.moduloActivo === 'phv' ? '1px solid rgba(59,130,246,0.8)' : '1px solid rgba(51,65,85,0.5)') + ';color:' + (state.moduloActivo === 'phv' ? '#60A5FA' : '#94A3B8') + ';font-size:12px;font-weight:700;">⚙ [PHV] Parámetros</button>';
    html += '<button id="btnQuickHOV" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;cursor:pointer;background:' + (state.moduloActivo === 'hov' ? 'rgba(37,99,235,0.3)' : 'rgba(30,41,59,0.6)') + ';border:' + (state.moduloActivo === 'hov' ? '1px solid rgba(59,130,246,0.8)' : '1px solid rgba(51,65,85,0.5)') + ';color:' + (state.moduloActivo === 'hov' ? '#60A5FA' : '#94A3B8') + ';font-size:12px;">👤 [HOV]</button>';
    html += '<button id="btnQuickEML" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;cursor:pointer;background:' + (state.moduloActivo === 'eml' ? 'rgba(37,99,235,0.3)' : 'rgba(30,41,59,0.6)') + ';border:' + (state.moduloActivo === 'eml' ? '1px solid rgba(59,130,246,0.8)' : '1px solid rgba(51,65,85,0.5)') + ';color:' + (state.moduloActivo === 'eml' ? '#60A5FA' : '#94A3B8') + ';font-size:12px;">💼 [EML]</button>';
    html += '<button id="btnQuickVAC" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;cursor:pointer;background:' + (state.moduloActivo === 'vac' ? 'rgba(37,99,235,0.3)' : 'rgba(30,41,59,0.6)') + ';border:' + (state.moduloActivo === 'vac' ? '1px solid rgba(59,130,246,0.8)' : '1px solid rgba(51,65,85,0.5)') + ';color:' + (state.moduloActivo === 'vac' ? '#60A5FA' : '#94A3B8') + ';font-size:12px;">🌴 [VAC]</button>';
    html += '<button id="btnQuickREC" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;cursor:pointer;background:' + (state.moduloActivo === 'rec' ? 'rgba(37,99,235,0.3)' : 'rgba(30,41,59,0.6)') + ';border:' + (state.moduloActivo === 'rec' ? '1px solid rgba(59,130,246,0.8)' : '1px solid rgba(51,65,85,0.5)') + ';color:' + (state.moduloActivo === 'rec' ? '#60A5FA' : '#94A3B8') + ';font-size:12px;">🧾 [REC]</button>';
    html += '</div>';

    // Sesion
    html += '<div style="display:flex;align-items:center;gap:12px;font-size:12px;">';
    html += '<div style="padding:4px 10px;background:rgba(30,41,59,0.8);border-radius:6px;border:1px solid rgba(51,65,85,0.6);color:#CBD5E1;">🏢 Empresa: <strong style="color:#38BDF8;">01 - Matriz GMSP</strong></div>';
    html += '<div style="color:#94A3B8;">👤 ' + state.nombreUsuario + '</div>';
    html += '<button id="btnLogout" style="padding:4px 8px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F87171;font-size:11px;cursor:pointer;">Salir</button>';
    html += '</div>';
    html += '</header>';

    // 3.2 CUERPO CON SIDEBAR COMPLETO Y AREA DE CONTENIDO
    html += '<div style="display:flex;flex:1;overflow:hidden;">';

    // SIDEBAR DE NAVEGACION COMPLETO (TODOS LOS MODULOS)
    html += '<aside style="width:250px;min-width:230px;background:#0B1120;border-right:1px solid rgba(51,65,85,0.6);display:flex;flex-direction:column;overflow-y:auto;">';

    var seccionActual = '';
    var subSeccionActual = '';

    for (var mIdx = 0; mIdx < MODULOS.length; mIdx++) {
      var mod = MODULOS[mIdx];

      // Cabecera de Seccion
      if (mod.seccion !== seccionActual) {
        seccionActual = mod.seccion;
        html += '<div style="padding:14px 16px 6px 16px;font-size:11px;font-weight:800;color:#38BDF8;letter-spacing:0.08em;text-transform:uppercase;">' + seccionActual + '</div>';
      }

      // Cabecera de Subseccion (ej. PARAMETROS GENERALES)
      if (mod.subseccion && mod.subseccion !== subSeccionActual) {
        subSeccionActual = mod.subseccion;
        html += '<div style="padding:4px 16px 4px 20px;font-size:10px;font-weight:700;color:#64748B;letter-spacing:0.05em;text-transform:uppercase;">' + subSeccionActual + '</div>';
      } else if (!mod.subseccion) {
        subSeccionActual = '';
      }

      var isActivo = (state.moduloActivo.toLowerCase() === mod.codigo.toLowerCase());
      html += '<div id="nav-' + mod.codigo + '" class="nav-mod-item" data-codigo="' + mod.codigo + '" style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px 8px 24px;margin:1px 8px;border-radius:6px;cursor:pointer;background:' + (isActivo ? 'rgba(59,130,246,0.2)' : 'transparent') + ';border:' + (isActivo ? '1px solid rgba(59,130,246,0.5)' : '1px solid transparent') + ';color:' + (isActivo ? '#93C5FD' : '#94A3B8') + ';font-size:12.5px;font-weight:' + (isActivo ? '600' : '400') + ';">';
      html += '<span>' + mod.icono + ' ' + mod.nombre + '</span><span style="font-size:10px;color:' + (isActivo ? '#38BDF8' : '#64748B') + ';font-weight:700;">[' + mod.codigo.toUpperCase() + ']</span></div>';
    }

    html += '</aside>';

    // 3.3 AREA DE CONTENIDO DEL MODULO
    html += '<main style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:#090D16;">';

    if (state.moduloActivo === 'phv') {
      html += renderModuloPHV();
    } else {
      html += renderModuloGenerico(modActivo);
    }

    html += '</main></div>';

    // 3.4 FOOTER BARRA DE ESTADO
    html += '<footer style="height:28px;background:#0B1120;border-top:1px solid rgba(51,65,85,0.5);display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:11px;color:#64748B;">';
    html += '<div><span>Institución: <strong>Grupo Médico Santa Paula (01)</strong></span><span style="margin:0 8px;">•</span>';
    html += '<span>Módulo Activo: <strong style="color:#38BDF8;">[' + modActivo.codigo.toUpperCase() + '] ' + modActivo.nombre + '</strong></span><span style="margin:0 8px;">•</span>';
    html += '<span>Tabla Principal: <code>' + modActivo.tabla + '</code></span></div>';
    html += '<div><span>Conexión: 🟢 SQL Server 2019 (SARA6 WITH NOLOCK)</span></div>';
    html += '</footer>';

    // 3.5 MODAL ADMINISTRADOR DE CATALOGOS (NUEVO / EDITAR CATALOGO)
    if (state.modalCatalogoAbierto) {
      html += renderModalCatalogo();
    }

    // 3.6 DRAWER LATERAL DE PARAMETROS (PHV)
    if (state.drawerPHV) {
      html += renderDrawerPHV();
    }

    html += '</div>';

    root.innerHTML = html;
    attachAllEvents();
  }

  // 4. SUB-VISTA: MODULO PHV CON SELECTOR Y ADMINISTRACION DE CATALOGOS
  function renderModuloPHV() {
    var catActual = null;
    for (var i = 0; i < state.catalogosPHV.length; i++) {
      if (state.catalogosPHV[i].id === state.catalogoActivo) {
        catActual = state.catalogosPHV[i];
        break;
      }
    }
    if (!catActual) catActual = state.catalogosPHV[0];

    // Filtrar datos
    var filtrados = [];
    for (var j = 0; j < state.datosPHV.length; j++) {
      var item = state.datosPHV[j];
      if (item.cat === state.catalogoActivo) {
        var coincide = true;
        if (state.busquedaPHV.trim()) {
          var q = state.busquedaPHV.toLowerCase();
          if (item.cod.toLowerCase().indexOf(q) === -1 && item.desc.toLowerCase().indexOf(q) === -1 && item.orig.toLowerCase().indexOf(q) === -1) {
            coincide = false;
          }
        }
        if (state.filtroTipoPHV && item.tipo !== state.filtroTipoPHV) {
          coincide = false;
        }
        if (coincide) filtrados.push(item);
      }
    }

    var totalPaginas = Math.ceil(filtrados.length / state.limitePHV) || 1;
    var inicio = (state.paginaPHV - 1) * state.limitePHV;
    var paginados = filtrados.slice(inicio, inicio + state.limitePHV);

    // Filtrar catalogos
    var catsVisibles = [];
    for (var k = 0; k < state.catalogosPHV.length; k++) {
      var c = state.catalogosPHV[k];
      if (!state.filtroCatalogo.trim()) {
        catsVisibles.push(c);
      } else {
        var fc = state.filtroCatalogo.toLowerCase();
        if (c.nombre.toLowerCase().indexOf(fc) !== -1 || c.desc.toLowerCase().indexOf(fc) !== -1 || String(c.numero) === fc) {
          catsVisibles.push(c);
        }
      }
    }

    var html = '';
    // Header PHV
    html += '<div style="padding:16px 24px;background:rgba(15,23,42,0.9);border-bottom:1px solid rgba(51,65,85,0.5);display:flex;align-items:center;justify-content:space-between;">';
    html += '<div><div style="display:flex;align-items:center;gap:10px;"><h2 style="margin:0;font-size:18px;font-weight:700;color:#FFFFFF;">Parámetros Hoja de Vida</h2>';
    html += '<span style="padding:3px 8px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.3);border-radius:6px;color:#38BDF8;font-size:11px;font-weight:700;">[PHV] Módulo Maestro</span></div>';
    html += '<div style="font-size:12px;color:#64748B;margin-top:2px;">Centralización Multiempresa • SARA v7.0 SQL Server 2019 WITH (NOLOCK)</div></div>';
    html += '<div style="display:flex;align-items:center;gap:10px;">';
    html += '<button id="btnExportCSV" style="padding:8px 14px;background:#1E293B;color:#CBD5E1;border:1px solid rgba(71,85,105,0.6);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;">📥 Exportar CSV (;)</button>';
    html += '<button id="btnPrint" style="padding:8px 14px;background:#1E293B;color:#CBD5E1;border:1px solid rgba(71,85,105,0.6);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;">🖨 Imprimir</button>';
    html += '<button id="btnAddRecordPHV" style="padding:9px 18px;background:#2563EB;color:#FFFFFF;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(37,99,235,0.4);">+ Adicionar Registro</button>';
    html += '</div></div>';

    // Contenedor principal con sidebar de catalogos y DataGrid
    html += '<div style="display:flex;flex:1;overflow:hidden;">';

    // Sidebar 14+ Catalogos con Administracion de Catalogos
    html += '<aside style="width:300px;min-width:280px;background:#0F172A;border-right:1px solid rgba(51,65,85,0.5);display:flex;flex-direction:column;overflow-y:auto;">';
    html += '<div style="padding:12px 14px;border-bottom:1px solid rgba(51,65,85,0.4);display:flex;flex-direction:column;gap:8px;">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;">';
    html += '<div style="font-size:11px;font-weight:700;color:#38BDF8;text-transform:uppercase;">Catálogos Maestros (' + state.catalogosPHV.length + ')</div>';
    html += '<button id="btnNuevoCatalogo" style="padding:4px 8px;background:rgba(37,99,235,0.25);border:1px solid rgba(59,130,246,0.6);border-radius:6px;color:#60A5FA;font-size:11px;font-weight:600;cursor:pointer;">+ Catálogo</button>';
    html += '</div>';
    html += '<input id="inputFiltroCat" type="text" placeholder="🔍 Filtrar catálogos..." value="' + state.filtroCatalogo + '" style="width:100%;padding:7px 10px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12px;outline:none;" /></div>';

    html += '<div style="display:flex;flex-direction:column;gap:3px;padding:8px;">';
    for (var m = 0; m < catsVisibles.length; m++) {
      var cItem = catsVisibles[m];
      var count = 0;
      for (var p = 0; p < state.datosPHV.length; p++) {
        if (state.datosPHV[p].cat === cItem.id) count++;
      }
      var isSel = (state.catalogoActivo === cItem.id);
      html += '<div class="cat-item" data-cat="' + cItem.id + '" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:6px;cursor:pointer;background:' + (isSel ? 'rgba(59,130,246,0.18)' : 'transparent') + ';border:' + (isSel ? '1px solid rgba(59,130,246,0.4)' : '1px solid transparent') + ';color:' + (isSel ? '#60A5FA' : '#94A3B8') + ';">';
      html += '<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:11px;font-weight:700;color:' + (isSel ? '#60A5FA' : '#64748B') + ';">' + cItem.numero + '.</span>';
      html += '<div><div style="font-size:12.5px;font-weight:' + (isSel ? '600' : '400') + ';color:' + (isSel ? '#FFFFFF' : '#CBD5E1') + ';">' + cItem.nombre + '</div>';
      html += '<div style="font-size:10px;color:#64748B;">' + cItem.tabla + '</div></div></div>';
      html += '<span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:999px;background:' + (isSel ? 'rgba(59,130,246,0.3)' : 'rgba(30,41,59,0.8)') + ';color:' + (isSel ? '#93C5FD' : '#94A3B8') + ';">' + count + '</span></div>';
    }
    html += '</div></aside>';

    // DataGrid de Parametros
    html += '<div style="flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:20px;gap:16px;">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#131D31;border-radius:10px;border:1px solid rgba(51,65,85,0.6);">';
    html += '<div style="display:flex;align-items:center;gap:12px;flex:1;">';
    html += '<input id="inputBusquedaPHV" type="text" placeholder="🔍 Buscar por código, descripción o nomenclatura..." value="' + state.busquedaPHV + '" style="width:320px;padding:7px 12px;background:#0F172A;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;" />';
    html += '<select id="selectTipoPHV" style="padding:7px 10px;background:#0F172A;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;font-size:12.5px;outline:none;">';
    html += '<option value="" ' + (state.filtroTipoPHV === '' ? 'selected' : '') + '>Todos los tipos</option>';
    html += '<option value="texto" ' + (state.filtroTipoPHV === 'texto' ? 'selected' : '') + '>Texto</option>';
    html += '<option value="numero" ' + (state.filtroTipoPHV === 'numero' ? 'selected' : '') + '>Número</option>';
    html += '<option value="fecha" ' + (state.filtroTipoPHV === 'fecha' ? 'selected' : '') + '>Fecha</option>';
    html += '<option value="mixto" ' + (state.filtroTipoPHV === 'mixto' ? 'selected' : '') + '>Mixto</option>';
    html += '</select></div>';
    html += '<div style="font-size:12px;color:#94A3B8;">Total: <strong style="color:#F8FAFC;">' + filtrados.length + '</strong> registros</div></div>';

    // Banner Informativo con Boton Editar Catalogo
    html += '<div style="padding:12px 16px;background:rgba(30,41,59,0.5);border-radius:8px;border:1px solid rgba(51,65,85,0.4);display:flex;align-items:center;justify-content:space-between;">';
    html += '<div><div style="display:flex;align-items:center;gap:8px;"><strong style="color:#E2E8F0;font-size:13.5px;">' + catActual.numero + '. ' + catActual.nombre + '</strong>';
    html += '<button id="btnEditarCatalogoActivo" style="padding:2px 6px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:4px;color:#93C5FD;font-size:10.5px;cursor:pointer;">✏ Modificar Catálogo</button></div>';
    html += '<div style="font-size:12px;color:#94A3B8;margin-top:2px;">' + catActual.desc + '</div></div>';
    html += '<div style="font-size:11px;color:#64748B;">Tabla SARA6: <code style="color:#38BDF8;">' + catActual.tabla + '</code></div></div>';

    // Tabla DataGrid
    html += '<div style="background:#111827;border-radius:10px;border:1px solid rgba(51,65,85,0.6);overflow:hidden;">';
    html += '<table style="width:100%;border-collapse:collapse;text-align:left;font-size:12.5px;">';
    html += '<thead><tr style="background:#1A233A;border-bottom:1px solid rgba(51,65,85,0.8);">';
    html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;">Código</th>';
    html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;">Descripción</th>';
    html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;">Origen</th>';
    html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;">Tipo Dato</th>';
    html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;">Estado SARA6</th>';
    html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;text-align:center;">Acciones</th></tr></thead><tbody>';

    for (var n = 0; n < paginados.length; n++) {
      var row = paginados[n];
      html += '<tr style="border-bottom:1px solid rgba(30,41,59,0.7);">';
      html += '<td style="padding:12px 16px;font-family:monospace;font-weight:700;color:#38BDF8;">' + row.cod + '</td>';
      html += '<td style="padding:12px 16px;font-weight:500;color:#F8FAFC;">' + row.desc + '</td>';
      html += '<td style="padding:12px 16px;"><span style="padding:2px 6px;background:rgba(51,65,85,0.6);border-radius:4px;font-family:monospace;font-size:11px;color:#CBD5E1;">' + row.orig + '</span></td>';
      html += '<td style="padding:12px 16px;text-transform:capitalize;color:#94A3B8;">' + row.tipo + '</td>';
      html += '<td style="padding:12px 16px;">';
      if (row.vinc) {
        html += '<span title="' + (row.mot || 'Vinculado a registros activos en SARA6') + '" style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;background:rgba(239,68,68,0.12);color:#F87171;border:1px solid rgba(239,68,68,0.3);border-radius:6px;font-size:11px;font-weight:600;cursor:help;">🔒 Vinculado</span>';
      } else {
        html += '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;background:rgba(34,197,94,0.12);color:#4ADE80;border:1px solid rgba(34,197,94,0.3);border-radius:6px;font-size:11px;font-weight:600;">✓ Disponible</span>';
      }
      html += '</td>';
      html += '<td style="padding:12px 16px;text-align:center;"><div style="display:inline-flex;gap:6px;">';
      html += '<button class="btn-edit-phv" data-cod="' + row.cod + '" style="padding:3px 8px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;font-size:11px;cursor:pointer;">✏ Editar</button>';
      html += '<button class="btn-delete-phv" data-cod="' + row.cod + '" ' + (row.vinc ? 'disabled' : '') + ' style="padding:3px 8px;background:' + (row.vinc ? 'rgba(30,41,59,0.4)' : 'rgba(239,68,68,0.15)') + ';border:' + (row.vinc ? '1px solid rgba(51,65,85,0.4)' : '1px solid rgba(239,68,68,0.3)') + ';border-radius:6px;color:' + (row.vinc ? '#64748B' : '#F87171') + ';font-size:11px;cursor:' + (row.vinc ? 'not-allowed' : 'pointer') + ';" title="' + (row.vinc ? 'Bloqueado: Registro en uso en SARA6' : 'Eliminar registro') + '">🗑 Borrar</button>';
      html += '</div></td></tr>';
    }
    html += '</tbody></table></div>';

    // Paginacion
    html += '<div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#94A3B8;">';
    html += '<div>Página <strong style="color:#F8FAFC;">' + state.paginaPHV + '</strong> de <strong style="color:#F8FAFC;">' + totalPaginas + '</strong></div>';
    html += '<div style="display:flex;gap:6px;">';
    html += '<button id="btnPrevPagePHV" ' + (state.paginaPHV <= 1 ? 'disabled' : '') + ' style="padding:5px 12px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;cursor:pointer;">◀ Anterior</button>';
    html += '<button id="btnNextPagePHV" ' + (state.paginaPHV >= totalPaginas ? 'disabled' : '') + ' style="padding:5px 12px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;cursor:pointer;">Siguiente ▶</button>';
    html += '</div></div>';
    html += '</div></div>';

    return html;
  }

  // 5. SUB-VISTA: MODULOS GENERICOS DEL SISTEMA (HOV, EML, LIC, VAC, REC, ETC.)
  function renderModuloGenerico(mod) {
    var datos = state.datosGenerales[mod.codigo] || [];
    var html = '';

    html += '<div style="padding:16px 24px;background:rgba(15,23,42,0.9);border-bottom:1px solid rgba(51,65,85,0.5);display:flex;align-items:center;justify-content:space-between;">';
    html += '<div><div style="display:flex;align-items:center;gap:10px;"><h2 style="margin:0;font-size:18px;font-weight:700;color:#FFFFFF;">' + mod.icono + ' ' + mod.nombre + '</h2>';
    html += '<span style="padding:3px 8px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.3);border-radius:6px;color:#38BDF8;font-size:11px;font-weight:700;">[' + mod.codigo.toUpperCase() + ']</span></div>';
    html += '<div style="font-size:12px;color:#64748B;margin-top:2px;">' + mod.desc + ' • Tabla: <code>' + mod.tabla + '</code></div></div>';
    html += '<div style="display:flex;align-items:center;gap:10px;">';
    html += '<button style="padding:8px 14px;background:#1E293B;color:#CBD5E1;border:1px solid rgba(71,85,105,0.6);border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;" onclick="window.print()">🖨 Imprimir</button>';
    html += '<button style="padding:9px 18px;background:#2563EB;color:#FFFFFF;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">+ Nuevo Registro</button>';
    html += '</div></div>';

    html += '<div style="flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:24px;gap:16px;">';
    
    // Tabla dinamica segun el modulo
    if (datos.length > 0) {
      var keys = Object.keys(datos[0]);
      html += '<div style="background:#111827;border-radius:10px;border:1px solid rgba(51,65,85,0.6);overflow:hidden;">';
      html += '<table style="width:100%;border-collapse:collapse;text-align:left;font-size:12.5px;">';
      html += '<thead><tr style="background:#1A233A;border-bottom:1px solid rgba(51,65,85,0.8);">';
      for (var k = 0; k < keys.length; k++) {
        html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;">' + keys[k] + '</th>';
      }
      html += '<th style="padding:10px 16px;color:#94A3B8;font-size:11px;text-transform:uppercase;text-align:center;">Acciones</th></tr></thead><tbody>';

      for (var r = 0; r < datos.length; r++) {
        var row = datos[r];
        html += '<tr style="border-bottom:1px solid rgba(30,41,59,0.7);">';
        for (var c = 0; c < keys.length; c++) {
          var val = row[keys[c]];
          var isKey = (c === 0);
          html += '<td style="padding:12px 16px;' + (isKey ? 'font-family:monospace;font-weight:700;color:#38BDF8;' : 'color:#F8FAFC;') + '">' + val + '</td>';
        }
        html += '<td style="padding:12px 16px;text-align:center;"><button style="padding:3px 8px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;font-size:11px;cursor:pointer;">Ver Detalle</button></td>';
        html += '</tr>';
      }
      html += '</tbody></table></div>';
    } else {
      html += '<div style="padding:40px;background:#111827;border-radius:10px;border:1px solid rgba(51,65,85,0.6);text-align:center;color:#94A3B8;">No hay registros cargados para este módulo.</div>';
    }

    html += '</div>';
    return html;
  }

  // 6. MODAL ADMINISTRADOR DE CATALOGOS (CREAR / EDITAR CATALOGOS MAESTROS)
  function renderModalCatalogo() {
    var html = '';
    html += '<div id="modalCatOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:60;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="width:480px;max-width:90vw;background:#0F172A;border:1px solid rgba(51,65,85,0.8);border-radius:14px;box-shadow:0 20px 50px rgba(0,0,0,0.6);overflow:hidden;">';
    html += '<div style="padding:16px 20px;background:#1E293B;border-bottom:1px solid rgba(51,65,85,0.6);display:flex;align-items:center;justify-content:space-between;">';
    html += '<h3 style="margin:0;font-size:15px;color:#F8FAFC;">' + (state.modoEdicionCatalogo ? 'Modificar Catálogo Maestro' : 'Crear Nuevo Catálogo Maestro') + '</h3>';
    html += '<button id="btnCloseModalCat" style="background:transparent;border:none;color:#94A3B8;font-size:18px;cursor:pointer;">✕</button></div>';

    html += '<form id="formCatalogoModal" style="padding:20px;display:flex;flex-direction:column;gap:14px;">';
    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:4px;">Nombre del Catálogo *</label>';
    html += '<input id="inputCatNombre" type="text" required value="' + state.formCatalogo.nombre + '" placeholder="Ej. Nivel de Riesgo Laboral" style="width:100%;padding:8px 12px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;" /></div>';

    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:4px;">Identificador del Catálogo (ID) *</label>';
    html += '<input id="inputCatID" type="text" required ' + (state.modoEdicionCatalogo ? 'disabled' : '') + ' value="' + state.formCatalogo.id + '" placeholder="Ej. riesgo_laboral" style="width:100%;padding:8px 12px;background:' + (state.modoEdicionCatalogo ? '#1E293B' : '#090D16') + ';border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;text-transform:lowercase;" /></div>';

    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:4px;">Descripción / Alcance</label>';
    html += '<input id="inputCatDesc" type="text" value="' + state.formCatalogo.desc + '" placeholder="Descripción detallada de los parámetros contenidos" style="width:100%;padding:8px 12px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;" /></div>';

    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:4px;">Tabla en SQL Server SARA6 *</label>';
    html += '<input id="inputCatTabla" type="text" required value="' + state.formCatalogo.tabla + '" placeholder="Ej. RIESGOLABORAL_RLA" style="width:100%;padding:8px 12px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;text-transform:uppercase;" /></div>';

    html += '<div style="display:flex;gap:10px;margin-top:8px;padding-top:14px;border-top:1px solid rgba(51,65,85,0.6);">';
    html += '<button type="button" id="btnCancelModalCat" style="flex:1;padding:10px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;cursor:pointer;">Cancelar</button>';
    html += '<button type="submit" style="flex:1;padding:10px;background:#2563EB;border:none;border-radius:6px;color:#FFFFFF;font-weight:600;cursor:pointer;">Guardar Catálogo</button>';
    html += '</div></form></div></div>';
    return html;
  }

  // 7. DRAWER LATERAL DE PARAMETROS (PHV)
  function renderDrawerPHV() {
    var catActual = null;
    for (var i = 0; i < state.catalogosPHV.length; i++) {
      if (state.catalogosPHV[i].id === state.catalogoActivo) {
        catActual = state.catalogosPHV[i];
        break;
      }
    }
    if (!catActual) catActual = state.catalogosPHV[0];

    var html = '';
    html += '<div id="drawerOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);z-index:50;display:flex;justify-content:flex-end;">';
    html += '<div id="drawerBox" style="width:440px;max-width:90vw;background:#0F172A;height:100%;border-left:1px solid rgba(51,65,85,0.7);display:flex;flex-direction:column;box-shadow:-10px 0 30px rgba(0,0,0,0.5);">';
    html += '<div style="padding:18px 22px;border-bottom:1px solid rgba(51,65,85,0.6);display:flex;align-items:center;justify-content:space-between;">';
    html += '<div><h3 style="margin:0;font-size:15px;color:#F8FAFC;">' + (state.modoEdicionPHV ? 'Editar Parámetro' : 'Adicionar Nuevo Registro') + '</h3>';
    html += '<div style="font-size:11px;color:#64748B;">Catálogo: ' + catActual.nombre + '</div></div>';
    html += '<button id="btnCloseDrawerPHV" style="background:transparent;border:none;color:#94A3B8;font-size:20px;cursor:pointer;">✕</button></div>';
    
    html += '<form id="formParamPHV" style="padding:22px;display:flex;flex-direction:column;gap:16px;flex:1;overflow-y:auto;">';
    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:5px;">Código de Identificación *</label>';
    html += '<input id="inputCodPHV" type="text" required ' + (state.modoEdicionPHV ? 'disabled' : '') + ' value="' + state.formPHV.cod + '" placeholder="Ej. LIC-03, V, MED" style="width:100%;padding:8px 12px;background:' + (state.modoEdicionPHV ? '#1E293B' : '#090D16') + ';border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;text-transform:uppercase;" /></div>';
    
    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:5px;">Descripción Oficial *</label>';
    html += '<input id="inputDescPHV" type="text" required value="' + state.formPHV.desc + '" placeholder="Descripción completa del parámetro" style="width:100%;padding:8px 12px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;" /></div>';
    
    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:5px;">Origen / Nomenclatura</label>';
    html += '<input id="inputOrigPHV" type="text" value="' + state.formPHV.orig + '" placeholder="Ej. TRANS, SALUD, RRHH" style="width:100%;padding:8px 12px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;text-transform:uppercase;" /></div>';
    
    html += '<div><label style="display:block;font-size:11.5px;font-weight:600;color:#94A3B8;margin-bottom:5px;">Tipo de Dato</label>';
    html += '<select id="selectFormTipoPHV" style="width:100%;padding:8px 12px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#F8FAFC;font-size:12.5px;outline:none;">';
    html += '<option value="texto" ' + (state.formPHV.tipo === 'texto' ? 'selected' : '') + '>Texto</option>';
    html += '<option value="numero" ' + (state.formPHV.tipo === 'numero' ? 'selected' : '') + '>Número</option>';
    html += '<option value="fecha" ' + (state.formPHV.tipo === 'fecha' ? 'selected' : '') + '>Fecha</option>';
    html += '<option value="mixto" ' + (state.formPHV.tipo === 'mixto' ? 'selected' : '') + '>Mixto</option>';
    html += '</select></div>';
    
    html += '<div style="margin-top:auto;display:flex;gap:10px;padding-top:16px;border-top:1px solid rgba(51,65,85,0.6);">';
    html += '<button type="button" id="btnCancelDrawerPHV" style="flex:1;padding:10px;background:#1E293B;border:1px solid rgba(71,85,105,0.6);border-radius:6px;color:#CBD5E1;cursor:pointer;font-size:13px;">Cancelar</button>';
    html += '<button type="submit" style="flex:1;padding:10px;background:#2563EB;border:none;border-radius:6px;color:#FFFFFF;font-weight:600;cursor:pointer;font-size:13px;">Guardar Registro</button>';
    html += '</div></form></div></div>';
    return html;
  }

  // 8. LOGIN SCREEN
  function renderLogin(root) {
    var html = '';
    html += '<div style="display:flex;align-items:center;justify-content:center;width:100vw;height:100vh;background:#090D16;font-family:sans-serif;">';
    html += '<div style="width:400px;background:#0F172A;border:1px solid rgba(51,65,85,0.8);border-radius:16px;padding:32px;box-shadow:0 20px 50px rgba(0,0,0,0.6);display:flex;flex-direction:column;gap:20px;">';
    html += '<div style="display:flex;align-items:center;gap:12px;">';
    html += '<div style="width:44px;height:44px;border-radius:10px;background:rgba(37,99,235,0.25);border:1px solid rgba(59,130,246,0.5);display:flex;align-items:center;justify-content:center;color:#38BDF8;font-weight:800;font-size:18px;">GMSP</div>';
    html += '<div><h2 style="margin:0;font-size:18px;font-weight:700;color:#FFFFFF;">SARA v7.0</h2><div style="font-size:12px;color:#64748B;">Sistema de RRHH & Nómina</div></div>';
    html += '</div>';
    html += '<form id="loginForm" style="display:flex;flex-direction:column;gap:14px;">';
    html += '<div><label style="display:block;font-size:12px;font-weight:600;color:#94A3B8;margin-bottom:6px;">Usuario</label>';
    html += '<input id="loginUser" type="text" value="edixon.rodriguez" required style="width:100%;padding:10px 14px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:8px;color:#F8FAFC;font-size:13px;outline:none;" /></div>';
    html += '<div><label style="display:block;font-size:12px;font-weight:600;color:#94A3B8;margin-bottom:6px;">Contraseña</label>';
    html += '<input id="loginPass" type="password" value="password" required style="width:100%;padding:10px 14px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:8px;color:#F8FAFC;font-size:13px;outline:none;" /></div>';
    html += '<div><label style="display:block;font-size:12px;font-weight:600;color:#94A3B8;margin-bottom:6px;">Empresa</label>';
    html += '<select style="width:100%;padding:10px 14px;background:#090D16;border:1px solid rgba(71,85,105,0.6);border-radius:8px;color:#CBD5E1;font-size:13px;outline:none;">';
    html += '<option>01 - Grupo Médico Santa Paula S.A.</option></select></div>';
    html += '<button type="submit" style="margin-top:8px;padding:12px;background:#2563EB;color:#FFFFFF;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.4);">Iniciar Sesión</button>';
    html += '</form></div></div>';

    root.innerHTML = html;
    var form = document.getElementById('loginForm');
    if (form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        state.autenticado = true;
        renderApp();
      };
    }
  }

  // 9. EVENT LISTENERS E INTERACTIVIDAD
  function attachAllEvents() {
    // Quick jump
    var qj = document.getElementById('quickJump');
    if (qj) {
      qj.onkeydown = function(e) {
        if (e.key === 'Enter') {
          var val = qj.value.trim().toLowerCase();
          var existe = false;
          for (var i = 0; i < MODULOS.length; i++) {
            if (MODULOS[i].codigo.toLowerCase() === val) {
              state.moduloActivo = val;
              existe = true;
              break;
            }
          }
          if (existe) {
            renderApp();
          } else {
            alert('Módulo [' + val.toUpperCase() + '] no encontrado.');
          }
        }
      };
    }

    // Botones Header
    var btnQPHV = document.getElementById('btnQuickPHV');
    if (btnQPHV) btnQPHV.onclick = function() { state.moduloActivo = 'phv'; renderApp(); };
    var btnQHOV = document.getElementById('btnQuickHOV');
    if (btnQHOV) btnQHOV.onclick = function() { state.moduloActivo = 'hov'; renderApp(); };
    var btnQEML = document.getElementById('btnQuickEML');
    if (btnQEML) btnQEML.onclick = function() { state.moduloActivo = 'eml'; renderApp(); };
    var btnQVAC = document.getElementById('btnQuickVAC');
    if (btnQVAC) btnQVAC.onclick = function() { state.moduloActivo = 'vac'; renderApp(); };
    var btnQREC = document.getElementById('btnQuickREC');
    if (btnQREC) btnQREC.onclick = function() { state.moduloActivo = 'rec'; renderApp(); };

    var btnLogout = document.getElementById('btnLogout');
    if (btnLogout) btnLogout.onclick = function() { state.autenticado = false; renderApp(); };

    // Navegacion Sidebar
    var navItems = document.querySelectorAll('.nav-mod-item');
    navItems.forEach(function(el) {
      el.onclick = function() {
        var cod = el.getAttribute('data-codigo');
        if (cod) {
          state.moduloActivo = cod;
          renderApp();
        }
      };
    });

    // EVENTOS PHV: Selector de Catalogos
    var catItems = document.querySelectorAll('.cat-item');
    catItems.forEach(function(el) {
      el.onclick = function() {
        state.catalogoActivo = el.getAttribute('data-cat');
        state.paginaPHV = 1;
        renderApp();
      };
    });

    // Filtros PHV
    var inBusPHV = document.getElementById('inputBusquedaPHV');
    if (inBusPHV) inBusPHV.oninput = function(e) { state.busquedaPHV = e.target.value; state.paginaPHV = 1; renderApp(); };

    var inFC = document.getElementById('inputFiltroCat');
    if (inFC) inFC.oninput = function(e) { state.filtroCatalogo = e.target.value; renderApp(); };

    var selTPHV = document.getElementById('selectTipoPHV');
    if (selTPHV) selTPHV.onchange = function(e) { state.filtroTipoPHV = e.target.value; state.paginaPHV = 1; renderApp(); };

    // Paginacion PHV
    var bpPHV = document.getElementById('btnPrevPagePHV');
    if (bpPHV) bpPHV.onclick = function() { state.paginaPHV = Math.max(1, state.paginaPHV - 1); renderApp(); };
    var bnPHV = document.getElementById('btnNextPagePHV');
    if (bnPHV) bnPHV.onclick = function() { state.paginaPHV++; renderApp(); };

    // Drawer PHV
    var btnAddPHV = document.getElementById('btnAddRecordPHV');
    if (btnAddPHV) btnAddPHV.onclick = function() {
      state.modoEdicionPHV = false;
      state.formPHV = { cod: '', desc: '', orig: '', tipo: 'texto', act: true };
      state.drawerPHV = true;
      renderApp();
    };

    var btnCloseDPHV = document.getElementById('btnCloseDrawerPHV');
    if (btnCloseDPHV) btnCloseDPHV.onclick = function() { state.drawerPHV = false; renderApp(); };
    var btnCanDPHV = document.getElementById('btnCancelDrawerPHV');
    if (btnCanDPHV) btnCanDPHV.onclick = function() { state.drawerPHV = false; renderApp(); };

    // Guardar Parametro PHV
    var formPHV = document.getElementById('formParamPHV');
    if (formPHV) {
      formPHV.onsubmit = function(e) {
        e.preventDefault();
        var cod = document.getElementById('inputCodPHV').value.trim().toUpperCase();
        var desc = document.getElementById('inputDescPHV').value.trim();
        var orig = document.getElementById('inputOrigPHV').value.trim().toUpperCase() || 'DEF';
        var tipo = document.getElementById('selectFormTipoPHV').value;

        if (state.modoEdicionPHV) {
          for (var x = 0; x < state.datosPHV.length; x++) {
            if (state.datosPHV[x].cat === state.catalogoActivo && state.datosPHV[x].cod === cod) {
              state.datosPHV[x].desc = desc;
              state.datosPHV[x].orig = orig;
              state.datosPHV[x].tipo = tipo;
              break;
            }
          }
        } else {
          state.datosPHV.push({ cat: state.catalogoActivo, cod: cod, desc: desc, orig: orig, tipo: tipo, act: true, vinc: false });
        }

        state.drawerPHV = false;
        renderApp();
      };
    }

    // Botones Editar/Borrar Parametro PHV
    document.querySelectorAll('.btn-edit-phv').forEach(function(b) {
      b.onclick = function() {
        var cod = b.getAttribute('data-cod');
        for (var y = 0; y < state.datosPHV.length; y++) {
          if (state.datosPHV[y].cat === state.catalogoActivo && state.datosPHV[y].cod === cod) {
            state.modoEdicionPHV = true;
            state.formPHV = { cod: state.datosPHV[y].cod, desc: state.datosPHV[y].desc, orig: state.datosPHV[y].orig, tipo: state.datosPHV[y].tipo, act: state.datosPHV[y].act };
            state.drawerPHV = true;
            renderApp();
            break;
          }
        }
      };
    });

    document.querySelectorAll('.btn-delete-phv').forEach(function(b) {
      b.onclick = function() {
        var cod = b.getAttribute('data-cod');
        for (var z = 0; z < state.datosPHV.length; z++) {
          var item = state.datosPHV[z];
          if (item.cat === state.catalogoActivo && item.cod === cod) {
            if (item.vinc) {
              alert('Acción bloqueada: El registro ' + cod + ' está vinculado en SARA6.');
              return;
            }
            if (confirm('¿Eliminar parámetro ' + cod + ' (' + item.desc + ')?')) {
              state.datosPHV.splice(z, 1);
              renderApp();
            }
            break;
          }
        }
      };
    });

    // EVENTOS ADMINISTRACION DE CATALOGOS (NUEVO / EDITAR CATALOGO)
    var btnNvoCat = document.getElementById('btnNuevoCatalogo');
    if (btnNvoCat) {
      btnNvoCat.onclick = function() {
        state.modoEdicionCatalogo = false;
        state.formCatalogo = { id: '', numero: state.catalogosPHV.length + 1, nombre: '', desc: '', tabla: '', tipo: 'texto' };
        state.modalCatalogoAbierto = true;
        renderApp();
      };
    }

    var btnEditCatAct = document.getElementById('btnEditarCatalogoActivo');
    if (btnEditCatAct) {
      btnEditCatAct.onclick = function() {
        for (var i = 0; i < state.catalogosPHV.length; i++) {
          if (state.catalogosPHV[i].id === state.catalogoActivo) {
            var c = state.catalogosPHV[i];
            state.modoEdicionCatalogo = true;
            state.formCatalogo = { id: c.id, numero: c.numero, nombre: c.nombre, desc: c.desc, tabla: c.tabla, tipo: c.tipo || 'texto' };
            state.modalCatalogoAbierto = true;
            renderApp();
            break;
          }
        }
      };
    }

    var btnCloseMC = document.getElementById('btnCloseModalCat');
    if (btnCloseMC) btnCloseMC.onclick = function() { state.modalCatalogoAbierto = false; renderApp(); };
    var btnCanMC = document.getElementById('btnCancelModalCat');
    if (btnCanMC) btnCanMC.onclick = function() { state.modalCatalogoAbierto = false; renderApp(); };

    // Guardar Catalogo (Nuevo o Editado)
    var formCatM = document.getElementById('formCatalogoModal');
    if (formCatM) {
      formCatM.onsubmit = function(e) {
        e.preventDefault();
        var id = document.getElementById('inputCatID').value.trim().toLowerCase();
        var nombre = document.getElementById('inputCatNombre').value.trim();
        var desc = document.getElementById('inputCatDesc').value.trim();
        var tabla = document.getElementById('inputCatTabla').value.trim().toUpperCase();

        if (state.modoEdicionCatalogo) {
          for (var k = 0; k < state.catalogosPHV.length; k++) {
            if (state.catalogosPHV[k].id === id) {
              state.catalogosPHV[k].nombre = nombre;
              state.catalogosPHV[k].desc = desc;
              state.catalogosPHV[k].tabla = tabla;
              break;
            }
          }
        } else {
          var nvoNum = state.catalogosPHV.length + 1;
          state.catalogosPHV.push({ id: id, numero: nvoNum, nombre: nombre, desc: desc, tabla: tabla, tipo: 'texto' });
          state.catalogoActivo = id;
        }

        state.modalCatalogoAbierto = false;
        renderApp();
      };
    }

    // Export CSV
    var btnExp = document.getElementById('btnExportCSV');
    if (btnExp) {
      btnExp.onclick = function() {
        var filtrados = [];
        for (var i = 0; i < state.datosPHV.length; i++) {
          if (state.datosPHV[i].cat === state.catalogoActivo) filtrados.push(state.datosPHV[i]);
        }
        var csvRows = ['Codigo;Descripcion;Origen;Tipo Dato;Empresa;Estado SARA6'];
        for (var w = 0; w < filtrados.length; w++) {
          var d = filtrados[w];
          csvRows.push([d.cod, '"' + d.desc.replace(/"/g, '""') + '"', d.orig, d.tipo, '01', d.vinc ? 'VINCULADO' : 'DISPONIBLE'].join(';'));
        }
        var blob = new Blob(['\uFEFF' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'PHV_' + state.catalogoActivo + '_' + new Date().toISOString().slice(0, 10) + '.csv';
        a.click();
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
