// MÓDULO PHV MODULAR (Capa 3) - Conectado a /api/phv/...
(function () {
  let phvState = {
    catalogos: [],
    catalogoActivo: 'caracteristicas',
    parametros: [],
    busqueda: '',
    filtroTipo: '',
    cargando: false
  };

  async function initPHV(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div style="display: flex; height: 100%; gap: 14px;">
        <!-- Árbol de Catálogos Lateral -->
        <aside style="width: 280px; background: var(--surface-dark, #131b2e); border: 1px solid var(--border-color, #1e293b); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted, #94a3b8); text-transform: uppercase;">Catálogos Maestros (PHV)</div>
          <input id="phvSearchCat" type="text" placeholder="🔍 Filtrar catálogos..." style="width: 100%; padding: 8px; border-radius: 6px; background: #0b0f19; border: 1px solid var(--border-color); color: #fff; font-size: 0.8125rem;" />
          <div id="phvCatalogosList" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 3px;">
            <div style="color: var(--text-muted); text-align: center; padding: 20px;">Cargando catálogos...</div>
          </div>
        </aside>

        <!-- Workspace Principal de Parámetros -->
        <main style="flex: 1; display: flex; flex-direction: column; gap: 12px; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--surface-dark); padding: 14px 20px; border-radius: 12px; border: 1px solid var(--border-color);">
            <div>
              <h2 id="phvCatTitulo" style="font-size: 1.25rem; font-weight: 600;">Parámetros Hoja de Vida</h2>
              <p id="phvCatDesc" style="font-size: 0.8125rem; color: var(--text-muted);">Seleccione un catálogo de la lista lateral.</p>
            </div>
            <button class="btn" onclick="alert('Funcionalidad de adición modular en desarrollo')">+ Adicionar Registro</button>
          </div>

          <div style="background: var(--surface-dark); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; flex: 1; display: flex; flex-direction: column;">
            <div style="padding: 12px 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 10px;">
              <input id="phvSearchParam" type="text" placeholder="🔍 Buscar código o descripción..." style="padding: 6px 12px; border-radius: 6px; background: #0b0f19; border: 1px solid var(--border-color); color: #fff; font-size: 0.8125rem; width: 300px;" />
            </div>
            <div style="flex: 1; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
                <thead>
                  <tr style="background: rgba(30,41,59,0.5); border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 10px 16px; color: var(--text-muted);">Código</th>
                    <th style="padding: 10px 16px; color: var(--text-muted);">Descripción Oficial</th>
                    <th style="padding: 10px 16px; color: var(--text-muted);">Origen</th>
                    <th style="padding: 10px 16px; color: var(--text-muted);">Tipo</th>
                    <th style="padding: 10px 16px; color: var(--text-muted);">Estado SARA6</th>
                  </tr>
                </thead>
                <tbody id="phvParamsBody">
                  <tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--text-muted);">Seleccione un catálogo.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    `;

    await cargarCatalogos();
    attachPhvEvents();
  }

  async function cargarCatalogos() {
    try {
      const res = await fetch('/RRHH/api/phv/catalogos');
      const data = await res.json();
      if (data.ok) {
        phvState.catalogos = data.catalogos;
        renderCatalogosList();
        if (phvState.catalogos.length > 0) {
          seleccionarCatalogo(phvState.catalogos[0].id);
        }
      }
    } catch (err) {
      console.error('Error cargando catálogos PHV:', err);
    }
  }

  function renderCatalogosList() {
    const listEl = document.getElementById('phvCatalogosList');
    if (!listEl) return;

    const filtro = document.getElementById('phvSearchCat')?.value.toLowerCase() || '';
    const filtrados = phvState.catalogos.filter(c => c.nombre.toLowerCase().includes(filtro) || c.descripcion.toLowerCase().includes(filtro));

    listEl.innerHTML = filtrados.map(c => `
      <div class="phv-cat-item ${phvState.catalogoActivo === c.id ? 'active' : ''}" data-id="${c.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8125rem; transition: background 0.15s; ${phvState.catalogoActivo === c.id ? 'background: rgba(56,189,248,0.15); color: #38bdf8; font-weight: 600;' : 'color: #94a3b8;'}">
        <span>${c.numero}. ${c.nombre}</span>
        <span style="font-size: 0.75rem; background: #0b0f19; padding: 2px 6px; border-radius: 9999px;">${c.total}</span>
      </div>
    `).join('');

    document.querySelectorAll('.phv-cat-item').forEach(el => {
      el.onclick = () => seleccionarCatalogo(el.getAttribute('data-id'));
    });
  }

  async function seleccionarCatalogo(catId) {
    phvState.catalogoActivo = catId;
    renderCatalogosList();

    const cat = phvState.catalogos.find(c => c.id === catId);
    if (cat) {
      document.getElementById('phvCatTitulo').textContent = `${cat.numero}. ${cat.nombre}`;
      document.getElementById('phvCatDesc').textContent = `${cat.descripcion} • Tabla SQL: ${cat.tabla_origen}`;
    }

    try {
      const res = await fetch(`/RRHH/api/phv/parametros/${catId}`);
      const data = await res.json();
      if (data.ok) {
        phvState.parametros = data.datos;
        renderParametros();
      }
    } catch (err) {
      console.error('Error cargando parámetros:', err);
    }
  }

  function renderParametros() {
    const tbody = document.getElementById('phvParamsBody');
    if (!tbody) return;

    const filtro = document.getElementById('phvSearchParam')?.value.toLowerCase() || '';
    const filtrados = phvState.parametros.filter(p => p.codigo.toLowerCase().includes(filtro) || p.descripcion.toLowerCase().includes(filtro));

    if (filtrados.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--text-muted);">No hay registros en este catálogo.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtrados.map(p => `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 10px 16px; font-family: monospace; font-weight: 600; color: #38bdf8;">${p.codigo}</td>
        <td style="padding: 10px 16px; font-weight: 500;">${p.descripcion}</td>
        <td style="padding: 10px 16px; color: var(--text-muted);">${p.origen}</td>
        <td style="padding: 10px 16px; text-transform: capitalize; color: var(--text-muted);">${p.tipo_dato}</td>
        <td style="padding: 10px 16px;">
          ${p.vinculado ? `
            <span title="${p.motivo_bloqueo || 'Vinculado'}" style="background: rgba(239,68,68,0.15); color: #ef4444; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">🔒 Vinculado</span>
          ` : `
            <span style="background: rgba(16,185,129,0.15); color: #10b981; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">✓ Disponible</span>
          `}
        </td>
      </tr>
    `).join('');
  }

  function attachPhvEvents() {
    document.getElementById('phvSearchCat')?.addEventListener('input', renderCatalogosList);
    document.getElementById('phvSearchParam')?.addEventListener('input', renderParametros);
  }

  window.SARA_MODULES = window.SARA_MODULES || {};
  window.SARA_MODULES['phv'] = { init: initPHV };
  window.SARA_MOD_PHV = window.SARA_MODULES['phv'];
})();
