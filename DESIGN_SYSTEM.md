# DESIGN_SYSTEM.md
## Sistema de Diseño Keralty & GMSP (Compensación y RRHH)
**Versión:** 1.0.0  
**Stack de UI:** React 19, Tailwind CSS / Vanilla CSS Modules  
**Arquitectura Visual:** Soft UI / Neumorfismo Táctil + Ergonomía 60-30-10  
**Compatibilidad:** Desktop (Turnos de 8h), Responsive, Dual Theme (Light/Dark)

---

## 1. Principios de Diseño y Distribución Cromática (60-30-10)

La interfaz utiliza la regla ergonómica **60-30-10** con niveles de saturación controlados (<25%) y contraste regulado por **WCAG 2.1 AA** (mínimo 4.5:1 para texto normal) para evitar el deslumbramiento y la fatiga visual.

* **60% - Dominante (Lienzo y Fondos Base):** Tonos hueso/arena neutros en modo claro y navy carbón profundo en modo oscuro. Evita blancos puros (`#FFFFFF`) y negros puros (`#000000`) de alto contraste crudo.
* **30% - Estructura (Contenedores, Bordes y Textos):** Superficies elevadas táctiles, bordes sutiles de delimitación y jerarquía tipográfica para lectura de datos.
* **10% - Acento y Acciones Clave:** Exclusivo para botones primarios, indicadores de estado activo, selecciones en el árbol y llamadas a la acción críticas.

---

## 2. Tokens de Color Corporativos (Keralty / GMSP)

### Modo Claro (Warm Soft UI)
* `--bg-canvas`: `#EEF1F5` (Fondo dominante 60%)
* `--bg-surface`: `#FFFFFF` (Superficie elevada / Cards 30%)
* `--bg-surface-soft`: `#F4F6F9` (Fondos secundarios y cabeceras de tabla)
* `--bg-dock`: `#111827` (Dock primario lateral)
* `--text-main`: `#1E293B` (Texto principal de alto contraste)
* `--text-muted`: `#64748B` (Etiquetas secundarias)
* `--border-subtle`: `#E2E8F0` (Bordes táctiles de 1px/2px)

### Modo Oscuro (Deep Navy)
* `--bg-canvas`: `#0A0F1D` (Fondo navy carbón 60%)
* `--bg-surface`: `#131B2E` (Superficie elevada 30%)
* `--bg-surface-soft`: `#1A243B` (Superficie de soporte)
* `--bg-dock`: `#070B14` (Dock ultra-oscuro)
* `--text-main`: `#F8FAFC` (Texto principal claro)
* `--text-muted`: `#94A3B8` (Texto secundario)
* `--border-subtle`: `#23304E` (Bordes oscuros suaves)

### Acentos de Marca Keralty
* **Azul Corporativo Primario (Pantone 287 C / 288 C):** `#002F6C` (Light Accent) / `#001A70`
* **Cyan Vitalidad (Pantone 306 C / 307 C):** `#00B5E2` (Dark Accent / Focus) / `#006FBA`
* **Verde Salud (Pantone 339 C / 362 C):** `#00B388` (Éxito / Disponible) / `#43B02A`
* **Verde Lima (Pantone 375 C):** `#97D700` (Highlights)
* **Neutro Cálido (Pantone 400 C):** `#D0CDC5`

---

## 3. Tokens de Elevación Táctil (Soft UI)

| Tipo de Capa | CSS Shadow (Modo Claro) | CSS Shadow (Modo Oscuro) |
| :--- | :--- | :--- |
| **Raised Layer (Cards/Paneles)** | `8px 8px 18px #d1d9e6, -8px -8px 18px #ffffff` | `6px 6px 16px #050811, -6px -6px 16px #1b2640` |
| **Raised SM (Botones/Badges)** | `4px 4px 10px #d1d9e6, -4px -4px 10px #ffffff` | `3px 3px 8px #050811, -3px -3px 8px #1b2640` |
| **Inset Layer (Inputs/Buscador)** | `inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff` | `inset 2px 2px 5px #050811, inset -2px -2px 5px #1b2640` |
| **Pressed Layer (Active Tab)** | `inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff` | `inset 3px 3px 6px #050811, inset -3px -3px 6px #1b2640` |

---

## 4. Estructura de Navegación (Dock + Árbol Jerárquico)

### 4.1. Dock Primario Flotante (Izquierda)
* Ancho fijo de 68px con esquinas redondeadas (`border-radius: 20px`).
* Acceso macro por íconos SVG a las áreas principales (Maestros, Nómina, Hoja de Vida, Compensación, Configuración y Toggle de Tema Claro/Oscuro).

### 4.2. Panel de Navegación Secundario (Folder Tree)
* Ancho de 310px con soporte de búsqueda interna (`input.search-box` con estilo hundido *inset*).
* Cabecera con tarjeta de usuario, avatar circular y rol asignado.
* Árbol de categorías multinivel con indicadores numéricos de catálogo (*badges* circulares/pastilla):
  * **📁 MAESTROS**
    * **📂 PARÁMETROS GENERALES**
      * `⚙ [PHV] Parámetros Hoja de Vida` *(Selección activa)*
      * `📊 [PCO] Parámetros Costeo`
      * `🎖 [CAR] Manual de Cargos`

---

## 5. Reglas de Componentes (DataGrid & Formularios)

* **Inputs & Selects:** Fondo hundido (`var(--shadow-inset)`), sin bordes pesados, foco resaltado con borde de 2px en `--k-cyan` (`#00B5E2`).
* **Botones Primarios:** Gradiente lineal institucional (`linear-gradient(135deg, #002F6C, #004090)` en claro, `linear-gradient(135deg, #00B5E2, #0072CE)` en oscuro) con elevación suave.
* **Badges de Estado SARA6:**
  * **Vinculado (Protegido):** Fondo suave rojo carmesí translúcido (`rgba(239, 68, 68, 0.12)`), texto `#EF4444`, ícono de candado `🔒`.
  * **Disponible:** Fondo suave verde salud translúcido (`rgba(0, 179, 136, 0.12)`), texto `#00B388`, ícono de check `✓`.
* **Tablas de Datos:** Filas alternadas suaves, cabeceras en mayúsculas de 10px con padding amplio para evitar la sensación de saturación de datos.