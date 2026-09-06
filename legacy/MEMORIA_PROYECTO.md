# MEMORIA Y ESTADO DEL PROYECTO GMSP - RRHH Y N├ôMINA

## 1. CONTEXTO T├ëCNICO Y REGLAS CLAVE
- Stack: Node.js 20+, Express, React 19, TypeScript, esbuild, SQL Server 2019 (SARA6).
- Despliegue IIS: \\10.16.194.224\c$\inetpub\wwwroot\RRHH\
- Prohibici├│n expl├¡cita de usar PHP.
- Reglas de BD: Claves compuestas (empresa/unidad), 'NOLOCK' para lecturas, decimales en DECIMAL(38,20), or├¡genes 'U', 'V', 'W' en NOMINA_NOM.
- Convenci├│n de 5/6 archivos por m├│dulo (repositorio.ts, rutas.ts, Pagina.tsx, api.ts, App.tsx, modulos.ts).

## 2. ESTATUS ACTUAL DEL PROYECTO
- Fase 1 (Migraci├│n DB): 100% Completada.
- Fase 2 (M├│dulos Web): 15 de 27 m├│dulos activos y funcionales.
- Acceso con usuario real de pruebas: HABILITADO.
- Entorno de desarrollo: Verificado.

## 3. PR├ôXIMO PASO PENDIENTE (AL INICIAR PR├ôXIMA SESI├ôN)
1. Ejecutar 'npm run typecheck' y 'npm run verificar'.
2. Esperar la entrega de la Ficha T├®cnica (.md) de IdeaShell y la captura de pantalla de la Prioridad [P1]: M├│dulo [vno] (Novedad Vacaciones - Captura 19) suministrada por Edixon Rodriguez.
3. Desarrollar en lote (batch) los archivos del m├│dulo [vno] siguiendo las reglas de la arquitectura.

## 4. HOJA DE RUTA ESTRAT├ëGICA (FUTURO)
- Fase 1: Homologaci├│n completa + Pasivos laborales + Carga TXT masiva + Multi-empresa + Multimoneda (USD/Tasa BCV) + Motor de c├ílculos con aprobaci├│n (Maker-Checker) y Audit Log inmutable + TXT bancarios cifrados.
- Fase 2: Captaci├│n, Reclutamiento, Contratos y Adendums.
- Fase 3: Portal Autoservicio (Empleado/Supervisor/Gerente), Evaluaciones de Desempe├▒o integradas e Integraci├│n Google Workspace / Webhooks.
- Fase 4: Redise├▒o UX/UI Responsivo.

---
Instrucci├│n de mantenimiento: Al finalizar cualquier tarea o m├│dulo en futuras sesiones, Antigravity deber├í actualizar la secci├│n 2 y 3 de este archivo.