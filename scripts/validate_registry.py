#!/usr/bin/env python3
"""Valida estructura y campos del registry.json."""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "playbook_registry.json"

CAMPOS_OBLIGATORIOS = [
    "nombre", "carpeta", "owner", "clasificacion", "fase",
    "estado", "semaforo", "%_mvp", "bloqueo_principal",
]

CLASIFICACIONES_VALIDAS = [
    "Produccion", "Piloto", "Desarrollo activo",
    "Diseno / planeacion", "Exploracion", "Confidencial",
    "Archivo", "Referencia perpetua",
]

SEMAFOROS_VALIDOS = ["Verde", "Amarillo", "Rojo", "Gris", "Excluido"]


def load():
    try:
        with open(REGISTRY) as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"ERROR: {REGISTRY} no existe.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"ERROR: JSON invalido en {REGISTRY}: {e}")
        sys.exit(1)


def validar(data):
    errores = []
    warnings = []

    if "proyectos" not in data:
        errores.append("Falta clave 'proyectos'")
        return errores, warnings

    if not isinstance(data["proyectos"], dict):
        errores.append(f"'proyectos' debe ser dict, es {type(data['proyectos']).__name__}")
        return errores, warnings

    if "metricas_departamento" not in data:
        warnings.append("Falta 'metricas_departamento'")

    for pid, p in data["proyectos"].items():
        pref = f"[{pid}]"

        for campo in CAMPOS_OBLIGATORIOS:
            if campo not in p:
                errores.append(f"{pref} falta campo obligatorio: {campo}")

        clasif = p.get("clasificacion", "")
        if clasif and clasif not in CLASIFICACIONES_VALIDAS:
            warnings.append(f"{pref} clasificacion '{clasif}' no esta en valores tipicos")

        sem = p.get("semaforo", "")
        if sem and sem not in SEMAFOROS_VALIDOS:
            errores.append(f"{pref} semaforo '{sem}' invalido. Validos: {SEMAFOROS_VALIDOS}")

        if "historial_kpi" not in p:
            warnings.append(f"{pref} sin historial_kpi")

    return errores, warnings


if __name__ == "__main__":
    data = load()
    errores, warnings = validar(data)

    if errores:
        print(f"=== {len(errores)} ERRORES ===")
        for e in errores:
            print(f"  {e}")

    if warnings:
        print(f"\n=== {len(warnings)} WARNINGS ===")
        for w in warnings:
            print(f"  {w}")

    if not errores and not warnings:
        print(f"OK: {len(data['proyectos'])} proyectos validados.")

    sys.exit(1 if errores else 0)
