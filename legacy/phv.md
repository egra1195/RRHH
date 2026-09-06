# [PRD & TDD] DOCUMENTACI├ôN T├ëCNICA Y FUNCIONAL: PHV - Par├ímetros Hoja de Vida

---

# PARTE 1: DOCUMENTO DE REQUERIMIENTOS DE PRODUCTO (PRD)

## 1. VISI├ôN GENERAL Y OBJETIVOS
- **C├│digo de M├│dulo:** PHV - Par├ímetros Hoja de Vida
- **Objetivo de Negocio:** Configurar los datos maestros (cat├ílogos) que alimentan la pantalla de registro de la hoja de vida del trabajador. Act├║a como un maestro de par├ímetros: la informaci├│n aqu├¡ definida se despliega posteriormente como valores est├índar (listas desplegables, campos de configuraci├│n) en el m├│dulo de registro del trabajador.
- **Empresas Aplicables:** GMSP SA (empresa matriz, gesti├│n centralizada). Aplica al modelo multiempresa con control unificado desde la casa matriz; las sedes no acceden a este maestro de forma independiente.
- **Usuarios / Roles Objetivo:** Administrador, Coordinador, Gerente y S├║per Usuario Administrativo. Si la funci├│n se delega a un Analista, sus modificaciones requieren autorizaci├│n escalada al supervisor inmediato.
- **Tipo de Operaci├│n:** Escritura / Configuraci├│n (mantenimiento de cat├ílogos). No es una pantalla de consulta ni de reporte; no procesa n├│minas ni c├ílculos.

## 2. CASOS DE USO Y NAVEGACI├ôN
- **Flujo de Usuario (User Journey):** Men├║ _N├│mina_ ÔåÆ _Par├ímetros generales y compensaci├│n_ ÔåÆ Opci├│n 1: _Par├ímetros hoja de vida_ (c├│digo PHV). Al ingresar, el sistema no exige ning├║n dato obligatorio y muestra toda la data de forma lineal. El usuario selecciona la pesta├▒a de configuraci├│n deseada y opera sobre ella (traer, adicionar, modificar, filtrar, imprimir o exportar).
- **Puntos de Contacto con Otros M├│dulos:** Proviene del men├║ de par├ímetros generales y compensaci├│n del m├│dulo de N├│mina. Destino: la pantalla _Hoja de Vida_ (registro del nuevo trabajador), que consume estos valores maestros como est├índar para su captura.
- **Distribuci├│n Visual (seg├║n captura):** Pantalla con una barra superior de botones (de izquierda a derecha: _Traer informaci├│n de registro_, _Adicionar registro_, _Imprimir_, _Exportar informaci├│n_, _Filtrar informaci├│n_, _Cerrar ventana_). Debajo, un conjunto de pesta├▒as/ventanas numeradas que agrupan los cat├ílogos de configuraci├│n (ver ┬º3). Cada pesta├▒a expone columnas como origen y descripci├│n, y el tipo de dato del campo (texto, n├║mero, fecha o mixto).

## 3. ESPECIFICACI├ôN DE FUNCIONALIDADES Y BOTONES
- **Traer informaci├│n de registro:** *Acci├│n:* al seleccionar una pesta├▒a, muestra el detalle del registro elegido y habilita las opciones de borrar, guardar, reversar, imprimir o exportar. | *Validaci├│n:* requiere tener una pesta├▒a seleccionada y, para borrar, que el registro no est├® vinculado a otra informaci├│n del sistema.
- **Adicionar registro:** *Acci├│n:* abre una ventana para registrar un nuevo elemento (por ejemplo, origen y descripci├│n) y habilita guardar, revisar, imprimir o exportar. | *Validaci├│n:* el campo descripci├│n debe informarse; el origen act├║a como nomenclatura de acceso r├ípido.
- **Imprimir:** *Acci├│n:* imprime el proceso/listado actual. | *Validaci├│n:* no aplica validaci├│n previa.
- **Exportar informaci├│n:** *Acci├│n:* exporta la informaci├│n en formatos TXT, Excel o CSV. | *Validaci├│n:* no aplica; no se generan TXT/PDF de forma autom├ítica.
- **Filtrar informaci├│n:** *Acci├│n:* filtra los datos visibles de la pesta├▒a. | *Validaci├│n:* no aplica.
- **Cerrar ventana:** *Acci├│n:* cierra la interfaz actual. | *Validaci├│n:* no aplica.
- **Flujo de Aprobaci├│n (Maker-Checker):** Para el Coordinador, Gerente y S├║per Usuario no se requiere doble verificaci├│n ni autorizaci├│n de cambio. Solo en caso de que la funci├│n se delegue a un Analista se exige una autorizaci├│n escalada al supervisor inmediato (verificaci├│n tipo maker-checker).

### Pesta├▒as de Configuraci├│n (Cat├ílogos)
1. **Caracter├¡sticas** ÔÇö campos adicionales espec├¡ficos de la persona o posici├│n (recomendaci├│n, licencia de conducir, tipo de grupo sangu├¡neo, estatus econ├│mico, etc.).
2. **Tipo de documento** ÔÇö c├®dula extranjera, c├®dula venezolana, n├║mero de RIF, pasaporte.
3. **Tem├ítica** ÔÇö define la visualizaci├│n de la configuraci├│n.
4. **Estado civil** ÔÇö casado, concubinato, divorcio, soltero, viudo.
5. **Tipo de relaci├│n** ÔÇö capacitador, empleado, exfuncionario, aspirante, proveedor de bienestar.
6. **Nivel acad├®mico** ÔÇö bachiller, doctorado, posgrado, secundaria t├®cnica, t├®cnico medio, t├®cnico superior universitario, universitario (grado de instrucci├│n y nivel).
7. **├ürea de profesi├│n** ÔÇö profesiones y oficios (administraci├│n de empresas, administraci├│n de sistemas, antropolog├¡a, etc.), con indicaci├│n de si es profesi├│n o es oficio.
8. **Idioma** ÔÇö alem├ín, franc├®s, ingl├®s, italiano, portugu├®s, entre otros.
9. **Caracter├¡sticas de idioma** ÔÇö lectura de manuales t├®cnicos, revistas, etc.
10. **Parentesco** ÔÇö abuelo, c├│nyuge, hermano, hijo/hija, madre, otros, padres, sobrinos, t├¡as.
11. **├ürea de experiencia** ÔÇö campo libre para el reclutador o lista desplegable de cursos est├índar.
12. **Tipo bien** ÔÇö autom├│vil, bus, camioneta, moto, bicicleta, entre otros.
13. **Tipo inmueble** ÔÇö apartamento (A), casa (C), habitaci├│n (H), quinta (Q), u otros.
14. **Origen de hoja** ÔÇö rutas o accesos r├ípidos de origen.

## 4. REGLAS DE NEGOCIO Y POL├ìTICAS DE EMPRESA
- **L├│gica de C├ílculo:** No aplica. Ninguna de las pesta├▒as maneja f├│rmulas ni c├ílculos; son ├║nicamente cat├ílogos de datos de configuraci├│n.
- **Marco Legal (LOTTT) vs. Pol├¡tica GMSP SA:** La mayor parte de la informaci├│n es exigida por la ley (datos de la hoja de vida del trabajador); el resto responde a estad├¡sticas y pol├¡ticas internas de la organizaci├│n.
- **Manejo Multimoneda:** No aplica. La pantalla no maneja ning├║n tipo de moneda (ni USD, ni Bol├¡vares, ni tasa BCV); solo maneja tipos de datos (texto, n├║mero, fecha o mixto).
- **Pasivos y Tratamiento de Datos Hist├│ricos:** No afecta los hist├│ricos operativos anteriores; la informaci├│n se a├▒ade sin retroactividad. No existe data freeze de c├ílculo, solo la restricci├│n de que un registro vinculado no puede eliminarse (requiere modificaci├│n o sustituci├│n mediante proceso avanzado).

## 5. CRITERIOS DE ACEPTACI├ôN
- [ ] La b├║squeda/filtro de un cat├ílogo debe devolver los datos filtrados de la pesta├▒a seleccionada en menos de 1 segundo.
- [ ] El sistema valida el tipo de dato de cada campo antes de aplicar el cambio (texto como texto, n├║mero como n├║mero, fecha como fecha).
- [ ] Un registro vinculado a otra informaci├│n del sistema no puede ser eliminado (el bot├│n borrar queda inhabilitado o el sistema rechaza la operaci├│n).
- [ ] Un registro no vinculado puede ser borrado definitivamente de la base de par├ímetros.
- [ ] Se muestra un mensaje de alerta/confirmaci├│n antes de aplicar cambios en la base de datos (pendiente de implementar; actualmente no existe).
- [ ] Un Analista solo puede modificar par├ímetros con autorizaci├│n escalada del supervisor inmediato.
- [ ] Toda la gesti├│n de par├ímetros proviene de la empresa matriz (ninguna sede accede al maestro de forma independiente).

---

# PARTE 2: DOCUMENTO DE DISE├æO T├ëCNICO (TDD)

## 6. ARQUITECTURA DE DATOS (SARA6 & SQL SERVER 2019)
- **Tablas Involucradas:** Tablas maestras de par├ímetros de hoja de vida. (Estructura de nombres por convenci├│n SARA6; tablas espec├¡ficas *a definir* seg├║n el diccionario de datos del sistema ÔÇö no se mencionan nombres de tabla expl├¡citos en la fuente).
- **Claves Compuestas y Filtros:** Las consultas deben estructurarse mediante JOIN por clave compuesta `(c├│digo, empresa)` para soportar el modelo multiempresa centralizado, y con la cl├íusula `WITH (NOLOCK)` en las lecturas.
- **Tipos de Dato Cr├¡ticos:** Uso obligatorio de `DECIMAL(38,20)` para montos y f├│rmulas cuando aplique. En este m├│dulo no hay montos (solo datos tipo texto/n├║mero/fecha/mixto), por lo que la regla de precisi├│n aplica a nivel de est├índar del proyecto.

## 7. ESPECIFICACI├ôN DE C├ôDIGO (ESTRUCTURA DE 5/6 ARCHIVOS)
1. **`src/modules/phv/repository.ts`:**
   - Consultas SQL para leer e insertar/actualizar cat├ílogos, con par├ímetro `@company` (empresa matriz), paginaci├│n `OFFSET/FETCH` y `WITH (NOLOCK)` en lecturas.
2. **`src/modules/phv/routes.ts`:**
   - Endpoints Express `GET`, `POST`, `PUT`, `DELETE` con validaci├│n de roles por RBAC (Administrador, Coordinador, Gerente, S├║per Usuario; Analista con aprobaci├│n escalada).
3. **`src/web/pages/ParametrosHojaVida.tsx`:**
   - Componente React 19, hooks de estado, debounce en las b├║squedas/filtros y vista responsive.
4. **`src/web/api.ts` y `src/web/modules.ts`:**
   - Tipado TypeScript para request/response y registro del m├│dulo en el cat├ílogo general.

## 8. CARGAS MASIVAS, LOGS Y MANEJO DE ERRORES
- **Estrategia de Staging:** No se considera estrictamente necesaria la carga masiva por tratarse de par├ímetros, aunque podr├¡a evaluarse a futuro (tabla de log `carga_masiva_logs` con procesamiento tolerante a fallos).
- **Auditor├¡a Inmutable:** Registro de acciones en `audit_log_calculos` con usuario, timestamp y valores afectados (creaci├│n, modificaci├│n, eliminaci├│n).
- **Respuesta de Error (validaciones):** Validar que la informaci├│n coincida con su tipo de dato (texto, n├║mero, fecha) antes de escribir en las tablas definitivas. Actualmente el sistema no muestra alertas de confirmaci├│n antes de aplicar cambios; se recomienda incorporarlas por tratarse de par├ímetros.

## 9. REQUISITOS DE RENDIMIENTO LOCAL
- **Tiempo de Respuesta Objetivo:** < 200 ms por consulta.
- **Optimizaciones:** Paginaci├│n del lado del servidor, evitar bloqueo del Event Loop de Node.js, reutilizaci├│n del pool de conexiones.

---
*Documento estructurado bajo el est├índar PRD/TDD para integraci├│n directa en Antigravity.*