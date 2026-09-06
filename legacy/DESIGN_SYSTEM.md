# DESIGN_SYSTEM.md
## Sistema de Dise├▒o Keralty & GMSP (Compensaci├│n y RRHH)
**Versi├│n:** 1.0.0  
**Stack de UI:** React 19, Tailwind CSS / Vanilla CSS Modules  
**Arquitectura Visual:** Soft UI / Neumorfismo T├íctil + Ergonom├¡a 60-30-10  
**Compatibilidad:** Desktop (Turnos de 8h), Responsive, Dual Theme (Light/Dark)

---

## 1. Principios de Dise├▒o y Distribuci├│n Crom├ítica (60-30-10)

La interfaz utiliza la regla ergon├│mica **60-30-10** con niveles de saturaci├│n controlados (<25%) y contraste regulado por **WCAG 2.1 AA** (m├¡nimo 4.5:1 para texto normal) para evitar el deslumbramiento y la fatiga visual.

* **60% - Dominante (Lienzo y Fondos Base):** Tonos hueso/arena neutros en modo claro y navy carb├│n profundo en modo oscuro. Evita blancos puros (`#FFFFFF`) y negros puros (`#000000`) de alto contraste crudo.
* **30% - Estructura (Contenedores, Bordes y Textos):** Superficies elevadas t├íctiles, bordes sutiles de delimitaci├│n y jerarqu├¡a tipogr├ífica para lectura de datos.
* **10% - Acento y Acciones Clave:** Exclusivo para botones primarios, indicadores de estado activo, selecciones en el ├írbol y llamadas a la acci├│n cr├¡ticas.

---

## 2. Tokens de Color Corporativos (Keralty / GMSP)

### Modo Claro (Warm Soft UI)
* `--bg-canvas`: `#EEF1F5` (Fondo dominante 60%)
* `--bg-surface`: `#FFFFFF` (Superficie elevada / Cards 30%)
* `--bg-surface-soft`: `#F4F6F9` (Fondos secundarios y cabeceras de tabla)
* `--bg-dock`: `#111827` (Dock primario lateral)
* `--text-main`: `#1E293B` (Texto principal de alto contraste)
* `--text-muted`: `#64748B` (Etiquetas secundarias)
* `--border-subtle`: `#E2E8F0` (Bordes t├íctiles de 1px/2px)

### Modo Oscuro (Deep Navy)
* `--bg-canvas`: `#0A0F1D` (Fondo navy carb├│n 60%)
* `--bg-surface`: `#131B2E` (Superficie elevada 30%)
* `--bg-surface-soft`: `#1A243B` (Superficie de soporte)
* `--bg-dock`: `#070B14` (Dock ultra-oscuro)
* `--text-main`: `#F8FAFC` (Texto principal claro)
* `--text-muted`: `#94A3B8` (Texto secundario)
* `--border-subtle`: `#23304E` (Bordes oscuros suaves)

### Acentos de Marca Keralty
* **Azul Corporativo Primario (Pantone 287 C / 288 C):** `#002F6C` (Light Accent) / `#001A70`
* **Cyan Vitalidad (Pantone 306 C / 307 C):** `#00B5E2` (Dark Accent / Focus) / `#006FBA`
* **Verde Salud (Pantone 339 C / 362 C):** `#00B388` (├ëxito / Disponible) / `#43B02A`
* **Verde Lima (Pantone 375 C):** `#97D700` (Highlights)
* **Neutro C├ílido (Pantone 400 C):** `#D0CDC5`

---

## 3. Tokens de Elevaci├│n T├íctil (Soft UI)

| Tipo de Capa | CSS Shadow (Modo Claro) | CSS Shadow (Modo Oscuro) |
| :--- | :--- | :--- |
| **Raised Layer (Cards/Paneles)** | `8px 8px 18px #d1d9e6, -8px -8px 18px #ffffff` | `6px 6px 16px #050811, -6px -6px 16px #1b2640` |
| **Raised SM (Botones/Badges)** | `4px 4px 10px #d1d9e6, -4px -4px 10px #ffffff` | `3px 3px 8px #050811, -3px -3px 8px #1b2640` |
| **Inset Layer (Inputs/Buscador)** | `inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff` | `inset 2px 2px 5px #050811, inset -2px -2px 5px #1b2640` |
| **Pressed Layer (Active Tab)** | `inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff` | `inset 3px 3px 6px #050811, inset -3px -3px 6px #1b2640` |

---

## 4. Estructura de Navegaci├│n (Dock + ├ürbol Jer├írquico)

### 4.1. Dock Primario Flotante (Izquierda)
* Ancho fijo de 68px con esquinas redondeadas (`border-radius: 20px`).
* Acceso macro por ├¡conos SVG a las ├íreas principales (Maestros, N├│mina, Hoja de Vida, Compensaci├│n, Configuraci├│n y Toggle de Tema Claro/Oscuro).

### 4.2. Panel de Navegaci├│n Secundario (Folder Tree)
* Ancho de 310px con soporte de b├║squeda interna (`input.search-box` con estilo hundido *inset*).
* Cabecera con tarjeta de usuario, avatar circular y rol asignado.
* ├ürbol de categor├¡as multinivel con indicadores num├®ricos de cat├ílogo (*badges* circulares/pastilla):
  * **­ƒôü MAESTROS**
    * **­ƒôé PAR├üMETROS GENERALES**
      * `ÔÜÖ [PHV] Par├ímetros Hoja de Vida` *(Selecci├│n activa)*
      * `­ƒôè [PCO] Par├ímetros Costeo`
      * `­ƒÄû [CAR] Manual de Cargos`

---

## 5. Reglas de Componentes (DataGrid & Formularios)

* **Inputs & Selects:** Fondo hundido (`var(--shadow-inset)`), sin bordes pesados, foco resaltado con borde de 2px en `--k-cyan` (`#00B5E2`).
* **Botones Primarios:** Gradiente lineal institucional (`linear-gradient(135deg, #002F6C, #004090)` en claro, `linear-gradient(135deg, #00B5E2, #0072CE)` en oscuro) con elevaci├│n suave.
* **Badges de Estado SARA6:**
  * **Vinculado (Protegido):** Fondo suave rojo carmes├¡ transl├║cido (`rgba(239, 68, 68, 0.12)`), texto `#EF4444`, ├¡cono de candado `­ƒöÆ`.
  * **Disponible:** Fondo suave verde salud transl├║cido (`rgba(0, 179, 136, 0.12)`), texto `#00B388`, ├¡cono de check `Ô£ô`.
* **Tablas de Datos:** Filas alternadas suaves, cabeceras en may├║sculas de 10px con padding amplio para evitar la sensaci├│n de saturaci├│n de datos.