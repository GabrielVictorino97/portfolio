// Leitor/escritor de PNG sem dependências (node:zlib cobre deflate + crc32).
// Suporta o subconjunto que os assets deste repo usam: 8 bits por canal,
// color type 2 (RGB) ou 6 (RGBA), sem entrelaçamento.
import zlib from "node:zlib";

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/** @returns {{ width: number, height: number, rgba: Uint8Array }} */
export function decodePng(buffer) {
  if (!buffer.subarray(0, 8).equals(SIGNATURE)) {
    throw new Error("Assinatura PNG inválida");
  }

  let width = 0;
  let height = 0;
  let channels = 0;
  const idatParts = [];
  let offset = 8;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      const bitDepth = data[8];
      const colorType = data[9];
      const interlace = data[12];
      if (bitDepth !== 8) throw new Error(`bit depth ${bitDepth} não suportado`);
      if (interlace !== 0) throw new Error("PNG entrelaçado não suportado");
      if (colorType === 2) channels = 3;
      else if (colorType === 6) channels = 4;
      else throw new Error(`color type ${colorType} não suportado`);
    } else if (type === "IDAT") {
      idatParts.push(Buffer.from(data));
    } else if (type === "IEND") {
      break;
    }

    offset += 12 + length;
  }

  const raw = zlib.inflateSync(Buffer.concat(idatParts));
  const stride = width * channels;
  const pixels = new Uint8Array(height * stride);

  // Desfaz os filtros por scanline (PNG spec, seção 9).
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const lineStart = y * (stride + 1) + 1;
    const outStart = y * stride;

    for (let x = 0; x < stride; x++) {
      const rawByte = raw[lineStart + x];
      const left = x >= channels ? pixels[outStart + x - channels] : 0;
      const up = y > 0 ? pixels[outStart - stride + x] : 0;
      const upLeft = y > 0 && x >= channels ? pixels[outStart - stride + x - channels] : 0;

      let value;
      switch (filter) {
        case 0:
          value = rawByte;
          break;
        case 1:
          value = rawByte + left;
          break;
        case 2:
          value = rawByte + up;
          break;
        case 3:
          value = rawByte + ((left + up) >> 1);
          break;
        case 4:
          value = rawByte + paethPredictor(left, up, upLeft);
          break;
        default:
          throw new Error(`filtro ${filter} desconhecido`);
      }
      pixels[outStart + x] = value & 0xff;
    }
  }

  if (channels === 4) return { width, height, rgba: pixels };

  const rgba = new Uint8Array(width * height * 4);
  for (let i = 0, j = 0; i < pixels.length; i += 3, j += 4) {
    rgba[j] = pixels[i];
    rgba[j + 1] = pixels[i + 1];
    rgba[j + 2] = pixels[i + 2];
    rgba[j + 3] = 255;
  }
  return { width, height, rgba };
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(typeAndData), 0);
  return Buffer.concat([length, typeAndData, crc]);
}

/**
 * Escolhe o melhor filtro por scanline pela heurística de soma absoluta
 * recomendada na spec — reduz o PNG final em 20-40% sobre filtro fixo.
 */
function filterScanlines({ width, height, rgba }, channels) {
  const stride = width * channels;
  const out = Buffer.alloc(height * (stride + 1));
  const source = new Uint8Array(height * stride);

  if (channels === 4) {
    source.set(rgba);
  } else {
    for (let i = 0, j = 0; j < rgba.length; i += 3, j += 4) {
      source[i] = rgba[j];
      source[i + 1] = rgba[j + 1];
      source[i + 2] = rgba[j + 2];
    }
  }

  const candidate = new Uint8Array(stride);

  for (let y = 0; y < height; y++) {
    const rowStart = y * stride;
    let bestFilter = 0;
    let bestScore = Infinity;
    let bestLine = null;

    for (let filter = 0; filter <= 4; filter++) {
      let score = 0;
      for (let x = 0; x < stride; x++) {
        const value = source[rowStart + x];
        const left = x >= channels ? source[rowStart + x - channels] : 0;
        const up = y > 0 ? source[rowStart - stride + x] : 0;
        const upLeft = y > 0 && x >= channels ? source[rowStart - stride + x - channels] : 0;

        let byte;
        switch (filter) {
          case 0:
            byte = value;
            break;
          case 1:
            byte = value - left;
            break;
          case 2:
            byte = value - up;
            break;
          case 3:
            byte = value - ((left + up) >> 1);
            break;
          default:
            byte = value - paethPredictor(left, up, upLeft);
            break;
        }
        byte &= 0xff;
        candidate[x] = byte;
        score += byte < 128 ? byte : 256 - byte;
      }

      if (score < bestScore) {
        bestScore = score;
        bestFilter = filter;
        bestLine = Uint8Array.from(candidate);
      }
    }

    out[y * (stride + 1)] = bestFilter;
    Buffer.from(bestLine).copy(out, y * (stride + 1) + 1);
  }

  return out;
}

/** Descarta o canal alfa quando a imagem inteira é opaca (economiza 25%). */
function isOpaque(rgba) {
  for (let i = 3; i < rgba.length; i += 4) {
    if (rgba[i] !== 255) return false;
  }
  return true;
}

export function encodePng({ width, height, rgba }) {
  const channels = isOpaque(rgba) ? 3 : 4;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = channels === 4 ? 6 : 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const filtered = filterScanlines({ width, height, rgba }, channels);
  const compressed = zlib.deflateSync(filtered, { level: 9 });

  return Buffer.concat([
    SIGNATURE,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}
