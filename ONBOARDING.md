# ONBOARDING — Framework de Inteligencia Operativa

> Para nuevos departamentos. Tiempo de setup: 10-15 minutos.

---

## 1. Que es esto

Un sistema operativo departamental sobre Claude Code. Convierte frases naturales en acciones: sprint planning, checkpoints, reportes ejecutivos generados automaticamente por IA.

Gestiona un **pool de proyectos** — cada uno en su carpeta con stack, owner y ciclo de vida propios.

**El resultado central:** el reporte ejecutivo semanal que antes tomaba 2-3 horas se genera en 5 minutos. El agente hace el trabajo. El director solo lo lee.

---

## 2. Requisitos

- Claude Code instalado
- Carpeta raiz para el portafolio
- Saber que proyectos existen

---

## 3. Instalacion

### Paso 1: Copiar archivos del framework a la raiz

Copia estos 3 archivos desde la raiz de este repositorio a la raiz de tu portafolio:

```
CLAUDE.md
PLAYBOOK.md
FRAMEWORK.md
```

### Paso 2: Abrir Claude Code

```bash
cd /ruta/a/tu/carpeta/raiz
claude
```

CLAUDE.md se carga automaticamente. No necesitas @-mencionar nada.

### Paso 3: Activar

Escribe cualquier cosa: `hola`, `arranquemos`, `empecemos`.

El agente detecta que es primer uso (no existe `context_proyectos.md`), configura el sistema automaticamente:
- Crea `context_proyectos.md` desde `plantillas/PORTFOLIO.md`
- Crea `playbook_registry.json` desde `plantillas/registry.json`
- Revisa cada proyecto existente y crea archivos minimos si faltan
- Detecta el dia de la semana y te deja listo para trabajar

No necesitas crear archivos manualmente. El agente lo hace por ti.

**Alternativa manual:** Si prefieres configurar sin el agente, copia `plantillas/PORTFOLIO.md` a la raiz como `context_proyectos.md` y llena los datos. Luego copia `plantillas/registry.json` como `playbook_registry.json`. Pero el camino automatico es mas rapido.

---

## 4. Archivos del kit

| Archivo | Funcion |
|---|---|
| `CLAUDE.md` | Entry point del agente. Autoridad maxima. Modos de activacion. |
| `PLAYBOOK.md` | Sistema operativo: cadencia, roles, metricas, semaforos. |
| `FRAMEWORK.md` | Framework universal: fases 0-9, seguridad, diseño. |
| `ONBOARDING.md` | Este manual. |
| `README.md` | Landing y posicionamiento. |
| `CASO_DE_USO.md` | Caso real: 18 proyectos, reporte en 5 minutos. |
| `LICENSE.md` | Terminos de uso comercial. |
| `plantillas/` | Templates para portfolios y proyectos. |

---

## 5. Estructura tras instalacion

```
RAIZ/
├── CLAUDE.md
├── PLAYBOOK.md
├── FRAMEWORK.md
├── context_proyectos.md          ← creado por ti
├── playbook_registry.json        ← creado por ti
├── plantillas/                   ← templates del sistema
├── proyecto_1/
│   ├── context.md
│   ├── status.md
│   ├── BACKLOG.md
│   ├── RISKS.md
│   ├── avances_diarios.md
│   └── MVP_BREAKDOWN.md
├── proyecto_2/
└── Backups/
```

---

## 6. Flujo semanal

| Dia | Frase | Produce |
|---|---|---|
| Lun | `arranquemos un lunes mas` | Sprint planning, objetivos |
| Mar/Jue/Sab | `registra sesion` | Entrada en avances_diarios.md |
| Mie | `vamos con el checkpoint` | Bloqueos, semaforos |
| Vie | `prepara el informe` | Reporte ejecutivo, metricas |

---

## 7. Crear proyecto nuevo

1. Crea carpeta en raiz
2. Di: `hay una nueva carpeta, revisala`
3. El agente clasifica, propone owner, crea archivos minimos

Archivos minimos por proyecto: `context.md`, `status.md`, `BACKLOG.md`, `RISKS.md`, `avances_diarios.md`, `MVP_BREAKDOWN.md`

---

## 8. Plantillas disponibles

| Plantilla | Para |
|---|---|
| `plantillas/PORTFOLIO.md` | `context_proyectos.md` del departamento |
| `plantillas/registry.json` | `playbook_registry.json` |
| `plantillas/PROYECTO.md` | `context.md` + `status.md` + MVP de un proyecto |
| `plantillas/SEGUIMIENTO.md` | `BACKLOG.md` + `RISKS.md` + `avances_diarios.md` |

---

## 9. FAQ

**Menos de 3 proyectos?** Si. La cadencia se adapta.

**Cambiar frases de activacion?** Si. Edita `CLAUDE.md`.

**Compartir con otro depto?** Si. Copia la carpeta completa a la nueva ubicacion.
