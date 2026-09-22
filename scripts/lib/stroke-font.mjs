// Fonte vetorial de traço (só maiúsculas + dígitos e pontuação básica).
// Existe porque o ambiente não tem rasterizador de TTF: para os poucos
// rótulos da imagem de compartilhamento, desenhar os traços à mão sai
// mais barato que embutir um parser de fonte.
// Coordenadas normalizadas: x e y em 0..1, y crescendo para baixo.

function arc(fromDeg, toDeg, steps = 16, cx = 0.5, cy = 0.5, r = 0.5) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const deg = fromDeg + ((toDeg - fromDeg) * i) / steps;
    const rad = (deg * Math.PI) / 180;
    points.push([cx + Math.cos(rad) * r, cy - Math.sin(rad) * r]);
  }
  return points;
}

const O_RING = [...arc(90, -270, 28)];
const C_ARC = [...arc(52, 308, 20)];

// Cada traço cabe em uma linha — expandido pelo prettier, a tabela fica
// ilegível e não dá mais para comparar um glifo com o outro.
// prettier-ignore
export const GLYPHS = {
  A: [[[0, 1], [0.5, 0], [1, 1]], [[0.17, 0.62], [0.83, 0.62]]],
  B: [
    [[0, 0], [0, 1]],
    [[0, 0], [0.6, 0], [0.86, 0.13], [0.86, 0.34], [0.6, 0.47], [0, 0.47]],
    [[0, 0.47], [0.68, 0.47], [0.96, 0.62], [0.96, 0.85], [0.68, 1], [0, 1]],
  ],
  C: [C_ARC],
  D: [[[0, 0], [0, 1]], [[0, 0], [0.55, 0], [1, 0.34], [1, 0.66], [0.55, 1], [0, 1]]],
  E: [[[1, 0], [0, 0], [0, 1], [1, 1]], [[0, 0.5], [0.78, 0.5]]],
  F: [[[1, 0], [0, 0], [0, 1]], [[0, 0.5], [0.74, 0.5]]],
  G: [C_ARC, [[1, 0.52], [0.52, 0.52]], [[1, 0.3], [1, 0.72]]],
  H: [[[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 0.52], [1, 0.52]]],
  I: [[[0.5, 0], [0.5, 1]]],
  J: [[[1, 0], [1, 0.72], [0.74, 0.98], [0.3, 0.98], [0.04, 0.74]]],
  K: [[[0, 0], [0, 1]], [[1, 0], [0.05, 0.56]], [[0.36, 0.38], [1, 1]]],
  L: [[[0, 0], [0, 1], [1, 1]]],
  M: [[[0, 1], [0, 0], [0.5, 0.58], [1, 0], [1, 1]]],
  N: [[[0, 1], [0, 0], [1, 1], [1, 0]]],
  O: [O_RING],
  P: [[[0, 1], [0, 0], [0.68, 0], [0.95, 0.27], [0.68, 0.54], [0, 0.54]]],
  Q: [O_RING, [[0.64, 0.68], [1.02, 1.04]]],
  R: [[[0, 1], [0, 0], [0.68, 0], [0.95, 0.27], [0.68, 0.54], [0, 0.54]], [[0.44, 0.54], [1, 1]]],
  S: [[
    [0.94, 0.16], [0.74, 0.02], [0.36, 0], [0.08, 0.15], [0.06, 0.33],
    [0.3, 0.45], [0.64, 0.52], [0.92, 0.65], [0.94, 0.83], [0.66, 0.99],
    [0.28, 1], [0.04, 0.85],
  ]],
  T: [[[0, 0], [1, 0]], [[0.5, 0], [0.5, 1]]],
  U: [[[0, 0], [0, 0.68], [0.22, 0.95], [0.5, 1], [0.78, 0.95], [1, 0.68], [1, 0]]],
  V: [[[0, 0], [0.5, 1], [1, 0]]],
  W: [[[0, 0], [0.22, 1], [0.5, 0.34], [0.78, 1], [1, 0]]],
  X: [[[0, 0], [1, 1]], [[1, 0], [0, 1]]],
  Y: [[[0, 0], [0.5, 0.52], [1, 0]], [[0.5, 0.52], [0.5, 1]]],
  Z: [[[0, 0], [1, 0], [0, 1], [1, 1]]],
  "0": [O_RING],
  "1": [[[0.2, 0.18], [0.5, 0], [0.5, 1]]],
  "2": [[[0.04, 0.24], [0.5, 0], [0.96, 0.26], [0, 1], [1, 1]]],
  "3": [[[0.04, 0.16], [0.5, 0], [0.92, 0.24], [0.5, 0.48], [0.94, 0.74], [0.5, 1], [0.04, 0.84]]],
  "4": [[[0.78, 0], [0, 0.7], [1, 0.7]], [[0.78, 0.36], [0.78, 1]]],
  "5": [[[1, 0], [0.1, 0], [0.04, 0.44], [0.5, 0.36], [0.94, 0.62], [0.5, 1], [0.06, 0.86]]],
  "6": [[
    [0.84, 0.06], [0.5, 0], [0.2, 0.2], [0.06, 0.56], [0.08, 0.82],
    [0.3, 1], [0.62, 1], [0.86, 0.84], [0.86, 0.62], [0.62, 0.46],
    [0.3, 0.46], [0.1, 0.6],
  ]],
  "7": [[[0, 0], [1, 0], [0.34, 1]]],
  "8": [
    [[0.5, 0.48], [0.78, 0.35], [0.78, 0.13], [0.5, 0], [0.22, 0.13], [0.22, 0.35], [0.5, 0.48]],
    [[0.5, 0.48], [0.86, 0.62], [0.86, 0.86], [0.5, 1], [0.14, 0.86], [0.14, 0.62], [0.5, 0.48]],
  ],
  "9": [[
    [0.16, 0.94], [0.5, 1], [0.8, 0.8], [0.94, 0.44], [0.92, 0.18],
    [0.7, 0], [0.38, 0], [0.14, 0.16], [0.14, 0.38], [0.38, 0.54],
    [0.7, 0.54], [0.9, 0.4],
  ]],
  ".": [[[0.5, 0.94], [0.5, 1]]],
  ",": [[[0.55, 0.9], [0.4, 1.12]]],
  "-": [[[0.05, 0.54], [0.95, 0.54]]],
  "/": [[[0.9, -0.04], [0.1, 1.04]]],
  "·": [[[0.5, 0.5], [0.5, 0.56]]],
  "&": [[[1, 1], [0.24, 0.16], [0.5, 0], [0.72, 0.2], [0.05, 0.72], [0.3, 1], [0.78, 0.7]]],
  "+": [[[0.5, 0.2], [0.5, 0.86]], [[0.17, 0.53], [0.83, 0.53]]],
  "#": [
    [[0.34, 0.06], [0.22, 0.98]],
    [[0.74, 0.06], [0.62, 0.98]],
    [[0.06, 0.38], [0.9, 0.38]],
    [[0.02, 0.68], [0.86, 0.68]],
  ],
};

/** Larguras relativas — os estreitos não podem ocupar a mesma caixa dos largos. */
const NARROW = { I: 0.22, ".": 0.3, ",": 0.3, "·": 0.32, 1: 0.5, "/": 0.5, "-": 0.55 };

export function glyphWidth(char, size) {
  if (char === " ") return size * 0.42;
  return size * (NARROW[char] ?? 0.72);
}

export function measureText(text, size, tracking = 0) {
  let total = 0;
  for (const char of text) {
    total += glyphWidth(char, size) + tracking;
  }
  return total - tracking;
}

/**
 * Cobertura anti-serrilhada de um segmento espesso: distância ponto→segmento
 * comparada com a meia-espessura. Extremidades saem arredondadas de graça.
 */
function segmentCoverage(px, py, ax, ay, bx, by, halfWidth) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  let t = lengthSquared === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t));
  const nx = ax + t * dx - px;
  const ny = ay + t * dy - py;
  const distance = Math.sqrt(nx * nx + ny * ny);
  return Math.max(0, Math.min(1, halfWidth + 0.5 - distance));
}

export function drawText(canvas, blendPixel, text, x, y, options) {
  const { size, color, weight = size * 0.1, tracking = 0 } = options;
  let cursorX = x;

  for (const char of text) {
    if (char === " ") {
      cursorX += glyphWidth(char, size) + tracking;
      continue;
    }

    const strokes = GLYPHS[char];
    if (!strokes) {
      cursorX += glyphWidth(char, size) + tracking;
      continue;
    }

    const width = glyphWidth(char, size);
    const halfWidth = weight / 2;
    const pad = Math.ceil(halfWidth + 2);

    for (const polyline of strokes) {
      for (let i = 0; i < polyline.length - 1; i++) {
        const ax = cursorX + polyline[i][0] * width;
        const ay = y + polyline[i][1] * size;
        const bx = cursorX + polyline[i + 1][0] * width;
        const by = y + polyline[i + 1][1] * size;

        const minX = Math.floor(Math.min(ax, bx)) - pad;
        const maxX = Math.ceil(Math.max(ax, bx)) + pad;
        const minY = Math.floor(Math.min(ay, by)) - pad;
        const maxY = Math.ceil(Math.max(ay, by)) + pad;

        for (let py = minY; py <= maxY; py++) {
          for (let px = minX; px <= maxX; px++) {
            const coverage = segmentCoverage(px + 0.5, py + 0.5, ax, ay, bx, by, halfWidth);
            if (coverage > 0) blendPixel(canvas, px, py, color, coverage);
          }
        }
      }
    }

    cursorX += width + tracking;
  }

  return cursorX;
}
