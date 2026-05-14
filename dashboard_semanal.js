const puppeteer = require("puppeteer");
const path = require("path");

// DATA: sustituir con datos reales del playbook_registry.json
// Este archivo es un template. Los datos de ejemplo usan los proyectos ficticios de examples/.
const DATA = {
  semana: "DD — DD Mes 20YY",
  generado: "Viernes DD Mes 20YY",
  proyectos: [
    {
      nombre: "Proyecto Alfa",
      owner: "Ana",
      fase: "Fase 8 — Produccion",
      estado: "Estable",
      semaforo: "green",
      commits: 24,
      prs: 3,
      diasActivo: 5,
      pctMVP: "95%",
      tests: "120/120",
      bugsCerrados: 5,
      highlights: [
        "API estable 99.9% uptime",
        "Onboarding completado",
        "Monitorizacion activa",
        "Backups automatizados",
      ],
    },
    {
      nombre: "Proyecto Beta",
      owner: "Luis",
      fase: "Fase 5 — Build",
      estado: "Desarrollo activo",
      semaforo: "yellow",
      commits: 12,
      prs: 2,
      diasActivo: 3,
      pctMVP: "60%",
      tests: "45/50",
      bugsCerrados: 3,
      highlights: [
        "Modulo principal funcionando",
        "Integracion pendiente",
        "Bloqueo: esperando acceso API externo",
        "Sprint 3 completado",
      ],
    },
    {
      nombre: "Proyecto Gamma",
      owner: "Carlos",
      fase: "Fase 2 — Clasificacion",
      estado: "En diseno",
      semaforo: "red",
      commits: 0,
      prs: 0,
      diasActivo: 0,
      pctMVP: "10%",
      tests: "N/D",
      bugsCerrados: 0,
      highlights: [
        "Propuesta inicial entregada",
        "Esperando decision de sponsor",
        "Sin actividad 27 dias",
      ],
    },
  ],
  resumen: {
    totalCommits: 36,
    totalPRs: 5,
    totalBugs: 8,
    proyectosActivos: 2,
  },
};

const semaforoColor = {
  green: "#22c55e",
  yellow: "#eab308",
  red: "#ef4444",
};

function buildHTML() {
  const rows = DATA.proyectos
    .map(
      (p) => `
    <div class="card">
      <div class="card-header">
        <div class="proj-name">
          <span class="dot" style="background:${semaforoColor[p.semaforo]}"></span>
          ${p.nombre}
        </div>
        <span class="badge">${p.fase}</span>
      </div>
      <div class="card-body">
        <div class="kpi-row">
          <div class="kpi">
            <span class="kpi-val">${p.commits}</span>
            <span class="kpi-label">Commits</span>
          </div>
          <div class="kpi">
            <span class="kpi-val">${p.prs}</span>
            <span class="kpi-label">PRs</span>
          </div>
          <div class="kpi">
            <span class="kpi-val">${p.diasActivo}/6</span>
            <span class="kpi-label">Días</span>
          </div>
          <div class="kpi">
            <span class="kpi-val">${p.bugsCerrados}</span>
            <span class="kpi-label">Bugs</span>
          </div>
          <div class="kpi">
            <span class="kpi-val">${p.tests}</span>
            <span class="kpi-label">Tests</span>
          </div>
        </div>
        <div class="hl-list">
          ${p.highlights.map((h) => `<span class="hl">${h}</span>`).join("")}
        </div>
        <div class="meta">Owner: ${p.owner} · MVP: ${p.pctMVP}</div>
      </div>
    </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=375, initial-scale=1.0">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 375px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    padding: 16px;
  }
  .hero {
    background: linear-gradient(135deg, #FB670B 0%, #ea580c 100%);
    border-radius: 14px;
    padding: 18px 16px;
    margin-bottom: 14px;
    text-align: center;
  }
  .hero h1 { font-size: 17px; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
  .hero .sub { font-size: 11px; color: rgba(255,255,255,0.85); margin-top: 3px; }
  .summary {
    display: flex;
    gap: 8px;
    margin-bottom: 14px;
  }
  .summary-box {
    flex:1;
    background: #1e293b;
    border-radius: 10px;
    padding: 10px 6px;
    text-align: center;
  }
  .summary-box .val { font-size: 20px; font-weight: 800; color: #FB670B; }
  .summary-box .lbl { font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
  .card {
    background: #1e293b;
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 10px;
    border-left: 3px solid #FB670B;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .proj-name {
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
  .badge {
    font-size: 9px;
    background: #334155;
    color: #cbd5e1;
    padding: 3px 8px;
    border-radius: 20px;
  }
  .kpi-row { display: flex; gap: 6px; margin-bottom: 10px; }
  .kpi {
    flex: 1;
    background: #0f172a;
    border-radius: 8px;
    padding: 8px 4px;
    text-align: center;
  }
  .kpi-val { display: block; font-size: 15px; font-weight: 800; color: #f8fafc; }
  .kpi-label { display: block; font-size: 8px; color: #64748b; margin-top: 1px; text-transform: uppercase; }
  .hl-list { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
  .hl {
    font-size: 9px;
    background: #334155;
    color: #e2e8f0;
    padding: 3px 7px;
    border-radius: 4px;
  }
  .meta { font-size: 10px; color: #64748b; }
  .footer {
    text-align: center;
    font-size: 9px;
    color: #475569;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid #1e293b;
  }
  .footer span { color: #FB670B; }
</style>
</head>
<body>
  <div class="hero">
    <h1>KPI Dashboard · Inteligencia Operativa</h1>
    <div class="sub">Semana ${DATA.semana} · ${DATA.generado}</div>
  </div>
  <div class="summary">
    <div class="summary-box"><span class="val">${DATA.resumen.totalCommits}</span><span class="lbl">Commits</span></div>
    <div class="summary-box"><span class="val">${DATA.resumen.totalPRs}</span><span class="lbl">PRs</span></div>
    <div class="summary-box"><span class="val">${DATA.resumen.totalBugs}</span><span class="lbl">Bugs</span></div>
    <div class="summary-box"><span class="val">${DATA.resumen.proyectosActivos}</span><span class="lbl">Proyectos</span></div>
  </div>
  ${rows}
  <div class="footer">Framework Operativo · <span>#FB670B</span></div>
</body>
</html>`;
}

async function main() {
  const html = buildHTML();
  const htmlPath = path.resolve(__dirname, "dashboard_semanal.html");
  const imgPath = path.resolve(__dirname, "dashboard_semanal.png");
  require("fs").writeFileSync(htmlPath, html);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 1200, deviceScaleFactor: 2 });
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });

  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width: 375, height: bodyHeight + 20, deviceScaleFactor: 2 });

  await page.screenshot({ path: imgPath, fullPage: true });
  await browser.close();

  console.log(`HTML: ${htmlPath}`);
  console.log(`PNG:  ${imgPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
