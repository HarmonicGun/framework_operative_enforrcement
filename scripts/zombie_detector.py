#!/usr/bin/env python3
"""Detecta proyectos zombie segun criterios PLAYBOOK.md seccion 8."""
import json, sys
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "playbook_registry.json"


def load():
    try:
        with open(REGISTRY) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"proyectos": {}}


def dias_desde(fecha_str):
    if not fecha_str:
        return 999
    try:
        fecha = datetime.strptime(fecha_str, "%Y-%m-%d")
        return (datetime.now() - fecha).days
    except ValueError:
        return 999


def detectar(data):
    resultado = []
    for pid, p in data.get("proyectos", {}).items():
        dias = dias_desde(p.get("ultima_entrada_diario", ""))
        semaforo = p.get("semaforo", "Verde")

        if dias >= 5 or semaforo == "Rojo":
            nivel = "ZOMBIE"
        elif dias >= 3:
            nivel = "AMARILLO"
        else:
            nivel = "OK"

        resultado.append({
            "id": pid,
            "nombre": p.get("nombre", pid),
            "dias_sin_actividad": dias,
            "ultima_entrada": p.get("ultima_entrada_diario", "nunca"),
            "nivel": nivel,
            "semaforo_actual": semaforo,
            "%_mvp": p.get("%_mvp", 0),
            "owner": p.get("owner", "?"),
        })

    resultado.sort(key=lambda x: x["dias_sin_actividad"], reverse=True)
    return resultado


def reportar(detecciones):
    zombies = [d for d in detecciones if d["nivel"] == "ZOMBIE"]
    amarillos = [d for d in detecciones if d["nivel"] == "AMARILLO"]

    print(f"=== DETECCION DE ZOMBIES ===\n")
    print(f"Zombies (5+ dias sin actividad): {len(zombies)}")
    for z in zombies:
        print(f"  {z['id']}: {z['dias_sin_actividad']}d sin actividad, MVP {z['%_mvp']}%, owner {z['owner']}")

    print(f"\nAlerta amarilla (3-4 dias): {len(amarillos)}")
    for a in amarillos:
        print(f"  {a['id']}: {a['dias_sin_actividad']}d sin actividad, MVP {a['%_mvp']}%")

    ok = [d for d in detecciones if d["nivel"] == "OK"]
    print(f"\nActivos: {len(ok)}")


if __name__ == "__main__":
    data = load()
    detecciones = detectar(data)
    reportar(detecciones)
