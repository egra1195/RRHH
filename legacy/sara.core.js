(function() {
  'use strict';

  window.SARA = {
    version: '7.0.0',
    modulos: {},
    ordenModulos: [],
    state: {
      tema: localStorage.getItem('sara_theme') || 'light',
      usuario: 'edixon.rodriguez',
      nombreUsuario: 'Edixon RodrÃ­guez',
      rol: 'Coordinador de Reclutamiento & NÃ³mina',
      empresa: '01 - Grupo MÃ©dico Santa Paula S.A.',
      moduloActivo: 'org',
      busquedaModulo: '',
      datosGenerales: { eml: [], pco: [], car: [], org: [], pla: [], put: [], cem: [], che: [], lic: [], inc: [], vac: [], vaf: [], bqn: [], rec: [] }
    },

    registrarModulo: function(codigo, config) {
      this.modulos[codigo.toLowerCase()] = config;
      if (this.ordenModulos.indexOf(codigo.toLowerCase()) === -1) {
        this.ordenModulos.push(codigo.toLowerCase());
      }
    },

    cambiarModulo: function(codigo) {
      var cod = codigo.toLowerCase();
      if (this.modulos[cod]) {
        this.state.moduloActivo = cod;
        this.render();
      }
    },

    injectStyles: function() {
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
    },

    render: function() {
      this.injectStyles();
      document.body.setAttribute('data-theme', this.state.tema);

      var root = document.getElementById('root');
      if (!root) return;

      var modActivoCod = this.state.moduloActivo.toLowerCase();
      var modActivo = this.modulos[modActivoCod] || this.modulos['phv'] || this.modulos['org'];

      var html = '<div class="app-wrapper">';

      // DOCK
      html += '<aside class="dock-primary">';
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;">';
      html += '<div class="logo-badge" title="GMSP / Keralty">K</div>';
      html += '<button class="dock-item ' + (modActivoCod === 'phv' ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'phv\')" title="[PHV] ParÃ¡metros">âš™</button>';
      html += '<button class="dock-item ' + (modActivoCod === 'org' ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'org\')" title="[ORG] Organigrama">ðŸ›</button>';
      html += '<button class="dock-item ' + (modActivoCod === 'req' ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'req\')" title="[REQ] Vacantes">ðŸ“£</button>';
      html += '<button class="dock-item ' + (modActivoCod === 'ats' ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'ats\')" title="[ATS] Transacciones">ðŸŽ¯</button>';
      html += '<button class="dock-item ' + (modActivoCod === 'hov' ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'hov\')" title="[HOV] Hoja de Vida">ðŸ‘¤</button>';
      html += '<button class="dock-item ' + (modActivoCod === 'eml' ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'eml\')" title="[EML] Datos Laborales">ðŸ’¼</button>';
      html += '</div>';
      html += '<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;">';
      html += '<button class="dock-item" id="btnThemeToggle" title="Modo Claro/Oscuro">' + (this.state.tema === 'dark' ? 'â˜€ï¸' : 'ðŸŒ™') + '</button>';
      html += '</div></aside>';

      // SIDEBAR
      html += '<nav class="sidebar-panel">';
      html += '<div style="display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--border-subtle);">';
      html += '<div style="width:36px;height:36px;border-radius:50%;background:var(--bg-surface-soft);box-shadow:var(--shadow-raised-sm);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--k-cyan);border:2px solid var(--k-cyan);font-size:12px;">ER</div>';
      html += '<div style="overflow:hidden;"><div style="font-size:12.5px;font-weight:700;color:var(--text-main);">' + this.state.nombreUsuario + '</div>';
      html += '<div style="font-size:10.5px;color:var(--text-muted);">' + this.state.rol + '</div></div>';
      html += '</div>';

      html += '<input id="quickJump" type="text" class="search-box-soft" placeholder="Ir a: PHV, ORG, HOV..." maxlength="4" style="text-transform:uppercase;font-family:monospace;font-weight:700;" />';
      html += '<div style="font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-soft);margin-top:2px;">MÃ³dulos del Sistema</div>';
      html += '<div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;flex:1;">';

      var seccionActual = '';
      for (var i = 0; i < this.ordenModulos.length; i++) {
        var cod = this.ordenModulos[i];
        var m = this.modulos[cod];
        if (m.seccion !== seccionActual) {
          seccionActual = m.seccion;
          html += '<div class="tree-node" style="font-weight:700;color:var(--text-main);margin-top:6px;cursor:default;"><span>ðŸ“ ' + seccionActual + '</span></div>';
        }
        var isActivo = (modActivoCod === cod);
        html += '<div class="tree-node nav-mod-item ' + (isActivo ? 'active' : '') + '" onclick="SARA.cambiarModulo(\'' + cod + '\')" style="margin-left:8px;">';
        html += '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + m.icono + ' ' + m.nombre + '</span>';
        html += '<span class="badge-pill">' + cod.toUpperCase() + '</span>';
        html += '</div>';
      }
      html += '</div></nav>';

      // WORKSPACE
      html += '<main class="main-workspace">';
      if (modActivo && typeof modActivo.render === 'function') {
        html += modActivo.render(this.state);
      } else {
        html += '<div style="padding:40px;text-align:center;color:var(--text-muted);">MÃ³dulo no cargado.</div>';
      }
      html += '</main></div>';

      root.innerHTML = html;
      this.attachCoreEvents();
      if (modActivo && typeof modActivo.attachEvents === 'function') {
        modActivo.attachEvents(this.state, this);
      }
    },

    attachCoreEvents: function() {
      var self = this;
      var btnTheme = document.getElementById('btnThemeToggle');
      if (btnTheme) {
        btnTheme.onclick = function() {
          self.state.tema = (self.state.tema === 'light' ? 'dark' : 'light');
          localStorage.setItem('sara_theme', self.state.tema);
          self.render();
        };
      }
      var qj = document.getElementById('quickJump');
      if (qj) {
        qj.onkeydown = function(e) {
          if (e.key === 'Enter') {
            var val = qj.value.trim().toLowerCase();
            if (self.modulos[val]) {
              self.cambiarModulo(val);
            } else {
              alert('MÃ³dulo [' + val.toUpperCase() + '] no encontrado.');
            }
          }
        };
      }
    },

    iniciar: function() {
      this.render();
    }
  };
})();