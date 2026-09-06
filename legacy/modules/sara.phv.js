(function(SARA) {
  'use strict';
  if (!SARA) return;

  SARA.state.catalogoActivo = 'caracteristicas';
  SARA.state.busquedaPHV = '';
  SARA.state.filtroCatalogo = '';
  SARA.state.filtroTipoPHV = '';
  SARA.state.paginaPHV = 1;
  SARA.state.limitePHV = 10;
  SARA.state.drawerPHV = false;
  SARA.state.modoEdicionPHV = false;
  SARA.state.formPHV = { cod: '', desc: '', orig: '', tipo: 'texto', act: true };
  SARA.state.modalCatalogoAbierto = false;
  SARA.state.modoEdicionCatalogo = false;
  SARA.state.formCatalogo = { id: '', numero: 0, nombre: '', desc: '', tabla: '', tipo: 'texto' };

  SARA.state.catalogosPHV = [
    { id: 'caracteristicas', numero: 1, nombre: 'CaracterÃ­sticas', desc: 'Campos adicionales de persona o posiciÃ³n', tabla: 'CARACTERISTICA_CAR', tipo: 'texto' },
    { id: 'tipo_documento', numero: 2, nombre: 'Tipo de Documento', desc: 'CÃ©dula V/E, RIF (J), Pasaporte (P)', tabla: 'TIPODOCUMENTO_TID', tipo: 'texto' },
    { id: 'tematica', numero: 3, nombre: 'TemÃ¡tica', desc: 'AgrupaciÃ³n estructural y visualizaciÃ³n', tabla: 'TEMATICA_TEM', tipo: 'texto' },
    { id: 'estado_civil', numero: 4, nombre: 'Estado Civil', desc: 'Casado, concubinato, divorciado, soltero, viudo', tabla: 'ESTADOCIVIL_ESC', tipo: 'texto' },
    { id: 'tipo_relacion', numero: 5, nombre: 'Tipo de RelaciÃ³n', desc: 'Empleado, contratado, aspirante, pasante', tabla: 'TIPORELACION_TIR', tipo: 'texto' },
    { id: 'nivel_academico', numero: 6, nombre: 'Nivel AcadÃ©mico', desc: 'Grado de instrucciÃ³n (TSU, Univ, Posgrado)', tabla: 'NIVELACADEMICO_NAC', tipo: 'texto' },
    { id: 'area_profesion', numero: 7, nombre: 'Ãrea de ProfesiÃ³n', desc: 'Profesiones tituladas y oficios tÃ©cnicos', tabla: 'PROFESION_PRO', tipo: 'texto' },
    { id: 'idioma', numero: 8, nombre: 'Idioma', desc: 'EspaÃ±ol, inglÃ©s, francÃ©s, portuguÃ©s, italiano', tabla: 'IDIOMA_IDI', tipo: 'texto' },
    { id: 'caracteristicas_idioma', numero: 9, nombre: 'CaracterÃ­sticas de Idioma', desc: 'Lectura tÃ©cnica, conversaciÃ³n, redacciÃ³n', tabla: 'CARACTERISTICAIDIOMA_CID', tipo: 'texto' },
    { id: 'parentesco', numero: 10, nombre: 'Parentesco', desc: 'Padres, hijos, cÃ³nyuge, hermanos, tÃ­os', tabla: 'PARENTESCO_PAR', tipo: 'texto' },
    { id: 'area_experiencia', numero: 11, nombre: 'Ãrea de Experiencia', desc: 'Ãreas clÃ­nicas, quirÃºrgicas y administrativas', tabla: 'AREAEXPERIENCIA_AEX', tipo: 'texto' },
    { id: 'tipo_bien', numero: 12, nombre: 'Tipo Bien', desc: 'AutomÃ³vil, bus, camioneta, moto, bicicleta', tabla: 'TIPOBIEN_TIB', tipo: 'texto' },
    { id: 'tipo_inmueble', numero: 13, nombre: 'Tipo Inmueble', desc: 'Apartamento (A), casa (C), habitaciÃ³n (H), quinta (Q)', tabla: 'TIPOINMUEBLE_TII', tipo: 'texto' },
    { id: 'origen_hoja', numero: 14, nombre: 'Origen de Hoja / Canal', desc: 'Portal talento, recomendaciÃ³n interna, ferias', tabla: 'ORIGENHOJA_ORH', tipo: 'texto' }
  ];

  SARA.state.datosPHV = [
    { cat: 'caracteristicas', cod: 'LIC-01', desc: 'Licencia de Conducir 2do Grado', orig: 'TRANS', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a choferes' },
    { cat: 'caracteristicas', cod: 'SAN-O+', desc: 'Grupo SanguÃ­neo O Positivo', orig: 'SALUD', tipo: 'texto', act: true, vinc: true, mot: 'Vinculado a expedientes mÃ©dicos' },
    { cat: 'tipo_documento', cod: 'V', desc: 'CÃ©dula Venezolana', orig: 'IDENT', tipo: 'numero', act: true, vinc: true, mot: 'Clave principal SARA6' },
    { cat: 'tipo_documento', cod: 'E', desc: 'CÃ©dula Extranjera', orig: 'IDENT', tipo: 'numero', act: true, vinc: true, mot: 'Personal extranjero' },
    { cat: 'tipo_documento', cod: 'J', desc: 'Registro de InformaciÃ³n Fiscal (RIF)', orig: 'FISCAL', tipo: 'mixto', act: true, vinc: true },
    { cat: 'estado_civil', cod: 'S', desc: 'Soltero(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true },
    { cat: 'estado_civil', cod: 'C', desc: 'Casado(a)', orig: 'CIVIL', tipo: 'texto', act: true, vinc: true },
    { cat: 'nivel_academico', cod: 'UNI', desc: 'Universitario / Licenciatura / Ing.', orig: 'EDUC', tipo: 'texto', act: true, vinc: true },
    { cat: 'nivel_academico', cod: 'ESP', desc: 'EspecializaciÃ³n MÃ©dica / Postgrado', orig: 'POST', tipo: 'texto', act: true, vinc: true },
    { cat: 'area_profesion', cod: 'MED-CIR', desc: 'MÃ©dico Cirujano Especialista', orig: 'SALUD', tipo: 'texto', act: true, vinc: true },
    { cat: 'area_profesion', cod: 'ENF-LIC', desc: 'Licenciado(a) en EnfermerÃ­a', orig: 'SALUD', tipo: 'texto', act: true, vinc: true },
    { cat: 'area_profesion', cod: 'BIO-ANA', desc: 'Bioanalista ClÃ­nico', orig: 'SALUD', tipo: 'texto', act: true, vinc: true },
    { cat: 'idioma', cod: 'ES', desc: 'EspaÃ±ol (Nativo)', orig: 'LING', tipo: 'texto', act: true, vinc: true },
    { cat: 'idioma', cod: 'EN', desc: 'InglÃ©s (Avanzado)', orig: 'LING', tipo: 'texto', act: true, vinc: true },
    { cat: 'origen_hoja', cod: 'PORT-TAL', desc: 'Portal Talento Web GMSP', orig: 'DIGIT', tipo: 'texto', act: true, vinc: true },
    { cat: 'origen_hoja', cod: 'REC-INT', desc: 'RecomendaciÃ³n Interna (Referido)', orig: 'REFER', tipo: 'texto', act: true, vinc: true },
    { cat: 'origen_hoja', cod: 'LINK-JOB', desc: 'LinkedIn Jobs Network', orig: 'SOCIAL', tipo: 'texto', act: true, vinc: true }
  ];

  SARA.registrarModulo('phv', {
    seccion: 'MAESTROS',
    nombre: 'ParÃ¡metros Hoja de Vida',
    icono: 'âš™',
    tabla: 'PARAMETROHOJAVIDA_PHV',
    desc: '14 CatÃ¡logos maestros parametrizables multiempresa',

    render: function(state) {
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

      var html = '<header style="display:flex;justify-content:space-between;align-items:center;">';
      html += '<div><div style="display:flex;align-items:center;gap:8px;"><h1 style="font-size:18px;font-weight:700;">ParÃ¡metros Hoja de Vida</h1>';
      html += '<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;background:rgba(0,181,226,0.15);color:var(--k-cyan);">[PHV] MÃ³dulo Maestro</span></div>';
      html += '<div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">CentralizaciÃ³n Multiempresa â€¢ SARA6 SQL Server WITH (NOLOCK)</div></div>';
      html += '<div style="display:flex;gap:8px;align-items:center;">';
      html += '<button id="btnExportCSV" class="btn-soft">ðŸ“¥ Exportar CSV (;)</button>';
      html += '<button id="btnAddRecordPHV" class="btn-soft btn-primary">+ Adicionar Registro</button>';
      html += '</div></header>';

      html += '<div style="display:flex;flex:1;gap:14px;overflow:hidden;">';
      html += '<aside style="width:260px;min-width:240px;background:var(--bg-surface-soft);border-radius:14px;padding:12px;border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow-raised-sm);">';
      html += '<div style="display:flex;align-items:center;justify-content:space-between;"><div style="font-size:10.5px;font-weight:700;color:var(--text-soft);text-transform:uppercase;">CatÃ¡logos (' + state.catalogosPHV.length + ')</div><button id="btnNuevoCatalogo" class="btn-soft" style="padding:2px 6px;font-size:10px;">+ Nuevo</button></div>';
      html += '<input id="inputFiltroCat" type="text" class="search-box-soft" placeholder="ðŸ” Filtrar catÃ¡logos..." value="' + state.filtroCatalogo + '" />';
      html += '<div style="display:flex;flex-direction:column;gap:3px;overflow-y:auto;flex:1;">';
      for (var m = 0; m < state.catalogosPHV.length; m++) {
        var cItem = state.catalogosPHV[m];
        var isSel = (state.catalogoActivo === cItem.id);
        html += '<div class="tree-node cat-item ' + (isSel ? 'active' : '') + '" data-cat="' + cItem.id + '">';
        html += '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><strong style="font-size:10px;margin-right:4px;">' + cItem.numero + '.</strong>' + cItem.nombre + '</span>';
        html += '</div>';
      }
      html += '</div></aside>';

      html += '<div style="flex:1;display:flex;flex-direction:column;gap:12px;overflow:hidden;">';
      html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-surface-soft);border-radius:12px;border:1px solid var(--border-subtle);">';
      html += '<div style="display:flex;align-items:center;gap:10px;flex:1;"><input id="inputBusquedaPHV" type="text" class="search-box-soft" placeholder="ðŸ” Buscar cÃ³digo, descripciÃ³n o nomenclatura..." value="' + state.busquedaPHV + '" style="max-width:320px;" />';
      html += '<select id="selectTipoPHV" class="search-box-soft" style="width:auto;padding:7px 10px;"><option value="">Todos los tipos</option><option value="texto" ' + (state.filtroTipoPHV === 'texto' ? 'selected' : '') + '>Texto</option><option value="numero" ' + (state.filtroTipoPHV === 'numero' ? 'selected' : '') + '>NÃºmero</option></select></div>';
      html += '<div style="display:flex;align-items:center;gap:8px;"><button id="btnEditarCatalogoActivo" class="btn-soft" style="padding:4px 8px;font-size:11px;">âœï¸ Modificar CatÃ¡logo</button><div style="font-size:11.5px;color:var(--text-muted);">Total: <strong style="color:var(--text-main);">' + filtrados.length + '</strong></div></div>';
      html += '</div>';

      html += '<div class="table-card"><div style="flex:1;overflow-y:auto;"><table><thead><tr><th>CÃ³digo</th><th>DescripciÃ³n del ParÃ¡metro</th><th>Origen</th><th>Tipo Dato</th><th>Estado SARA6</th><th style="text-align:right;">Acciones</th></tr></thead><tbody>';
      for (var n = 0; n < paginados.length; n++) {
        var row = paginados[n];
        html += '<tr><td><span class="code-tag">' + row.cod + '</span></td><td style="font-weight:600;color:var(--text-main);">' + row.desc + '</td><td>' + row.orig + '</td><td style="text-transform:capitalize;">' + row.tipo + '</td>';
        html += '<td>' + (row.vinc ? '<span style="padding:3px 8px;border-radius:9999px;font-size:10px;font-weight:700;background:rgba(239,68,68,0.12);color:#EF4444;">ðŸ”’ Vinculado</span>' : '<span style="padding:3px 8px;border-radius:9999px;font-size:10px;font-weight:700;background:rgba(0,179,136,0.12);color:var(--k-green);">âœ“ Disponible</span>') + '</td>';
        html += '<td style="text-align:right;"><div style="display:inline-flex;gap:4px;"><button class="btn-soft btn-edit-phv" data-cod="' + row.cod + '" style="padding:3px 7px;font-size:11px;">âœï¸</button><button class="btn-soft btn-delete-phv" data-cod="' + row.cod + '" ' + (row.vinc ? 'disabled' : '') + ' style="padding:3px 7px;font-size:11px;' + (row.vinc ? 'opacity:0.4;' : 'color:#EF4444;') + '">ðŸ—‘ï¸</button></div></td></tr>';
      }
      html += '</tbody></table></div>';
      html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:var(--bg-surface-soft);border-top:1px solid var(--border-subtle);font-size:11.5px;color:var(--text-muted);"><div>PÃ¡gina <strong>' + state.paginaPHV + '</strong> de <strong>' + totalPaginas + '</strong></div><div style="display:flex;gap:6px;"><button id="btnPrevPagePHV" class="btn-soft" ' + (state.paginaPHV <= 1 ? 'disabled' : '') + '>â—€</button><button id="btnNextPagePHV" class="btn-soft" ' + (state.paginaPHV >= totalPaginas ? 'disabled' : '') + '>â–¶</button></div></div></div>';
      html += '</div></div>';

      // Drawers y Modales de PHV
      if (state.drawerPHV) {
        html += '<div id="drawerOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:50;display:flex;justify-content:flex-end;">';
        html += '<div style="width:420px;max-width:90vw;background:var(--bg-surface);height:100%;border-left:1px solid var(--border-subtle);display:flex;flex-direction:column;padding:22px;">';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;"><div><h3 style="font-size:16px;font-weight:700;">' + (state.modoEdicionPHV ? 'Editar ParÃ¡metro' : 'Adicionar Registro') + '</h3><div style="font-size:11px;color:var(--text-muted);">CatÃ¡logo: ' + catActual.nombre + '</div></div><button id="btnCloseDrawerPHV" style="background:transparent;border:none;font-size:20px;cursor:pointer;">âœ•</button></div>';
        html += '<form id="formParamPHV" style="display:flex;flex-direction:column;gap:14px;flex:1;">';
        html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">CÃ³digo *</label><input id="inputCodPHV" type="text" required ' + (state.modoEdicionPHV ? 'disabled' : '') + ' value="' + state.formPHV.cod + '" class="search-box-soft" style="text-transform:uppercase;" /></div>';
        html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">DescripciÃ³n *</label><input id="inputDescPHV" type="text" required value="' + state.formPHV.desc + '" class="search-box-soft" /></div>';
        html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Origen / Nomenclatura</label><input id="inputOrigPHV" type="text" value="' + state.formPHV.orig + '" class="search-box-soft" style="text-transform:uppercase;" /></div>';
        html += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted);">Tipo de Dato</label><select id="selectFormTipoPHV" class="search-box-soft"><option value="texto" ' + (state.formPHV.tipo === 'texto' ? 'selected' : '') + '>Texto</option><option value="numero" ' + (state.formPHV.tipo === 'numero' ? 'selected' : '') + '>NÃºmero</option></select></div>';
        html += '<div style="margin-top:auto;display:flex;gap:10px;"><button type="button" id="btnCancelDrawerPHV" class="btn-soft" style="flex:1;justify-content:center;">Cancelar</button><button type="submit" class="btn-soft btn-primary" style="flex:1;justify-content:center;">Guardar</button></div></form></div></div>';
      }

      if (state.modalCatalogoAbierto) {
        html += '<div id="modalCatOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:60;display:flex;align-items:center;justify-content:center;">';
        html += '<div style="width:460px;max-width:90vw;background:var(--bg-surface);border-radius:18px;border:1px solid var(--border-subtle);overflow:hidden;"><div style="padding:16px 20px;border-bottom:1px solid var(--border-subtle);display:flex;justify-content:space-between;"><h3>' + (state.modoEdicionCatalogo ? 'Modificar CatÃ¡logo' : 'Crear CatÃ¡logo') + '</h3><button id="btnCloseModalCat" style="background:transparent;border:none;font-size:18px;cursor:pointer;">âœ•</button></div>';
        html += '<form id="formCatalogoModal" style="padding:20px;display:flex;flex-direction:column;gap:12px;"><div><label style="font-size:11px;font-weight:700;">Nombre *</label><input id="inputCatNombre" type="text" required value="' + state.formCatalogo.nombre + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;">Identificador ID *</label><input id="inputCatID" type="text" required ' + (state.modoEdicionCatalogo ? 'disabled' : '') + ' value="' + state.formCatalogo.id + '" class="search-box-soft" /></div><div><label style="font-size:11px;font-weight:700;">Tabla SQL *</label><input id="inputCatTabla" type="text" required value="' + state.formCatalogo.tabla + '" class="search-box-soft" /></div>';
        html += '<div style="display:flex;gap:10px;margin-top:8px;"><button type="button" id="btnCancelModalCat" class="btn-soft" style="flex:1;justify-content:center;">Cancelar</button><button type="submit" class="btn-soft btn-primary" style="flex:1;justify-content:center;">Guardar CatÃ¡logo</button></div></form></div></div>';
      }

      return html;
    },

    attachEvents: function(state, SARA) {
      document.querySelectorAll('.cat-item').forEach(function(el) {
        el.onclick = function() { state.catalogoActivo = el.getAttribute('data-cat'); state.paginaPHV = 1; SARA.render(); };
      });
      var inBusPHV = document.getElementById('inputBusquedaPHV'); if (inBusPHV) inBusPHV.oninput = function(e) { state.busquedaPHV = e.target.value; state.paginaPHV = 1; SARA.render(); };
      var bpPHV = document.getElementById('btnPrevPagePHV'); if (bpPHV) bpPHV.onclick = function() { state.paginaPHV = Math.max(1, state.paginaPHV - 1); SARA.render(); };
      var bnPHV = document.getElementById('btnNextPagePHV'); if (bnPHV) bnPHV.onclick = function() { state.paginaPHV++; SARA.render(); };

      var btnAddPHV = document.getElementById('btnAddRecordPHV');
      if (btnAddPHV) btnAddPHV.onclick = function() { state.modoEdicionPHV = false; state.formPHV = { cod: '', desc: '', orig: '', tipo: 'texto', act: true }; state.drawerPHV = true; SARA.render(); };
      var btnCloseDPHV = document.getElementById('btnCloseDrawerPHV'); if (btnCloseDPHV) btnCloseDPHV.onclick = function() { state.drawerPHV = false; SARA.render(); };
      var btnCanDPHV = document.getElementById('btnCancelDrawerPHV'); if (btnCanDPHV) btnCanDPHV.onclick = function() { state.drawerPHV = false; SARA.render(); };

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
                state.datosPHV[x].desc = desc; state.datosPHV[x].orig = orig; state.datosPHV[x].tipo = tipo; break;
              }
            }
          } else {
            state.datosPHV.push({ cat: state.catalogoActivo, cod: cod, desc: desc, orig: orig, tipo: tipo, act: true, vinc: false });
          }
          state.drawerPHV = false;
          SARA.render();
        };
      }

      document.querySelectorAll('.btn-edit-phv').forEach(function(b) {
        b.onclick = function() {
          var cod = b.getAttribute('data-cod');
          for (var y = 0; y < state.datosPHV.length; y++) {
            if (state.datosPHV[y].cat === state.catalogoActivo && state.datosPHV[y].cod === cod) {
              state.modoEdicionPHV = true; state.formPHV = { cod: state.datosPHV[y].cod, desc: state.datosPHV[y].desc, orig: state.datosPHV[y].orig, tipo: state.datosPHV[y].tipo, act: state.datosPHV[y].act };
              state.drawerPHV = true; SARA.render(); break;
            }
          }
        };
      });

      document.querySelectorAll('.btn-delete-phv').forEach(function(b) {
        b.onclick = function() {
          var cod = b.getAttribute('data-cod');
          for (var z = 0; z < state.datosPHV.length; z++) {
            if (state.datosPHV[z].cat === state.catalogoActivo && state.datosPHV[z].cod === cod) {
              if (confirm('Â¿Eliminar ' + cod + '?')) { state.datosPHV.splice(z, 1); SARA.render(); }
              break;
            }
          }
        };
      });

      var btnExp = document.getElementById('btnExportCSV');
      if (btnExp) {
        btnExp.onclick = function() {
          var filtrados = [];
          for (var i = 0; i < state.datosPHV.length; i++) { if (state.datosPHV[i].cat === state.catalogoActivo) filtrados.push(state.datosPHV[i]); }
          var csvRows = ['Codigo;Descripcion;Origen;Tipo Dato;Estado SARA6'];
          for (var w = 0; w < filtrados.length; w++) { var d = filtrados[w]; csvRows.push([d.cod, '"' + d.desc + '"', d.orig, d.tipo, d.vinc ? 'VINCULADO' : 'DISPONIBLE'].join(';')); }
          var blob = new Blob(['\uFEFF' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a'); a.href = url; a.download = 'PHV_' + state.catalogoActivo + '.csv'; a.click();
        };
      }
    }
  });
})(window.SARA);