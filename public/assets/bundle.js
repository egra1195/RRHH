(function() {
  'use strict';

  // 1. DEFINICION COMPLETA DE LOS 16 MODULOS DEL SISTEMA SARA6
  var MODULOS = [
    // MAESTROS
    { codigo: 'org', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Organigrama Funcional', icono: '\uD83C\uDFDB', tabla: 'UNIDAD_UNI', desc: 'Estructura organizacional, dependencias, co-jefaturas y headcount activo' },
    { codigo: 'phv', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Par\u00E1metros Hoja de Vida', icono: '\u2699', tabla: 'PARAMETROHOJAVIDA_PHV', desc: '14 Cat\u00E1logos maestros parametrizables con centralizaci\u00F3n multiempresa' },
    { codigo: 'pco', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Par\u00E1metros de Costeo', icono: '\uD83D\uDCCA', tabla: 'CENTROCOSTO_CEC', desc: 'Centros de costo, cuentas contables y distribuci\u00F3n presupuestaria' },
    { codigo: 'car', seccion: 'MAESTROS', subseccion: 'PARAMETROS GENERALES', nombre: 'Manual de Cargos', icono: '\uD83C\uDF96', tabla: 'CARGO_CAR', desc: 'Descripciones de puestos, perfiles y bandas salariales' },

    // RECLUTAMIENTO Y SELECCION
    { codigo: 'req', seccion: 'RECLUTAMIENTO Y SELECCION', subseccion: '', nombre: 'Vacantes & Headcount', icono: '\uD83D\uDCE2', tabla: 'REQUISICION_REQ', desc: 'Apertura de vacantes por desincorporaci\u00F3n o headcount de estructura' },
    { codigo: 'ats', seccion: 'RECLUTAMIENTO Y SELECCION', subseccion: '', nombre: 'Transacciones ATS', icono: '\uD83C\uDFAF', tabla: 'PROCESOSELECCION_ATS', desc: 'Pipeline Kanban, evaluaci\u00F3n de skills, pruebas psicot\u00E9cnicas y screening' },
    { codigo: 'cmp', seccion: 'RECLUTAMIENTO Y SELECCION', subseccion: '', nombre: 'Matriz Comparativa', icono: '\uD83D\uDCCA', tabla: 'EVALUACION_EVA', desc: 'Cuadro de mando para supervisores y comparativa de habilidades de postulados' },
    { codigo: 'ofe', seccion: 'RECLUTAMIENTO Y SELECCION', subseccion: '', nombre: 'Ofertas y Contrataci\u00F3n', icono: '\uD83D\uDCDD', tabla: 'OFERTACONTRATO_OFE', desc: 'Emisi\u00F3n de carta oferta, firma de contrato y transferencia a n\u00F3mina activa' },
    { codigo: 'kpi', seccion: 'RECLUTAMIENTO Y SELECCION', subseccion: '', nombre: 'M\u00E9tricas y Estad\u00EDsticas', icono: '\uD83D\uDCC8', tabla: 'METRICASEL_KPI', desc: 'Indicadores de tiempo de cobertura, ratio de aptitud y efectividad' },

    // GESTION DE PERSONAL
    { codigo: 'hov', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Hoja de Vida', icono: '\uD83D\uDC64', tabla: 'HOJAVIDA_HOV', desc: 'Expedientes biogr\u00E1ficos, datos personales, acad\u00E9micos y familiares' },
    { codigo: 'eml', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Datos Laborales', icono: '\uD83D\uDCBC', tabla: 'EMPLEADO_EML', desc: 'Ficha de contrataci\u00F3n activa, cargos, salarios y afiliaciones' },
    { codigo: 'pla', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Planta Activa', icono: '\uD83D\uDC65', tabla: 'EMPLEADO_EML', desc: 'Censo de personal en servicio activo por unidad' },
    { codigo: 'put', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Planta de Personal', icono: '\uD83C\uDFE2', tabla: 'PUESTOTRABAJO_PUT', desc: 'Posiciones de trabajo aprobadas, ocupadas y vacantes por headcount' },
    { codigo: 'cem', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Actos y Movimientos', icono: '\uD83D\uDCDD', tabla: 'ACTOCAMBIOEMP_ACE', desc: 'Resoluciones administrativas, desincorporaciones y transferencias' },
    { codigo: 'che', seccion: 'GESTION DE PERSONAL', subseccion: '', nombre: 'Hist\u00F3rico Empleado', icono: '\uD83D\uDCDC', tabla: 'CAMBIOEMPLEADO_CEM', desc: 'L\u00EDnea de tiempo contractual y salarial' },

    // CONTROL DE AUSENCIAS & NOMINA
    { codigo: 'lic', seccion: 'CONTROL DE AUSENCIAS', subseccion: '', nombre: 'Licencias y Permisos', icono: '\uD83D\uDCCB', tabla: 'LIBROAUSENCIA_LIA', desc: 'Permisos remunerados y no remunerados' },
    { codigo: 'inc', seccion: 'CONTROL DE AUSENCIAS', subseccion: '', nombre: 'Incapacidades y Reposos', icono: '\uD83E\uDE7A', tabla: 'LIBROAUSENCIA_LIA', desc: 'Validaci\u00F3n m\u00E9dica IVSS y reposos hospitalarios' },
    { codigo: 'vac', seccion: 'CONTROL DE AUSENCIAS', subseccion: '', nombre: 'Vacaciones', icono: '\uD83C\uDF34', tabla: 'LIBROAUSENCIA_LIA', desc: 'Registro de periodos vacacionales y disfrute' },
    { codigo: 'vaf', seccion: 'NOMINA Y COMPENSACIONES', subseccion: '', nombre: 'Variables Fijas', icono: '\uD83D\uDCB2', tabla: 'VARIABLEPERIOD_VAP', desc: 'Conceptos fijos por empleado' },
    { codigo: 'bqn', seccion: 'NOMINA Y COMPENSACIONES', subseccion: '', nombre: 'Buscar Quincena', icono: '\uD83D\uDCC5', tabla: 'PERIODO_PER', desc: 'Calendario y control de periodos de pago' },
    { codigo: 'rec', seccion: 'NOMINA Y COMPENSACIONES', subseccion: '', nombre: 'Comprobantes de Pago', icono: '\uD83E\uDDFE', tabla: 'NOMINA_NOM', desc: 'Recibos individuales de n\u00F3mina' }
  ];

  // 2. DATASET IPOSTEL COMPLETO
  var UBICACIONES_IPOSTEL = {
    "MIRANDA": {
      "Baruta": [
        { label: "Parroquia Las Minas - Plaza Las Am\u00E9ricas - Sector Santa Paula (C.P. 1061)", cp: "1061" },
        { label: "Parroquia Las Minas - Plaza Las Am\u00E9ricas - Sector El Cafetal (C.P. 1061)", cp: "1061" },
        { label: "Parroquia Las Minas - Plaza Las Am\u00E9ricas - Sector Caurimare (C.P. 1061)", cp: "1061" },
        { label: "Parroquia Las Minas - Plaza Las Am\u00E9ricas - Sector Chuao (C.P. 1061)", cp: "1061" },
        { label: "Parroquia Las Minas - Plaza Las Am\u00E9ricas - Sector San Luis (C.P. 1061)", cp: "1061" },
        { label: "Parroquia Baruta - Prados del Este - Sector Santa Fe Norte (C.P. 1080)", cp: "1080" },
        { label: "Parroquia Baruta - Prados del Este - Sector Santa Fe Sur (C.P. 1080)", cp: "1080" },
        { label: "Parroquia Baruta - Prados del Este - Sector Prados del Este (C.P. 1080)", cp: "1080" },
        { label: "Parroquia Baruta - Prados del Este - Sector La Trinidad (C.P. 1080)", cp: "1080" }
      ],
      "Chacao": [
        { label: "Parroquia Chacao - Chacao Centro - Sector Altamira (C.P. 1060)", cp: "1060" },
        { label: "Parroquia Chacao - Chacao Centro - Sector Los Palos Grandes (C.P. 1060)", cp: "1060" },
        { label: "Parroquia Chacao - Chacao Centro - Sector El Rosal (C.P. 1060)", cp: "1060" },
        { label: "Parroquia Chacao - CCCT - Sector Ciudad Comercial Tamanaco (C.P. 1064)", cp: "1064" }
      ],
      "Sucre": [
        { label: "Parroquia Leoncio Mart\u00EDnez - Los Dos Caminos - Sector Los Dos Caminos (C.P. 1071)", cp: "1071" },
        { label: "Parroquia Leoncio Mart\u00EDnez - Los Dos Caminos - Sector Los Cortijos de Lourdes (C.P. 1071)", cp: "1071" },
        { label: "Parroquia Petare - Petare Centro - Sector La Urbina (C.P. 1073)", cp: "1073" },
        { label: "Parroquia Petare - Petare Centro - Sector Palo Verde (C.P. 1073)", cp: "1073" }
      ],
      "Guaicaipuro": [{ label: "Parroquia Los Teques - Los Teques Centro - Sector Centro Los Teques (C.P. 1201)", cp: "1201" }],
      "Plaza": [{ label: "Parroquia Guarenas - Guarenas Centro - Sector Nueva Casarapa (C.P. 1220)", cp: "1220" }],
      "Zamora": [{ label: "Parroquia Guatire - Guatire Centro - Sector Castillejo (C.P. 1221)", cp: "1221" }]
    },
    "DISTRITO CAPITAL": {
      "Libertador": [
        { label: "Parroquia El Recreo - Sabana Grande - Sector Sabana Grande / Chaca\u00EDto (C.P. 1050)", cp: "1050" },
        { label: "Parroquia San Pedro - Los Chaguaramos - Sector Santa M\u00F3nica (C.P. 1041)", cp: "1041" },
        { label: "Parroquia Catedral - El Silencio - Sector Plaza Bol\u00EDvar (C.P. 1012)", cp: "1012" },
        { label: "Parroquia La Candelaria - La Candelaria - Sector Parque Carabobo (C.P. 1011)", cp: "1011" },
        { label: "Parroquia Sucre - Propatria - Sector Catia / P\u00E9rez Bonalde (C.P. 1030)", cp: "1030" }
      ]
    },
    "ARAGUA": { "Girardot": [{ label: "Parroquia Las Delicias - Las Delicias - Sector La Soledad (C.P. 2101)", cp: "2101" }] },
    "CARABOBO": { "Valencia": [{ label: "Parroquia Urbana San Jos\u00E9 - Valencia Norte - Sector El Vi\u00F1edo (C.P. 2001)", cp: "2001" }] },
    "ZULIA": { "Maracaibo": [{ label: "Parroquia Olegario Villalobos - Maracaibo - Sector Bella Vista (C.P. 4001)", cp: "4001" }] }
  };

  // 3. ESTADO GLOBAL COMPLETO (SARA6)
  var state = {
    tema: localStorage.getItem('sara_theme') || 'light',
    autenticado: true,
    usuario: 'edixon.rodriguez',
    nombreUsuario: 'Edixon Rodr\u00EDguez',
    rol: 'Coordinador de Reclutamiento & N\u00F3mina',
    empresa: '01 - Grupo M\u00E9dico Santa Paula S.A.',
    moduloActivo: 'phv',
    busquedaModulo: '',

    // MODULO PHV (14 CATALOGOS)
    catalogoActivo: 'caracteristicas',
    busquedaPHV: '',
    filtroCatalogo: '',
    filtroTipoPHV: '',
    paginaPHV: 1,
    limitePHV: 10,
    drawerPHV: false,
    modoEdicionPHV: false,
    formPHV: { cod: '', desc: '', orig: '', tipo: 'texto', act: true },
    modalCatalogoAbierto: false,
    modoEdicionCatalogo: false,
    formCatalogo: { id: '', numero: 0, nombre: '', desc: '', tabla: '', tipo: 'texto' },

    catalogosPHV: [
      { id: 'caracteristicas', numero: 1, nombre: 'Caracter\u00EDsticas', desc: 'Campos adicionales de persona o posici\u00F3n', tabla: 'CARACTERISTICA_CAR', tipo: 'texto' },
      { id: 'tipo_documento', numero: 2, nombre: 'Tipo de Documento', desc: 'C\u00E9dula V/E, RIF (J), Pasaporte (P)', tabla: 'TIPODOCUMENTO_TID', tipo: 'texto' },
      { id: 'tematica', numero: 3, nombre: 'Tem\u00E1tica', desc: 'Agrupaci\u00F3n estructural y visualizaci\u00F3n', tabla: 'TEMATICA_TEM', tipo: 'texto' },
      { id: 'estado_civil', numero: 4, nombre: 'Estado Civil', desc: 'Casado, concubinato, divorciado, soltero, viudo', tabla: 'ESTADOCIVIL_ESC', tipo: 'texto' },
      { id: 'tipo_relacion', numero: 5, nombre: 'Tipo de Relaci\u00F3n', desc: 'Empleado, contratado, aspirante, pasante', tabla: 'TIPORELACION_TIR', tipo: 'texto' },
      { id: 'nivel_academico', numero: 6, nombre: 'Nivel Acad\u00E9mico', desc: 'Grado de instrucci\u00F3n formal (TSU, Univ, Posgrado)', tabla: 'NIVELACADEMICO_NAC', tipo: 'texto' },
      { id: 'area_profesion', numero: 7, nombre: '\u00C1rea de Profesi\u00F3n', desc: 'Profesiones tituladas y oficios t\u00E9cnicos', tabla: 'PROFESION_PRO', tipo: 'texto' },
      { id: 'idioma', numero: 8, nombre: 'Idioma', desc: 'Espa\u00F1ol, ingl\u00E9s, franc\u00E9s, portugu\u00E9s, italiano', tabla: 'IDIOMA_IDI', tipo: 'texto' },
      { id: 'caracteristicas_idioma', numero: 9, nombre: 'Caracter\u00EDsticas de Idioma', desc: 'Lectura t\u00E9cnica, conversaci\u00F3n, redacci\u00F3n', tabla: 'CARACTERISTICAIDIOMA_CID', tipo: 'texto' },
      { id: 'parentesco', numero: 10, nombre: 'Parentesco', desc: 'Padres, hijos, c\u00F3nyuge, hermanos, t\u00EDos', tabla: 'PARENTESCO_PAR', tipo: 'texto' },
      { id: 'area_experiencia', numero: 11, nombre: '\u00C1rea de Experiencia', desc: '\u00C1reas cl\u00EDnicas, quir\u00FArgicas y administrativas', tabla: 'AREAEXPERIENCIA_AEX', tipo: 'texto' },
      { id: 'tipo_bien', numero: 12, nombre: 'Tipo Bien', desc: 'Autom\u00F3vil, bus, camioneta, moto, bicicleta', tabla: 'TIPOBIEN_TIB', tipo: 'texto' },
      { id: 'tipo_inmueble', numero: 13, nombre: 'Tipo Inmueble', desc: 'Apartamento (A), casa (C), habitaci\u00F3n (H), quinta (Q)', tabla: 'TIPOINMUEBLE_TII', tipo: 'texto' },
      { id: 'origen_hoja', numero: 14, nombre: 'Origen de Hoja / Canal', desc: 'Portal talento, recomendaci\u00F3n interna, ferias', tabla: 'ORIGENHOJA_ORH', tipo: 'texto' }
    ],

    datosPHV: [
      { cat: 'caracteristicas', cod: 'LIC-01', desc: 'Licencia de Conducir 2do Grado', orig: 'TRANS', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a choferes' },
      { cat: 'caracteristicas', cod: 'LIC-02', desc: 'Licencia de Conducir 3er Grado', orig: 'TRANS', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a empleados' },
      { cat: 'caracteristicas', cod: 'SAN-O+', desc: 'Grupo Sangu\u00EDneo O Positivo', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a 412 expedientes' },
      { cat: 'caracteristicas', cod: 'SAN-A+', desc: 'Grupo Sangu\u00EDneo A Positivo', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a 198 expedientes' },
      { cat: 'tipo_documento', cod: 'V', desc: 'C\u00E9dula Venezolana', orig: 'IDENT', tipo: 'numero', act: true, vinc: true, mot: 'Clave principal SARA6' },
      { cat: 'tipo_documento', cod: 'E', desc: 'C\u00E9dula Extranjera', orig: 'IDENT', tipo: 'numero', act: true, vinc: true, mot: 'Personal extranjero' },
      { cat: 'tipo_documento', cod: 'P', desc: 'Pasaporte Internacional', orig: 'IDENT', tipo: 'mixto', act: true, vinc: false },
      { cat: 'tipo_documento', cod: 'J', desc: 'Registro de Informaci\u00F3n Fiscal (RIF)', orig: 'FISCAL', tipo: 'mixto', act: true, vinc: true },
      { cat: 'tematica', cod: 'TEM-ADM', desc: 'Personal Administrativo y Finanzas', orig: 'ESTRUCT', tipo: 'texto', act: true, vinc: true },
      { cat: 'tematica', cod: 'TEM-MED', desc: 'Cuerpo M\u00E9dico Asistencial y Quir\u00FArgico', orig: 'ESTRUCT', tipo: 'texto', act: true, vinc: true },
      { cat: 'estado_civil', cod: 'S', desc: 'Soltero(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true },
      { cat: 'estado_civil', cod: 'C', desc: 'Casado(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true },
      { cat: 'estado_civil', cod: 'U', desc: 'Concubinato / Uni\u00F3n Estable', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true },
      { cat: 'nivel_academico', cod: 'BAC', desc: 'Bachiller de la Rep\u00FAblica', orig: 'EDUC', tipo: 'texto', act: true, vinc: true },
      { cat: 'nivel_academico', cod: 'TSU', desc: 'T\u00E9cnico Superior Universitario', orig: 'EDUC', tipo: 'texto', act: true, vinc: true },
      { cat: 'nivel_academico', cod: 'UNI', desc: 'Universitario / Licenciatura / Ing.', orig: 'EDUC', tipo: 'texto', act: true, vinc: true },
      { cat: 'nivel_academico', cod: 'ESP', desc: 'Especializaci\u00F3n M\u00E9dica / Postgrado', orig: 'POST', tipo: 'texto', act: true, vinc: true },
      { cat: 'area_profesion', cod: 'MED-CIR', desc: 'M\u00E9dico Cirujano Especialista', orig: 'SALUD', tipo: 'texto', act: true, vinc: true },
      { cat: 'area_profesion', cod: 'ENF-LIC', desc: 'Licenciado(a) en Enfermer\u00EDa', orig: 'SALUD', tipo: 'texto', act: true, vinc: true },
      { cat: 'area_profesion', cod: 'BIO-ANA', desc: 'Bioanalista Cl\u00EDnico', orig: 'SALUD', tipo: 'texto', act: true, vinc: true },
      { cat: 'idioma', cod: 'ES', desc: 'Espa\u00F1ol (Nativo)', orig: 'LING', tipo: 'texto', act: true, vinc: true },
      { cat: 'idioma', cod: 'EN', desc: 'Ingl\u00E9s (Avanzado)', orig: 'LING', tipo: 'texto', act: true, vinc: true },
      { cat: 'parentesco', cod: 'PAD', desc: 'Padre / Madre', orig: 'FAM', tipo: 'texto', act: true, vinc: true },
      { cat: 'parentesco', cod: 'HIJ', desc: 'Hijo / Hija', orig: 'FAM', tipo: 'texto', act: true, vinc: true },
      { cat: 'origen_hoja', cod: 'PORT-TAL', desc: 'Portal Talento Web GMSP', orig: 'DIGIT', tipo: 'texto', act: true, vinc: true },
      { cat: 'origen_hoja', cod: 'REC-INT', desc: 'Recomendaci\u00F3n Interna (Referido)', orig: 'REFER', tipo: 'texto', act: true, vinc: true },
      { cat: 'origen_hoja', cod: 'LINK-JOB', desc: 'LinkedIn Jobs Network', orig: 'SOCIAL', tipo: 'texto', act: true, vinc: true }
    ],

    // MODULO ORG (552 POSICIONES + CO-JEFATURAS)
    orgFiltroGerencia: 'TODAS',
    orgBusqueda: '',
    orgNodoSeleccionado: null,
    orgModalDobleCheck: false,
    orgModalMover: false,
    organigramaDB: [
      { id: '1', cargo: 'GERENTE GENERAL', gerencia: 'GERENCIA GENERAL', unidad: '0000 GERENCIA GENERAL', nivel: 1, dep: '0', ci: '12962334', nombre: 'LEOPOLDO QUINTERO STOLK', ciSupervisor: '9971632', supervisor: 'ANDRES CAPRILES', coSupervisores: [] },
      { id: '101', cargo: 'ASISTENTE ADMINISTRATIVO', gerencia: 'GERENCIA GENERAL', unidad: '0000 GERENCIA GENERAL', nivel: 1, dep: '1', ci: '26383707', nombre: 'HILARY MICHELL CLAVIJO DURAN', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '12', cargo: 'GERENTE DE VENTAS', gerencia: 'GERENCIA DE VENTAS', unidad: '0050 GERENCIA DE VENTAS', nivel: 1, dep: '1', ci: '3760234', nombre: 'OSWALDO NEMESIO ALVIAREZ RIVAS', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '121', cargo: 'VISITADOR (A) MEDICO', gerencia: 'GERENCIA DE VENTAS', unidad: '0050 GERENCIA DE VENTAS', nivel: 1, dep: '12', ci: '13801834', nombre: 'EUSYZ PATRICIA ARAQUE MARTINEZ', ciSupervisor: '3760234', supervisor: 'OSWALDO NEMESIO ALVIAREZ RIVAS', coSupervisores: [] },
      { id: '122', cargo: 'VISITADOR (A) MEDICO', gerencia: 'GERENCIA DE VENTAS', unidad: '0050 GERENCIA DE VENTAS', nivel: 1, dep: '12', ci: '14666964', nombre: 'MILAGROS ANGELICA FLORES TOVAR', ciSupervisor: '3760234', supervisor: 'OSWALDO NEMESIO ALVIAREZ RIVAS', coSupervisores: [] },
      { id: '13', cargo: 'DIRECTOR (A) COMERCIAL', gerencia: 'DIRECCION COMERCIAL', unidad: '0060 DIRECCION COMERCIAL', nivel: 1, dep: '1', ci: '16124707', nombre: 'ARTURO RICARDO GONZALEZ BETANCOURT', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '131', cargo: 'EJECUTIVO (A) DE VENTAS', gerencia: 'DIRECCION COMERCIAL', unidad: '0060 DIRECCION COMERCIAL', nivel: 1, dep: '13', ci: '17387431', nombre: 'CARLA VANESSA LOPEZ RUIZ', ciSupervisor: '16124707', supervisor: 'ARTURO RICARDO GONZALEZ BETANCOURT', coSupervisores: [] },
      { id: '15', cargo: 'GERENTE DE FINANZAS', gerencia: 'GERENCIA DE FINANZAS', unidad: '0090 GERENCIA DE FINANZAS', nivel: 1, dep: '1', ci: '13308874', nombre: 'ALVARO JOSE RANGEL LINARES', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '16', cargo: 'GERENTE DE TALENTO HUMANO', gerencia: 'GERENCIA DE TALENTO HUMANO', unidad: '0180 GERENCIA DE TALENTO HUMANO', nivel: 1, dep: '1', ci: '14890691', nombre: 'ALEJANDRO JOSE PAREDES ALFARO', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '17', cargo: 'DIRECTOR (A) DE OPERACIONES', gerencia: 'DIRECCION DE OPERACIONES', unidad: '0200 DIRECCION DE OPERACIONES', nivel: 1, dep: '1', ci: '13889025', nombre: 'MARIA SUSANA CASTILLO MARQUEZ', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '18', cargo: 'DIRECTOR (A) MEDICO', gerencia: 'DIRECCION MEDICA', unidad: '0010 DIRECCION MEDICA', nivel: 1, dep: '1', ci: '6892541', nombre: 'CARMEN ALICIA RIVAS CASTILLO', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
      { id: '1571101', cargo: 'ANALISTA INTEGRAL DE CAJA', gerencia: 'GERENCIA DE FINANZAS', unidad: '0150 JEFATURA DE CAJA', nivel: 1, dep: '15711-15712', ci: '22019482', nombre: 'ROSELYN YSBELIA CORRO NAVAS', ciSupervisor: '24697022 / 19562673', supervisor: 'ALEJANDRA MARINA ESPINOZA NAVARRO', coSupervisores: ['YENNIFER ANDREINA DIAZ RAMIREZ'] },
      { id: '17531801', cargo: 'ANFITRION (A) DE CALIDAD DE SERVICIOS', gerencia: 'DIRECCION DE OPERACIONES', unidad: '0230 ATENCION AL PACIENTE', nivel: 1, dep: '175311-175312', ci: '25901842', nombre: 'DANIEL EDUARDO GOMEZ PEREZ', ciSupervisor: '20192831 / 18490128', supervisor: 'NAIRELYS ADRIANA RAMOS RAMOS', coSupervisores: ['YUDITH ABIGUEY MURO MOROCOIMA'] },
      { id: '179010101', cargo: 'TECNICO FARMACEUTICO I', gerencia: 'DIRECCION DE OPERACIONES', unidad: '0280 FARMACIA CLINICA', nivel: 1, dep: '1790101-1790102-1790103', ci: '21049281', nombre: 'MANUEL ENRIQUE SILVA RIOS', ciSupervisor: '14901284 / 16890123', supervisor: 'MARIA CRISTINA DIAZ FUMERO', coSupervisores: ['YSBEL ILENIS PUESME MELLADO', 'GALIA MIRNA BARRERA MAYTA'] },
      { id: '18150601', cargo: 'ENFERMERO (A) PERIOPERATORIO', gerencia: 'DIRECCION MEDICA', unidad: '0350 QUIROFANO Y RECUPERACION', nivel: 1, dep: '181506-181507', ci: '19401928', nombre: 'ANA KARINA BLANCO MENDEZ', ciSupervisor: '11049281 / 13490182', supervisor: 'IRAMA JOSEFINA LOPEZ DE AGUILAR', coSupervisores: ['LILIAN PATRICIA CASTELLON BARRERA'] }
    ],
    historialMovimientosORG: [
      { fecha: '2026-08-20', ci: '14520331', empleado: 'Dr. Carlos Mendoza', cargo: 'M\u00E9dico Quir\u00FArgico', unidadAnt: 'Cirug\u00EDa General', unidadNva: 'Direcci\u00F3n M\u00E9dica Staff', jefeAnt: 'Dra. Carmen Rivas', jefeNvo: 'LEOPOLDO QUINTERO STOLK', motivo: 'Promoci\u00F3n por Ad\u00E9ndum Directivo', usuario: 'edixon.rodriguez' }
    ],
    solicitudesHeadcount: [
      { id: 'HC-2026-01', fecha: '2026-08-22', puesto: 'Coordinador Quir\u00FArgico Asistente', gerencia: 'DIRECCION MEDICA', unidad: '0010 DIRECCION MEDICA', plazas: 1, justificacion: 'Apertura del 4to turno nocturno', solicitante: 'Edixon Rodr\u00EDguez (Coord. RRHH)', estatus: 'PENDIENTE_GERENCIA' }
    ],

    // RECLUTAMIENTO Y SELECCION
    vacantes: [
      { id: 'VAC-2026-001', puesto: 'M\u00E9dico Especialista Quir\u00FArgico', unidad: 'Cirug\u00EDa General', motivo: 'Desincorporaci\u00F3n por Liquidaci\u00F3n', plazas: 2, banda: '$ 1.600 - $ 2.400', fecha: '2026-08-10', estatus: 'Abierta', postulados: 3 },
      { id: 'VAC-2026-002', puesto: 'Enfermero(a) Especialista UCI', unidad: 'Cuidados Intensivos', motivo: 'Aumento de Headcount Estructural', plazas: 3, banda: '$ 800 - $ 1.200', fecha: '2026-08-15', estatus: 'Abierta', postulados: 2 }
    ],
    atsVacanteActiva: 'VAC-2026-001',
    postulacionesATS: [
      {
        transaccionId: 'TRX-901',
        vacanteId: 'VAC-2026-001',
        hovId: 'V-14520331',
        candidato: 'Dr. Carlos Mendoza Silva',
        cargo: 'M\u00E9dico Especialista Quir\u00FArgico',
        etapa: 'oferta',
        scoreSkills: 96,
        scorePsico: 92,
        dictamen: 'Apto',
        informe: 'Especialista de alto desempe\u00F1o. Acreditaci\u00F3n quir\u00FArgica completa.',
        evaluador: 'Dr. Roberto Da Silva (Director Quir\u00FArgico)',
        ofertaMonto: '$ 1.850,00',
        ofertaEstatus: 'Aceptada'
      },
      {
        transaccionId: 'TRX-902',
        vacanteId: 'VAC-2026-001',
        hovId: 'V-26854109',
        candidato: 'Gabriel Alexander Rojas Salazar',
        cargo: 'M\u00E9dico Especialista Quir\u00FArgico',
        etapa: 'evaluacion_skills',
        scoreSkills: 78,
        scorePsico: 80,
        dictamen: 'En Evaluaci\u00F3n',
        informe: 'Buena disposici\u00F3n conceptual.',
        evaluador: 'Dra. Carmen Rivas',
        ofertaMonto: '$ 0,00',
        ofertaEstatus: 'Pendiente'
      }
    ],

    // HOJA DE VIDA
    hovTabActiva: 'basico',
    busquedaHOV: '',
    hovSeleccionadoId: 'V-14520331',
    vistaModoHOV: 'detalle',
    formHOV: {
      tipoDoc: 'V', cedula: '', rif: '', primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '',
      sexo: 'M', estadoCivil: 'C', nacim: '1990-01-01', nacionalidad: 'Venezolana', profesion: 'MED-CIR', nivelAcademico: 'ESP',
      idioma: 'ES', origenHoja: 'PORT-TAL', telf: '', email: '', pais: 'Venezuela', estadoUbic: 'MIRANDA', municipio: 'Baruta',
      parroquiaZona: 'Parroquia Las Minas - Plaza Las Am\u00E9ricas - Sector Santa Paula (C.P. 1061)', detallesVivienda: '', direccionFiscalCompleta: '', redSocial: '', estatusCandidato: 'En Proceso'
    },
    hojasDeVida: [
      {
        id: 'V-14520331',
        tipoDoc: 'V',
        cedula: '14520331',
        rif: 'V-14520331-0',
        primerNombre: 'Carlos',
        segundoNombre: 'Eduardo',
        primerApellido: 'Mendoza',
        segundoApellido: 'Silva',
        sexo: 'M',
        estadoCivil: 'C',
        nacim: '1982-05-14',
        profesion: 'MED-CIR',
        nivelAcademico: 'ESP',
        idioma: 'ES',
        origenHoja: 'REC-INT',
        telf: '0414-2231945',
        email: 'cmendoza@grupomedsp.com',
        direccionFiscalCompleta: 'Av. Circunvalaci\u00F3n del Sol, Res. Los Samanes, Apto 4-B, Baruta, Miranda',
        estatusCandidato: 'Contratado Formal',
        vinculadoLaboral: true,
        experienciaInterna: [{ fecha: '2026-08-25', tipo: 'Ingreso', cargo: 'M\u00E9dico Especialista Quir\u00FArgico', unidad: 'Cirug\u00EDa General', resolucion: 'CON-2026-088' }]
      },
      {
        id: 'V-18942104',
        tipoDoc: 'V',
        cedula: '18942104',
        rif: 'V-18942104-3',
        primerNombre: 'Mar\u00EDa',
        segundoNombre: 'Gabriela',
        primerApellido: 'Torres',
        segundoApellido: 'Pe\u00F1a',
        sexo: 'F',
        estadoCivil: 'S',
        nacim: '1989-11-20',
        profesion: 'ENF-LIC',
        nivelAcademico: 'UNI',
        idioma: 'ES',
        origenHoja: 'PORT-TAL',
        telf: '0424-9182341',
        email: 'mtorres@grupomedsp.com',
        direccionFiscalCompleta: 'Calle C, Qta. Flor, Nro 12, Baruta, Miranda',
        estatusCandidato: 'Contratado Formal',
        vinculadoLaboral: true,
        experienciaInterna: [{ fecha: '2026-08-20', tipo: 'Ingreso', cargo: 'Enfermera Asistencial UCI', unidad: 'Cuidados Intensivos', resolucion: 'CON-2026-074' }]
      },
      {
        id: 'V-26854109',
        tipoDoc: 'V',
        cedula: '26854109',
        rif: 'V-26854109-7',
        primerNombre: 'Gabriel',
        segundoNombre: 'Alexander',
        primerApellido: 'Rojas',
        segundoApellido: 'Salazar',
        sexo: 'M',
        estadoCivil: 'S',
        nacim: '1998-03-22',
        profesion: 'MED-CIR',
        nivelAcademico: 'UNI',
        idioma: 'ES',
        origenHoja: 'LINK-JOB',
        telf: '0412-7788912',
        email: 'grojas.aspirante@gmail.com',
        direccionFiscalCompleta: 'Calle Los Laboratorios, Edf. Alfa, Los Cortijos, Sucre, Miranda',
        estatusCandidato: 'En Proceso',
        vinculadoLaboral: false,
        experienciaInterna: []
      }
    ],

    // DATOS DE OPERACION
    datosGenerales: {
      eml: [{ ficha: 'E-01042', cedula: 'V-14520331', empleado: 'Dr. Carlos Mendoza', cargo: 'M\u00E9dico Especialista Quir\u00FArgico', depto: 'Cirug\u00EDa General', ingreso: '2026-08-25', sueldo: '$ 1.850,00', estatus: 'Activo' }],
      pco: [{ codigo: 'CC-1001', nombre: 'Direcci\u00F3n M\u00E9dica y Quir\u00F3fanos', cuenta: '6.1.01.01.001', resp: 'Dr. Carlos Mendoza', tipo: 'Operativo', estatus: 'Activo' }],
      car: [{ codigo: 'CAR-001', titulo: 'M\u00E9dico Especialista Quir\u00FArgico', nivel: 'Especialista Staff', grado: 'G-14', minSal: '$ 1.600', maxSal: '$ 2.400', plazas: 45 }],
      pla: [{ ficha: 'E-01042', nombre: 'Dr. Carlos Mendoza', unidad: 'Cirug\u00EDa General', sede: 'GMSP Torre M\u00E9dica', turno: 'Diurno', estatus: 'Activo' }],
      put: [{ puesto: 'PUT-MED-01', cargo: 'M\u00E9dico Especialista Quir\u00FArgico', depto: 'Cirug\u00EDa General', aprobadas: 20, ocupadas: 18, vacantes: 2 }],
      cem: [{ acto: 'ACT-2026-104', ficha: 'E-01042', empleado: 'Dr. Carlos Mendoza', tipo: 'Ingreso por Selecci\u00F3n ATS', fecha: '2026-08-25', nvoSueldo: '$ 1.850', resol: 'CON-2026-088' }],
      che: [{ reg: 'HST-901', ficha: 'E-01042', fecha: '2026-08-25', evento: 'Firma Contrato Indefinido', cargo: 'M\u00E9dico Quir\u00FArgico', salario: '$ 1.850' }],
      lic: [], inc: [], vac: [], vaf: [], bqn: [], rec: []
    }
  };

  // 4. ESTILOS SOFT UI
  function injectStyles() {
    var styleTag = document.getElementById('sara-ds-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'sara-ds-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = '\
      :root {\
        --bg-canvas: #EEF1F5; --bg-surface: #FFFFFF; --bg-surface-soft: #F4F6F9; --bg-dock: #111827;\
        --text-main: #1E293B; --text-muted: #64748B; --text-soft: #94A3B8; --border-subtle: #E2E8F0;\
        --shadow-raised: 8px 8px 18px #d1d9e6, -8px -8px 18px #ffffff;\
        --shadow-raised-sm: 4px 4px 10px #d1d9e6, -4px -4px 10px #ffffff;\
        --shadow-inset: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;\
        --k-blue: #002F6C; --k-cyan: #00B5E2; --k-green: #00B388;\
        --accent-active-bg: #E6F4FA; --accent-active-border: #00B5E2; --accent-active-text: #006FBA;\
      }\
      [data-theme="dark"] {\
        --bg-canvas: #0A0F1D; --bg-surface: #131B2E; --bg-surface-soft: #1A243B; --bg-dock: #070B14;\
        --text-main: #F8FAFC; --text-muted: #94A3B8; --text-soft: #64748B; --border-subtle: #23304E;\
        --shadow-raised: 6px 6px 16px #050811, -6px -6px 16px #1b2640;\
        --shadow-raised-sm: 3px 3px 8px #050811, -3px -3px 8px #1b2640;\
        --shadow-inset: inset 2px 2px 5px #050811, inset -2px -2px 5px #1b2640;\
        --accent-active-bg: #142E4A; --accent-active-border: #00B5E2; --accent-active-text: #38BDF8;\
      }\
      * { box-sizing: border-box; margin: 0; padding: 0; transition: background 0.2s, color 0.2s; }\
      body { background: var(--bg-canvas); color: var(--text-main); height: 100vh; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }\
      .app-wrapper { display: flex; width: 100vw; height: 100vh; padding: 12px; gap: 12px; }\
      .dock-primary { width: 68px; background: var(--bg-dock); border-radius: 20px; display: flex; flex-direction: column; align-items: center; padding: 16px 0; justify-content: space-between; flex-shrink: 0; }\
      .dock-item { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94A3B8; cursor: pointer; border: 1px solid transparent; background: transparent; font-size: 18px; }\
      .dock-item:hover { color: #FFF; background: rgba(255,255,255,0.08); }\
      .dock-item.active { background: rgba(0, 181, 226, 0.18); color: var(--k-cyan); border-color: rgba(0, 181, 226, 0.4); }\
      .logo-badge { width: 42px; height: 42px; border-radius: 14px; background: linear-gradient(135deg, var(--k-cyan), var(--k-green)); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF; font-size: 16px; margin-bottom: 6px; }\
      .sidebar-panel { width: 280px; min-width: 260px; background: var(--bg-surface); border-radius: 20px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: var(--shadow-raised); flex-shrink: 0; }\
      .search-box-soft { width: 100%; padding: 8px 12px; border-radius: 10px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); border: 1px solid var(--border-subtle); font-size: 12px; color: var(--text-main); outline: none; }\
      .tree-node { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 10px; font-size: 12px; cursor: pointer; color: var(--text-muted); border: 1px solid transparent; gap: 8px; }\
      .tree-node:hover { background: var(--bg-surface-soft); color: var(--text-main); }\
      .tree-node.active { background: var(--accent-active-bg); border-color: var(--accent-active-border); color: var(--accent-active-text); font-weight: 600; box-shadow: var(--shadow-raised-sm); }\
      .badge-pill { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 12px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); color: var(--text-muted); white-space: nowrap; }\
      .tree-node.active .badge-pill { background: var(--k-cyan); color: #FFF; box-shadow: none; }\
      .badge-status-empleado { display: inline-flex; align-items: center; gap: 3px; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 12px; background: rgba(16,185,129,0.12); color: #10B981; border: 1px solid rgba(16,185,129,0.3); white-space: nowrap; flex-shrink: 0; }\
      .badge-status-aspirante { display: inline-flex; align-items: center; gap: 3px; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 12px; background: rgba(245,158,11,0.12); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); white-space: nowrap; flex-shrink: 0; }\
      .main-workspace { flex: 1; background: var(--bg-surface); border-radius: 20px; padding: 20px; box-shadow: var(--shadow-raised); display: flex; flex-direction: column; gap: 14px; overflow: hidden; }\
      .btn-soft { padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid var(--border-subtle); background: var(--bg-surface); box-shadow: var(--shadow-raised-sm); color: var(--text-main); display: inline-flex; align-items: center; gap: 6px; }\
      .btn-soft:active { box-shadow: var(--shadow-inset); }\
      .btn-primary { background: linear-gradient(135deg, var(--k-blue), #004090); color: #FFF; border: none; }\
      [data-theme="dark"] .btn-primary { background: linear-gradient(135deg, var(--k-cyan), #0072CE); color: #041021; }\
      .table-card { border-radius: 14px; background: var(--bg-surface); box-shadow: var(--shadow-raised-sm); border: 1px solid var(--border-subtle); overflow: hidden; flex: 1; display: flex; flex-direction: column; }\
      table { width: 100%; border-collapse: collapse; text-align: left; font-size: 12px; }\
      th { background: var(--bg-surface-soft); padding: 11px 14px; font-weight: 600; color: var(--text-muted); border-bottom: 1px solid var(--border-subtle); font-size: 10px; text-transform: uppercase; }\
      td { padding: 11px 14px; border-bottom: 1px solid var(--border-subtle); }\
      .code-tag { font-family: monospace; font-size: 11px; padding: 3px 6px; border-radius: 6px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); color: var(--accent-active-text); font-weight: 700; }\
      .tab-btn { padding: 8px 16px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid transparent; background: transparent; color: var(--text-muted); }\
      .tab-btn.active { background: var(--accent-active-bg); border-color: var(--accent-active-border); color: var(--accent-active-text); box-shadow: var(--shadow-raised-sm); }\
      .kanban-col { flex: 1; min-width: 210px; background: var(--bg-surface-soft); border-radius: 12px; border: 1px solid var(--border-subtle); padding: 10px; display: flex; flex-direction: column; gap: 8px; }\
      .kanban-card { background: var(--bg-surface); border-radius: 10px; padding: 10px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-raised-sm); display: flex; flex-direction: column; gap: 6px; }\
      .pill-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--bg-surface-soft); box-shadow: var(--shadow-raised-sm); display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid var(--k-cyan); font-weight: 700; color: var(--k-cyan); }\
    ';
  }

  function getDescPHV(cat, cod) {
    for (var i = 0; i < state.datosPHV.length; i++) {
      if (state.datosPHV[i].cat === cat && state.datosPHV[i].cod === cod) return state.datosPHV[i].desc;
    }
    return cod;
  }

  function getOptionsPHV(cat, seleccionado) {
    var html = '';
    for (var i = 0; i < state.datosPHV.length; i++) {
      var d = state.datosPHV[i];
      if (d.cat === cat && d.act) {
        var isSel = (d.cod === seleccionado ? 'selected' : '');
        html += '<option value="' + d.cod + '" ' + isSel + '>' + d.cod + ' - ' + d.desc + '</option>';
      }
    }
    return html;
  }

  // 5. RENDER PRINCIPAL
  function renderApp() {
    try {
      injectStyles();
      document.body.setAttribute('data-theme', state.tema);

      var root = document.getElementById('root');
      if (!root) return;

      var modActivo = null;
      for (var i = 0; i < MODULOS.length; i++) {
        if (MODULOS[i].codigo.toLowerCase() === state.moduloActivo.toLowerCase()) {
          modActivo = MODULOS[i];
          break;
        }
      }
      if (!modActivo) modActivo = MODULOS[0];

      var html = '<div class="app-wrapper">';

      // DOCK
      html += '<aside class="dock-primary">';
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;">';
      html += '<div class="logo-badge" title="GMSP / Keralty">K</div>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'phv' ? 'active' : '') + '" id="dock-phv" title="[PHV] Par\u00E1metros">\u2699</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'org' ? 'active' : '') + '" id="dock-org" title="[ORG] Organigrama">\uD83C\uDFDB</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'req' ? 'active' : '') + '" id="dock-req" title="[REQ] Vacantes">\uD83D\uDCE2</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'ats' ? 'active' : '') + '" id="dock-ats" title="[ATS] Transacciones">\uD83C\uDFAF</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'cmp' ? 'active' : '') + '" id="dock-cmp" title="[CMP] Matriz Comparativa">\uD83D\uDCCA</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'ofe' ? 'active' : '') + '" id="dock-ofe" title="[OFE] Ofertas & Contrataci\u00F3n">\uD83D\uDCDD</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'hov' ? 'active' : '') + '" id="dock-hov" title="[HOV] Hoja de Vida">\uD83D\uDC64</button>';
      html += '<button class="dock-item ' + (state.moduloActivo === 'eml' ? 'active' : '') + '" id="dock-eml" title="[EML] Datos Laborales">\uD83D\uDCBC</button>';
      html += '</div>';
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;">';
      html += '<button class="dock-item" id="btnThemeToggle" title="Modo Claro/Oscuro">' + (state.tema === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19') + '</button>';
      html += '</div></aside>';

      // SIDEBAR
      html += '<nav class="sidebar-panel">';
      html += '<div style="display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--border-subtle);">';
      html += '<div style="width:36px;height:36px;border-radius:50%;background:var(--bg-surface-soft);box-shadow:var(--shadow-raised-sm);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--k-cyan);border:2px solid var(--k-cyan);font-size:12px;">ER</div>';
      html += '<div style="overflow:hidden;"><div style="font-size:12.5px;font-weight:700;color:var(--text-main);">' + state.nombreUsuario + '</div>';
      html += '<div style="font-size:10.5px;color:var(--text-muted);">' + state.rol + '</div></div>';
      html += '</div>';

      html += '<input id="quickJump" type="text" class="search-box-soft" placeholder="Ir a: PHV, ORG, HOV, ATS..." maxlength="4" style="text-transform:uppercase;font-family:monospace;font-weight:700;" />';
      html += '<div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-soft);margin-top:2px;">M\u00F3dulos del Sistema</div>';
      html += '<div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;flex:1;">';

      var seccionActual = '';
      for (var mIdx = 0; mIdx < MODULOS.length; mIdx++) {
        var mod = MODULOS[mIdx];
        if (mod.seccion !== seccionActual) {
          seccionActual = mod.seccion;
          html += '<div class="tree-node" style="font-weight:700;color:var(--text-main);margin-top:6px;cursor:default;"><span>\uD83D\uDCC1 ' + seccionActual + '</span></div>';
        }
        var isActivo = (state.moduloActivo.toLowerCase() === mod.codigo.toLowerCase());
        html += '<div class="tree-node nav-mod-item ' + (isActivo ? 'active' : '') + '" data-codigo="' + mod.codigo + '" style="margin-left:8px;">';
        html += '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + mod.icono + ' ' + mod.nombre + '</span>';
        html += '<span class="badge-pill">' + mod.codigo.toUpperCase() + '</span>';
        html += '</div>';
      }
      html += '</div></nav>';

      // WORKSPACE
      html += '<main class="main-workspace">';
      if (state.moduloActivo === 'phv') {
        html += renderModuloPHV();
      } else if (state.moduloActivo === 'org') {
        html += renderModuloORG();
      } else if (state.moduloActivo === 'req') {
        html += renderModuloREQ();
      } else if (state.moduloActivo === 'ats') {
        html += renderModuloATS();
      } else if (state.moduloActivo === 'cmp') {
        html += renderModuloCMP();
      } else if (state.moduloActivo === 'ofe') {
        html += renderModuloOFE();
      } else if (state.moduloActivo === 'kpi') {
        html += renderModuloKPI();
      } else if (state.moduloActivo === 'hov') {
        html += renderModuloHOV();
      } else {
        html += renderModuloGenerico(modActivo);
      }
      html += '</main></div>';

      if (state.drawerPHV) html += renderDrawerPHV();
      if (state.modalCatalogoAbierto) html += renderModalCatalogo();
      if (state.orgModalDobleCheck) html += renderModalDobleCheck();
      if (state.orgModalMover) html += renderModalMoverPosicion();

      root.innerHTML = html;
      attachEvents();
    } catch(err) {
      console.error('Error renderApp:', err);
    }
  }

  // 6. MODULO PHV: 14 CATALOGOS MAESTROS
  function renderModuloPHV() {
    var catActual = null;
    for (var i = 0; i < state.catalogosPHV.length; i++) {
      if (state.catalogosPHV[i].id === state.catalogoActivo) { catActual = state.catalogosPHV[i]; break; }
    }
    if (!catActual) catActual = state.catalogosPHV[0];

    var filtrados = [];
    for (var j = 0; j < state.datosPHV.length; j++) {
      var item = state.datosPHV[j];
      if (item.cat === state.catalogoActivo) {
        var coincide = true;
        if (state.busquedaPHV.trim()) {
          var q = state.busquedaPHV.toLowerCase();
          if (item.cod.toLowerCase().indexOf(q) === -1 && item.desc.toLowerCase().indexOf(q) === -1 && item.orig.toLowerCase().indexOf(q) === -1) coincide = false;
        }
        if (state.filtroTipoPHV && item.tipo !== state.filtroTipoPHV) coincide = false;
        if (coincide) filtrados.push(item);
      }
    }

    var totalPaginas = Math.ceil(filtrados.length / state.limitePHV) || 1;
    var inicio = (state.paginaPHV - 1) * state.limitePHV;
    var paginados = filtrados.slice(inicio, inicio + state.limitePHV);

    var catsVisibles = [];
    for (var k = 0; k < state.catalogosPHV.length; k++) {
      var c = state.catalogosPHV[k];
      if (!state.filtroCatalogo.trim()) {
        catsVisibles.push(c);
      } else {
        var fc = state.filtroCatalogo.toLowerCase();
        if (c.nombre.toLowerCase().indexOf(fc) !== -1 || c.desc.toLowerCase().indexOf(fc) !== -1) catsVisibles.push(c);
      }
    }

    var html = '<header style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">Par\u00E1metros Hoja de Vida</h1>';
    html += '<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;background:rgba(0,181,226,0.15);color:var(--k-cyan);">[PHV] M\u00F3dulo Maestro</span></div>';
    html += '<div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">Centralizaci\u00F3n Multiempresa \u2022 SARA6 SQL Server WITH (NOLOCK)</div></div>';
    html += '<div style="display:flex;gap:8px;align-items:center;">';
    html += '<button id="btnExportCSV" class="btn-soft">\uD83D\uDCE5 Exportar CSV (;)</button>';
    html += '<button id="btnAddRecordPHV" class="btn-soft btn-primary">+ Adicionar Registro</button>';
    html += '</div></header>';

    html += '<div style="display:flex;flex:1;gap:14px;overflow:hidden;">';
    html += '<aside style="width:260px;min-width:240px;background:var(--bg-surface-soft);border-radius:14px;padding:12px;border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow-raised-sm);">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;"><div style="font-size:10.5px;font-weight:700;color:var(--text-soft);text-transform:uppercase;">Cat\u00E1logos (' + state.catalogosPHV.length + ')</div><button id="btnNuevoCatalogo" class="btn-soft" style="padding:2px 6px;font-size:10px;">+ Nuevo</button></div>';
    html += '<input id="inputFiltroCat" type="text" class="search-box-soft" placeholder="\uD83D\uDD0D Filtrar cat\u00E1logos..." value="' + state.filtroCatalogo + '" />';
    html += '<div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;flex:1;">';
    for (var m = 0; m < catsVisibles.length; m++) {
      var cItem = catsVisibles[m];
      var count = 0;
      for (var p = 0; p < state.datosPHV.length; p++) {
        if (state.datosPHV[p].cat === cItem.id) count++;
      }
      var isSel = (state.catalogoActivo === cItem.id);
      html += '<div class="tree-node cat-item ' + (isSel ? 'active' : '') + '" data-cat="' + cItem.id + '">';
      html += '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><strong style="font-size:10px;margin-right:4px;">' + cItem.numero + '.</strong>' + cItem.nombre + '</span>';
      html += '<span class="badge-pill">' + count + '</span>';
      html += '</div>';
    }
    html += '</div></aside>';

    html += '<div style="flex:1;display:flex;flex-direction:column;gap:12px;overflow:hidden;">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-surface-soft);border-radius:12px;border:1px solid var(--border-subtle);">';
    html += '<div style="display:flex;align-items:center;gap:10px;flex:1;"><input id="inputBusquedaPHV" type="text" class="search-box-soft" placeholder="\uD83D\uDD0D Buscar c\u00F3digo, descripci\u00F3n o nomenclatura..." value="' + state.busquedaPHV + '" style="max-width:320px;" />';
    html += '<select id="selectTipoPHV" class="search-box-soft" style="width:auto;padding:7px 10px;"><option value="">Todos los tipos</option><option value="texto" ' + (state.filtroTipoPHV === 'texto' ? 'selected' : '') + '>Texto</option><option value="numero" ' + (state.filtroTipoPHV === 'numero' ? 'selected' : '') + '>N\u00FAmero</option></select></div>';
    html += '<div style="display:flex;align-items:center;gap:8px;"><button id="btnEditarCatalogoActivo" class="btn-soft" style="padding:4px 8px;font-size:11px;">\u270F\uFE0F Modificar Cat\u00E1logo</button><div style="font-size:11.5px;color:var(--text-muted);">Total: <strong style="color:var(--text-main);">' + filtrados.length + '</strong></div></div>';
    html += '</div>';

    html += '<div class="table-card"><div style="flex:1;overflow-y:auto;"><table><thead><tr><th>C\u00F3digo</th><th>Descripci\u00F3n del Par\u00E1metro</th><th>Origen</th><th>Tipo Dato</th><th>Estado SARA6</th><th style="text-align:right;">Acciones</th></tr></thead><tbody>';
    for (var n = 0; n < paginados.length; n++) {
      var row = paginados[n];
      html += '<tr><td><span class="code-tag">' + row.cod + '</span></td><td style="font-weight:600;color:var(--text-main);">' + row.desc + '</td><td>' + row.orig + '</td><td style="text-transform:capitalize;">' + row.tipo + '</td>';
      html += '<td>' + (row.vinc ? '<span style="padding:3px 8px;border-radius:9999px;font-size:10px;font-weight:700;background:rgba(239,68,68,0.12);color:#EF4444;">\uD83D\uDD12 Vinculado</span>' : '<span style="padding:3px 8px;border-radius:9999px;font-size:10px;font-weight:700;background:rgba(0,179,136,0.12);color:var(--k-green);">\u2713 Disponible</span>') + '</td>';
      html += '<td style="text-align:right;"><div style="display:inline-flex;gap:4px;"><button class="btn-soft btn-edit-phv" data-cod="' + row.cod + '" style="padding:3px 7px;font-size:11px;">\u270F\uFE0F</button><button class="btn-soft btn-delete-phv" data-cod="' + row.cod + '" ' + (row.vinc ? 'disabled' : '') + ' style="padding:3px 7px;font-size:11px;' + (row.vinc ? 'opacity:0.4;' : 'color:#EF4444;') + '">\uD83D\uDDD1\uFE0F</button></div></td></tr>';
    }
    html += '</tbody></table></div>';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:var(--bg-surface-soft);border-top:1px solid var(--border-subtle);font-size:11.5px;color:var(--text-muted);"><div>P\u00E1gina <strong>' + state.paginaPHV + '</strong> de <strong>' + totalPaginas + '</strong></div><div style="display:flex;gap:6px;"><button id="btnPrevPagePHV" class="btn-soft" ' + (state.paginaPHV <= 1 ? 'disabled' : '') + '>\u25C0</button><button id="btnNextPagePHV" class="btn-soft" ' + (state.paginaPHV >= totalPaginas ? 'disabled' : '') + '>\u25B6</button></div></div></div>';
    html += '</div></div>';
    return html;
  }

  // 7. DRAWER PHV
  function renderDrawerPHV() {
    var catActual = null;
    for (var i = 0; i < state.catalogosPHV.length; i++) {
      if (state.catalogosPHV[i].id === state.catalogoActivo) { catActual = state.catalogosPHV[i]; break; }
    }
    if (!catActual) catActual = state.catalogosPHV[0];

    var html = '<div id="drawerOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:50;display:flex;justify-content:flex-end;">';
    html += '<div style="width:420px;max-width:90vw;background:var(--bg-surface);height:100%;border-left:1px solid var(--border-subtle);display:flex;flex-direction:column;padding:22px;">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;"><div><h3 style="font-size:16px;font-weight:700;">' + (state.modoEdicionPHV ? 'Editar Par\u00E1metro' : 'Adicionar Registro') + '</h3><div style="font-size:11px;color:var(--text-muted);">Cat\u00E1logo: ' + catActual.nombre + '</div></div><button id="btnCloseDrawerPHV" style="background:transparent;border:none;font-size:20px;cursor:pointer;">\u2715</button></div>';
    html += '<form id="formParamPHV" style="display:flex;flex-direction:column;gap:14px;flex:1;">';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">C\u00F3digo *</label><input id="inputCodPHV" type="text" required ' + (state.modoEdicionPHV ? 'disabled' : '') + ' value="' + state.formPHV.cod + '" class="search-box-soft" style="text-transform:uppercase;" /></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Descripci\u00F3n *</label><input id="inputDescPHV" type="text" required value="' + state.formPHV.desc + '" class="search-box-soft" /></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Origen / Nomenclatura</label><input id="inputOrigPHV" type="text" value="' + state.formPHV.orig + '" class="search-box-soft" style="text-transform:uppercase;" /></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Tipo de Dato</label><select id="selectFormTipoPHV" class="search-box-soft"><option value="texto" ' + (state.formPHV.tipo === 'texto' ? 'selected' : '') + '>Texto</option><option value="numero" ' + (state.formPHV.tipo === 'numero' ? 'selected' : '') + '>N\u00FAmero</option><option value="mixto" ' + (state.formPHV.tipo === 'mixto' ? 'selected' : '') + '>Mixto</option></select></div>';
    html += '<div style="margin-top:auto;display:flex;gap:10px;"><button type="button" id="btnCancelDrawerPHV" class="btn-soft" style="flex:1;justify-content:center;">Cancelar</button><button type="submit" class="btn-soft btn-primary" style="flex:1;justify-content:center;">Guardar Registro</button></div></form></div></div>';
    return html;
  }

  // 8. MODAL CATALOGOS PHV
  function renderModalCatalogo() {
    var html = '<div id="modalCatOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:60;display:flex;align-items:center;justify-content:center;">';
    html += '<div style="width:460px;max-width:90vw;background:var(--bg-surface);border-radius:18px;border:1px solid var(--border-subtle);overflow:hidden;"><div style="padding:16px 20px;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;"><h3>' + (state.modoEdicionCatalogo ? 'Modificar Cat\u00E1logo' : 'Crear Cat\u00E1logo') + '</h3><button id="btnCloseModalCat" style="background:transparent;border:none;font-size:18px;cursor:pointer;">\u2715</button></div>';
    html += '<form id="formCatalogoModal" style="padding:20px;display:flex;flex-direction:column;gap:12px;"><div><label style="font-size:11px;font-weight:700;">Nombre *</label><input id="inputCatNombre" type="text" required value="' + state.formCatalogo.nombre + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;">Identificador ID *</label><input id="inputCatID" type="text" required ' + (state.modoEdicionCatalogo ? 'disabled' : '') + ' value="' + state.formCatalogo.id + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;">Tabla SQL *</label><input id="inputCatTabla" type="text" required value="' + state.formCatalogo.tabla + '" class="search-box-soft" /></div>';
    html += '<div style="display:flex;gap:10px;margin-top:8px;"><button type="button" id="btnCancelModalCat" class="btn-soft" style="flex:1;justify-content:center;">Cancelar</button><button type="submit" class="btn-soft btn-primary" style="flex:1;justify-content:center;">Guardar Cat\u00E1logo</button></div></form></div></div>';
    return html;
  }

  // 9. MODULO ORG: ORGANIGRAMA FUNCIONAL 552 POSICIONES
  function renderModuloORG() {
    var gerencias = [
      { id: 'TODAS', label: 'Todas las Direcciones (552 HC)' },
      { id: 'GERENCIA GENERAL', label: '0000 Gerencia General (2 HC)' },
      { id: 'DIRECCION MEDICA', label: '0010 Direcci\u00F3n M\u00E9dica (246 HC)' },
      { id: 'DIRECCION DE OPERACIONES', label: '0200 Direcci\u00F3n de Operaciones (211 HC)' },
      { id: 'GERENCIA DE FINANZAS', label: '0090 Gerencia de Finanzas (45 HC)' },
      { id: 'GERENCIA DE TALENTO HUMANO', label: '0180 Gerencia de Talento Humano (21 HC)' },
      { id: 'DIRECCION COMERCIAL', label: '0060 Direcci\u00F3n Comercial (14 HC)' }
    ];

    var nodosFiltrados = [];
    for (var i = 0; i < state.organigramaDB.length; i++) {
      var nodo = state.organigramaDB[i];
      var coincideGer = (state.orgFiltroGerencia === 'TODAS' || nodo.gerencia === state.orgFiltroGerencia);
      var coincideBus = true;
      if (state.orgBusqueda.trim()) {
        var q = state.orgBusqueda.toLowerCase();
        if (nodo.nombre.toLowerCase().indexOf(q) === -1 && nodo.cargo.toLowerCase().indexOf(q) === -1) coincideBus = false;
      }
      if (coincideGer && coincideBus) nodosFiltrados.push(nodo);
    }

    var html = '<header style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">\uD83C\uDFDB Organigrama Funcional & Control de Headcount</h1><span class="badge-pill">[ORG]</span></div></div>';
    html += '<div style="display:flex;gap:8px;"><button id="btnExportarExcelORG" class="btn-soft">\uD83D\uDCE5 Exportar (.xlsx)</button><button id="btnAperturarHeadcount" class="btn-soft btn-primary">+ Solicitar Incremento Headcount</button></div></header>';

    html += '<div style="display:flex;gap:12px;align-items:center;background:var(--bg-surface-soft);padding:10px 14px;border-radius:12px;border:1px solid var(--border-subtle);">';
    html += '<input id="inSearchORG" type="text" class="search-box-soft" placeholder="\uD83D\uDD0D Buscar colaborador o cargo..." value="' + state.orgBusqueda + '" style="max-width:280px;" />';
    html += '<select id="selGerenciaORG" class="search-box-soft" style="width:auto;font-weight:600;">';
    for (var g = 0; g < gerencias.length; g++) {
      html += '<option value="' + gerencias[g].id + '" ' + (gerencias[g].id === state.orgFiltroGerencia ? 'selected' : '') + '>' + gerencias[g].label + '</option>';
    }
    html += '</select></div>';

    html += '<div style="display:flex;flex:1;gap:14px;overflow:hidden;">';
    html += '<aside style="width:340px;min-width:300px;background:var(--bg-surface-soft);border-radius:14px;padding:12px;border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow-raised-sm);overflow-y:auto;">';
    for (var k = 0; k < nodosFiltrados.length; k++) {
      var n = nodosFiltrados[k];
      var isSelected = (state.orgNodoSeleccionado && state.orgNodoSeleccionado.id === n.id);
      var marginL = (n.nivel === 1 ? '4px' : '18px');
      html += '<div class="tree-node org-node-select ' + (isSelected ? 'active' : '') + '" data-id="' + n.id + '" style="margin-left:' + marginL + ';">';
      html += '<div style="overflow:hidden;flex:1;"><div style="font-weight:700;">' + n.nombre + '</div><div style="font-size:10px;color:var(--text-muted);">' + n.cargo + '</div></div>';
      if (n.coSupervisores && n.coSupervisores.length > 0) html += '<span class="badge-pill" style="color:var(--k-cyan);">2 Jefes</span>';
      html += '</div>';
    }
    html += '</aside>';

    html += '<div style="flex:1;display:flex;flex-direction:column;gap:12px;overflow:hidden;">';
    var nodoActivo = state.orgNodoSeleccionado || nodosFiltrados[0];
    if (nodoActivo) {
      html += '<div class="table-card" style="padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:16px;">';
      html += '<div style="display:flex;align-items:center;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--border-subtle);"><div class="pill-avatar">' + nodoActivo.nombre.charAt(0) + '</div>';
      html += '<div style="flex:1;"><h2 style="font-size:17px;font-weight:700;">' + nodoActivo.nombre + '</h2><div style="font-size:12.5px;color:var(--k-blue);font-weight:600;">' + nodoActivo.cargo + '</div><div style="font-size:11px;color:var(--text-muted);">' + nodoActivo.unidad + '</div></div>';
      html += '<button class="btn-soft btn-abrir-mover" data-id="' + nodoActivo.id + '">\u21C4 Reasignar Posici\u00F3n / Jefe</button></div>';
      html += '<div style="background:var(--bg-surface-soft);padding:12px;border-radius:12px;"><strong>Supervisor Inmediato:</strong> ' + nodoActivo.supervisor + '</div></div>';
    }
    html += '</div></div>';
    return html;
  }

  // 10. MODALES ORG
  function renderModalDobleCheck() {
    var html = '<div id="modalDCOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:60;display:flex;align-items:center;justify-content:center;"><div style="width:500px;max-width:90vw;background:var(--bg-surface);border-radius:18px;box-shadow:var(--shadow-raised);border:1px solid var(--border-subtle);overflow:hidden;"><div style="padding:16px 20px;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;"><h3 style="font-size:15px;font-weight:700;">Solicitud de Incremento de Headcount</h3><button id="btnCloseModalDC" style="background:transparent;border:none;font-size:18px;cursor:pointer;">\u2715</button></div>';
    html += '<form id="formHeadcountDC" style="padding:20px;display:flex;flex-direction:column;gap:12px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Cargo Requerido *</label><input id="inHCPuesto" type="text" required class="search-box-soft" /></div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Gerencia *</label><select id="inHCGerencia" class="search-box-soft"><option value="DIRECCION MEDICA">DIRECCION MEDICA</option><option value="DIRECCION DE OPERACIONES">DIRECCION DE OPERACIONES</option><option value="GERENCIA DE FINANZAS">GERENCIA DE FINANZAS</option></select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Plazas *</label><input id="inHCPlazas" type="number" min="1" value="1" required class="search-box-soft" /></div></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Justificaci\u00F3n *</label><textarea id="inHCJustificacion" required rows="2" class="search-box-soft" style="resize:none;"></textarea></div>';
    html += '<div style="display:flex;gap:10px;margin-top:8px;"><button type="button" id="btnCancelModalDC" class="btn-soft" style="flex:1;justify-content:center;">Cancelar</button><button type="submit" class="btn-soft btn-primary" style="flex:1;justify-content:center;">Enviar a Doble Check</button></div></form></div></div>';
    return html;
  }

  function renderModalMoverPosicion() {
    var nodo = state.orgNodoSeleccionado;
    if (!nodo) return '';
    var html = '<div id="modalMoverOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:60;display:flex;align-items:center;justify-content:center;"><div style="width:520px;max-width:90vw;background:var(--bg-surface);border-radius:18px;box-shadow:var(--shadow-raised);border:1px solid var(--border-subtle);overflow:hidden;"><div style="padding:16px 20px;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;"><h3 style="font-size:15px;font-weight:700;">Reasignar Posici\u00F3n / Transferencia</h3><button id="btnCloseModalMover" style="background:transparent;border:none;font-size:18px;cursor:pointer;">\u2715</button></div>';
    html += '<form id="formMoverNodo" style="padding:20px;display:flex;flex-direction:column;gap:12px;"><div style="font-size:12px;font-weight:700;color:var(--k-cyan);">Colaborador: ' + nodo.nombre + '</div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Nueva Unidad *</label><input id="inMoverUnidad" type="text" required value="' + nodo.unidad + '" class="search-box-soft" /></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Nuevo Supervisor *</label><input id="inMoverSupervisor" type="text" required value="LEOPOLDO QUINTERO STOLK" class="search-box-soft" /></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Motivo *</label><input id="inMoverMotivo" type="text" required class="search-box-soft" /></div>';
    html += '<div style="display:flex;gap:10px;margin-top:8px;"><button type="button" id="btnCancelModalMover" class="btn-soft" style="flex:1;justify-content:center;">Cancelar</button><button type="submit" class="btn-soft btn-primary" style="flex:1;justify-content:center;">Confirmar & Registrar Log</button></div></form></div></div>';
    return html;
  }

  // 11. SUB-MODULOS ATS / HOV
  function renderModuloREQ() {
    var html = '<header style="display:flex;justify-content:space-between;align-items:center;"><div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">\uD83D\uDCE2 Requisiciones & Vacantes</h1><span class="badge-pill">[REQ]</span></div></div><button class="btn-soft btn-primary" onclick="state.moduloActivo=\'org\';state.orgModalDobleCheck=true;renderApp();">+ Nueva Vacante</button></header>';
    html += '<div class="table-card" style="margin-top:10px;"><div style="flex:1;overflow-y:auto;"><table><thead><tr><th>C\u00F3digo</th><th>Puesto</th><th>Unidad</th><th>Motivo</th><th>Banda</th><th>Plazas</th><th>Estatus</th><th style="text-align:right;">Acciones</th></tr></thead><tbody>';
    for (var i = 0; i < state.vacantes.length; i++) {
      var v = state.vacantes[i];
      html += '<tr><td><span class="code-tag">' + v.id + '</span></td><td style="font-weight:700;">' + v.puesto + '</td><td>' + v.unidad + '</td><td>' + v.motivo + '</td><td style="color:var(--k-green);font-weight:600;">' + v.banda + '</td><td>' + v.plazas + '</td><td><span class="badge-status-empleado">\u2713 ' + v.estatus + '</span></td><td style="text-align:right;"><button class="btn-soft btn-ir-ats" data-vacante="' + v.id + '" style="padding:4px 8px;font-size:11px;">Pipeline ATS \u2794</button></td></tr>';
    }
    html += '</tbody></table></div></div>';
    return html;
  }

  function renderModuloATS() {
    var html = '<header style="display:flex;justify-content:space-between;align-items:center;"><div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">\uD83C\uDFAF Transacciones ATS</h1><span class="badge-pill">[ATS]</span></div></div><button id="btnPostularDesdeHOV" class="btn-soft btn-primary">+ Postular Candidato (HOV)</button></header>';
    html += '<div style="display:flex;flex-1;gap:10px;overflow-x:auto;padding-bottom:6px;margin-top:10px;">';
    var etapas = [{ id: 'screening', label: '1. Screening', color: '#64748B' }, { id: 'entrevista_rrhh', label: '2. Entrevista RRHH', color: '#00B5E2' }, { id: 'evaluacion_skills', label: '3. Skills', color: '#6366F1' }, { id: 'psicotecnica', label: '4. Psicot\u00E9cnica', color: '#EC4899' }, { id: 'oferta', label: '5. Oferta', color: '#10B981' }];
    for (var e = 0; e < etapas.length; e++) {
      var etapa = etapas[e];
      html += '<div class="kanban-col"><div style="font-size:11px;font-weight:700;padding-bottom:4px;border-bottom:2px solid ' + etapa.color + ';">' + etapa.label + '</div><div style="display:flex;flex-direction:column;gap:8px;overflow-y:auto;flex:1;">';
      for (var p = 0; p < state.postulacionesATS.length; p++) {
        var post = state.postulacionesATS[p];
        if (post.etapa === etapa.id) {
          html += '<div class="kanban-card"><div style="font-weight:700;font-size:12px;">' + post.candidato + '</div><div style="font-size:10px;color:var(--text-muted);">' + post.cargo + '</div><div style="display:flex;gap:4px;margin-top:4px;"><button class="btn-soft btn-avanzar-etapa" data-trx="' + post.transaccionId + '" style="padding:2px 6px;font-size:10px;flex:1;justify-content:center;">Avanzar \u2794</button></div></div>';
        }
      }
      html += '</div></div>';
    }
    html += '</div>';
    return html;
  }

  function renderModuloCMP() {
    var html = '<header style="display:flex;justify-content:space-between;align-items:center;"><div><h1 style="font-size:18px;font-weight:700;">\uD83D\uDCCA Matriz Comparativa Supervisor</h1></div><button class="btn-soft" onclick="window.print()">\uD83D\uDDA8\uFE0F Imprimir</button></header>';
    html += '<div class="table-card" style="margin-top:10px;padding:16px;"><table><thead><tr><th>Candidato</th><th>Expediente HOV</th><th>Skills</th><th>Psicot\u00E9cnica</th><th>Dictamen</th><th style="text-align:right;">Acci\u00F3n</th></tr></thead><tbody>';
    for (var i = 0; i < state.postulacionesATS.length; i++) {
      var c = state.postulacionesATS[i];
      html += '<tr><td style="font-weight:700;">' + c.candidato + '</td><td><span class="code-tag">' + c.hovId + '</span></td><td style="color:var(--k-cyan);font-weight:700;">' + c.scoreSkills + '%</td><td style="color:var(--k-green);font-weight:700;">' + c.scorePsico + '%</td><td><span class="badge-pill">' + c.dictamen + '</span></td><td style="text-align:right;"><button class="btn-soft btn-primary" onclick="state.moduloActivo=\'ofe\';renderApp();">Aprobar \u2794</button></td></tr>';
    }
    html += '</tbody></table></div>';
    return html;
  }

  function renderModuloOFE() {
    var html = '<header style="display:flex;justify-content:space-between;align-items:center;"><div><h1 style="font-size:18px;font-weight:700;">\uD83D\uDCDD Gesti\u00F3n de Ofertas & Contrataci\u00F3n</h1></div></header>';
    html += '<div class="table-card" style="margin-top:10px;"><div style="flex:1;overflow-y:auto;"><table><thead><tr><th>Trx</th><th>Candidato</th><th>Puesto</th><th>Sueldo</th><th>Oferta</th><th style="text-align:right;">Acci\u00F3n</th></tr></thead><tbody>';
    for (var i = 0; i < state.postulacionesATS.length; i++) {
      var p = state.postulacionesATS[i];
      html += '<tr><td><span class="code-tag">' + p.transaccionId + '</span></td><td style="font-weight:700;">' + p.candidato + '</td><td>' + p.cargo + '</td><td style="font-weight:700;color:var(--k-green);">' + p.ofertaMonto + '</td><td><span class="badge-status-empleado">\u2713 ' + p.ofertaEstatus + '</span></td><td style="text-align:right;"><button class="btn-soft btn-primary btn-firmar-traspaso" data-trx="' + p.transaccionId + '" style="padding:4px 8px;font-size:11px;">Firmar & Traspasar a EML \u2794</button></td></tr>';
    }
    html += '</tbody></table></div></div>';
    return html;
  }

  function renderModuloKPI() {
    var html = '<header style="display:flex;justify-content:space-between;align-items:center;"><div><h1 style="font-size:18px;font-weight:700;">\uD83D\uDCC8 Anal\u00EDtica & Estad\u00EDsticas</h1></div></header>';
    html += '<div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;margin-top:10px;"><div class="table-card" style="padding:14px;"><span style="font-size:10px;font-weight:700;color:var(--text-soft);">VACANTES</span><div style="font-size:22px;font-weight:800;color:var(--k-cyan);">' + state.vacantes.length + '</div></div><div class="table-card" style="padding:14px;"><span style="font-size:10px;font-weight:700;color:var(--text-soft);">POSTULADOS</span><div style="font-size:22px;font-weight:800;color:var(--text-main);">' + state.postulacionesATS.length + '</div></div><div class="table-card" style="padding:14px;"><span style="font-size:10px;font-weight:700;color:var(--text-soft);">APTITUD</span><div style="font-size:22px;font-weight:800;color:var(--k-green);">80%</div></div><div class="table-card" style="padding:14px;"><span style="font-size:10px;font-weight:700;color:var(--text-soft);">TIEMPO MEDIO</span><div style="font-size:22px;font-weight:800;color:var(--accent-active-text);">14 d\u00EDas</div></div></div>';
    return html;
  }

  function renderModuloHOV() {
    var hovActual = null;
    for (var i = 0; i < state.hojasDeVida.length; i++) {
      if (state.hojasDeVida[i].id === state.hovSeleccionadoId) { hovActual = state.hojasDeVida[i]; break; }
    }
    if (!hovActual && state.hojasDeVida.length > 0) { hovActual = state.hojasDeVida[0]; state.hovSeleccionadoId = hovActual.id; }

    var html = '<header style="display:flex;justify-content:space-between;align-items:center;">';
    html += '<div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">\uD83D\uDC64 HOVPQ \u2014 Hoja de Vida</h1>';
    html += '<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;background:rgba(0,181,226,0.15);color:var(--k-cyan);">Expediente de Personal</span></div>';
    html += '<div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">Captaci\u00F3n & Ficha Biogr\u00E1fica \u2022 Centralizado con Par\u00E1metros PHV</div></div>';
    html += '<div style="display:gap:8px;display:flex;"><button id="btnReporteHOV" class="btn-soft" onclick="window.print()">\uD83D\uDCC4 Reporte General</button><button id="btnNuevaHOV" class="btn-soft btn-primary">+ Nueva Hoja de Vida</button></div></header>';

    html += '<div style="display:flex;flex:1;gap:14px;overflow:hidden;">';
    html += '<aside style="width:290px;min-width:270px;background:var(--bg-surface-soft);border-radius:14px;padding:12px;border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:10px;box-shadow:var(--shadow-raised-sm);">';
    html += '<span style="font-size:10.5px;font-weight:700;color:var(--text-soft);text-transform:uppercase;">Expedientes (' + state.hojasDeVida.length + ')</span>';
    html += '<input id="inputSearchHOV" type="text" class="search-box-soft" placeholder="\uD83D\uDD0D Buscar C\u00E9dula o Nombre..." value="' + state.busquedaHOV + '" />';
    html += '<div style="display:flex;flex-direction:column;gap:4px;overflow-y:auto;flex:1;">';
    for (var k = 0; k < state.hojasDeVida.length; k++) {
      var h = state.hojasDeVida[k];
      var nombreComp = (h.primerNombre + ' ' + (h.segundoNombre || '') + ' ' + h.primerApellido + ' ' + (h.segundoApellido || '')).trim();
      var isSel = (h.id === state.hovSeleccionadoId);
      html += '<div class="tree-node hov-card-item ' + (isSel ? 'active' : '') + '" data-id="' + h.id + '">';
      html += '<div style="overflow:hidden;flex:1;"><div style="font-weight:700;font-size:12px;">' + nombreComp + '</div><div style="font-size:10.5px;color:var(--text-muted);">' + h.tipoDoc + '-' + h.cedula + '</div></div>';
      html += '<span class="' + (h.vinculadoLaboral ? 'badge-status-empleado' : 'badge-status-aspirante') + '">' + (h.vinculadoLaboral ? '\u2713 Empleado' : 'Aspirante') + '</span></div>';
    }
    html += '</div></aside>';

    html += '<div style="flex:1;display:flex;flex-direction:column;gap:12px;overflow:hidden;">';
    if (state.vistaModoHOV === 'formulario') {
      html += renderFormularioHOV();
    } else if (hovActual) {
      html += renderDetalleHOV(hovActual);
    } else {
      html += '<div style="padding:40px;text-align:center;">Seleccione una hoja de vida.</div>';
    }
    html += '</div></div>';
    return html;
  }

  function renderDetalleHOV(hov) {
    var nombreComp = (hov.primerNombre + ' ' + (hov.segundoNombre || '') + ' ' + hov.primerApellido + ' ' + (hov.segundoApellido || '')).trim();
    var html = '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--bg-surface-soft);border-radius:12px;border:1px solid var(--border-subtle);">';
    html += '<div style="display:flex;gap:6px;"><button class="tab-btn ' + (state.hovTabActiva === 'basico' ? 'active' : '') + '" id="tabBtnBasico">\uD83D\uDCCB Datos B\u00E1sicos</button><button class="tab-btn ' + (state.hovTabActiva === 'experiencia' ? 'active' : '') + '" id="tabBtnExperiencia">\uD83D\uDCC8 Experiencia (' + (hov.experienciaInterna ? hov.experienciaInterna.length : 0) + ')</button></div>';
    html += '<div style="display:flex;gap:8px;"><button id="btnPostularEsteCandidato" class="btn-soft btn-primary" data-hovid="' + hov.id + '">+ Postular a Proceso ATS</button><button id="btnEditarHOV" class="btn-soft">\u270F\uFE0F Editar Ficha</button><button id="btnBorrarHOV" class="btn-soft" style="' + (hov.vinculadoLaboral ? 'opacity:0.4;' : 'color:#EF4444;') + '">\uD83D\uDDD1\uFE0F Borrar</button></div></div>';

    html += '<div class="table-card" style="padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;">';
    if (state.hovTabActiva === 'basico') {
      html += '<div style="display:flex;align-items:center;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--border-subtle);"><div class="pill-avatar">' + (hov.primerNombre ? hov.primerNombre.charAt(0) : 'E') + '</div><div style="flex:1;"><div style="display:flex;align-items:center;gap:8px;"><h2 style="font-size:17px;font-weight:700;">' + nombreComp + '</h2><span class="code-tag">' + hov.tipoDoc + '-' + hov.cedula + '</span><span class="badge-pill">' + hov.rif + '</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + getDescPHV('area_profesion', hov.profesion) + ' \u2022 ' + getDescPHV('nivel_academico', hov.nivelAcademico) + '</div></div></div>';
      html += '<div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;"><div><span style="font-size:10px;color:var(--text-soft);font-weight:700;">1er Nombre</span><div style="font-size:12.5px;font-weight:600;">' + hov.primerNombre + '</div></div><div><span style="font-size:10px;color:var(--text-soft);font-weight:700;">2do Nombre</span><div style="font-size:12.5px;font-weight:600;">' + (hov.segundoNombre || '-') + '</div></div><div><span style="font-size:10px;color:var(--text-soft);font-weight:700;">1er Apellido</span><div style="font-size:12.5px;font-weight:600;">' + hov.primerApellido + '</div></div><div><span style="font-size:10px;color:var(--text-soft);font-weight:700;">2do Apellido</span><div style="font-size:12.5px;font-weight:600;">' + (hov.segundoApellido || '-') + '</div></div></div>';
      html += '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;padding-top:10px;border-top:1px solid var(--border-subtle);"><div><span style="font-size:10.5px;color:var(--text-soft);font-weight:700;">Canal de Origen</span><div style="font-size:12.5px;font-weight:600;">' + getDescPHV('origen_hoja', hov.origenHoja) + '</div></div><div><span style="font-size:10.5px;color:var(--text-soft);font-weight:700;">Tel\u00E9fono</span><div style="font-size:12.5px;font-weight:600;">' + hov.telf + '</div></div><div><span style="font-size:10.5px;color:var(--text-soft);font-weight:700;">Email</span><div style="font-size:12.5px;font-weight:600;">' + hov.email + '</div></div></div>';
      html += '<div style="padding-top:10px;border-top:1px solid var(--border-subtle);"><span style="font-size:11px;color:var(--text-soft);font-weight:700;">Direcci\u00F3n Fiscal Completa</span><div style="background:var(--bg-surface-soft);padding:10px;border-radius:8px;border:1px solid var(--border-subtle);font-size:12.5px;margin-top:4px;">' + hov.direccionFiscalCompleta + '</div></div>';
    } else {
      html += '<div style="font-size:11px;font-weight:700;color:var(--text-soft);text-transform:uppercase;">Historial de Movimientos Internos</div>';
      if (hov.experienciaInterna && hov.experienciaInterna.length > 0) {
        for (var e = 0; e < hov.experienciaInterna.length; e++) {
          var exp = hov.experienciaInterna[e];
          html += '<div style="padding:10px 14px;background:var(--bg-surface-soft);border-radius:10px;border:1px solid var(--border-subtle);display:flex;justify-content:space-between;margin-top:6px;"><div><div style="font-weight:700;">' + exp.cargo + '</div><div style="font-size:11px;color:var(--text-muted);">' + exp.unidad + ' \u2022 ' + exp.resolucion + '</div></div><div style="text-align:right;"><span class="badge-pill">' + exp.tipo + '</span><div style="font-size:10.5px;color:var(--text-muted);">' + exp.fecha + '</div></div></div>';
        }
      } else {
        html += '<div style="padding:30px;text-align:center;color:var(--text-muted);">Sin contrataci\u00F3n previa registrada.</div>';
      }
    }
    html += '</div>';
    return html;
  }

  function renderFormularioHOV() {
    var f = state.formHOV;
    var html = '<div style="padding:14px;background:var(--bg-surface-soft);border-radius:14px;border:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:space-between;"><h3 style="font-size:15px;font-weight:700;">Captura de Hoja de Vida (HOVPQ)</h3><button id="btnCancelarFormHOV" class="btn-soft">\u2715 Cancelar</button></div>';
    html += '<form id="formCaptureHOV" class="table-card" style="padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;">';
    html += '<div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Tipo Documento *</label><select id="inHovTipoDoc" class="search-box-soft">' + getOptionsPHV('tipo_documento', f.tipoDoc) + '</select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">N\u00FAmero Documento *</label><input id="inHovCedula" type="number" required value="' + f.cedula + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">RIF Fiscal *</label><input id="inHovRif" type="text" required value="' + f.rif + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Canal de Origen</label><select id="inHovOrigen" class="search-box-soft">' + getOptionsPHV('origen_hoja', f.origenHoja) + '</select></div></div>';
    html += '<div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">1er Nombre *</label><input id="inHovPrimerNombre" type="text" required value="' + (f.primerNombre || '') + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">2do Nombre</label><input id="inHovSegundoNombre" type="text" value="' + (f.segundoNombre || '') + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">1er Apellido *</label><input id="inHovPrimerApellido" type="text" required value="' + (f.primerApellido || '') + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">2do Apellido</label><input id="inHovSegundoApellido" type="text" value="' + (f.segundoApellido || '') + '" class="search-box-soft" /></div></div>';
    html += '<div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Profesi\u00F3n *</label><select id="inHovProfesion" class="search-box-soft">' + getOptionsPHV('area_profesion', f.profesion) + '</select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Nivel Acad\u00E9mico</label><select id="inHovNivelAcad" class="search-box-soft">' + getOptionsPHV('nivel_academico', f.nivelAcademico) + '</select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Tel\u00E9fono *</label><input id="inHovTelf" type="text" required value="' + f.telf + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Email *</label><input id="inHovEmail" type="email" required value="' + f.email + '" class="search-box-soft" /></div></div>';
    html += '<div style="padding-top:8px;border-top:1px solid var(--border-subtle);"><span style="font-size:11px;color:var(--text-soft);font-weight:700;text-transform:uppercase;">Direcci\u00F3n Fiscal y Ubicaci\u00F3n Geogr\u00E1fica</span><div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;margin-top:6px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Pa\u00EDs *</label><select id="inDirPais" class="search-box-soft"><option value="Venezuela" selected>Venezuela</option></select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Estado *</label><select id="inDirEstado" class="search-box-soft">';
    var estados = Object.keys(UBICACIONES_IPOSTEL).sort();
    for (var e = 0; e < estados.length; e++) {
      html += '<option value="' + estados[e] + '" ' + (estados[e] === f.estadoUbic ? 'selected' : '') + '>' + estados[e] + '</option>';
    }
    html += '</select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Municipio *</label><select id="inDirMunicipio" class="search-box-soft"></select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Parroquia / Zona Postal *</label><select id="inDirZona" class="search-box-soft"></select></div></div></div>';
    html += '<div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Detalles de la Vivienda / Calle / Apto *</label><input id="inDirDetalles" type="text" required value="' + (f.detallesVivienda || '') + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Red Social</label><input id="inHovRed" type="text" value="' + (f.redSocial || '') + '" class="search-box-soft" /></div></div>';
    html += '<div><label style="font-size:11px;font-weight:700;color:var(--k-cyan);">Direcci\u00F3n Fiscal Completa</label><input id="inDirCompleta" type="text" readonly value="' + (f.direccionFiscalCompleta || '') + '" class="search-box-soft" style="font-weight:600;background:var(--bg-surface-soft);" /></div>';
    html += '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;padding-top:12px;border-top:1px solid var(--border-subtle);"><button type="button" id="btnCancelFormHOVBottom" class="btn-soft">Cancelar</button><button type="submit" class="btn-soft btn-primary">\uD83D\uDCBE Guardar Ficha</button></div></form>';
    return html;
  }

  function sincronizarCascadaDireccion() {
    var edoSel = document.getElementById('inDirEstado');
    var munSel = document.getElementById('inDirMunicipio');
    var zonSel = document.getElementById('inDirZona');
    if (!edoSel || !munSel || !zonSel) return;
    var estado = edoSel.value;
    var municipios = UBICACIONES_IPOSTEL[estado] ? Object.keys(UBICACIONES_IPOSTEL[estado]).sort() : [];
    var htmlMun = '';
    for (var i = 0; i < municipios.length; i++) {
      htmlMun += '<option value="' + municipios[i] + '">' + municipios[i] + '</option>';
    }
    munSel.innerHTML = htmlMun;
    var munActual = munSel.value;
    var zonas = (UBICACIONES_IPOSTEL[estado] && UBICACIONES_IPOSTEL[estado][munActual]) ? UBICACIONES_IPOSTEL[estado][munActual] : [];
    var htmlZon = '';
    for (var j = 0; j < zonas.length; j++) {
      htmlZon += '<option value="' + zonas[j].label + '">' + zonas[j].label + '</option>';
    }
    zonSel.innerHTML = htmlZon;
    actualizarTextoDireccionCompleta();
  }

  function actualizarTextoDireccionCompleta() {
    var inPais = document.getElementById('inDirPais');
    var inEdo = document.getElementById('inDirEstado');
    var inMun = document.getElementById('inDirMunicipio');
    var inZon = document.getElementById('inDirZona');
    var inDet = document.getElementById('inDirDetalles');
    var inComp = document.getElementById('inDirCompleta');
    if (!inComp) return;
    var partes = [];
    if (inDet && inDet.value.trim()) partes.push(inDet.value.trim());
    if (inZon && inZon.value) partes.push(inZon.value);
    if (inMun && inMun.value) partes.push('Mun. ' + inMun.value);
    if (inEdo && inEdo.value) partes.push('Edo. ' + inEdo.value);
    if (inPais && inPais.value) partes.push(inPais.value);
    inComp.value = partes.join(', ');
  }

  function renderModuloGenerico(mod) {
    var datos = state.datosGenerales[mod.codigo] || [];
    var html = '<header style="display:flex;justify-content:space-between;align-items:center;"><div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">' + mod.icono + ' ' + mod.nombre + '</h1><span class="badge-pill">' + mod.codigo.toUpperCase() + '</span></div></div><button class="btn-soft btn-primary">+ Nuevo</button></header>';
    html += '<div class="table-card" style="margin-top:10px;"><div style="flex:1;overflow-y:auto;"><table><thead><tr><th>Ficha</th><th>Empleado</th><th>Cargo</th><th>Sueldo</th><th>Estatus</th></tr></thead><tbody>';
    for (var r = 0; r < datos.length; r++) {
      var d = datos[r];
      html += '<tr><td><span class="code-tag">' + (d.ficha || d.codigo || d.acto || 'REG') + '</span></td><td style="font-weight:600;">' + (d.empleado || d.nombre || d.titulo || '-') + '</td><td>' + (d.cargo || d.unidad || '-') + '</td><td style="color:var(--k-green);font-weight:700;">' + (d.sueldo || d.minSal || '-') + '</td><td><span class="badge-status-empleado">\u2713 Activo</span></td></tr>';
    }
    html += '</tbody></table></div></div>';
    return html;
  }

  // 12. ATTACH LISTENERS
  function attachEvents() {
    var btnTheme = document.getElementById('btnThemeToggle');
    if (btnTheme) {
      btnTheme.onclick = function() {
        state.tema = (state.tema === 'light' ? 'dark' : 'light');
        localStorage.setItem('sara_theme', state.tema);
        renderApp();
      };
    }

    var qj = document.getElementById('quickJump');
    if (qj) {
      qj.onkeydown = function(e) {
        if (e.key === 'Enter') {
          var val = qj.value.trim().toLowerCase();
          for (var i = 0; i < MODULOS.length; i++) {
            if (MODULOS[i].codigo.toLowerCase() === val) {
              state.moduloActivo = val;
              renderApp();
              return;
            }
          }
          alert('M\u00F3dulo [' + val.toUpperCase() + '] no encontrado.');
        }
      };
    }

    // Dock Direct
    var dPHV = document.getElementById('dock-phv'); if (dPHV) dPHV.onclick = function() { state.moduloActivo = 'phv'; renderApp(); };
    var dORG = document.getElementById('dock-org'); if (dORG) dORG.onclick = function() { state.moduloActivo = 'org'; renderApp(); };
    var dREQ = document.getElementById('dock-req'); if (dREQ) dREQ.onclick = function() { state.moduloActivo = 'req'; renderApp(); };
    var dATS = document.getElementById('dock-ats'); if (dATS) dATS.onclick = function() { state.moduloActivo = 'ats'; renderApp(); };
    var dCMP = document.getElementById('dock-cmp'); if (dCMP) dCMP.onclick = function() { state.moduloActivo = 'cmp'; renderApp(); };
    var dOFE = document.getElementById('dock-ofe'); if (dOFE) dOFE.onclick = function() { state.moduloActivo = 'ofe'; renderApp(); };
    var dHOV = document.getElementById('dock-hov'); if (dHOV) dHOV.onclick = function() { state.moduloActivo = 'hov'; renderApp(); };
    var dEML = document.getElementById('dock-eml'); if (dEML) dEML.onclick = function() { state.moduloActivo = 'eml'; renderApp(); };

    // Sidebar
    document.querySelectorAll('.nav-mod-item').forEach(function(el) {
      el.onclick = function() {
        var cod = el.getAttribute('data-codigo');
        if (cod) {
          state.moduloActivo = cod;
          renderApp();
        }
      };
    });

    // PHV Events
    document.querySelectorAll('.cat-item').forEach(function(el) {
      el.onclick = function() {
        state.catalogoActivo = el.getAttribute('data-cat');
        state.paginaPHV = 1;
        renderApp();
      };
    });

    var inBusPHV = document.getElementById('inputBusquedaPHV'); if (inBusPHV) inBusPHV.oninput = function(e) { state.busquedaPHV = e.target.value; state.paginaPHV = 1; renderApp(); };
    var inFC = document.getElementById('inputFiltroCat'); if (inFC) inFC.oninput = function(e) { state.filtroCatalogo = e.target.value; renderApp(); };
    var selTPHV = document.getElementById('selectTipoPHV'); if (selTPHV) selTPHV.onchange = function(e) { state.filtroTipoPHV = e.target.value; state.paginaPHV = 1; renderApp(); };

    var bpPHV = document.getElementById('btnPrevPagePHV'); if (bpPHV) bpPHV.onclick = function() { state.paginaPHV = Math.max(1, state.paginaPHV - 1); renderApp(); };
    var bnPHV = document.getElementById('btnNextPagePHV'); if (bnPHV) bnPHV.onclick = function() { state.paginaPHV++; renderApp(); };

    var btnAddPHV = document.getElementById('btnAddRecordPHV');
    if (btnAddPHV) {
      btnAddPHV.onclick = function() {
        state.modoEdicionPHV = false;
        state.formPHV = { cod: '', desc: '', orig: '', tipo: 'texto', act: true };
        state.drawerPHV = true;
        renderApp();
      };
    }

    var btnCloseDPHV = document.getElementById('btnCloseDrawerPHV'); if (btnCloseDPHV) btnCloseDPHV.onclick = function() { state.drawerPHV = false; renderApp(); };
    var btnCanDPHV = document.getElementById('btnCancelDrawerPHV'); if (btnCanDPHV) btnCanDPHV.onclick = function() { state.drawerPHV = false; renderApp(); };

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
              alert('Acci\u00F3n bloqueada: El registro ' + cod + ' est\u00E1 vinculado en SARA6.');
              return;
            }
            if (confirm('\u00BFEliminar par\u00E1metro ' + cod + ' (' + item.desc + ')?')) {
              state.datosPHV.splice(z, 1);
              renderApp();
            }
            break;
          }
        }
      };
    });

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

    var btnCloseMC = document.getElementById('btnCloseModalCat'); if (btnCloseMC) btnCloseMC.onclick = function() { state.modalCatalogoAbierto = false; renderApp(); };
    var btnCanMC = document.getElementById('btnCancelModalCat'); if (btnCanMC) btnCanMC.onclick = function() { state.modalCatalogoAbierto = false; renderApp(); };

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

    // ORG Events
    var inSOrg = document.getElementById('inSearchORG'); if (inSOrg) inSOrg.oninput = function(e) { state.orgBusqueda = e.target.value; renderApp(); };
    var selGOrg = document.getElementById('selGerenciaORG'); if (selGOrg) selGOrg.onchange = function(e) { state.orgFiltroGerencia = e.target.value; renderApp(); };

    document.querySelectorAll('.org-node-select').forEach(function(item) {
      item.onclick = function() {
        var id = item.getAttribute('data-id');
        for (var i = 0; i < state.organigramaDB.length; i++) {
          if (state.organigramaDB[i].id === id) {
            state.orgNodoSeleccionado = state.organigramaDB[i];
            renderApp();
            break;
          }
        }
      };
    });

    var btnAperturaHC = document.getElementById('btnAperturarHeadcount');
    if (btnAperturaHC) {
      btnAperturaHC.onclick = function() {
        state.orgModalDobleCheck = true;
        renderApp();
      };
    }
    var btnCloseMDC = document.getElementById('btnCloseModalDC'); if (btnCloseMDC) btnCloseMDC.onclick = function() { state.orgModalDobleCheck = false; renderApp(); };
    var btnCanMDC = document.getElementById('btnCancelModalDC'); if (btnCanMDC) btnCanMDC.onclick = function() { state.orgModalDobleCheck = false; renderApp(); };

    var formHCDC = document.getElementById('formHeadcountDC');
    if (formHCDC) {
      formHCDC.onsubmit = function(e) {
        e.preventDefault();
        state.solicitudesHeadcount.unshift({
          id: 'HC-2026-0' + (state.solicitudesHeadcount.length + 1),
          fecha: new Date().toISOString().slice(0, 10),
          puesto: document.getElementById('inHCPuesto').value.trim(),
          gerencia: document.getElementById('inHCGerencia').value,
          unidad: '0010 ' + document.getElementById('inHCGerencia').value,
          plazas: parseInt(document.getElementById('inHCPlazas').value, 10) || 1,
          justificacion: document.getElementById('inHCJustificacion').value.trim(),
          solicitante: 'Edixon Rodr\u00EDguez (Coord. RRHH)',
          estatus: 'PENDIENTE_GERENCIA'
        });
        alert('Solicitud enviada a Gerencia para Doble Check.');
        state.orgModalDobleCheck = false;
        renderApp();
      };
    }

    document.querySelectorAll('.btn-abrir-mover').forEach(function(btn) {
      btn.onclick = function() { state.orgModalMover = true; renderApp(); };
    });
    var btnCloseMM = document.getElementById('btnCloseModalMover'); if (btnCloseMM) btnCloseMM.onclick = function() { state.orgModalMover = false; renderApp(); };
    var btnCanMM = document.getElementById('btnCancelModalMover'); if (btnCanMM) btnCanMM.onclick = function() { state.orgModalMover = false; renderApp(); };

    var formMover = document.getElementById('formMoverNodo');
    if (formMover) {
      formMover.onsubmit = function(e) {
        e.preventDefault();
        var nodo = state.orgNodoSeleccionado;
        if (nodo) {
          state.historialMovimientosORG.unshift({
            fecha: new Date().toISOString().slice(0, 10),
            ci: nodo.ci,
            empleado: nodo.nombre,
            cargo: nodo.cargo,
            unidadAnt: nodo.unidad,
            unidadNva: document.getElementById('inMoverUnidad').value.trim(),
            jefeAnt: nodo.supervisor,
            jefeNvo: document.getElementById('inMoverSupervisor').value.trim(),
            motivo: document.getElementById('inMoverMotivo').value.trim(),
            usuario: 'edixon.rodriguez'
          });
          nodo.unidad = document.getElementById('inMoverUnidad').value.trim();
          nodo.supervisor = document.getElementById('inMoverSupervisor').value.trim();
          alert('\u00A1Posici\u00F3n reasignada con log registrado!');
          state.orgModalMover = false;
          renderApp();
        }
      };
    }

    var btnExpExcel = document.getElementById('btnExportarExcelORG');
    if (btnExpExcel) {
      btnExpExcel.onclick = function() {
        var csvRows = ['ID_COD;Cargo;Direccion_Gerencia;Unidad_Organizativa;NIVEL;CI;Nombre_Completo;SUPERVISOR'];
        for (var i = 0; i < state.organigramaDB.length; i++) {
          var o = state.organigramaDB[i];
          csvRows.push([o.id, '"' + o.cargo + '"', '"' + o.gerencia + '"', '"' + o.unidad + '"', o.nivel, o.ci, '"' + o.nombre + '"', '"' + o.supervisor + '"'].join(';'));
        }
        var blob = new Blob(['\uFEFF' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'GMSP_Organigrama_' + new Date().toISOString().slice(0, 10) + '.csv';
        a.click();
      };
    }

    // REQ & ATS Events
    document.querySelectorAll('.btn-ir-ats').forEach(function(btn) {
      btn.onclick = function() {
        state.atsVacanteActiva = btn.getAttribute('data-vacante');
        state.moduloActivo = 'ats';
        renderApp();
      };
    });

    var btnPostHOV = document.getElementById('btnPostularDesdeHOV');
    if (btnPostHOV) btnPostHOV.onclick = function() { state.moduloActivo = 'hov'; renderApp(); };

    document.querySelectorAll('.btn-avanzar-etapa').forEach(function(btn) {
      btn.onclick = function() {
        var trxId = btn.getAttribute('data-trx');
        for (var i = 0; i < state.postulacionesATS.length; i++) {
          if (state.postulacionesATS[i].transaccionId === trxId) {
            var post = state.postulacionesATS[i];
            if (post.etapa === 'screening') post.etapa = 'entrevista_rrhh';
            else if (post.etapa === 'entrevista_rrhh') post.etapa = 'evaluacion_skills';
            else if (post.etapa === 'evaluacion_skills') post.etapa = 'psicotecnica';
            else if (post.etapa === 'psicotecnica') { post.etapa = 'oferta'; post.dictamen = 'Apto'; }
            renderApp();
            break;
          }
        }
      };
    });

    document.querySelectorAll('.btn-firmar-traspaso').forEach(function(btn) {
      btn.onclick = function() {
        var trxId = btn.getAttribute('data-trx');
        for (var i = 0; i < state.postulacionesATS.length; i++) {
          if (state.postulacionesATS[i].transaccionId === trxId) {
            var post = state.postulacionesATS[i];
            post.etapa = 'contratado';
            post.ofertaEstatus = 'Firmado y Activo';
            state.datosGenerales.eml.unshift({
              ficha: 'E-0' + Math.floor(1000 + Math.random() * 9000),
              cedula: post.hovId,
              empleado: post.candidato,
              cargo: post.cargo,
              depto: 'Personal Contratado',
              ingreso: new Date().toISOString().slice(0, 10),
              sueldo: post.ofertaMonto,
              estatus: 'Activo'
            });
            alert('\u00A1Contrataci\u00F3n Formalizada! ' + post.candidato + ' transferido a N\u00F3mina Activa (EML).');
            state.moduloActivo = 'eml';
            renderApp();
            break;
          }
        }
      };
    });

    // HOV Events
    document.querySelectorAll('.hov-card-item').forEach(function(el) {
      el.onclick = function() {
        state.hovSeleccionadoId = el.getAttribute('data-id');
        state.vistaModoHOV = 'detalle';
        renderApp();
      };
    });

    var inSearchHov = document.getElementById('inputSearchHOV'); if (inSearchHov) inSearchHov.oninput = function(e) { state.busquedaHOV = e.target.value; renderApp(); };
    var btnNvoHov = document.getElementById('btnNuevaHOV'); if (btnNvoHov) btnNvoHov.onclick = function() { state.vistaModoHOV = 'formulario'; renderApp(); };

    var inEdo = document.getElementById('inDirEstado');
    if (inEdo) {
      sincronizarCascadaDireccion();
      inEdo.onchange = function() { state.formHOV.estadoUbic = inEdo.value; sincronizarCascadaDireccion(); };
    }
    var inMun = document.getElementById('inDirMunicipio'); if (inMun) inMun.onchange = function() { sincronizarCascadaDireccion(); };
    var inZon = document.getElementById('inDirZona'); if (inZon) inZon.onchange = function() { actualizarTextoDireccionCompleta(); };
    var inDet = document.getElementById('inDirDetalles'); if (inDet) inDet.oninput = function() { actualizarTextoDireccionCompleta(); };

    var formCapHov = document.getElementById('formCaptureHOV');
    if (formCapHov) {
      formCapHov.onsubmit = function(e) {
        e.preventDefault();
        var tDoc = document.getElementById('inHovTipoDoc') ? document.getElementById('inHovTipoDoc').value : 'V';
        var ced = document.getElementById('inHovCedula') ? document.getElementById('inHovCedula').value.trim() : '';
        var idComp = tDoc + '-' + ced;
        var nvoExp = {
          id: idComp, tipoDoc: tDoc, cedula: ced,
          rif: document.getElementById('inHovRif') ? document.getElementById('inHovRif').value.trim().toUpperCase() : '',
          primerNombre: document.getElementById('inHovPrimerNombre') ? document.getElementById('inHovPrimerNombre').value.trim() : '',
          segundoNombre: document.getElementById('inHovSegundoNombre') ? document.getElementById('inHovSegundoNombre').value.trim() : '',
          primerApellido: document.getElementById('inHovPrimerApellido') ? document.getElementById('inHovPrimerApellido').value.trim() : '',
          segundoApellido: document.getElementById('inHovSegundoApellido') ? document.getElementById('inHovSegundoApellido').value.trim() : '',
          sexo: 'M', estadoCivil: 'S', nacim: '1990-01-01', nacionalidad: 'Venezolana',
          profesion: document.getElementById('inHovProfesion') ? document.getElementById('inHovProfesion').value : 'MED-CIR',
          nivelAcademico: document.getElementById('inHovNivelAcad') ? document.getElementById('inHovNivelAcad').value : 'UNI',
          idioma: 'ES', origenHoja: document.getElementById('inHovOrigen') ? document.getElementById('inHovOrigen').value : 'PORT-TAL',
          telf: document.getElementById('inHovTelf') ? document.getElementById('inHovTelf').value.trim() : '',
          email: document.getElementById('inHovEmail') ? document.getElementById('inHovEmail').value.trim() : '',
          pais: 'Venezuela', estadoUbic: document.getElementById('inDirEstado').value, municipio: document.getElementById('inDirMunicipio').value,
          parroquiaZona: document.getElementById('inDirZona').value, detallesVivienda: document.getElementById('inDirDetalles').value.trim(),
          direccionFiscalCompleta: document.getElementById('inDirCompleta').value.trim(), redSocial: document.getElementById('inHovRed') ? document.getElementById('inHovRed').value.trim() : '',
          estatusCandidato: 'En Proceso', vinculadoLaboral: false, experienciaInterna: []
        };
        state.hojasDeVida.unshift(nvoExp);
        state.hovSeleccionadoId = idComp;
        state.vistaModoHOV = 'detalle';
        renderApp();
      };
    }

    document.querySelectorAll('.cat-item').forEach(function(el) {
      el.onclick = function() { state.catalogoActivo = el.getAttribute('data-cat'); renderApp(); };
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();