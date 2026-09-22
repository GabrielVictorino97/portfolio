// Operações de imagem sobre buffers RGBA planos.

/**
 * Reamostragem por área (box filter). Trabalha com alfa pré-multiplicado:
 * sem isso, pixels transparentes puxam a cor de borda para preto e os
 * stickers ganham halo escuro ao reduzir.
 */
export function resize(image, targetWidth, targetHeight) {
  const { width, height, rgba } = image;
  const out = new Uint8Array(targetWidth * targetHeight * 4);
  const scaleX = width / targetWidth;
  const scaleY = height / targetHeight;

  for (let y = 0; y < targetHeight; y++) {
    const y0 = Math.floor(y * scaleY);
    const y1 = Math.min(height, Math.max(y0 + 1, Math.ceil((y + 1) * scaleY)));

    for (let x = 0; x < targetWidth; x++) {
      const x0 = Math.floor(x * scaleX);
      const x1 = Math.min(width, Math.max(x0 + 1, Math.ceil((x + 1) * scaleX)));

      let r = 0,
        g = 0,
        b = 0,
        a = 0,
        count = 0;

      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * width + sx) * 4;
          const alpha = rgba[i + 3] / 255;
          r += rgba[i] * alpha;
          g += rgba[i + 1] * alpha;
          b += rgba[i + 2] * alpha;
          a += rgba[i + 3];
          count++;
        }
      }

      const o = (y * targetWidth + x) * 4;
      const meanAlpha = a / count;
      const unpremultiply = meanAlpha > 0 ? 255 / meanAlpha : 0;
      out[o] = Math.round((r / count) * unpremultiply);
      out[o + 1] = Math.round((g / count) * unpremultiply);
      out[o + 2] = Math.round((b / count) * unpremultiply);
      out[o + 3] = Math.round(meanAlpha);
    }
  }

  return { width: targetWidth, height: targetHeight, rgba: out };
}

/** Recorte centrado no maior quadrado possível. */
export function cropToSquare(image, focusY = 0.5) {
  const { width, height, rgba } = image;
  const side = Math.min(width, height);
  const left = Math.round((width - side) / 2);
  const top = Math.min(Math.max(0, Math.round(height * focusY - side / 2)), height - side);

  const out = new Uint8Array(side * side * 4);
  for (let y = 0; y < side; y++) {
    const from = ((top + y) * width + left) * 4;
    out.set(rgba.subarray(from, from + side * 4), y * side * 4);
  }
  return { width: side, height: side, rgba: out };
}

export function createCanvas(width, height, [r, g, b, a = 255] = [0, 0, 0, 255]) {
  const rgba = new Uint8Array(width * height * 4);
  for (let i = 0; i < rgba.length; i += 4) {
    rgba[i] = r;
    rgba[i + 1] = g;
    rgba[i + 2] = b;
    rgba[i + 3] = a;
  }
  return { width, height, rgba };
}

/** Mistura uma cor sobre o canvas respeitando a cobertura (0..1) do pixel. */
export function blendPixel(canvas, x, y, [r, g, b], coverage) {
  if (coverage <= 0) return;
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
  const i = (y * canvas.width + x) * 4;
  const k = Math.min(1, coverage);
  canvas.rgba[i] = Math.round(canvas.rgba[i] * (1 - k) + r * k);
  canvas.rgba[i + 1] = Math.round(canvas.rgba[i + 1] * (1 - k) + g * k);
  canvas.rgba[i + 2] = Math.round(canvas.rgba[i + 2] * (1 - k) + b * k);
  canvas.rgba[i + 3] = Math.max(canvas.rgba[i + 3], Math.round(255 * k));
}

export function fillRect(canvas, x, y, w, h, color) {
  for (let py = Math.round(y); py < Math.round(y + h); py++) {
    for (let px = Math.round(x); px < Math.round(x + w); px++) {
      blendPixel(canvas, px, py, color, 1);
    }
  }
}

/**
 * Desenha `source` dentro de um círculo centrado em (cx, cy).
 * Faz supersampling 3x3 na borda para não serrilhar.
 */
export function drawCircularImage(canvas, source, cx, cy, radius) {
  const left = Math.floor(cx - radius);
  const top = Math.floor(cy - radius);
  const size = Math.ceil(radius * 2);
  const scaled = resize(source, size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let hits = 0;
      for (let sy = 0; sy < 3; sy++) {
        for (let sx = 0; sx < 3; sx++) {
          const dx = left + x + (sx + 0.5) / 3 - cx;
          const dy = top + y + (sy + 0.5) / 3 - cy;
          if (dx * dx + dy * dy <= radius * radius) hits++;
        }
      }
      if (hits === 0) continue;
      const i = (y * size + x) * 4;
      const color = [scaled.rgba[i], scaled.rgba[i + 1], scaled.rgba[i + 2]];
      blendPixel(canvas, left + x, top + y, color, (hits / 9) * (scaled.rgba[i + 3] / 255));
    }
  }
}

/** Anel de contorno anti-serrilhado. */
export function strokeCircle(canvas, cx, cy, radius, thickness, color) {
  const outer = radius + thickness / 2;
  const inner = radius - thickness / 2;

  for (let y = Math.floor(cy - outer) - 1; y <= Math.ceil(cy + outer) + 1; y++) {
    for (let x = Math.floor(cx - outer) - 1; x <= Math.ceil(cx + outer) + 1; x++) {
      let hits = 0;
      for (let sy = 0; sy < 3; sy++) {
        for (let sx = 0; sx < 3; sx++) {
          const dx = x + (sx + 0.5) / 3 - cx;
          const dy = y + (sy + 0.5) / 3 - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d <= outer && d >= inner) hits++;
        }
      }
      blendPixel(canvas, x, y, color, hits / 9);
    }
  }
}
