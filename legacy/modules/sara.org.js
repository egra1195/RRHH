(function(SARA) {
  'use strict';
  if (!SARA) return;

  SARA.state.orgFiltroGerencia = 'TODAS';
  SARA.state.orgBusqueda = '';
  SARA.state.orgNodoSeleccionado = null;
  SARA.state.orgModalDobleCheck = false;
  SARA.state.orgModalMover = false;

  SARA.state.organigramaDB = [
    { id: '1', cargo: 'GERENTE GENERAL', gerencia: 'GERENCIA GENERAL', unidad: '0000 GERENCIA GENERAL', nivel: 1, dep: '0', ci: '12962334', nombre: 'LEOPOLDO QUINTERO STOLK', ciSupervisor: '9971632', supervisor: 'ANDRES CAPRILES', coSupervisores: [] },
    { id: '101', cargo: 'ASISTENTE ADMINISTRATIVO', gerencia: 'GERENCIA GENERAL', unidad: '0000 GERENCIA GENERAL', nivel: 1, dep: '1', ci: '26383707', nombre: 'HILARY MICHELL CLAVIJO DURAN', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '12', cargo: 'GERENTE DE VENTAS', gerencia: 'GERENCIA DE VENTAS', unidad: '0050 GERENCIA DE VENTAS', nivel: 1, dep: '1', ci: '3760234', nombre: 'OSWALDO NEMESIO ALVIAREZ RIVAS', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '13', cargo: 'DIRECTOR (A) COMERCIAL', gerencia: 'DIRECCION COMERCIAL', unidad: '0060 DIRECCION COMERCIAL', nivel: 1, dep: '1', ci: '16124707', nombre: 'ARTURO RICARDO GONZALEZ BETANCOURT', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '15', cargo: 'GERENTE DE FINANZAS', gerencia: 'GERENCIA DE FINANZAS', unidad: '0090 GERENCIA DE FINANZAS', nivel: 1, dep: '1', ci: '13308874', nombre: 'ALVARO JOSE RANGEL LINARES', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '16', cargo: 'GERENTE DE TALENTO HUMANO', gerencia: 'GERENCIA DE TALENTO HUMANO', unidad: '0180 GERENCIA DE TALENTO HUMANO', nivel: 1, dep: '1', ci: '14890691', nombre: 'ALEJANDRO JOSE PAREDES ALFARO', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '17', cargo: 'DIRECTOR (A) DE OPERACIONES', gerencia: 'DIRECCION DE OPERACIONES', unidad: '0200 DIRECCION DE OPERACIONES', nivel: 1, dep: '1', ci: '13889025', nombre: 'MARIA SUSANA CASTILLO MARQUEZ', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '18', cargo: 'DIRECTOR (A) MEDICO', gerencia: 'DIRECCION MEDICA', unidad: '0010 DIRECCION MEDICA', nivel: 1, dep: '1', ci: '6892541', nombre: 'CARMEN ALICIA RIVAS CASTILLO', ciSupervisor: '12962334', supervisor: 'LEOPOLDO QUINTERO STOLK', coSupervisores: [] },
    { id: '1571101', cargo: 'ANALISTA INTEGRAL DE CAJA', gerencia: 'GERENCIA DE FINANZAS', unidad: '0150 JEFATURA DE CAJA', nivel: 1, dep: '15711-15712', ci: '22019482', nombre: 'ROSELYN YSBELIA CORRO NAVAS', ciSupervisor: '24697022 / 19562673', supervisor: 'ALEJANDRA MARINA ESPINOZA NAVARRO', coSupervisores: ['YENNIFER ANDREINA DIAZ RAMIREZ'] },
    { id: '17531801', cargo: 'ANFITRION (A) DE CALIDAD DE SERVICIOS', gerencia: 'DIRECCION DE OPERACIONES', unidad: '0230 ATENCION AL PACIENTE', nivel: 1, dep: '175311-175312', ci: '25901842', nombre: 'DANIEL EDUARDO GOMEZ PEREZ', ciSupervisor: '20192831 / 18490128', supervisor: 'NAIRELYS ADRIANA RAMOS RAMOS', coSupervisores: ['YUDITH ABIGUEY MURO MOROCOIMA'] }
  ];

  SARA.state.historialMovimientosORG = [];
  SARA.state.solicitudesHeadcount = [];

  SARA.registrarModulo('org', {
    seccion: 'MAESTROS',
    nombre: 'Organigrama Funcional',
    icono: 'ðŸ›',
    tabla: 'UNIDAD_UNI',
    desc: 'Estructura organizacional, dependencias, co-jefaturas y headcount activo',

    render: function(state) {
      var gerencias = [
        { id: 'TODAS', label: 'Todas las Direcciones (552 HC)' },
        { id: 'GERENCIA GENERAL', label: '0000 Gerencia General (2 HC)' },
        { id: 'DIRECCION MEDICA', label: '0010 DirecciÃ³n MÃ©dica (246 HC)' },
        { id: 'DIRECCION DE OPERACIONES', label: '0200 DirecciÃ³n de Operaciones (211 HC)' },
        { id: 'GERENCIA DE FINANZAS', label: '0090 Gerencia de Finanzas (45 HC)' },
        { id: 'GERENCIA DE TALENTO HUMANO', label: '0180 Gerencia de Talento Humano (21 HC)' }
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
      html += '<div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">ðŸ› Organigrama Funcional & Headcount</h1><span class="badge-pill">[ORG]</span></div></div>';
      html += '<div style="display:flex;gap:8px;"><button id="btnExportarExcelORG" class="btn-soft">ðŸ“¥ Exportar (.xlsx)</button><button id="btnAperturarHeadcount" class="btn-soft btn-primary">+ Solicitar Headcount</button></div></header>';

      html += '<div style="display:flex;gap:12px;align-items:center;background:var(--bg-surface-soft);padding:10px 14px;border-radius:12px;border:1px solid var(--border-subtle);margin-top:10px;">';
      html += '<input id="inSearchORG" type="text" class="search-box-soft" placeholder="ðŸ” Buscar colaborador o cargo..." value="' + state.orgBusqueda + '" style="max-width:280px;" />';
      html += '<select id="selGerenciaORG" class="search-box-soft" style="width:auto;font-weight:600;">';
      for (var g = 0; g < gerencias.length; g++) {
        html += '<option value="' + gerencias[g].id + '" ' + (gerencias[g].id === state.orgFiltroGerencia ? 'selected' : '') + '>' + gerencias[g].label + '</option>';
      }
      html += '</select></div>';

      html += '<div style="display:flex;flex:1;gap:14px;overflow:hidden;margin-top:10px;"><aside style="width:340px;background:var(--bg-surface-soft);border-radius:14px;padding:12px;border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:8px;overflow-y:auto;">';
      for (var k = 0; k < nodosFiltrados.length; k++) {
        var n = nodosFiltrados[k];
        html += '<div class="tree-node org-node-select ' + (state.orgNodoSeleccionado && state.orgNodoSeleccionado.id === n.id ? 'active' : '') + '" data-id="' + n.id + '">';
        html += '<div style="overflow:hidden;flex:1;"><div style="font-weight:700;">' + n.nombre + '</div><div style="font-size:10px;color:var(--text-muted);">' + n.cargo + '</div></div>';
        if (n.coSupervisores && n.coSupervisores.length > 0) html += '<span class="badge-pill" style="color:var(--k-cyan);">2 Jefes</span>';
        html += '</div>';
      }
      html += '</aside><div style="flex:1;display:flex;flex-direction:column;gap:12px;overflow:hidden;">';
      var nodoActivo = state.orgNodoSeleccionado || nodosFiltrados[0];
      if (nodoActivo) {
        html += '<div class="table-card" style="padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:16px;"><div style="display:flex;align-items:center;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--border-subtle);"><div class="pill-avatar">' + nodoActivo.nombre.charAt(0) + '</div><div><h2 style="font-size:17px;font-weight:700;">' + nodoActivo.nombre + '</h2><div style="font-size:12.5px;color:var(--k-blue);font-weight:600;">' + nodoActivo.cargo + '</div><div style="font-size:11px;color:var(--text-muted);">' + nodoActivo.unidad + '</div></div></div>';
        html += '<div style="background:var(--bg-surface-soft);padding:12px;border-radius:12px;"><strong>Supervisor Inmediato:</strong> ' + nodoActivo.supervisor + '</div></div>';
      }
      html += '</div></div>';
      return html;
    },

    attachEvents: function(state, SARA) {
      var inSOrg = document.getElementById('inSearchORG'); if (inSOrg) inSOrg.oninput = function(e) { state.orgBusqueda = e.target.value; SARA.render(); };
      var selGOrg = document.getElementById('selGerenciaORG'); if (selGOrg) selGOrg.onchange = function(e) { state.orgFiltroGerencia = e.target.value; SARA.render(); };
      document.querySelectorAll('.org-node-select').forEach(function(item) {
        item.onclick = function() {
          var id = item.getAttribute('data-id');
          for (var i = 0; i < state.organigramaDB.length; i++) {
            if (state.organigramaDB[i].id === id) { state.orgNodoSeleccionado = state.organigramaDB[i]; SARA.render(); break; }
          }
        };
      });
    }
  });
})(window.SARA);