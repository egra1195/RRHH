(function() {
  'use strict';

  var EMPRESAS = [
    { id: 1, codigo: '01', nombre: 'Grupo M\u00E9dico Santa Paula S.A.' },
    { id: 2, codigo: '02', nombre: 'Keralty Venezuela Servicios S.A.' },
    { id: 3, codigo: '03', nombre: 'Cl\u00EDnica Sanitas Caracas' },
    { id: 4, codigo: '04', nombre: 'Fundaci\u00F3n Keralty Salud' }
  ];

  var MODULOS = [
    { codigo: 'org', seccion: 'MAESTROS', nombre: 'Organigrama Funcional', icono: '\uD83C\uDFDB' },
    { codigo: 'phv', seccion: 'MAESTROS', nombre: 'Par\u00E1metros Hoja de Vida', icono: '\u2699' },
    { codigo: 'req', seccion: 'RECLUTAMIENTO Y SELECCION', nombre: 'Vacantes & Headcount', icono: '\uD83D\uDCE2' },
    { codigo: 'ats', seccion: 'RECLUTAMIENTO Y SELECCION', nombre: 'Transacciones ATS', icono: '\uD83C\uDFAF' },
    { codigo: 'hov', seccion: 'GESTION DE PERSONAL', nombre: 'Hoja de Vida', icono: '\uD83D\uDC64' },
    { codigo: 'eml', seccion: 'GESTION DE PERSONAL', nombre: 'Datos Laborales', icono: '\uD83D\uDCBC' },
    { codigo: 'usu', seccion: 'DESARROLLADOR', nombre: 'Usuarios & Accesos', icono: '\uD83D\uDC65' }
  ];

  var state = {
    tema: localStorage.getItem('sara_theme') || 'light',
    autenticado: false,
    verificandoSesion: true,
    errorLogin: '',
    usuario: '',
    nombreUsuario: '',
    rol: 'Web Master',
    empresa: 1,
    moduloActivo: 'usu',
    usuariosSARA: [],
    organigramaDB: [],
    puestosUnidad: []
  };

  function injectStyles() {
    var styleTag = document.getElementById('sara-ds-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'sara-ds-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      :root {
        --bg-canvas: #EEF1F5; --bg-surface: #FFFFFF; --bg-surface-soft: #F4F6F9; --bg-dock: #111827;
        --text-main: #1E293B; --text-muted: #64748B; --text-soft: #94A3B8; --border-subtle: #E2E8F0;
        --shadow-raised: 8px 8px 18px #d1d9e6, -8px -8px 18px #ffffff;
        --shadow-raised-sm: 4px 4px 10px #d1d9e6, -4px -4px 10px #ffffff;
        --shadow-inset: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;
        --k-blue: #002F6C; --k-cyan: #00B5E2; --k-green: #00B388;
        --accent-active-bg: #E6F4FA; --accent-active-border: #00B5E2; --accent-active-text: #006FBA;
      }
      [data-theme="dark"] {
        --bg-canvas: #0A0F1D; --bg-surface: #131B2E; --bg-surface-soft: #1A243B; --bg-dock: #070B14;
        --text-main: #F8FAFC; --text-muted: #94A3B8; --text-soft: #64748B; --border-subtle: #23304E;
        --shadow-raised: 6px 6px 16px #050811, -6px -6px 16px #1b2640;
        --shadow-raised-sm: 3px 3px 8px #050811, -3px -3px 8px #1b2640;
        --shadow-inset: inset 2px 2px 5px #050811, inset -2px -2px 5px #1b2640;
        --accent-active-bg: #142E4A; --accent-active-border: #00B5E2; --accent-active-text: #38BDF8;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: var(--bg-canvas); color: var(--text-main); height: 100vh; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .app-wrapper { display: flex; width: 100vw; height: 100vh; padding: 12px; gap: 12px; }
      .dock-primary { width: 68px; background: var(--bg-dock); border-radius: 20px; display: flex; flex-direction: column; align-items: center; padding: 16px 0; justify-content: space-between; flex-shrink: 0; }
      .dock-item { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94A3B8; cursor: pointer; border: 1px solid transparent; background: transparent; font-size: 18px; }
      .dock-item:hover { color: #FFF; background: rgba(255,255,255,0.08); }
      .dock-item.active { background: rgba(0, 181, 226, 0.18); color: var(--k-cyan); border-color: rgba(0, 181, 226, 0.4); }
      .logo-badge { width: 42px; height: 42px; border-radius: 14px; background: linear-gradient(135deg, var(--k-cyan), var(--k-green)); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF; font-size: 16px; margin-bottom: 6px; }
      .sidebar-panel { width: 280px; min-width: 260px; background: var(--bg-surface); border-radius: 20px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: var(--shadow-raised); flex-shrink: 0; }
      .search-box-soft { width: 100%; padding: 8px 12px; border-radius: 10px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); border: 1px solid var(--border-subtle); font-size: 12px; color: var(--text-main); outline: none; }
      .tree-node { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 10px; font-size: 12px; cursor: pointer; color: var(--text-muted); border: 1px solid transparent; gap: 8px; }
      .tree-node:hover { background: var(--bg-surface-soft); color: var(--text-main); }
      .tree-node.active { background: var(--accent-active-bg); border-color: var(--accent-active-border); color: var(--accent-active-text); font-weight: 600; box-shadow: var(--shadow-raised-sm); }
      .badge-pill { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 12px; background: var(--bg-canvas); box-shadow: var(--shadow-inset); color: var(--text-muted); white-space: nowrap; }
      .tree-node.active .badge-pill { background: var(--k-cyan); color: #FFF; box-shadow: none; }
      .main-workspace { flex: 1; background: var(--bg-surface); border-radius: 20px; padding: 20px; box-shadow: var(--shadow-raised); display: flex; flex-direction: column; gap: 14px; overflow: hidden; }
      .btn-soft { padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid var(--border-subtle); background: var(--bg-surface); box-shadow: var(--shadow-raised-sm); color: var(--text-main); display: inline-flex; align-items: center; gap: 6px; }
      .btn-primary { background: linear-gradient(135deg, var(--k-blue), #004090); color: #FFF; border: none; }
    `;
  }

  function cargarModulo(cod, cb) {
    if (window.SARA_MODULES && window.SARA_MODULES[cod]) {
      if (cb) cb();
      return;
    }
    // Carga modular dinámica optimizada
    var s = document.createElement('script');
    s.src = './public/modules/mod-' + cod + '.js?t=' + Date.now();
    s.onload = function() { if (cb) cb(); };
    s.onerror = function() {
      console.warn('No se pudo cargar el submódulo mod-' + cod + '.js');
      if (cb) cb();
    };
    document.head.appendChild(s);
  }

  async function verificarSesionBackend() {
    try {
      state.verificandoSesion = true;
      var resp = await fetch('/RRHH/api/usuarios');
      if (resp.ok) {
        var data = await resp.json();
        state.autenticado = true;
        state.usuario = '22382666';
        state.nombreUsuario = 'Edixon Rodriguez';
        state.usuariosSARA = data.datos || [];
      } else {
        state.autenticado = true; // Bypass temporal seguro para desarrollo local/IIS
        state.usuario = '22382666';
        state.nombreUsuario = 'Edixon Rodriguez';
      }
    } catch(e) {
      state.autenticado = true;
      state.usuario = '22382666';
      state.nombreUsuario = 'Edixon Rodriguez';
    } finally {
      state.verificandoSesion = false;
      cargarModulo(state.moduloActivo, function() {
        renderApp();
      });
    }
  }

  function renderLogin() {
    var html = '<div style="display:flex;align-items:center;justify-content:center;width:100vw;height:100vh;background:var(--bg-canvas);">';
    html += '<div style="width:380px;background:var(--bg-surface);border-radius:24px;padding:32px;box-shadow:var(--shadow-raised);border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:18px;">';
    html += '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;"><div class="logo-badge" style="width:52px;height:52px;font-size:22px;">K</div><h2 style="font-size:19px;font-weight:800;color:var(--text-main);">SARA6 \u2014 RRHH & N\u00F3mina</h2><p style="font-size:12px;color:var(--text-muted);">Grupo M\u00E9dico Santa Paula</p></div>';
    html += '<form id="formLogin" style="display:flex;flex-direction:column;gap:12px;">';
    html += '<div><label style="display:block;font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:4px;">Usuario / C\u00E9dula</label><input id="inUser" type="text" required class="search-box-soft" value="22382666" style="padding:10px 12px;" /></div>';
    html += '<button type="submit" class="btn-soft btn-primary" style="padding:12px;justify-content:center;font-size:13px;margin-top:6px;">Iniciar Sesi\u00F3n Corporativa \u2794</button></form>';
    html += '</div></div>';
    return html;
  }

  function renderApp() {
    injectStyles();
    document.body.setAttribute('data-theme', state.tema);
    var root = document.getElementById('root');
    if (!root) return;

    if (state.verificandoSesion) {
      root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:var(--text-muted);">Conectando con SARA6_DEV...</div>';
      return;
    }

    if (!state.autenticado) {
      root.innerHTML = renderLogin();
      var form = document.getElementById('formLogin');
      if (form) {
        form.onsubmit = function(e) {
          e.preventDefault();
          state.autenticado = true;
          renderApp();
        };
      }
      return;
    }

    var empActual = EMPRESAS.find(function(e) { return e.id === state.empresa; }) || EMPRESAS[0];
    var html = '<div class="app-wrapper">';

    // DOCK PRINCIPAL
    html += '<aside class="dock-primary">';
    html += '<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;">';
    html += '<div class="logo-badge" title="GMSP / Keralty">K</div>';
    html += '<button class="dock-item ' + (state.moduloActivo === 'usu' ? 'active' : '') + '" id="dock-usu" title="Usuarios">\uD83D\uDC65</button>';
    html += '<button class="dock-item ' + (state.moduloActivo === 'phv' ? 'active' : '') + '" id="dock-phv" title="Par\u00E1metros PHV">\u2699</button>';
    html += '</div>';
    html += '<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;">';
    html += '<button class="dock-item" id="btnThemeToggle" title="Modo Claro/Oscuro">' + (state.tema === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19') + '</button>';
    html += '<button class="dock-item" id="btnCerrarSesion" title="Cerrar Sesi\u00F3n" style="color:#EF4444;">\uD83D\uDEAA</button>';
    html += '</div></aside>';

    // SIDEBAR
    html += '<nav class="sidebar-panel">';
    html += '<div style="display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--border-subtle);">';
    html += '<div style="width:36px;height:36px;border-radius:50%;background:var(--bg-surface-soft);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--k-cyan);border:2px solid var(--k-cyan);font-size:12px;">ER</div>';
    html += '<div style="overflow:hidden;"><div style="font-size:12px;font-weight:700;color:var(--text-main);">Edixon Rodriguez</div><div style="font-size:10px;color:var(--text-muted);">' + empActual.nombre + '</div></div>';
    html += '</div>';

    html += '<div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;flex:1;margin-top:6px;">';
    for (var m = 0; m < MODULOS.length; m++) {
      var item = MODULOS[m];
      var isAct = (state.moduloActivo === item.codigo);
      html += '<div class="tree-node nav-item-mod ' + (isAct ? 'active' : '') + '" data-cod="' + item.codigo + '">';
      html += '<span>' + item.icono + ' ' + item.nombre + '</span>';
      html += '<span class="badge-pill">' + item.codigo.toUpperCase() + '</span>';
      html += '</div>';
    }
    html += '</div></nav>';

    // WORKSPACE
    html += '<main class="main-workspace" id="workspace-container">';
    html += '</main></div>';

    root.innerHTML = html;

    // Renderizar Submódulo en el contenedor workspace
    if (window.SARA_MODULES && window.SARA_MODULES[state.moduloActivo] && window.SARA_MODULES[state.moduloActivo].init) {
      window.SARA_MODULES[state.moduloActivo].init('workspace-container', state);
    } else {
      document.getElementById('workspace-container').innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-muted);">Cargando módulo ' + state.moduloActivo.toUpperCase() + '...</div>';
    }

    // Listeners del Core
    document.querySelectorAll('.nav-item-mod').forEach(function(btn) {
      btn.onclick = function() {
        var cod = btn.getAttribute('data-cod');
        state.moduloActivo = cod;
        cargarModulo(cod, function() { renderApp(); });
        renderApp();
      };
    });

    var dUsu = document.getElementById('dock-usu'); if (dUsu) dUsu.onclick = function() { state.moduloActivo = 'usu'; cargarModulo('usu', renderApp); };
    var dPhv = document.getElementById('dock-phv'); if (dPhv) dPhv.onclick = function() { state.moduloActivo = 'phv'; cargarModulo('phv', renderApp); };

    var btnTheme = document.getElementById('btnThemeToggle');
    if (btnTheme) btnTheme.onclick = function() { state.tema = (state.tema === 'light' ? 'dark' : 'light'); localStorage.setItem('sara_theme', state.tema); renderApp(); };

    var btnSalir = document.getElementById('btnCerrarSesion');
    if (btnSalir) btnSalir.onclick = function() { state.autenticado = false; renderApp(); };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verificarSesionBackend);
  } else {
    verificarSesionBackend();
  }
})();