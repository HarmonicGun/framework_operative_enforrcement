# Security — {{NOMBRE_PROYECTO}}

> Checklist de seguridad. Aplica cuando hay datos, usuarios, integraciones o dinero.

---

## Checklist minimo

| Area | Pregunta | Estado |
|---|---|---|
| Secretos | Hay claves, passwords, tokens o credenciales en archivos? | |
| Auth | Hay login, roles, permisos y sesiones bien definidos? | |
| Autorizacion | El backend valida permisos o solo el frontend oculta botones? | |
| Datos | Que datos sensibles se guardan? | |
| Exposicion | Hay endpoints publicos sin proteccion? | |
| Archivos | Se validan uploads, extension, tamano y contenido? | |
| Logs | Los logs exponen secretos o datos sensibles? | |
| Backups | Los respaldos estan protegidos? | |
| Dependencias | Hay librerias obsoletas o vulnerables? | |
| Git | Se subieron secretos, bases de datos o archivos privados? | |
| Red | Hay puertos abiertos, tuneles o dominios expuestos? | |
| Errores | Los errores revelan informacion interna? | |
| Auditoria | Se puede saber quien hizo que? | |
| Recuperacion | Hay plan si algo falla? | |

---

## Checklist tecnica

- [ ] rate limiting
- [ ] brute force protection
- [ ] CSRF si aplica
- [ ] CORS
- [ ] XSS
- [ ] SQL injection
- [ ] command injection
- [ ] path traversal
- [ ] file upload abuse
- [ ] dependency audit
- [ ] secret scanning
- [ ] .env fuera de git
- [ ] cookies secure / httponly / samesite
- [ ] token expiration
- [ ] revocacion de usuarios
- [ ] backups cifrados si aplica
- [ ] principio de minimo privilegio
- [ ] separacion dev / prod
- [ ] logs sin credenciales
- [ ] validacion server-side

---

## Revision

| Fecha | Revisor | Hallazgos | Estado |
|---|---|---|---|
| {{FECHA}} | {{REVISOR}} | {{HALLAZGOS}} | Pendiente / Resuelto |
