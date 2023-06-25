import { promises as fs } from 'node:fs';
import path from 'node:path';

async function rn(filePath, newFilename, cwd = process.cwd()) {
  const oldAbsolutePath = path.resolve(cwd, filePath);
  const directory = path.dirname(oldAbsolutePath);
  const newAbsolutePath = path.join(directory, newFilename);

  await fs.rename(oldAbsolutePath, newAbsolutePath);

}

export default rn;
