import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { createBrotliCompress } from 'node:zlib';

function compress(sourcePath, destPath, cwd = process.cwd()) {
  const absoluteSourcePath = resolve(cwd, sourcePath);
  const absoluteDestPath = resolve(cwd, destPath);

  const readStream = createReadStream(absoluteSourcePath);
  const writeStream = createWriteStream(absoluteDestPath);
  const brotli = createBrotliCompress();

  readStream.pipe(brotli).pipe(writeStream);
}

export default compress;
