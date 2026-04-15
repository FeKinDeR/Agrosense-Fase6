import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outDir = path.join(rootDir, 'docs', 'uml');
const outFile = path.join(outDir, 'agrosense-component-uml.pdf');

fs.mkdirSync(outDir, { recursive: true });

const page = {
  width: 842,
  height: 595,
  margin: 28,
};

const colors = {
  ink: '#16323a',
  muted: '#52666d',
  line: '#7ea6a6',
  frame: '#d7e5e4',
  brand: '#0e7679',
  brandSoft: '#dfeeed',
  accent: '#45888b',
  surface: '#ffffff',
  surfaceAlt: '#f6fbfb',
  storage: '#eef4ff',
  storageStroke: '#9ebae2',
  note: '#fff6dd',
  noteStroke: '#d7bf6b',
};

const commands = [];

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const int = Number.parseInt(value, 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
}

function fmt(num) {
  return Number(num).toFixed(2).replace(/\.00$/, '');
}

function pdfEscape(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function drawRect(x, yTop, width, height, options = {}) {
  const y = page.height - yTop - height;
  const [sr, sg, sb] = hexToRgb(options.stroke || colors.line);
  const [fr, fg, fb] = hexToRgb(options.fill || colors.surface);
  const lineWidth = options.lineWidth || 1;
  commands.push(`${fmt(lineWidth)} w`);
  commands.push(`${fmt(sr)} ${fmt(sg)} ${fmt(sb)} RG`);
  commands.push(`${fmt(fr)} ${fmt(fg)} ${fmt(fb)} rg`);
  commands.push(`${fmt(x)} ${fmt(y)} ${fmt(width)} ${fmt(height)} re B`);
}

function drawLine(x1, y1Top, x2, y2Top, options = {}) {
  const y1 = page.height - y1Top;
  const y2 = page.height - y2Top;
  const [r, g, b] = hexToRgb(options.color || colors.line);
  const lineWidth = options.lineWidth || 1.2;
  commands.push(`${fmt(lineWidth)} w`);
  commands.push(`${fmt(r)} ${fmt(g)} ${fmt(b)} RG`);
  commands.push(`${fmt(x1)} ${fmt(y1)} m ${fmt(x2)} ${fmt(y2)} l S`);
}

function drawArrow(x1, y1, x2, y2, options = {}) {
  drawLine(x1, y1, x2, y2, options);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = options.arrowSize || 8;
  const a1 = angle + Math.PI - Math.PI / 7;
  const a2 = angle + Math.PI + Math.PI / 7;
  const p1 = { x: x2 + Math.cos(a1) * size, y: y2 + Math.sin(a1) * size };
  const p2 = { x: x2 + Math.cos(a2) * size, y: y2 + Math.sin(a2) * size };
  drawLine(x2, y2, p1.x, p1.y, options);
  drawLine(x2, y2, p2.x, p2.y, options);
}

function drawText(text, x, yTop, options = {}) {
  const y = page.height - yTop;
  const size = options.size || 11;
  const font = options.font || 'F1';
  const [r, g, b] = hexToRgb(options.color || colors.ink);
  commands.push('BT');
  commands.push(`/${font} ${fmt(size)} Tf`);
  commands.push(`${fmt(r)} ${fmt(g)} ${fmt(b)} rg`);
  commands.push(`${fmt(x)} ${fmt(y)} Td`);
  commands.push(`(${pdfEscape(text)}) Tj`);
  commands.push('ET');
}

function drawWrappedText(text, x, yTop, width, options = {}) {
  const size = options.size || 11;
  const lineHeight = options.lineHeight || size * 1.35;
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const estimatedWidth = candidate.length * size * 0.52;
    if (estimatedWidth > width && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  lines.forEach((line, index) => {
    drawText(line, x, yTop + index * lineHeight, options);
  });
}

function drawComponent(box) {
  drawRect(box.x, box.y, box.w, box.h, {
    fill: box.fill || colors.surface,
    stroke: box.stroke || colors.line,
    lineWidth: 1.1,
  });
  drawRect(box.x, box.y, box.w, 28, {
    fill: box.headerFill || colors.brandSoft,
    stroke: box.stroke || colors.line,
    lineWidth: 1.1,
  });
  drawText(box.title, box.x + 12, box.y + 18, {
    size: 13,
    color: colors.brand,
    font: 'F2',
  });
  if (box.subtitle) {
    drawText(box.subtitle, box.x + 12, box.y + 39, {
      size: 9,
      color: colors.muted,
    });
  }
  let cursor = box.subtitle ? box.y + 58 : box.y + 44;
  for (const line of box.lines) {
    drawWrappedText(`- ${line}`, box.x + 14, cursor, box.w - 28, {
      size: 9.5,
      color: colors.ink,
      lineHeight: 12.5,
    });
    cursor += 14;
  }
}

drawRect(0, 0, page.width, page.height, {
  fill: colors.surfaceAlt,
  stroke: colors.surfaceAlt,
  lineWidth: 0,
});

drawRect(page.margin, 18, page.width - page.margin * 2, 62, {
  fill: colors.surface,
  stroke: colors.frame,
  lineWidth: 1,
});
drawText('AgroSense - UML de Componentes', 44, 44, {
  size: 21,
  font: 'F2',
  color: colors.brand,
});
drawText('Arquitetura do frontend React e seus fluxos principais', 44, 64, {
  size: 10.5,
  color: colors.muted,
});
drawText('Projeto analisado em 2026-04-15 | Gerado automaticamente a partir da estrutura atual', 500, 64, {
  size: 8.5,
  color: colors.muted,
});

const boxes = {
  main: {
    x: 40, y: 110, w: 160, h: 78,
    title: 'main.jsx',
    subtitle: 'Ponto de entrada',
    lines: [
      'Renderiza App dentro de StrictMode',
      'Inicializa React DOM no elemento root',
    ],
  },
  app: {
    x: 245, y: 100, w: 240, h: 160,
    title: 'App.jsx',
    subtitle: 'Orquestrador central',
    lines: [
      'Gerencia telaAtiva, isLogged e darkMode',
      'Decide qual pagina renderizar',
      'Persiste darkMode e isLogged no localStorage',
      'Coordena Header, Footer, Login, Dashboard e demais telas',
    ],
  },
  header: {
    x: 530, y: 105, w: 250, h: 118,
    title: 'Header.jsx',
    subtitle: 'Navegacao superior',
    lines: [
      'Recebe estado da tela ativa',
      'Dispara navegacao e troca de tema',
      'Exibe MenuPerfil quando usuario esta logado',
    ],
  },
  footer: {
    x: 530, y: 245, w: 250, h: 95,
    title: 'Footer.jsx',
    subtitle: 'Navegacao inferior',
    lines: [
      'Oferece atalhos para telas institucionais',
      'Reutiliza setTelaAtiva enviado por App',
    ],
  },
  menuPerfil: {
    x: 530, y: 360, w: 250, h: 110,
    title: 'MenuPerfil.jsx',
    subtitle: 'Menu contextual do usuario',
    lines: [
      'Controla dropdown local',
      'Encaminha logout e troca de tela',
      'Depende do estado isLogged vindo do App',
    ],
  },
  pages: {
    x: 235, y: 300, w: 260, h: 235,
    title: 'Paginas de dominio',
    subtitle: 'Renderizacao condicional em App',
    lines: [
      'Login.jsx -> autentica localmente e aciona onLogin',
      'Dashboard.jsx -> mostra telemetria simulada',
      'Contato.jsx -> valida formulario e grava mensagens',
      'AdminPanel.jsx -> lista e remove mensagens salvas',
      'Equipe.jsx -> mostra membros e valores do projeto',
      'TecnologiasAgronegocios.jsx -> vitrine de tecnologias',
    ],
  },
  sobreFlow: {
    x: 40, y: 300, w: 160, h: 175,
    title: 'Fluxo Sobre',
    subtitle: 'Composicao interna',
    lines: [
      'Sobre.jsx monta cardsData',
      'CardsPagina.jsx pagina colecao',
      'Card.jsx expande detalhes e aciona callbacks',
    ],
  },
  storage: {
    x: 40, y: 500, w: 740, h: 58,
    title: 'Persistencia no navegador',
    subtitle: 'Dependencias externas do frontend',
    fill: colors.storage,
    stroke: colors.storageStroke,
    headerFill: '#dce9fb',
    lines: [
      'localStorage.darkMode e localStorage.isLogged sao lidos por App.jsx',
      'localStorage.mensagens e compartilhado entre Contato.jsx e AdminPanel.jsx',
    ],
  },
  note: {
    x: 620, y: 490, w: 160, h: 55,
    title: 'Observacao',
    subtitle: '',
    fill: colors.note,
    stroke: colors.noteStroke,
    headerFill: '#ffefbd',
    lines: [
      'Cards.js parece legado e nao e importado pelo fluxo atual',
    ],
  },
};

Object.values(boxes).forEach(drawComponent);

drawArrow(200, 149, 245, 149, { color: colors.brand, lineWidth: 1.5 });
drawArrow(485, 145, 530, 145, { color: colors.brand, lineWidth: 1.5 });
drawArrow(485, 285, 530, 285, { color: colors.brand, lineWidth: 1.5 });
drawArrow(655, 223, 655, 360, { color: colors.accent, lineWidth: 1.4 });
drawArrow(370, 260, 370, 300, { color: colors.brand, lineWidth: 1.5 });
drawArrow(200, 387, 235, 387, { color: colors.accent, lineWidth: 1.4 });
drawArrow(120, 475, 120, 500, { color: colors.accent, lineWidth: 1.3 });
drawArrow(370, 535, 370, 558, { color: colors.accent, lineWidth: 1.3 });
drawArrow(370, 535, 370, 500, { color: colors.accent, lineWidth: 1.3 });

drawText('renderiza', 214, 141, { size: 8.5, color: colors.muted });
drawText('compoe', 494, 137, { size: 8.5, color: colors.muted });
drawText('compoe', 494, 277, { size: 8.5, color: colors.muted });
drawText('usa quando logado', 664, 300, { size: 8.5, color: colors.muted });
drawText('roteia paginas', 380, 280, { size: 8.5, color: colors.muted });
drawText('estrutura', 165, 379, { size: 8.5, color: colors.muted });
drawText('usa', 128, 490, { size: 8.5, color: colors.muted });
drawText('le / grava', 379, 520, { size: 8.5, color: colors.muted });

drawRect(40, 82, 112, 18, {
  fill: colors.brandSoft,
  stroke: colors.frame,
  lineWidth: 0.8,
});
drawText('Diagrama UML', 52, 95, { size: 9, font: 'F2', color: colors.brand });

drawRect(165, 82, 170, 18, {
  fill: colors.storage,
  stroke: colors.frame,
  lineWidth: 0.8,
});
drawText('Componente + persistencia', 177, 95, { size: 9, color: colors.ink });

drawText('Legenda: caixas representam componentes React ou agrupamentos funcionais.', 355, 95, {
  size: 8.8,
  color: colors.muted,
});

const content = commands.join('\n');

const objects = [];
function addObject(value) {
  objects.push(value);
  return objects.length;
}

const font1 = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
const font2 = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
const contentId = addObject(`<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`);
const pageId = addObject(
  `<< /Type /Page /Parent 5 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> >> /Contents ${contentId} 0 R >>`
);
const pagesId = addObject(`<< /Type /Pages /Count 1 /Kids [${pageId} 0 R] >>`);
const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

let pdf = '%PDF-1.4\n';
const offsets = [0];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, 'utf8'));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, 'utf8');
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';

for (let i = 1; i <= objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

fs.writeFileSync(outFile, pdf, 'binary');
console.log(`PDF gerado em: ${outFile}`);
