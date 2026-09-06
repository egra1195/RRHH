# MEMORIA Y ESTADO DEL PROYECTO GMSP - RRHH Y NÓMINA

## 1. CONTEXTO TÉCNICO Y REGLAS CLAVE
- Stack: Node.js 20+, Express, React 19, TypeScript, esbuild, SQL Server 2019 (SARA6).
- Despliegue IIS: \\10.16.194.224\c$\inetpub\wwwroot\RRHH\
- Prohibición explícita de usar PHP.
- Reglas de BD: Claves compuestas (empresa/unidad), 'NOLOCK' para lecturas, decimales en DECIMAL(38,20), orígenes 'U', 'V', 'W' en NOMINA_NOM.
- Convención de 5/6 archivos por módulo (repositorio.ts, rutas.ts, Pagina.tsx, api.ts, App.tsx, modulos.ts).

## 2. ESTATUS ACTUAL DEL PROYECTO
- Fase 1 (Migración DB): 100% Completada.
- Fase 2 (Módulos Web): 15 de 27 módulos activos y funcionales.
- Acceso con usuario real de pruebas: HABILITADO.
- Entorno de desarrollo: Verificado.

## 3. PRÓXIMO PASO PENDIENTE (AL INICIAR PRÓXIMA SESIÓN)
1. Ejecutar 'npm run typecheck' y 'npm run verificar'.
2. Esperar la entrega de la Ficha Técnica (.md) de IdeaShell y la captura de pantalla de la Prioridad [P1]: Módulo [vno] (Novedad Vacaciones - Captura 19) suministrada por Edixon Rodriguez.
3. Desarrollar en lote (batch) los archivos del módulo [vno] siguiendo las reglas de la arquitectura.

## 4. HOJA DE RUTA ESTRATÉGICA (FUTURO)
- Fase 1: Homologación completa + Pasivos laborales + Carga TXT masiva + Multi-empresa + Multimoneda (USD/Tasa BCV) + Motor de cálculos con aprobación (Maker-Checker) y Audit Log inmutable + TXT bancarios cifrados.
- Fase 2: Captación, Reclutamiento, Contratos y Adendums.
- Fase 3: Portal Autoservicio (Empleado/Supervisor/Gerente), Evaluaciones de Desempeño integradas e Integración Google Workspace / Webhooks.
- Fase 4: Rediseño UX/UI Responsivo.

---
Instrucción de mantenimiento: Al finalizar cualquier tarea o módulo en futuras sesiones, Antigravity deberá actualizar la sección 2 y 3 de este archivo.