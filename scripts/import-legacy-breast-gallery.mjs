#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { spawnSync } from 'node:child_process';

function usageAndExit() {
  console.error(
    [
      'Usage:',
      '  node scripts/import-legacy-breast-gallery.mjs [--sql <path>] [--tar <path>] [--out-data <path>] [--out-public <dir>]',
      '',
      'Defaults:',
      '  --sql       ../umnagumo/dmmdb_20251103_2207.sql',
      '  --tar       ../umnagumo/upload_from_211.tar.gz',
      '  --out-data  app/data/legacyBreastGallery.ts',
      '  --out-public public/assets/before-after',
    ].join('\n')
  );
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    sql: path.resolve(process.cwd(), '../umnagumo/dmmdb_20251103_2207.sql'),
    tar: path.resolve(process.cwd(), '../umnagumo/upload_from_211.tar.gz'),
    outData: path.resolve(process.cwd(), 'app/data/legacyBreastGallery.ts'),
    outPublic: path.resolve(process.cwd(), 'public/assets/before-after'),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--sql') args.sql = path.resolve(process.cwd(), argv[++i] ?? '');
    else if (arg === '--tar') args.tar = path.resolve(process.cwd(), argv[++i] ?? '');
    else if (arg === '--out-data') args.outData = path.resolve(process.cwd(), argv[++i] ?? '');
    else if (arg === '--out-public') args.outPublic = path.resolve(process.cwd(), argv[++i] ?? '');
    else if (arg === '--help' || arg === '-h') usageAndExit();
    else usageAndExit();
  }

  return args;
}

function unescapeMysqlString(value) {
  let out = '';
  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    if (ch !== '\\') {
      out += ch;
      continue;
    }

    const next = value[i + 1];
    i += 1;
    switch (next) {
      case '0':
        out += '\0';
        break;
      case 'b':
        out += '\b';
        break;
      case 'n':
        out += '\n';
        break;
      case 'r':
        out += '\r';
        break;
      case 't':
        out += '\t';
        break;
      case 'Z':
        out += '\x1a';
        break;
      case "'":
        out += "'";
        break;
      case '"':
        out += '"';
        break;
      case '\\':
        out += '\\';
        break;
      default:
        out += next ?? '';
        break;
    }
  }
  return out;
}

function splitSqlTuple(tupleText) {
  const tokens = [];
  let current = '';
  let inQuote = false;
  let escape = false;

  for (let i = 0; i < tupleText.length; i += 1) {
    const ch = tupleText[i];

    if (inQuote) {
      current += ch;
      if (escape) {
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === "'") {
        inQuote = false;
      }
      continue;
    }

    if (ch === "'") {
      inQuote = true;
      current += ch;
      continue;
    }

    if (ch === ',') {
      tokens.push(current.trim());
      current = '';
      continue;
    }

    current += ch;
  }

  if (current.length > 0) tokens.push(current.trim());
  return tokens;
}

function parseSqlValue(raw) {
  const value = raw.trim();
  if (value === 'NULL') return null;
  if (value.startsWith("'") && value.endsWith("'")) {
    return unescapeMysqlString(value.slice(1, -1));
  }
  return value;
}

function extractTuples(valuesBlock) {
  const tuples = [];
  let inQuote = false;
  let escape = false;
  let depth = 0;
  let start = -1;

  for (let i = 0; i < valuesBlock.length; i += 1) {
    const ch = valuesBlock[i];

    if (inQuote) {
      if (escape) {
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === "'") {
        inQuote = false;
      }
      continue;
    }

    if (ch === "'") {
      inQuote = true;
      continue;
    }

    if (ch === '(') {
      if (depth === 0) start = i + 1;
      depth += 1;
      continue;
    }

    if (ch === ')') {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        tuples.push(valuesBlock.slice(start, i));
        start = -1;
      }
    }
  }

  return tuples;
}

async function readInsertValuesBlock(sqlPath, tableName) {
  const insertPrefix = `INSERT INTO \`${tableName}\` VALUES`;
  const stream = fs.createReadStream(sqlPath, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let capturing = false;
  let buffer = '';

  for await (const line of rl) {
    if (!capturing) {
      if (line.startsWith(insertPrefix)) {
        capturing = true;
        buffer += line.slice(insertPrefix.length) + '\n';
        if (line.trim().endsWith(';')) break;
      }
      continue;
    }

    buffer += line + '\n';
    if (line.trim().endsWith(';')) break;
  }

  rl.close();
  stream.close();

  if (!buffer) {
    throw new Error(`Failed to find INSERT block for table ${tableName}`);
  }

  return buffer.replace(/;\s*$/, '').trim();
}

function normalizeExt(fileExtsn, fallback) {
  const ext = (fileExtsn || fallback || '').toString().trim().toLowerCase();
  if (ext === 'jpeg') return 'jpg';
  return ext || 'bin';
}

function normalizeText(text) {
  if (!text) return '';
  return text.replaceAll('\r\n', '\n').replaceAll('\r', '\n').trim();
}

function getNewsNumericId(newsId) {
  const match = /NEWS_(\d+)$/.exec(newsId);
  if (!match) throw new Error(`Unexpected NEWS_ID format: ${newsId}`);
  return Number(match[1]);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extractTarEntryToFile({ tarPath, tarEntry, outFile }) {
  if (fs.existsSync(outFile)) return;

  const proc = spawnSync('tar', ['-xzf', tarPath, '-O', tarEntry], {
    encoding: 'buffer',
    maxBuffer: 64 * 1024 * 1024,
  });

  if (proc.status !== 0) {
    throw new Error(
      `tar failed (exit ${proc.status}) for entry ${tarEntry}: ${proc.stderr?.toString('utf8') ?? ''}`
    );
  }

  ensureDir(path.dirname(outFile));
  fs.writeFileSync(outFile, proc.stdout);
}

function toTsStringLiteral(value) {
  return JSON.stringify(value);
}

function buildTsFile(items) {
  const rows = items
    .map((item) => {
      const parts = [
        `  {`,
        `    id: ${item.id},`,
        `    legacyNewsId: ${toTsStringLiteral(item.legacyNewsId)},`,
        `    surgeryType: ${toTsStringLiteral(item.surgeryType)},`,
        `    title: ${toTsStringLiteral(item.title)},`,
        `    description: ${toTsStringLiteral(item.description)},`,
        `    image: ${toTsStringLiteral(item.image)},`,
        item.modalImage ? `    modalImage: ${toTsStringLiteral(item.modalImage)},` : null,
        `  },`,
      ].filter(Boolean);
      return parts.join('\n');
    })
    .join('\n');

  return [
    `export type SurgeryType = 'primary' | 'revision';`,
    ``,
    `export type GalleryFilter = 'all' | SurgeryType;`,
    ``,
    `export interface LegacyBreastGalleryItem {`,
    `  id: number;`,
    `  legacyNewsId: string;`,
    `  surgeryType: SurgeryType;`,
    `  title: string;`,
    `  description: string;`,
    `  image: string;`,
    `  modalImage?: string;`,
    `}`,
    ``,
    `export const legacyBreastGalleryItems: LegacyBreastGalleryItem[] = [`,
    rows,
    `];`,
    ``,
  ].join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(args.sql)) throw new Error(`SQL dump not found: ${args.sql}`);
  if (!fs.existsSync(args.tar)) throw new Error(`Upload tar.gz not found: ${args.tar}`);

  const [newsBlock, fileDetailBlock] = await Promise.all([
    readInsertValuesBlock(args.sql, 'COMTNNEWSINFO'),
    readInsertValuesBlock(args.sql, 'COMTNFILEDETAIL'),
  ]);

  const newsRows = extractTuples(newsBlock).map((tupleText) => {
    const values = splitSqlTuple(tupleText).map(parseSqlValue);

    const newsId = values[0];
    const newsSj = values[1];
    const newsCn = values[2];
    const newsOrigin = values[3];
    const atchFileId = values[10];

    if (typeof newsId !== 'string' || typeof atchFileId !== 'string') {
      throw new Error(`Invalid COMTNNEWSINFO row: ${tupleText}`);
    }

    return {
      id: getNewsNumericId(newsId),
      newsId,
      newsSj: typeof newsSj === 'string' ? normalizeText(newsSj) : '',
      newsCn: typeof newsCn === 'string' ? normalizeText(newsCn) : '',
      newsOrigin: typeof newsOrigin === 'string' ? newsOrigin.trim() : '',
      atchFileId,
    };
  });

  const fileDetailByAtch = new Map();
  for (const tupleText of extractTuples(fileDetailBlock)) {
    const values = splitSqlTuple(tupleText).map(parseSqlValue);
    const atchFileId = values[0];
    const fileSn = values[1];
    const streFileNm = values[3];
    const orignlFileNm = values[4];
    const fileExtsn = values[5];

    if (typeof atchFileId !== 'string') continue;
    const fileSnNum = Number(fileSn);
    if (!Number.isFinite(fileSnNum)) continue;
    if (typeof streFileNm !== 'string') continue;

    const existing = fileDetailByAtch.get(atchFileId) ?? {};
    existing[fileSnNum] = {
      streFileNm,
      orignlFileNm: typeof orignlFileNm === 'string' ? orignlFileNm : '',
      fileExtsn: typeof fileExtsn === 'string' ? fileExtsn : '',
    };
    fileDetailByAtch.set(atchFileId, existing);
  }

  const items = newsRows
    .filter((row) => row.newsOrigin === '1' || row.newsOrigin === '2')
    .sort((a, b) => b.id - a.id)
    .map((row) => {
      const surgeryType = row.newsOrigin === '1' ? 'primary' : 'revision';
      const details = fileDetailByAtch.get(row.atchFileId);
      if (!details?.[0]?.streFileNm) {
        throw new Error(`Missing fileSn=0 for atchFileId=${row.atchFileId} (newsId=${row.newsId})`);
      }

      const previewExt = normalizeExt(details[0].fileExtsn, path.extname(details[0].orignlFileNm).slice(1));
      const modalExt = details[1]
        ? normalizeExt(details[1].fileExtsn, path.extname(details[1].orignlFileNm).slice(1))
        : null;

      const previewRel = `/assets/before-after/${surgeryType}/${row.newsId}-preview.${previewExt}`;
      const modalRel = details[1]?.streFileNm
        ? `/assets/before-after/${surgeryType}/${row.newsId}-modal.${modalExt}`
        : null;

      return {
        id: row.id,
        legacyNewsId: row.newsId,
        surgeryType,
        title: row.newsSj,
        description: row.newsCn,
        image: previewRel,
        modalImage: modalRel,
        _copy: {
          preview: {
            tarEntry: `C:/egovframework/upload/${details[0].streFileNm}`,
            outFile: path.join(args.outPublic, surgeryType, `${row.newsId}-preview.${previewExt}`),
          },
          modal: details[1]?.streFileNm
            ? {
                tarEntry: `C:/egovframework/upload/${details[1].streFileNm}`,
                outFile: path.join(args.outPublic, surgeryType, `${row.newsId}-modal.${modalExt}`),
              }
            : null,
        },
      };
    });

  for (const item of items) {
    extractTarEntryToFile({
      tarPath: args.tar,
      tarEntry: item._copy.preview.tarEntry,
      outFile: item._copy.preview.outFile,
    });
    if (item._copy.modal) {
      extractTarEntryToFile({
        tarPath: args.tar,
        tarEntry: item._copy.modal.tarEntry,
        outFile: item._copy.modal.outFile,
      });
    }
  }

  const outDir = path.dirname(args.outData);
  ensureDir(outDir);
  fs.writeFileSync(args.outData, buildTsFile(items), 'utf8');

  console.log(`Imported ${items.length} items.`);
  console.log(`- Data: ${path.relative(process.cwd(), args.outData)}`);
  console.log(`- Images: ${path.relative(process.cwd(), args.outPublic)}/{primary,revision}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
