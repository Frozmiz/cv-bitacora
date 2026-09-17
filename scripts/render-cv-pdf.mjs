#!/usr/bin/env node
/**
 * Regenera los PDF del CV desde cv-src/*.html con Microsoft Edge (headless).
 * Uso: node scripts/render-cv-pdf.mjs
 */
import { spawn } from 'node:child_process';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const edgeWin =
  '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const winTemp = '/mnt/c/Users/Frozmiz/AppData/Local/Temp/cv-bitacora-pdf';

const jobs = [
  {
    html: path.join(root, 'cv-src/es.html'),
    out: path.join(
      root,
      'public/cv/CV_Alejandro_Gonzalez_Angular_Frontend_Engineer_ES_2026.pdf',
    ),
  },
  {
    html: path.join(root, 'cv-src/en.html'),
    out: path.join(
      root,
      'public/cv/CV_Alejandro_Gonzalez_Angular_Frontend_Engineer_EN_2026_FINAL.pdf',
    ),
  },
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with ${code}`));
    });
  });
}

function wslpath(linuxPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('wslpath', ['-w', linuxPath], { stdio: ['ignore', 'pipe', 'inherit'] });
    let out = '';
    child.stdout.on('data', (chunk) => {
      out += chunk;
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve(out.trim());
      else reject(new Error(`wslpath failed for ${linuxPath}`));
    });
  });
}

await mkdir(winTemp, { recursive: true });
await mkdir(path.join(root, 'public/cv'), { recursive: true });

for (const job of jobs) {
  const stamp = path.basename(job.out, '.pdf');
  const tmpHtml = path.join(winTemp, `${stamp}.html`);
  const tmpCss = path.join(winTemp, 'cv.css');
  const tmpPdf = path.join(winTemp, `${stamp}.pdf`);

  await copyFile(job.html, tmpHtml);
  await copyFile(path.join(root, 'cv-src/cv.css'), tmpCss);

  const htmlWin = await wslpath(tmpHtml);
  const pdfWin = await wslpath(tmpPdf);
  const fileUrl = `file:///${htmlWin.replaceAll('\\', '/')}`;

  await run(edgeWin, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfWin}`,
    fileUrl,
  ]);

  await copyFile(tmpPdf, job.out);
  console.log(`Wrote ${path.relative(root, job.out)}`);
}
