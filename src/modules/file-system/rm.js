import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

async function rm(sourcePath, cwd = process.cwd()) {
  const absoluteSourcePath = resolve(cwd, sourcePath);
  await fs.unlink(absoluteSourcePath);
}

export default rm;
