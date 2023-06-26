import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';

function decompress(sourcePath, destPath, cwd = process.cwd()) {
  const absoluteSourcePath = resolve(cwd, sourcePath);
  const absoluteDestPath = resolve(cwd, destPath);

  const readStream = createReadStream(absoluteSourcePath);
  const writeStream = createWriteStream(absoluteDestPath);
  const brotli = createBrotliDecompress();

  readStream.pipe(brotli).pipe(writeStream);
}

export default decompress;
