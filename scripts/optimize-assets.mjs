// Reduz os assets para o tamanho em que são realmente exibidos.
// Idempotente: pula o arquivo que já está no tamanho alvo.
// Os originais em alta continuam no histórico do git.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { decodePng, encodePng } from "./lib/png.mjs";
import { cropToSquare, resize } from "./lib/raster.mjs";

const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "assets");

// Exibida a 128px (mobile) / 144px (sm). 384px cobre telas 2.5x.
const PHOTO = { file: "gabriel.png", size: 384, focusY: 0.42 };
// Maior uso é o sticker flutuante a 72px (lg). 160px cobre 2.2x.
const STICKER_SIZE = 160;

function format(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function optimize(file, transform) {
  const filePath = path.join(assetsDir, file);
  const before = fs.statSync(filePath).size;
  const image = decodePng(fs.readFileSync(filePath));

  const result = transform(image);
  if (!result) {
    console.log(`  = ${file.padEnd(26)} já otimizado (${image.width}px)`);
    return { before, after: before };
  }

  const encoded = encodePng(result);
  fs.writeFileSync(filePath, encoded);
  const saved = (1 - encoded.length / before) * 100;
  console.log(
    `  ✓ ${file.padEnd(26)} ${image.width}×${image.height} → ${result.width}×${result.height}` +
      `  ${format(before)} → ${format(encoded.length)}  (-${saved.toFixed(0)}%)`,
  );
  return { before, after: encoded.length };
}

console.log("Otimizando assets:\n");
let totalBefore = 0;
let totalAfter = 0;

const photo = optimize(PHOTO.file, (image) => {
  if (image.width <= PHOTO.size && image.height <= PHOTO.size) return null;
  return resize(cropToSquare(image, PHOTO.focusY), PHOTO.size, PHOTO.size);
});
totalBefore += photo.before;
totalAfter += photo.after;

const stickers = fs
  .readdirSync(assetsDir)
  .filter((f) => f.startsWith("sticker-") && f.endsWith(".png"))
  .sort();

for (const file of stickers) {
  const { before, after } = optimize(file, (image) => {
    if (image.width <= STICKER_SIZE) return null;
    return resize(image, STICKER_SIZE, STICKER_SIZE);
  });
  totalBefore += before;
  totalAfter += after;
}

console.log(
  `\nTotal: ${format(totalBefore)} → ${format(totalAfter)} ` +
    `(-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`,
);
