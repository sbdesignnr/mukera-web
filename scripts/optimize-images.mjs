import sharp from "sharp";
import { readdir, stat, access } from "node:fs/promises";
import { join, basename, extname, dirname } from "node:path";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const LOGO_PATTERN = /^logo/i;

const formatKB = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function optimizeImages() {
  const files = await readdir(PUBLIC_DIR);

  const targets = files.filter((file) => {
    const ext = extname(file).toLowerCase();
    return (ext === ".jpg" || ext === ".jpeg" || ext === ".png") &&
      !LOGO_PATTERN.test(file);
  });

  if (targets.length === 0) {
    console.log("No images to process.");
    return;
  }

  for (const file of targets) {
    const inputPath = join(PUBLIC_DIR, file);
    const webpName = basename(file, extname(file)) + ".webp";
    const outputPath = join(PUBLIC_DIR, webpName);

    if (await exists(outputPath)) {
      console.log(`  skipped  ${file} → ${webpName} (already exists)`);
      continue;
    }

    const { size: inputSize } = await stat(inputPath);

    const image = sharp(inputPath);
    const meta = await image.metadata();

    const pipeline =
      meta.width && meta.width > MAX_WIDTH
        ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
        : image;

    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

    const { size: outputSize } = await stat(outputPath);

    console.log(
      `✓ ${file} → ${webpName} (${formatKB(inputSize)} → ${formatKB(outputSize)})`
    );
  }
}

optimizeImages().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
