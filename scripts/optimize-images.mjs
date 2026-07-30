// One-off/rerunnable dev tool: resizes each image in public/images to the
// largest size it is actually ever displayed at (2x, for retina) and
// re-encodes it with mozjpeg + emits a WebP twin. Run after adding or
// replacing any file in public/images.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve(import.meta.dirname, '../public/images');

// width/height: resize target (2x the largest CSS display size). height is
// only set for images that are always shown at a fixed crop (object-cover);
// otherwise only width is constrained and aspect ratio is preserved.
const targets = {
  'logo.jpg': { width: 96, height: 96 },
  'Rohtak.jpg': { width: 1104, height: 512 },
  'Map_Image_.jpg': { width: 1536 },
  'North_America.jpg': { width: 760 },
  'Europe.jpg': { width: 760 },
  'Middle_East.jpg': { width: 760 },
  'Asia_Pacific.jpg': { width: 760 },
  'Latin_America.jpg': { width: 760 },
  'Clove_Buds.jpg': { width: 760 },
  'Lemon_Grass.jpg': { width: 760 },
  'Citronella_Oil.jpg': { width: 760 },
  'Black_Pepper_Oleoresin.jpg': { width: 760 },
  'Shipping.jpg': { width: 612 },
  'Paramjeet_Singh.jpg': { width: 128, height: 128 },
  'Aadi_Kumar_Singh.jpg': { width: 128, height: 128 },
};

const JPEG_QUALITY = 78;
const WEBP_QUALITY = 72;

let totalBefore = 0;
let totalAfterJpg = 0;
let totalAfterBest = 0;

for (const [file, { width, height }] of Object.entries(targets)) {
  const filePath = path.join(dir, file);
  const webpPath = filePath.replace(/\.jpe?g$/i, '.webp');
  const before = await readFile(filePath);
  totalBefore += before.byteLength;

  const pipeline = sharp(before).resize({
    width,
    height,
    fit: height ? 'cover' : 'inside',
    withoutEnlargement: true,
  });

  const jpg = await pipeline.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  const webp = await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();

  await writeFile(filePath, jpg);
  totalAfterJpg += jpg.byteLength;

  // Only keep the WebP twin (and thus only reference it in markup) when it
  // actually beats the mozjpeg fallback — for some photographic content at
  // these quality settings mozjpeg wins, and shipping a *larger* "next-gen"
  // format would be worse than not bothering.
  const webpWins = webp.byteLength < jpg.byteLength;
  if (webpWins) {
    await writeFile(webpPath, webp);
  }
  totalAfterBest += Math.min(jpg.byteLength, webp.byteLength);

  console.log(
    `${file}: ${(before.byteLength / 1024).toFixed(0)}KB -> ${(jpg.byteLength / 1024).toFixed(0)}KB jpg` +
      (webpWins
        ? ` + ${(webp.byteLength / 1024).toFixed(0)}KB webp (used)`
        : ` (webp was ${(webp.byteLength / 1024).toFixed(0)}KB, larger — skipped)`),
  );
}

console.log(`\nTotal jpg-only:        ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfterJpg / 1024).toFixed(0)}KB`);
console.log(`Total best-of-both:    ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfterBest / 1024).toFixed(0)}KB`);
