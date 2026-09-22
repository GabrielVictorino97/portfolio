// Gera og-image.png (cartão de compartilhamento) e apple-touch-icon.png.
// Mantido no repo como documentação executável: se a foto ou o headline
// mudarem, rode `node scripts/generate-brand-assets.mjs` de novo.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { decodePng, encodePng } from "./lib/png.mjs";
import {
  blendPixel,
  createCanvas,
  drawCircularImage,
  fillRect,
  strokeCircle,
} from "./lib/raster.mjs";
import { drawText, measureText } from "./lib/stroke-font.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

// Mesmas cores do site (src/styles.css), convertidas de oklch para sRGB.
const BACKGROUND = [27, 28, 32];
const SURFACE = [36, 37, 42];
const FOREGROUND = [244, 245, 247];
const MUTED = [150, 153, 162];
const ACCENT = [52, 211, 153];

const NAME = "GABRIEL VICTORINO";
const ROLE = "TECH LEAD · SOFTWARE ENGINEER";
const STACK = "C# · .NET · PYTHON · KUBERNETES · AZURE";
const DOMAIN = "GVSOLUCOESDIGITAIS.COM";

/** Degradê diagonal sutil — evita o fundo chapado sem virar ruído. */
function paintBackground(canvas) {
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const t = (x / canvas.width) * 0.6 + (1 - y / canvas.height) * 0.4;
      const color = [
        Math.round(BACKGROUND[0] + (SURFACE[0] - BACKGROUND[0]) * t),
        Math.round(BACKGROUND[1] + (SURFACE[1] - BACKGROUND[1]) * t),
        Math.round(BACKGROUND[2] + (SURFACE[2] - BACKGROUND[2]) * t),
      ];
      blendPixel(canvas, x, y, color, 1);
    }
  }
}

/** Encolhe o corpo até caber na largura disponível. */
function fitSize(text, preferredSize, maxWidth, tracking) {
  let size = preferredSize;
  while (size > 8 && measureText(text, size, tracking * size) > maxWidth) {
    size -= 1;
  }
  return size;
}

function buildOgImage(photo) {
  const canvas = createCanvas(1200, 630, [...BACKGROUND, 255]);
  paintBackground(canvas);

  // Barra de acento no topo.
  fillRect(canvas, 0, 0, canvas.width, 6, ACCENT);

  const photoCenterX = 250;
  const photoCenterY = 315;
  const photoRadius = 148;
  drawCircularImage(canvas, photo, photoCenterX, photoCenterY, photoRadius);
  strokeCircle(canvas, photoCenterX, photoCenterY, photoRadius + 6, 2, [70, 72, 80]);

  const textLeft = 452;
  const maxTextWidth = canvas.width - textLeft - 72;

  // Tracking generoso: com traço fino, a perna do "A" encosta na haste do "B".
  const nameTracking = 0.09;
  const nameSize = fitSize(NAME, 58, maxTextWidth, nameTracking);
  drawText(canvas, blendPixel, NAME, textLeft, 196, {
    size: nameSize,
    color: FOREGROUND,
    weight: nameSize * 0.11,
    tracking: nameSize * nameTracking,
  });

  const roleTracking = 0.13;
  const roleSize = fitSize(ROLE, 22, maxTextWidth, roleTracking);
  drawText(canvas, blendPixel, ROLE, textLeft, 292, {
    size: roleSize,
    color: MUTED,
    weight: roleSize * 0.11,
    tracking: roleSize * roleTracking,
  });

  fillRect(canvas, textLeft, 348, 88, 2, [70, 72, 80]);

  const stackTracking = 0.09;
  const stackSize = fitSize(STACK, 20, maxTextWidth, stackTracking);
  drawText(canvas, blendPixel, STACK, textLeft, 392, {
    size: stackSize,
    color: MUTED,
    weight: stackSize * 0.11,
    tracking: stackSize * stackTracking,
  });

  const domainTracking = 0.12;
  const domainSize = fitSize(DOMAIN, 18, maxTextWidth, domainTracking);
  drawText(canvas, blendPixel, DOMAIN, textLeft, 470, {
    size: domainSize,
    color: ACCENT,
    weight: domainSize * 0.11,
    tracking: domainSize * domainTracking,
  });

  return canvas;
}

function buildTouchIcon(size) {
  const canvas = createCanvas(size, size, [...BACKGROUND, 255]);
  paintBackground(canvas);

  const glyphSize = size * 0.4;
  const tracking = glyphSize * 0.06;
  const width = measureText("GV", glyphSize, tracking);
  drawText(canvas, blendPixel, "GV", (size - width) / 2, (size - glyphSize) / 2, {
    size: glyphSize,
    color: FOREGROUND,
    weight: glyphSize * 0.12,
    tracking,
  });

  fillRect(canvas, size * 0.34, size * 0.76, size * 0.32, Math.max(2, size * 0.02), ACCENT);
  return canvas;
}

fs.mkdirSync(publicDir, { recursive: true });

const photo = decodePng(fs.readFileSync(path.join(root, "src", "assets", "gabriel.png")));

const outputs = [
  ["og-image.png", buildOgImage(photo)],
  ["apple-touch-icon.png", buildTouchIcon(180)],
];

for (const [name, canvas] of outputs) {
  const encoded = encodePng(canvas);
  fs.writeFileSync(path.join(publicDir, name), encoded);
  console.log(
    `  ✓ public/${name.padEnd(22)} ${canvas.width}×${canvas.height}  ${(encoded.length / 1024).toFixed(0)} KB`,
  );
}
