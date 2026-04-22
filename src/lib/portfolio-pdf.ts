import { jsPDF } from "jspdf";
import logoFinanceit from "@/assets/logo-financeit.png";

async function loadImageAsDataUrl(src: string): Promise<{ data: string; w: number; h: number }> {
  const res = await fetch(src);
  const blob = await res.blob();
  const data: string = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
  const dims: { w: number; h: number } = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.width, h: img.height });
    img.onerror = reject;
    img.src = data;
  });
  return { data, w: dims.w, h: dims.h };
}

type CasoPDF = {
  especialidade: string;
  dor: { titulo: string; sintomas: string[]; descricao: string };
  diagnostico: { titulo: string; metodo: string[]; descricao: string };
  tratamento: {
    titulo: string;
    produto: string;
    intervencao: string[];
    descricao: string;
  };
};

// Brand colors (Financeit) — RGB tuples derived from index.css HSL tokens
const NAVY: [number, number, number] = [13, 27, 62]; // deep navy
const PETROL: [number, number, number] = [16, 56, 86];
const CYAN: [number, number, number] = [0, 173, 213];
const GREEN: [number, number, number] = [34, 197, 145];
const TEXT: [number, number, number] = [30, 41, 59];
const MUTED: [number, number, number] = [100, 116, 139];
const LIGHT: [number, number, number] = [241, 245, 249];

export async function generatePortfolioPDF(casos: CasoPDF[]) {
  const logo = await loadImageAsDataUrl(logoFinanceit).catch(() => null);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;

  const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);

  // ---------- COVER ----------
  setFill(NAVY);
  doc.rect(0, 0, pageW, pageH, "F");
  setFill(PETROL);
  doc.rect(0, pageH * 0.55, pageW, pageH * 0.45, "F");
  setFill(CYAN);
  doc.circle(pageW - 60, 80, 90, "F");

  // Logo on cover
  if (logo) {
    const logoW = 130;
    const logoH = (logo.h / logo.w) * logoW;
    doc.addImage(logo.data, "PNG", margin, 50, logoW, logoH);
  } else {
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("FINANCEIT", margin, 70);
  }
  setText(CYAN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("CLÍNICA DE EXCELÊNCIA EM DADOS, BI, IA E TALENTOS", margin, 110);

  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(38);
  doc.text("Portfólio", margin, pageH / 2 - 30);
  doc.text("de Soluções", margin, pageH / 2 + 14);

  setText(CYAN);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Diagnosticamos a dor. Prescrevemos a cura.", margin, pageH / 2 + 50);

  setText([220, 230, 245]);
  doc.setFontSize(11);
  const pitch = doc.splitTextToSize(
    "Não vendemos soluções de prateleira. Como uma clínica especializada, examinamos cada paciente, identificamos a doença real e prescrevemos o tratamento que cura — com método, governança e velocidade até o resultado final.",
    contentW - 40,
  );
  doc.text(pitch, margin, pageH - 160);

  setText([180, 200, 220]);
  doc.setFontSize(9);
  doc.text("financeit.com.br  ·  Documento institucional", margin, pageH - 40);

  // ---------- MANIFESTO ----------
  doc.addPage();
  drawHeader(doc, pageW, margin, logo);
  let y = 130;

  setText(NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Nosso método clínico", margin, y);
  y += 10;
  setDraw(CYAN);
  doc.setLineWidth(2);
  doc.line(margin, y, margin + 60, y);
  y += 30;

  setText(TEXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const intro = doc.splitTextToSize(
    "No mercado de tecnologia, é comum prescrever ferramentas antes de entender a dor e a real necessidade. A Financeit faz o oposto: ouvimos, examinamos, diagnosticamos — e só então prescrevemos o tratamento que cura. A seguir, as especialidades que tratamos e os resultados que entregamos.",
    contentW,
  );
  doc.text(intro, margin, y);
  y += intro.length * 15 + 20;

  const pillars = [
    { t: "1. Anamnese", d: "Entrevistas e mergulho no contexto real do negócio." },
    { t: "2. Exames", d: "Análise técnica de dados, processos, pessoas e tecnologia." },
    { t: "3. Diagnóstico", d: "Hipótese clara de causa-raiz, não de sintoma." },
    { t: "4. Tratamento", d: "Plano executável, mensurável e com responsáveis." },
    { t: "5. Acompanhamento", d: "Recuperação até o resultado — paciente 100% satisfeito." },
  ];
  pillars.forEach((p) => {
    setFill(LIGHT);
    doc.roundedRect(margin, y, contentW, 46, 6, 6, "F");
    setText(NAVY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(p.t, margin + 14, y + 20);
    setText(MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(p.d, margin + 14, y + 36);
    y += 56;
  });

  drawFooter(doc, pageW, pageH, margin);

  // ---------- ESPECIALIDADES ----------
  casos.forEach((caso, idx) => {
    doc.addPage();
    drawHeader(doc, pageW, margin, logo);

    let cy = 130;

    // Specialty number badge
    setFill(CYAN);
    doc.roundedRect(margin, cy - 18, 56, 22, 4, 4, "F");
    setText([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`ESP. ${String(idx + 1).padStart(2, "0")}`, margin + 8, cy - 3);

    setText(NAVY);
    doc.setFontSize(20);
    const title = doc.splitTextToSize(caso.especialidade, contentW);
    doc.text(title, margin, cy + 20);
    cy += 20 + title.length * 22;

    setDraw(CYAN);
    doc.setLineWidth(2);
    doc.line(margin, cy, margin + 60, cy);
    cy += 24;

    cy = drawBlock(
      doc,
      margin,
      cy,
      contentW,
      "DOR",
      caso.dor.titulo,
      caso.dor.descricao,
      caso.dor.sintomas,
      [220, 38, 38], // red-ish for pain
    );
    cy += 14;

    cy = drawBlock(
      doc,
      margin,
      cy,
      contentW,
      "DIAGNÓSTICO",
      caso.diagnostico.titulo,
      caso.diagnostico.descricao,
      caso.diagnostico.metodo,
      PETROL,
    );
    cy += 14;

    cy = drawBlock(
      doc,
      margin,
      cy,
      contentW,
      `TRATAMENTO · ${caso.tratamento.produto}`,
      caso.tratamento.titulo,
      caso.tratamento.descricao,
      caso.tratamento.intervencao,
      GREEN,
    );

    drawFooter(doc, pageW, pageH, margin);
  });

  // ---------- CTA FINAL ----------
  doc.addPage();
  setFill(NAVY);
  doc.rect(0, 0, pageW, pageH, "F");
  setFill(CYAN);
  doc.circle(80, pageH - 80, 120, "F");

  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  const ctaTitle = doc.splitTextToSize(
    "O nosso compromisso é com a sua cura — não com a venda.",
    contentW,
  );
  doc.text(ctaTitle, margin, pageH / 2 - 40);

  setText([200, 220, 240]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const ctaText = doc.splitTextToSize(
    "Se sua empresa sente algum desses sintomas, a primeira consulta é por nossa conta. Vamos ouvir, examinar e desenhar com você o tratamento certo — até o resultado final, com o paciente 100% satisfeito.",
    contentW - 40,
  );
  doc.text(ctaText, margin, pageH / 2 + 10);

  setFill(CYAN);
  doc.roundedRect(margin, pageH / 2 + 90, 240, 44, 6, 6, "F");
  setText([255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Agendar consulta estratégica", margin + 24, pageH / 2 + 117);

  setText([180, 200, 220]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("financeit.com.br  ·  contato@financeit.com.br", margin, pageH - 40);

  doc.save("financeit-portfolio-solucoes.pdf");
}

function drawHeader(
  doc: jsPDF,
  pageW: number,
  margin: number,
  logo: { data: string; w: number; h: number } | null,
) {
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.rect(0, 0, pageW, 60, "F");
  doc.setFillColor(CYAN[0], CYAN[1], CYAN[2]);
  doc.rect(0, 60, pageW, 3, "F");
  if (logo) {
    const logoH = 32;
    const logoW = (logo.w / logo.h) * logoH;
    doc.addImage(logo.data, "PNG", margin, 14, logoW, logoH);
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("FINANCEIT", margin, 36);
  }
  doc.setTextColor(CYAN[0], CYAN[1], CYAN[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Portfólio de Soluções", pageW - margin, 36, { align: "right" });
}

function drawFooter(doc: jsPDF, pageW: number, pageH: number, margin: number) {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, pageH - 40, pageW - margin, pageH - 40);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Financeit · Diagnosticamos a dor. Prescrevemos a cura.", margin, pageH - 24);
  const page = doc.getNumberOfPages();
  doc.text(`${page}`, pageW - margin, pageH - 24, { align: "right" });
}

function drawBlock(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  label: string,
  titulo: string,
  descricao: string,
  bullets: string[],
  accent: [number, number, number],
): number {
  const padding = 16;
  const titleLines = doc.splitTextToSize(titulo, w - padding * 2);
  const descLines = doc.splitTextToSize(descricao, w - padding * 2);
  const bulletLines = bullets.map((b) => doc.splitTextToSize(`• ${b}`, w - padding * 2 - 10));
  const bulletHeight = bulletLines.reduce((acc, l) => acc + l.length * 13, 0);
  const blockH =
    padding + 14 + titleLines.length * 16 + 8 + descLines.length * 13 + 10 + bulletHeight + padding;

  // Soft card background
  doc.setFillColor(LIGHT[0], LIGHT[1], LIGHT[2]);
  doc.roundedRect(x, y, w, blockH, 8, 8, "F");
  // Accent left bar
  doc.setFillColor(accent[0], accent[1], accent[2]);
  doc.roundedRect(x, y, 4, blockH, 2, 2, "F");

  let cy = y + padding;

  doc.setTextColor(accent[0], accent[1], accent[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(label, x + padding, cy);
  cy += 16;

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFontSize(13);
  doc.text(titleLines, x + padding, cy);
  cy += titleLines.length * 16 + 4;

  doc.setTextColor(TEXT[0], TEXT[1], TEXT[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(descLines, x + padding, cy);
  cy += descLines.length * 13 + 8;

  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.setFontSize(10);
  bulletLines.forEach((bl) => {
    doc.text(bl, x + padding, cy);
    cy += bl.length * 13;
  });

  return y + blockH;
}
