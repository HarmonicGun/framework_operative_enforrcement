# Auditoria de Producto — KP-IA Framework Operative Enforcement
> Fecha: 2026-05-12 | Auditoria automatizada con 4 agentes en paralelo

---

## A. BUGS CRITICOS (rompen el producto en primer uso)

### A1. Script vs Template: estructura de datos incompatible
- `plantillas/registry.json` usa `"proyectos": [array]`
- `scripts/framework_status.py` espera `data.get("projects", {dict})`
- **Resultado:** el script crashea con un registry creado desde la plantilla

### A2. Nombres de campo en idioma diferente
- Template usa `clasificacion` (espanol)
- Script usa `classification` (ingles, linea 31)
- **Resultado:** filtros silenciosamente fallan, proyectos archivados aparecen como activos

### A3. Template registry.json no es JSON valido
- Usa `{{PLACEHOLDER}}` syntax dentro de JSON
- Un placeholder sin reemplazar crashea el parser
- **Fix:** convertir a `.json.template` con script generador, o usar defaults validos

### A4. 3 de 4 scripts referenciados no existen
- `playbook_report.py` — documentado en PLAYBOOK.md sec 11, no existe
- `friday_report_to_html.py` — documentado, no existe
- `screenshot_report.js` — documentado, no existe (ademas introduce dependencia Node.js no documentada)
- Solo `framework_status.py` esta shipped

### A5. Directorio `checkpoints/` referenciado pero no existe
- CLAUDE.md sec 3.B: "Leer `checkpoints/Next_Actions_*.md`"
- `framework_status.py` linea 69: `Path(ROOT, "checkpoints").glob(...)`
- Falla silenciosa: no hay error, simplemente no muestra nada

### A6. ONBOARDING.md referencia `_framework_kit/` que no existe
- Paso 1: "Copia estos 3 archivos desde `_framework_kit/`"
- Los archivos estan en root, no en un subdirectorio
- Usuario nuevo se atora en paso 1

### A7. Setup manual sabotea auto-deteccion
- ONBOARDING pasos 2-3: crear `context_proyectos.md` manualmente desde template
- CLAUDE.md sec 1: detecta primer uso si `context_proyectos.md` NO existe
- Si el usuario sigue el onboarding manual, el auto-bootstrap nunca se ejecuta
- Archivo con `{{}}` placeholders cuenta como "existente" y el sistema entra a modo normal con datos rotos

---

## B. INCONSISTENCIAS ENTRE ARCHIVOS

| Problema | Donde | Detalle |
|---|---|---|
| Seccion 3.C duplicada | CLAUDE.md | "C. Diario" y "C. Miercoles" ambas usan letra C |
| PLAN.md referenciado y prohibido | FRAMEWORK.md linea 146 vs linea 133 | Entry point dice leer PLAN.md; minimal files lo prohibe |
| SEGUIMIENTO.md junta 3 archivos en 1 | plantillas/ vs CLAUDE.md sec 8 | Template crea 1 archivo, spec requiere 3 separados |
| Archivos de fase vs minimal docs | FRAMEWORK.md fases 0-4 vs sec minimal | Fases sugieren 5 archivos extra; regla dice max 6 |
| Umbrales zombie diferentes | README.md vs CLAUDE.md/PLAYBOOK.md | README dice 10 dias para rojo; CLAUDE.md dice 5+ dias |
| Semaforo amarillo diferente | CLAUDE.md sec 7 vs PLAYBOOK.md sec 8 | PLAYBOOK agrega "owner no responde 24h" que CLAUDE.md omite |
| PORTFOLIO.md referencia archivos fantasma | plantillas/PORTFOLIO.md | Referencia `agent_operating_mode.md` y `playbook_departamental.md` que no existen en este repo |
| Nombre del archivo portfolio | Parent CLAUDE.md vs este repo | Uno dice `context_general_proyectos.md`, otro dice `context_proyectos.md` |

---

## C. CONTENIDO GO-ESPECIFICO (debe parametrizarse para producto generico)

1. `framework_status.py` lineas 9-23: diccionario `SHORT` con 13 nombres de proyectos GO hardcodeados
2. PLAYBOOK.md linea 189: ejemplo statusline con "Market", "Rafias", "Sacos", "Multi"
3. CASO_DE_USO.md: caso de estudio identificable como GO (18 proyectos, ERP, divisiones)
4. LICENSE.md lineas 7-8: nombra Grupo Ortiz y branch `joseaguilar_go`
5. AUTHORS.md lineas 9-13: nombra el departamento GO y autorizacion

---

## D. HIGIENE DEL REPOSITORIO

1. **Typo en nombre del repo:** `enforrcement` (doble r) — visible en URL de GitHub
2. **No `.gitignore`** — `.DS_Store`, `*.pyc`, `.env`, configs IDE se filtran
3. **`.claude/settings.local.json` esta commiteado** — deberia estar en .gitignore
4. **Solo 2 commits** — primer commit "Add files via upload" (GitHub web UI)
5. **Cero tags, cero releases** — no hay forma de pinear version
6. **Branch `joseaguilar_go`** expone nombre personal en repo de producto
7. **Idioma mixto** — README/CASO_DE_USO en espanol, AUTHORS en ingles, script en ingles

---

## E. ARCHIVOS FALTANTES (estandar de producto profesional)

### Criticos
| Archivo | Proposito |
|---|---|
| `.gitignore` | Evitar artifacts del OS/editor/env |
| `CHANGELOG.md` | Historial de cambios entre versiones |
| `VERSION` | Versionado semantico a nivel repo |
| `examples/` | Departamento de ejemplo pre-configurado con 2-3 proyectos ficticios |

### Templates faltantes
| Template | Proposito |
|---|---|
| `plantillas/AVANCES_DIARIOS.md` | Log diario standalone (actualmente embebido en SEGUIMIENTO.md) |
| `plantillas/MVP_BREAKDOWN.md` | Desglose MVP standalone (embebido en PROYECTO.md) |
| `plantillas/SECURITY.md` | Checklist de seguridad (inline en FRAMEWORK.md pero sin template) |
| `plantillas/DESIGN_SYSTEM.md` | Sistema visual para proyectos con UI |
| `plantillas/REPORTE_SEMANAL.md` | Reporte ejecutivo viernes (formato en PLAYBOOK.md pero sin template) |
| `plantillas/CORTE_SEMANAL.md` | Template LUN/MIE/VIE con convencion de nombres |
| `plantillas/Next_Actions.md` | Items de accion del checkpoint |

### Scripts faltantes
| Script | Proposito |
|---|---|
| `scripts/playbook_report.py` | Genera borrador LUN/MIE/VIE (referenciado pero no existe) |
| `scripts/friday_report_to_html.py` | Convierte markdown a dashboard HTML |
| `scripts/screenshot_report.js` | Captura HTML a JPG |
| `scripts/zombie_detector.py` | Detecta proyectos zombie (feature core, no automatizada) |
| `scripts/semaforo_calculator.py` | Calcula semaforos (feature core, dice "calculados no autodeclarados" pero no hay script) |
| `scripts/archive_week.py` | Automatiza backup semanal del lunes |
| `scripts/validate_registry.py` | Valida estructura y campos del registry.json |
| `scripts/init_project.py` | Inicializa proyecto desde templates automaticamente |
| `scripts/setup.py` | Wizard interactivo de onboarding |

---

## F. FEATURES FALTANTES vs COMPETENCIA

### Criticas (todos los competidores las tienen)
| Feature | Gap | Competidores |
|---|---|---|
| Integraciones (Slack, email, GitHub) | No hay push de reportes ni alertas | Monday.com, Linear, Taskade, Notion |
| Dashboards interactivos | Solo HTML estatico + JPG | Monday.com, Notion, Linear, Planview |
| Multi-usuario / colaboracion | Asume un solo operador | Todos |
| Notificaciones async | Zombie detection solo funciona durante sesion Claude | Monday.com, Linear, Taskade |
| Analytics historicos / tendencias | Registry guarda datos pero nada los visualiza | Monday.com, Planview, Celoxis |

### Importantes
| Feature | Gap |
|---|---|
| Dependencias entre proyectos | No existe el concepto |
| Resource allocation / capacidad | No tracking de carga de trabajo por persona |
| Budget / costos | Cero dimension financiera |
| Deadline / SLA tracking | Solo % MVP y semaforo, no fechas limite |
| Retrospectivas estructuradas | Fase 9 dice "mejorar con datos reales" pero no hay template |
| Vista para stakeholders | Reportes son solo internos |
| Diff semanal automatico | "Esta semana vs anterior" no se genera automaticamente |

---

## G. DIFERENCIADORES UNICOS (doblar la apuesta aqui)

1. **Semaforos computados, no autodeclarados** — ningun competidor calcula el estado desde logs reales. Es la USP principal. Monday.com/Notion dejan que el usuario ponga "verde" sin evidencia.
2. **Cero infraestructura** — 3 archivos markdown + Claude Code. No SaaS, no DB, no servidor. Atractivo para entornos air-gapped y equipos con fatiga de herramientas.
3. **Activacion por lenguaje natural en espanol** — ventaja en mercado LATAM, subatendido por herramientas en ingles.
4. **Reporte ejecutivo AI-generated** — de 2-3 horas a 5 minutos. Demo-able y verificable.
5. **Framework de fases 0-9 universal** — aplica a proyectos tecnicos, administrativos, comerciales, operativos. Competidores son engineering-focused o genericos.

---

## H. ESCALABILIDAD

### 5 proyectos a 50
| Problema | Punto de quiebre | Mitigacion |
|---|---|---|
| Context window saturado | CLAUDE.md + PLAYBOOK.md + FRAMEWORK.md + context_proyectos de 50 proyectos > 50K tokens | Selector/filtro de proyectos, cargar solo activos |
| Registry JSON gigante | 50 proyectos x 52 semanas historial = miles de entradas | Separar `registry_active.json` y `registry_archive.json` |
| File system sprawl | 50 carpetas x 6+ archivos cada una | Agrupacion por departamento/fase/prioridad |
| Reporte viernes | Leer avances_diarios de 50 proyectos en una sesion | Batch: resumenes por proyecto primero, consolidar despues |

### 1 departamento a 10
| Problema | Mitigacion |
|---|---|
| Sin vista cross-departamento | Agregar meta-portfolio `context_departamentos.md` |
| Adopcion inconsistente | Lock down schema del registry, permitir custom solo en CLAUDE.md |
| Costo LLM escala | Track API cost por departamento, evaluar modelos ligeros para status checks |

---

## I. MONETIZACION

### Pricing actual: $799/mo (40 users)
- Monday.com 40 users = $480-800/mo
- Notion 40 users = $400/mo
- Linear 40 users = $320-640/mo
- Posicionamiento mid-to-upper correcto SI se justifica con tiempo ahorrado

### Paths recomendados
1. **Tiered:** $299/mo (self-serve, 10 proyectos) / $799/mo (managed, 40 users) / $1,500/mo (enterprise, unlimited + integraciones)
2. **Claude Code Skill marketplace** — distribucion masiva, revenue por skill
3. **Open core** — framework open-source, vender scripts premium + integraciones + dashboards
4. **Consulting + framework** — $5K-15K implementacion + $500/mo ongoing

---

## J. TOP 20 ACCIONES PRIORIZADAS

### Tier 1 — Bugs que rompen el producto
1. Fix estructura datos registry: alinear template (array) con script (dict)
2. Fix nombres de campo: unificar idioma (espanol) en template Y script
3. Fix template registry.json: hacerlo JSON valido o crear script generador
4. Fix path `_framework_kit/` en ONBOARDING.md
5. Fix contradiccion setup manual vs auto-deteccion en ONBOARDING
6. Crear directorio `checkpoints/`
7. Fix seccion 3.C duplicada en CLAUDE.md
8. Eliminar referencia a PLAN.md en FRAMEWORK.md

### Tier 2 — Producto incompleto
9. Crear los 3 scripts faltantes (o eliminar sus referencias del PLAYBOOK)
10. Parametrizar `framework_status.py`: leer nombres del registry, no hardcodear
11. Agregar `.gitignore`
12. Crear `examples/` con departamento ficticio pre-configurado
13. Separar templates: AVANCES_DIARIOS.md y MVP_BREAKDOWN.md como standalone
14. Agregar error handling al script (FileNotFoundError, JSON malformado)

### Tier 3 — Producto competitivo
15. Script `zombie_detector.py` + `semaforo_calculator.py`
16. Script `setup.py` (wizard de onboarding interactivo)
17. Crear CHANGELOG.md + VERSION + tags en git
18. Fix typo en nombre del repo (`enforrcement` -> `enforcement`)
19. Integracion Slack/email para push de alertas y reportes
20. Script de diff semanal automatico (esta semana vs anterior)
