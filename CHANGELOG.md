# Changelog

## [0.3.1] — 2026-05-15

### Added (research de doc oficial Claude Code)
- `AGENTS.md` seccion 10 — Custom subagent files en `.claude/agents/` con frontmatter (name, description, tools, model, autoMemoryEnabled)
- `AGENTS.md` seccion 11 — Writer/Reviewer multi-sesion pattern (sesion escribe, otra revisa con contexto limpio)
- `AGENTS.md` seccion 12 — Fan-out paralelo con `claude -p` y `--allowedTools` para batch operations
- `AGENTS.md` seccion 13 — Auto memory de sub-agentes independiente del agente principal
- `AGENTS.md` anti-patrones 9 y 10 — Kitchen sink session + corregir y corregir (2 fallos = /clear)
- `CLAUDE.md` 0.4 — Path-scoped rules (`.claude/rules/` con frontmatter paths, glob patterns, symlinks)
- `CLAUDE.md` 0.4 — Compaction strategy (`/clear`, `/compact`, `/rewind`, que sobrevive y que no)
- `CLAUDE.md` 0.4 — Side questions (`/btw` para dudas que no entran en historial)
- `CLAUDE.md` 0.4 — Tamano objetivo CLAUDE.md: max 200 lineas (fuente doc oficial), poda regular
- `PLAYBOOK.md` 5.0.1 — Gestion de sesiones (naming, compaction rhythm, context hygiene, /clear obligatorio)

### Changed
- `VERSION` — 0.3.0 → 0.3.1
- `AGENTS.md` — Extendido con 4 secciones nuevas + 2 anti-patrones
- `CLAUDE.md` seccion 0.4 — Extendida con 4 subsecciones nuevas
- `PLAYBOOK.md` seccion 5 — Agregada subseccion 5.0.1 Gestion de sesiones

## [0.3.0] — 2026-05-15

### Added
- `AGENTS.md` — Protocolo de delegacion de agentes (arbol de decision, tipos, atomicidad, paralelizacion, handoff, model tiering, aislamiento de contexto, anti-patrones)
- `CLAUDE.md` seccion 0.4 — Estrategia de optimizacion de contexto (lectura por niveles L1/L2/L3, presupuesto por sesion, aislamiento via sub-agentes, Lost in the Middle, carga condicional, ciclo de vida de memoria)
- `CLAUDE.md` seccion 6 — Ordenamiento dinamico de proyectos (formula de prioridad con pesos, auto-escalado por bloqueo/zombie/estancamiento, capacidad max 3-4 activos)
- `PLAYBOOK.md` seccion 12 — Metricas de agentes (consumo de tokens, conteo de sub-agentes, tasa de exito, costo estimado, procedimiento de recoleccion)
- `FRAMEWORK.md` — Subseccion Optimizacion de Contexto + Principio 10 (delegar para aislar contexto)
- `plantillas/registry.json` — Campo `metricas_agentes` en schema de proyecto

### Changed
- `CLAUDE.md` seccion 0.3 — Agregada referencia a AGENTS.md para delegacion
- `CLAUDE.md` seccion 6 — Reescrita de lista estatica a formula dinamica con senales
- `PLAYBOOK.md` seccion 8 — Agregada subseccion Prioridad dinamica
- `PLAYBOOK.md` seccion 5.3 — Agregado paso de recoleccion de metricas de agentes
- `FRAMEWORK.md` — Agregadas referencias a AGENTS.md y CLAUDE.md 0.4
- `CLAUDE.md` (root) — Reemplazada lista estatica de prioridades con referencia a sistema dinamico
- `VERSION` — 0.2.2 → 0.3.0

## [0.2.2] — 2026-05-15

### Added
- Regla "Planeacion y Tareas Atomicas" en CLAUDE.md (seccion 0.3) y FRAMEWORK.md (Filosofia base) — regla permanente
- Modo planeacion por defecto para tareas o proyectos largos
- Tareas atomicas obligatorias para preservar consistencia entre modelos baratos/rapidos
- Memoria viva: mantener `context.md`, `status.md`, `context_proyectos.md`, `playbook_registry.json` siempre actualizados para reducir gasto de tokens
- Roles optimizan tokens: modelo elige practicas segun rol (planeador/ejecutor/revisor/auditor)
- Sprints autoverificables: bloque de N tareas atomicas cierra solo con verificacion explicita
- Orden estricto: no avanzar sin terminar anterior, salvo tareas completamente excluyentes

## [0.2.1] — 2026-05-15

### Added
- Regla "Honestidad y Precision" expandida en FRAMEWORK.md (seccion Filosofia base) y CLAUDE.md (seccion 0.2) — regla permanente
- Cubre: incertidumbre, fuentes, estadisticas, eventos recientes, personas y citas, nivel de confianza, correcciones
- Niveles de confianza obligatorios en preguntas de hecho: [Alta confianza] / [Confianza media — verifica] / [Baja confianza — verifica antes de usar]
- Regla MANDATORIA de dashboards duales en CLAUDE.md seccion 3.E y PLAYBOOK.md seccion 5.4 — siempre 4 archivos (desktop HTML+JPG, mobile HTML+JPG)
- Pipeline de captura JPG con Chrome headless 2x retina, altura medida con JS `scrollHeight`

## [0.2.0] — 2026-05-12

### Fixed
- Registry data structure: template ahora usa `proyectos` como dict, alineado con script (A1)
- Nombres de campo unificados a espanol en script y template: `clasificacion`, `proyectos` (A2)
- Template registry.json ahora es JSON valido con defaults en lugar de `{{PLACEHOLDER}}` (A3)
- ONBOARDING: eliminada referencia a `_framework_kit/` inexistente (A6)
- ONBOARDING: corregida contradiccion entre setup manual y auto-deteccion (A7)
- CLAUDE.md: eliminada seccion 3.C duplicada, renumerado C-F (B1)
- FRAMEWORK.md: eliminada referencia a PLAN.md que contradice regla minimal (B2)
- README.md: alineado umbral zombie con CLAUDE.md/PLAYBOOK.md (10d → 5+d) (B5)
- CLAUDE.md: sincronizado criterio amarillo con PLAYBOOK.md ("owner no responde 24h") (B6)
- PLAYBOOK.md: eliminadas referencias a scripts no existentes y screenshot_report.js (A4)
- PLAYBOOK.md: reemplazado ejemplo statusline con nombres genericos (C)

### Added
- Filosofia Anti-Complacencia en CLAUDE.md (seccion 0.1) y FRAMEWORK.md (Filosofia base) — regla permanente adversarial
- `.gitignore` con reglas para OS, Python, Node, y configuracion local (D2)
- `checkpoints/` directorio (A5)
- `plantillas/Next_Actions.md` — template de acciones de checkpoint
- `plantillas/AVANCES_DIARIOS.md` — template standalone de log diario
- `plantillas/MVP_BREAKDOWN.md` — template standalone de desglose MVP
- `plantillas/SECURITY.md` — template de checklist de seguridad
- `plantillas/DESIGN_SYSTEM.md` — template de sistema visual
- `plantillas/REPORTE_SEMANAL.md` — template de reporte ejecutivo
- `plantillas/CORTE_SEMANAL.md` — template LUN/MIE/VIE
- `scripts/zombie_detector.py` — deteccion automatica de proyectos zombie
- `scripts/semaforo_calculator.py` — calculo automatico de semaforos
- `scripts/validate_registry.py` — validacion de estructura del registry
- `scripts/setup.py` — wizard interactivo de onboarding
- `scripts/playbook_report.py` — stub (en desarrollo)
- `scripts/friday_report_to_html.py` — stub (en desarrollo)
- `scripts/init_project.py` — stub (en desarrollo)
- `scripts/archive_week.py` — stub (en desarrollo)
- `VERSION` — versionado semantico
- `CHANGELOG.md` — este archivo

### Changed
- `scripts/framework_status.py`: eliminado diccionario SHORT hardcodeado GO; lee `short_name` del registry (C1)
- `plantillas/registry.json`: reestructurado a `"proyectos": {dict}`, agregado campo `short_name`
- `plantillas/SEGUIMIENTO.md`: extraida seccion AVANCES DIARIOS a template standalone
- `plantillas/PROYECTO.md`: extraida seccion MVP Breakdown a template standalone
- `plantillas/PORTFOLIO.md`: eliminadas referencias a archivos fantasma
- `AUTHORS.md`, `LICENSE.md`, `CASO_DE_USO.md`: eliminado contenido GO-especifico
- `PLAYBOOK.md` seccion 11: actualizada lista de scripts a los existentes

## [0.1.0] — 2026-05-01

### Added
- Primer release del framework operativo
- CLAUDE.md, PLAYBOOK.md, FRAMEWORK.md, ONBOARDING.md
- Plantillas base: PORTFOLIO, PROYECTO, SEGUIMIENTO, registry.json
- Script framework_status.py
- README, CASO_DE_USO, LICENSE, AUTHORS, PRECIOS
