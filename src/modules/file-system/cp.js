import { createReadStream, createWriteStream } from 'node:fs';
import { basename, resolve } from 'node:path';

function cp(sourcePath, targetDirectory, cwd = process.cwd()) {
  const fileName = basename(sourcePath);
  const absoluteSourcePath = resolve(cwd, sourcePath);
  const absoluteDestPath = resolve(cwd, targetDirectory, fileName);

  const readable = createReadStream(absoluteSourcePath);
  const writable = createWriteStream(absoluteDestPath);

  readable.pipe(writable);
}

export default cp;
