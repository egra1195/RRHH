/**
 * SARA v7.0 • RRHH & Nomina GMSP / Keralty
 * Modulo Maestro PHV (Parametros Hoja de Vida)
 * Design System: Soft UI Neumorphism Táctil + Dual Theme (Light/Dark)
 */
(function () {
  console.log('[SARA v7.0] Inicializando SPA con Design System Keralty/GMSP.');

  const CATALOGOS_PHV = [
    { id: 'caracteristicas', numero: 1, nombre: 'Características', desc: 'Campos adicionales de persona o posición', tabla: 'CARACTERISTICA_CAR', total: 5, tipo: 'texto' },
    { id: 'tipo_documento', numero: 2, nombre: 'Tipo de Documento', desc: 'Cédula V/E, RIF (J), Pasaporte (P)', tabla: 'TIPODOCUMENTO_TID', total: 4, tipo: 'texto' },
    { id: 'tematica', numero: 3, nombre: 'Temática', desc: 'Agrupación estructural y visualización', tabla: 'TEMATICA_TEM', total: 3, tipo: 'texto' },
    { id: 'estado_civil', numero: 4, nombre: 'Estado Civil', desc: 'Casado, concubinato, divorciado, soltero, viudo', tabla: 'ESTADOCIVIL_ESC', total: 5, tipo: 'texto' },
    { id: 'tipo_relacion', numero: 5, nombre: 'Tipo de Relación', desc: 'Empleado, contratado, aspirante, pasante', tabla: 'TIPORELACION_TIR', total: 4, tipo: 'texto' },
    { id: 'nivel_academico', numero: 6, nombre: 'Nivel Académico', desc: 'Grado de instrucción (TSU, Univ, Posgrado)', tabla: 'NIVELACADEMICO_NAC', total: 5, tipo: 'texto' },
    { id: 'area_profesion', numero: 7, nombre: 'Área de Profesión', desc: 'Profesiones tituladas y oficios técnicos', tabla: 'PROFESION_PRO', total: 4, tipo: 'texto' },
    { id: 'idioma', numero: 8, nombre: 'Idioma', desc: 'Español, inglés, francés, portugués, italiano', tabla: 'IDIOMA_IDI', total: 5, tipo: 'texto' },
    { id: 'caracteristicas_idioma', numero: 9, nombre: 'Características de Idioma', desc: 'Lectura técnica, conversación, redacción', tabla: 'CARACTERISTICAIDIOMA_CID', total: 3, tipo: 'texto' },
    { id: 'parentesco', numero: 10, nombre: 'Parentesco', desc: 'Padres, hijos, cónyuge, hermanos, tíos', tabla: 'PARENTESCO_PAR', total: 4, tipo: 'texto' },
    { id: 'area_experiencia', numero: 11, nombre: 'Área de Experiencia', desc: 'Áreas clínicas, quirúrgicas y administrativas', tabla: 'AREAEXPERIENCIA_AEX', total: 3, tipo: 'texto' },
    { id: 'tipo_bien', numero: 12, nombre: 'Tipo Bien', desc: 'Automóvil, bus, camioneta, moto, bicicleta', tabla: 'TIPOBIEN_TIB', total: 3, tipo: 'texto' },
    { id: 'tipo_inmueble', numero: 13, nombre: 'Tipo Inmueble', desc: 'Apartamento (A), casa (C), habitación (H), quinta (Q)', tabla: 'TIPOINMUEBLE_TII', total: 4, tipo: 'texto' },
    { id: 'origen_hoja', numero: 14, nombre: 'Origen de Hoja', desc: 'Portal talento, recomendación interna, ferias', tabla: 'ORIGENHOJA_ORH', total: 3, tipo: 'texto' }
  ];

  let state = {
    tema: localStorage.getItem('sara_theme') || 'light',
    moduloActivo: 'phv',
    catalogoActivo: 'caracteristicas',
    busqueda: '',
    filtroCatalogo: '',
    drawerAbierto: false,
    modoEdicion: false,
    filtroTipo: '',
    pagina: 1,
    limite: 8,
    datos: [
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
    form: { cod: '', desc: '', orig: '', tipo: 'texto', act: true }
  };

  function injectStyles() {
    let styleTag = document.getElementById('sara-ds-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'sara-ds-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      :root {
        --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
        --bg-canvas: #EEF1F5;
        --bg-surface: #FFFFFF;
        --bg-surface-soft: #F4F6F9;
        --bg-dock: #111827;
        --text-main: #1E293B;
        --text-muted: #64748B;
        --text-soft: #94A3B8;
        --border-subtle: #E2E8F0;
        --shadow-raised: 8px 8px 18px #d1d9e6, -8px -8px 18px #ffffff;
        --shadow-raised-sm: 4px 4px 10px #d1d9e6, -4px -4px 10px #ffffff;
        --shadow-inset: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;
        --shadow-dock: 10px 10px 25px rgba(0,0,0,0.18);
        --k-blue: #002F6C;
        --k-cyan: #00B5E2;
        --k-green: #00B388;
        --accent-active-bg: #E6F4FA;
        --accent-active-border: #00B5E2;
        --accent-active-text: #006FBA;
      }
      [data-theme="dark"] {
        --bg-canvas: #0A0F1D;
        --bg-surface: #131B2E;
        --bg-surface-soft: #1A243B;
        --bg-dock: #070B14;
        --text-main: #F8FAFC;
        --text-muted: #94A3B8;
        --text-soft: #64748B;
        --border-subtle: #23304E;
        --shadow-raised: 6px 6px 16px #050811, -6px -6px 16px #1b2640;
        --shadow-raised-sm: 3px 3px 8px #050811, -3px -3px 8px #1b2640;
        --shadow-inset: inset 2px 2px 5px #050811, inset -2px -2px 5px #1b2640;
        --shadow-dock: 10px 10px 30px rgba(0,0,0,0.6);
        --accent-active-bg: #142E4A;
        --accent-active-border: #00B5E2;
        --accent-active-text: #38BDF8;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
      body { font-family: var(--font-main); background: var(--bg-canvas); color: var(--text-main); height: 100vh; overflow: hidden; }
      .app-wrapper { display: flex; width: 100vw; height: 100vh; padding: 14px; gap: 14px; }
      .dock-primary { width: 68px; background: var(--bg-dock); border-radius: 20px; display: flex; flex-direction: column; align-items: center; padding: 16px 0; box-shadow: var(--shadow-dock); justify-content: space-between; flex-shrink: 0; }
      .dock-group { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; }
      .dock-item { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94A3B8; cursor: pointer; border: 1px solid transparent; background: transparent; }
      .dock-item:hover { color: #FFFFFF; background: rgba(255,255,255,0.08); }
      .dock-item.active { background: rgba(0, 181, 226, 0.18); color: var(--k-cyan); border-color: rgba(0, 181, 226, 0.4); box-shadow: 0 0 12px rgba(0, 181, 226, 0.3); }
      .logo-badge { width: 42px; height: 42px; border-radius: 14px; background: linear-gradient(135deg, var(--k-cyan), var(--k-green)); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF; font-size: 17px; box-shadow: 0 4px 12px rgba(0,181,226,0.3); margin-bottom: 6px; }
      .sidebar-panel { width: 290px; min-width: 270px; background: var(--bg-surface); border-radius: 20px; padding: 18px; display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-raised); flex-shrink: 0; }
      .search-box-soft { width: 100%; padding: 9px 12px; border-radius: 10px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); border: 1px solid var(--border-subtle); font-size: 12px; color: var(--text-main); outline: none; }
      .tree-node { display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; border-radius: 8px; font-size: 12px; cursor: pointer; color: var(--text-muted); border: 1px solid transparent; }
      .tree-node:hover { background: var(--bg-surface-soft); color: var(--text-main); }
      .tree-node.active { background: var(--accent-active-bg); border-color: var(--accent-active-border); color: var(--accent-active-text); font-weight: 600; box-shadow: var(--shadow-raised-sm); }
      .tree-subgroup { margin-left: 12px; padding-left: 8px; border-left: 2px solid var(--border-subtle); display: flex; flex-direction: column; gap: 2px; }
      .badge-pill { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 9999px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); color: var(--text-muted); }
      .tree-node.active .badge-pill { background: var(--k-cyan); color: #FFF; box-shadow: none; }
      .main-workspace { flex: 1; background: var(--bg-surface); border-radius: 20px; padding: 22px; box-shadow: var(--shadow-raised); display: flex; flex-direction: column; gap: 16px; overflow: hidden; }
      .btn-soft { padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid var(--border-subtle); background: var(--bg-surface); box-shadow: var(--shadow-raised-sm); color: var(--text-main); display: inline-flex; align-items: center; gap: 6px; }
      .btn-soft:active { box-shadow: var(--shadow-inset); transform: scale(0.98); }
      .btn-primary { background: linear-gradient(135deg, var(--k-blue), #004090); color: #FFF; border: none; box-shadow: 0 4px 12px rgba(0, 47, 108, 0.3); }
      [data-theme="dark"] .btn-primary { background: linear-gradient(135deg, var(--k-cyan), #0072CE); color: #041021; box-shadow: 0 4px 14px rgba(0, 181, 226, 0.35); }
      .table-card { border-radius: 14px; background: var(--bg-surface); box-shadow: var(--shadow-raised-sm); border: 1px solid var(--border-subtle); overflow: hidden; display: flex; flex-direction: column; flex: 1; }
      table { width: 100%; border-collapse: collapse; text-align: left; font-size: 12px; }
      th { background: var(--bg-surface-soft); padding: 11px 14px; font-weight: 600; color: var(--text-muted); border-bottom: 1px solid var(--border-subtle); text-transform: uppercase; font-size: 10px; letter-spacing: 0.05em; }
      td { padding: 12px 14px; border-bottom: 1px solid var(--border-subtle); }
      .code-tag { font-family: monospace; font-size: 11px; padding: 3px 6px; border-radius: 6px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); color: var(--accent-active-text); font-weight: 700; }
    `;
  }

  function renderApp() {
    injectStyles();
    document.body.setAttribute('data-theme', state.tema);

    const root = document.getElementById('root');
    if (!root) return;

    const catActual = CATALOGOS_PHV.find(c => c.id === state.catalogoActivo) || CATALOGOS_PHV[0];

    // Filtrado de datos
    let filtrados = state.datos.filter(d => d.cat === state.catalogoActivo);
    if (state.busqueda.trim()) {
      const q = state.busqueda.toLowerCase();
      filtrados = filtrados.filter(d => d.cod.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.orig.toLowerCase().includes(q));
    }
    if (state.filtroTipo) {
      filtrados = filtrados.filter(d => d.tipo === state.filtroTipo);
    }

    const totalPaginas = Math.ceil(filtrados.length / state.limite) || 1;
    const paginados = filtrados.slice((state.pagina - 1) * state.limite, state.pagina * state.limite);

    // Filtrado de catalogos
    let catsVisibles = CATALOGOS_PHV;
    if (state.filtroCatalogo.trim()) {
      const fc = state.filtroCatalogo.toLowerCase();
      catsVisibles = CATALOGOS_PHV.filter(c => c.nombre.toLowerCase().includes(fc) || c.desc.toLowerCase().includes(fc) || String(c.numero) === fc);
    }

    root.innerHTML = `
      <div class="app-wrapper">
        <!-- 1. DOCK PRIMARIO FLOTANTE (68px) -->
        <aside class="dock-primary">
          <div class="dock-group">
            <div class="logo-badge" title="Keralty / Grupo Médico Santa Paula">K</div>
            <button class="dock-item active" title="Módulos Maestros">⚙</button>
            <button class="dock-item" title="Hoja de Vida [HOV]">👤</button>
            <button class="dock-item" title="Compensaciones [EML]">💼</button>
            <button class="dock-item" title="Organización">🏢</button>
          </div>
          <div class="dock-group">
            <button class="dock-item" id="btnThemeToggle" title="Alternar Modo Claro / Oscuro">${state.tema === 'dark' ? '☀️' : '🌙'}</button>
            <button class="dock-item" title="Configuraciones SARA6">⚡</button>
          </div>
        </aside>

        <!-- 2. SIDEBAR CON ÁRBOL JERÁRQUICO -->
        <nav class="sidebar-panel">
          <div style="display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--bg-surface-soft); box-shadow: var(--shadow-raised-sm); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--k-cyan); border: 2px solid var(--k-cyan);">
              ER
            </div>
            <div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">Edixon Rodríguez</div>
              <div style="font-size: 11px; color: var(--text-muted);">Sistemas • GMSP / Keralty</div>
            </div>
          </div>

          <input id="inputFiltroCat" type="text" class="search-box-soft" placeholder="🔍 Filtrar catálogos..." value="${state.filtroCatalogo}" />

          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-soft);">
            Estructura de Catálogos (14)
          </div>

          <div style="display: flex; flex-direction: column; gap: 3px; overflow-y: auto; flex: 1;">
            <!-- Nivel Padre Maestros -->
            <div class="tree-node" style="font-weight: 700; color: var(--text-main);">
              <span>📁 MAESTROS</span>
              <span class="badge-pill">14</span>
            </div>
            <div class="tree-subgroup">
              <div class="tree-node" style="font-weight: 600;">
                <span>📂 Parámetros Generales</span>
              </div>
              <div class="tree-subgroup">
                ${catsVisibles.map(c => `
                  <div class="tree-node cat-item ${state.catalogoActivo === c.id ? 'active' : ''}" data-cat="${c.id}">
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.numero}. ${c.nombre}</span>
                    <span class="badge-pill">${c.total}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </nav>

        <!-- 3. WORKSPACE PRINCIPAL SOFT UI -->
        <main class="main-workspace">
          <!-- Header del Módulo -->
          <header style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h1 style="font-size: 19px; font-weight: 700; color: var(--text-main);">Parámetros Hoja de Vida</h1>
                <span style="font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: rgba(0, 181, 226, 0.15); color: var(--k-cyan);">[PHV]</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                ${catActual.numero}. ${catActual.nombre} • Tabla: <code style="color: var(--accent-active-text); font-weight: 600;">${catActual.tabla}</code>
              </div>
            </div>

            <div style="display: flex; gap: 10px; align-items: center;">
              <button id="btnExportCSV" class="btn-soft">📥 Exportar CSV (;)</button>
              <button id="btnAddRecord" class="btn-soft btn-primary">+ Adicionar Registro</button>
            </div>
          </header>

          <!-- Barra de Filtros -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 14px; background: var(--bg-surface-soft); border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
              <input id="inputBusqueda" type="text" class="search-box-soft" placeholder="🔍 Buscar por código, descripción o nomenclatura..." value="${state.busqueda}" style="max-width: 360px;" />
              <select id="selectTipo" class="search-box-soft" style="width: auto; padding: 8px 12px;">
                <option value="" ${state.filtroTipo === '' ? 'selected' : ''}>Todos los tipos</option>
                <option value="texto" ${state.filtroTipo === 'texto' ? 'selected' : ''}>Texto</option>
                <option value="numero" ${state.filtroTipo === 'numero' ? 'selected' : ''}>Número</option>
                <option value="fecha" ${state.filtroTipo === 'fecha' ? 'selected' : ''}>Fecha</option>
                <option value="mixto" ${state.filtroTipo === 'mixto' ? 'selected' : ''}>Mixto</option>
              </select>
            </div>
            <div style="font-size: 12px; color: var(--text-muted);">
              Total: <strong style="color: var(--text-main);">${filtrados.length}</strong> registros
            </div>
          </div>

          <!-- DataGrid Soft UI -->
          <div class="table-card">
            <div style="flex: 1; overflow-y: auto;">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción del Parámetro</th>
                    <th>Origen</th>
                    <th>Tipo Dato</th>
                    <th>Estado SARA6</th>
                    <th style="text-align: right;">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${paginados.map(d => `
                    <tr>
                      <td><span class="code-tag">${d.cod}</span></td>
                      <td style="font-weight: 600; color: var(--text-main);">${d.desc}</td>
                      <td><span style="font-family: monospace; font-size: 11px; color: var(--text-muted);">${d.orig}</span></td>
                      <td style="text-transform: capitalize; color: var(--text-muted);">${d.tipo}</td>
                      <td>
                        ${d.vinc ? `
                          <span title="${d.mot || 'Vinculado a registros activos en SARA6'}" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 9999px; font-size: 10px; font-weight: 700; background: rgba(239, 68, 68, 0.12); color: #EF4444;">
                            🔒 Vinculado
                          </span>
                        ` : `
                          <span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 9999px; font-size: 10px; font-weight: 700; background: rgba(0, 179, 136, 0.12); color: var(--k-green);">
                            ✓ Disponible
                          </span>
                        `}
                      </td>
                      <td style="text-align: right;">
                        <div style="display: inline-flex; gap: 6px;">
                          <button class="btn-soft btn-edit" data-cod="${d.cod}" style="padding: 4px 8px; font-size: 11px;">✏ Editar</button>
                          <button class="btn-soft btn-delete" data-cod="${d.cod}" ${d.vinc ? 'disabled' : ''} style="padding: 4px 8px; font-size: 11px; ${d.vinc ? 'opacity: 0.4; cursor: not-allowed;' : 'color: #EF4444;'}" title="${d.vinc ? 'Bloqueado por SARA6' : 'Eliminar'}">🗑 Borrar</button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Paginación Integrada -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: var(--bg-surface-soft); border-top: 1px solid var(--border-subtle); font-size: 12px; color: var(--text-muted);">
              <div>Página <strong style="color: var(--text-main);">${state.pagina}</strong> de <strong style="color: var(--text-main);">${totalPaginas}</strong></div>
              <div style="display: flex; gap: 6px;">
                <button id="btnPrevPage" class="btn-soft" ${state.pagina <= 1 ? 'disabled' : ''} style="padding: 4px 10px;">◀ Anterior</button>
                <button id="btnNextPage" class="btn-soft" ${state.pagina >= totalPaginas ? 'disabled' : ''} style="padding: 4px 10px;">Siguiente ▶</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- 4. MODAL / DRAWER LATERAL (SOFT UI) -->
      ${state.drawerAbierto ? `
        <div id="drawerOverlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 50; display: flex; justify-content: flex-end;">
          <div style="width: 420px; max-width: 90vw; background: var(--bg-surface); height: 100%; border-left: 1px solid var(--border-subtle); display: flex; flex-direction: column; box-shadow: -10px 0 30px rgba(0,0,0,0.25); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${state.modoEdicion ? 'Editar Parámetro' : 'Adicionar Registro'}</h3>
                <div style="font-size: 11px; color: var(--text-muted);">Catálogo: ${catActual.nombre}</div>
              </div>
              <button id="btnCloseDrawer" style="background: transparent; border: none; font-size: 20px; cursor: pointer; color: var(--text-muted);">✕</button>
            </div>

            <form id="formParam" style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Código de Identificación *</label>
                <input id="inputCod" type="text" required ${state.modoEdicion ? 'disabled' : ''} value="${state.form.cod}" class="search-box-soft" style="text-transform: uppercase;" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Descripción Oficial *</label>
                <input id="inputDesc" type="text" required value="${state.form.desc}" class="search-box-soft" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Origen / Nomenclatura</label>
                <input id="inputOrig" type="text" value="${state.form.orig}" class="search-box-soft" style="text-transform: uppercase;" />
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 4px;">Tipo de Dato</label>
                <select id="selectFormTipo" class="search-box-soft">
                  <option value="texto" ${state.form.tipo === 'texto' ? 'selected' : ''}>Texto</option>
                  <option value="numero" ${state.form.tipo === 'numero' ? 'selected' : ''}>Número</option>
                  <option value="fecha" ${state.form.tipo === 'fecha' ? 'selected' : ''}>Fecha</option>
                  <option value="mixto" ${state.form.tipo === 'mixto' ? 'selected' : ''}>Mixto</option>
                </select>
              </div>
              <div style="margin-top: auto; display: flex; gap: 10px;">
                <button type="button" id="btnCancelDrawer" class="btn-soft" style="flex: 1; justify-content: center;">Cancelar</button>
                <button type="submit" class="btn-soft btn-primary" style="flex: 1; justify-content: center;">Guardar Registro</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}
    `;

    attachEvents();
  }

  function attachEvents() {
    // Alternar Tema Claro/Oscuro
    const btnTheme = document.getElementById('btnThemeToggle');
    if (btnTheme) {
      btnTheme.onclick = () => {
        state.tema = state.tema === 'light' ? 'dark' : 'light';
        localStorage.setItem('sara_theme', state.tema);
        renderApp();
      };
    }

    // Selección de Catálogo en el Árbol
    document.querySelectorAll('.cat-item').forEach(el => {
      el.addEventListener('click', () => {
        state.catalogoActivo = el.getAttribute('data-cat');
        state.pagina = 1;
        renderApp();
      });
    });

    // Filtros de búsqueda
    const inBus = document.getElementById('inputBusqueda');
    if (inBus) inBus.oninput = (e) => { state.busqueda = e.target.value; state.pagina = 1; renderApp(); };

    const inFC = document.getElementById('inputFiltroCat');
    if (inFC) inFC.oninput = (e) => { state.filtroCatalogo = e.target.value; renderApp(); };

    const selT = document.getElementById('selectTipo');
    if (selT) selT.onchange = (e) => { state.filtroTipo = e.target.value; state.pagina = 1; renderApp(); };

    // Paginación
    const bp = document.getElementById('btnPrevPage');
    if (bp) bp.onclick = () => { state.pagina = Math.max(1, state.pagina - 1); renderApp(); };

    const bn = document.getElementById('btnNextPage');
    if (bn) bn.onclick = () => { state.pagina++; renderApp(); };

    // Modal / Drawer
    const btnAdd = document.getElementById('btnAddRecord');
    if (btnAdd) {
      btnAdd.onclick = () => {
        state.modoEdicion = false;
        state.form = { cod: '', desc: '', orig: '', tipo: 'texto', act: true };
        state.drawerAbierto = true;
        renderApp();
      };
    }

    const btnCD = document.getElementById('btnCloseDrawer');
    if (btnCD) btnCD.onclick = () => { state.drawerAbierto = false; renderApp(); };

    const btnCanD = document.getElementById('btnCancelDrawer');
    if (btnCanD) btnCanD.onclick = () => { state.drawerAbierto = false; renderApp(); };

    // Form Submit
    const form = document.getElementById('formParam');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const cod = document.getElementById('inputCod').value.trim().toUpperCase();
        const desc = document.getElementById('inputDesc').value.trim();
        const orig = document.getElementById('inputOrig').value.trim().toUpperCase() || 'DEF';
        const tipo = document.getElementById('selectFormTipo').value;

        if (state.modoEdicion) {
          const item = state.datos.find(d => d.cat === state.catalogoActivo && d.cod === cod);
          if (item) { item.desc = desc; item.orig = orig; item.tipo = tipo; }
        } else {
          state.datos.push({ cat: state.catalogoActivo, cod, desc, orig, tipo, act: true, vinc: false });
        }
        state.drawerAbierto = false;
        renderApp();
      };
    }

    // Editar y Borrar
    document.querySelectorAll('.btn-edit').forEach(b => {
      b.addEventListener('click', () => {
        const cod = b.getAttribute('data-cod');
        const item = state.datos.find(d => d.cat === state.catalogoActivo && d.cod === cod);
        if (item) {
          state.modoEdicion = true;
          state.form = { cod: item.cod, desc: item.desc, orig: item.orig, tipo: item.tipo, act: item.act };
          state.drawerAbierto = true;
          renderApp();
        }
      });
    });

    document.querySelectorAll('.btn-delete').forEach(b => {
      b.addEventListener('click', () => {
        const cod = b.getAttribute('data-cod');
        const item = state.datos.find(d => d.cat === state.catalogoActivo && d.cod === cod);
        if (item) {
          if (item.vinc) {
            alert('Acción bloqueada: El registro ' + cod + ' está vinculado en SARA6.');
            return;
          }
          if (confirm('¿Eliminar parámetro ' + cod + ' (' + item.desc + ')?')) {
            state.datos = state.datos.filter(d => !(d.cat === state.catalogoActivo && d.cod === cod));
            renderApp();
          }
        }
      });
    });

    // Export CSV (;)
    const btnExp = document.getElementById('btnExportCSV');
    if (btnExp) {
      btnExp.onclick = () => {
        const filtrados = state.datos.filter(d => d.cat === state.catalogoActivo);
        const csvRows = ['Codigo;Descripcion;Origen;Tipo Dato;Empresa;Estado SARA6'];
        filtrados.forEach(d => {
          csvRows.push([d.cod, '"' + d.desc + '"', d.orig, d.tipo, '01', d.vinc ? 'VINCULADO' : 'DISPONIBLE'].join(';'));
        });
        const blob = new Blob(['\uFEFF' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
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