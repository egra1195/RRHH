# [PRD & TDD] DOCUMENTACIÓN TÉCNICA Y FUNCIONAL: PHV - Parámetros Hoja de Vida

---

# PARTE 1: DOCUMENTO DE REQUERIMIENTOS DE PRODUCTO (PRD)

## 1. VISIÓN GENERAL Y OBJETIVOS
- **Código de Módulo:** PHV - Parámetros Hoja de Vida
- **Objetivo de Negocio:** Configurar los datos maestros (catálogos) que alimentan la pantalla de registro de la hoja de vida del trabajador. Actúa como un maestro de parámetros: la información aquí definida se despliega posteriormente como valores estándar (listas desplegables, campos de configuración) en el módulo de registro del trabajador.
- **Empresas Aplicables:** GMSP SA (empresa matriz, gestión centralizada). Aplica al modelo multiempresa con control unificado desde la casa matriz; las sedes no acceden a este maestro de forma independiente.
- **Usuarios / Roles Objetivo:** Administrador, Coordinador, Gerente y Súper Usuario Administrativo. Si la función se delega a un Analista, sus modificaciones requieren autorización escalada al supervisor inmediato.
- **Tipo de Operación:** Escritura / Configuración (mantenimiento de catálogos). No es una pantalla de consulta ni de reporte; no procesa nóminas ni cálculos.

## 2. CASOS DE USO Y NAVEGACIÓN
- **Flujo de Usuario (User Journey):** Menú _Nómina_ → _Parámetros generales y compensación_ → Opción 1: _Parámetros hoja de vida_ (código PHV). Al ingresar, el sistema no exige ningún dato obligatorio y muestra toda la data de forma lineal. El usuario selecciona la pestaña de configuración deseada y opera sobre ella (traer, adicionar, modificar, filtrar, imprimir o exportar).
- **Puntos de Contacto con Otros Módulos:** Proviene del menú de parámetros generales y compensación del módulo de Nómina. Destino: la pantalla _Hoja de Vida_ (registro del nuevo trabajador), que consume estos valores maestros como estándar para su captura.
- **Distribución Visual (según captura):** Pantalla con una barra superior de botones (de izquierda a derecha: _Traer información de registro_, _Adicionar registro_, _Imprimir_, _Exportar información_, _Filtrar información_, _Cerrar ventana_). Debajo, un conjunto de pestañas/ventanas numeradas que agrupan los catálogos de configuración (ver §3). Cada pestaña expone columnas como origen y descripción, y el tipo de dato del campo (texto, número, fecha o mixto).

## 3. ESPECIFICACIÓN DE FUNCIONALIDADES Y BOTONES
- **Traer información de registro:** *Acción:* al seleccionar una pestaña, muestra el detalle del registro elegido y habilita las opciones de borrar, guardar, reversar, imprimir o exportar. | *Validación:* requiere tener una pestaña seleccionada y, para borrar, que el registro no esté vinculado a otra información del sistema.
- **Adicionar registro:** *Acción:* abre una ventana para registrar un nuevo elemento (por ejemplo, origen y descripción) y habilita guardar, revisar, imprimir o exportar. | *Validación:* el campo descripción debe informarse; el origen actúa como nomenclatura de acceso rápido.
- **Imprimir:** *Acción:* imprime el proceso/listado actual. | *Validación:* no aplica validación previa.
- **Exportar información:** *Acción:* exporta la información en formatos TXT, Excel o CSV. | *Validación:* no aplica; no se generan TXT/PDF de forma automática.
- **Filtrar información:** *Acción:* filtra los datos visibles de la pestaña. | *Validación:* no aplica.
- **Cerrar ventana:** *Acción:* cierra la interfaz actual. | *Validación:* no aplica.
- **Flujo de Aprobación (Maker-Checker):** Para el Coordinador, Gerente y Súper Usuario no se requiere doble verificación ni autorización de cambio. Solo en caso de que la función se delegue a un Analista se exige una autorización escalada al supervisor inmediato (verificación tipo maker-checker).

### Pestañas de Configuración (Catálogos)
1. **Características** — campos adicionales específicos de la persona o posición (recomendación, licencia de conducir, tipo de grupo sanguíneo, estatus económico, etc.).
2. **Tipo de documento** — cédula extranjera, cédula venezolana, número de RIF, pasaporte.
3. **Temática** — define la visualización de la configuración.
4. **Estado civil** — casado, concubinato, divorcio, soltero, viudo.
5. **Tipo de relación** — capacitador, empleado, exfuncionario, aspirante, proveedor de bienestar.
6. **Nivel académico** — bachiller, doctorado, posgrado, secundaria técnica, técnico medio, técnico superior universitario, universitario (grado de instrucción y nivel).
7. **Área de profesión** — profesiones y oficios (administración de empresas, administración de sistemas, antropología, etc.), con indicación de si es profesión o es oficio.
8. **Idioma** — alemán, francés, inglés, italiano, portugués, entre otros.
9. **Características de idioma** — lectura de manuales técnicos, revistas, etc.
10. **Parentesco** — abuelo, cónyuge, hermano, hijo/hija, madre, otros, padres, sobrinos, tías.
11. **Área de experiencia** — campo libre para el reclutador o lista desplegable de cursos estándar.
12. **Tipo bien** — automóvil, bus, camioneta, moto, bicicleta, entre otros.
13. **Tipo inmueble** — apartamento (A), casa (C), habitación (H), quinta (Q), u otros.
14. **Origen de hoja** — rutas o accesos rápidos de origen.

## 4. REGLAS DE NEGOCIO Y POLÍTICAS DE EMPRESA
- **Lógica de Cálculo:** No aplica. Ninguna de las pestañas maneja fórmulas ni cálculos; son únicamente catálogos de datos de configuración.
- **Marco Legal (LOTTT) vs. Política GMSP SA:** La mayor parte de la información es exigida por la ley (datos de la hoja de vida del trabajador); el resto responde a estadísticas y políticas internas de la organización.
- **Manejo Multimoneda:** No aplica. La pantalla no maneja ningún tipo de moneda (ni USD, ni Bolívares, ni tasa BCV); solo maneja tipos de datos (texto, número, fecha o mixto).
- **Pasivos y Tratamiento de Datos Históricos:** No afecta los históricos operativos anteriores; la información se añade sin retroactividad. No existe data freeze de cálculo, solo la restricción de que un registro vinculado no puede eliminarse (requiere modificación o sustitución mediante proceso avanzado).

## 5. CRITERIOS DE ACEPTACIÓN
- [ ] La búsqueda/filtro de un catálogo debe devolver los datos filtrados de la pestaña seleccionada en menos de 1 segundo.
- [ ] El sistema valida el tipo de dato de cada campo antes de aplicar el cambio (texto como texto, número como número, fecha como fecha).
- [ ] Un registro vinculado a otra información del sistema no puede ser eliminado (el botón borrar queda inhabilitado o el sistema rechaza la operación).
- [ ] Un registro no vinculado puede ser borrado definitivamente de la base de parámetros.
- [ ] Se muestra un mensaje de alerta/confirmación antes de aplicar cambios en la base de datos (pendiente de implementar; actualmente no existe).
- [ ] Un Analista solo puede modificar parámetros con autorización escalada del supervisor inmediato.
- [ ] Toda la gestión de parámetros proviene de la empresa matriz (ninguna sede accede al maestro de forma independiente).

---

# PARTE 2: DOCUMENTO DE DISEÑO TÉCNICO (TDD)

## 6. ARQUITECTURA DE DATOS (SARA6 & SQL SERVER 2019)
- **Tablas Involucradas:** Tablas maestras de parámetros de hoja de vida. (Estructura de nombres por convención SARA6; tablas específicas *a definir* según el diccionario de datos del sistema — no se mencionan nombres de tabla explícitos en la fuente).
- **Claves Compuestas y Filtros:** Las consultas deben estructurarse mediante JOIN por clave compuesta `(código, empresa)` para soportar el modelo multiempresa centralizado, y con la cláusula `WITH (NOLOCK)` en las lecturas.
- **Tipos de Dato Críticos:** Uso obligatorio de `DECIMAL(38,20)` para montos y fórmulas cuando aplique. En este módulo no hay montos (solo datos tipo texto/número/fecha/mixto), por lo que la regla de precisión aplica a nivel de estándar del proyecto.

## 7. ESPECIFICACIÓN DE CÓDIGO (ESTRUCTURA DE 5/6 ARCHIVOS)
1. **`src/modules/phv/repository.ts`:**
   - Consultas SQL para leer e insertar/actualizar catálogos, con parámetro `@company` (empresa matriz), paginación `OFFSET/FETCH` y `WITH (NOLOCK)` en lecturas.
2. **`src/modules/phv/routes.ts`:**
   - Endpoints Express `GET`, `POST`, `PUT`, `DELETE` con validación de roles por RBAC (Administrador, Coordinador, Gerente, Súper Usuario; Analista con aprobación escalada).
3. **`src/web/pages/ParametrosHojaVida.tsx`:**
   - Componente React 19, hooks de estado, debounce en las búsquedas/filtros y vista responsive.
4. **`src/web/api.ts` y `src/web/modules.ts`:**
   - Tipado TypeScript para request/response y registro del módulo en el catálogo general.

## 8. CARGAS MASIVAS, LOGS Y MANEJO DE ERRORES
- **Estrategia de Staging:** No se considera estrictamente necesaria la carga masiva por tratarse de parámetros, aunque podría evaluarse a futuro (tabla de log `carga_masiva_logs` con procesamiento tolerante a fallos).
- **Auditoría Inmutable:** Registro de acciones en `audit_log_calculos` con usuario, timestamp y valores afectados (creación, modificación, eliminación).
- **Respuesta de Error (validaciones):** Validar que la información coincida con su tipo de dato (texto, número, fecha) antes de escribir en las tablas definitivas. Actualmente el sistema no muestra alertas de confirmación antes de aplicar cambios; se recomienda incorporarlas por tratarse de parámetros.

## 9. REQUISITOS DE RENDIMIENTO LOCAL
- **Tiempo de Respuesta Objetivo:** < 200 ms por consulta.
- **Optimizaciones:** Paginación del lado del servidor, evitar bloqueo del Event Loop de Node.js, reutilización del pool de conexiones.

---
*Documento estructurado bajo el estándar PRD/TDD para integración directa en Antigravity.*