# Changelog

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
