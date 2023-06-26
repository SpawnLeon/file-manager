import { promises as fs } from 'node:fs';
import path from 'node:path';

async function cd(dir, cwd = process.cwd()) {
  const newPath = path.resolve(cwd, dir);

  await fs.access(newPath);

  return newPath;

}

export default cd;
