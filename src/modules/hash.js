import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

async function hash(filePath, cwd = process.cwd()) {
  const absolutePath = resolve(cwd, filePath);
  const hash = createHash('sha1');
  hash.setEncoding('hex');

  createReadStream(absolutePath)
    .pipe(hash)
    .on('finish', function () {
      console.log(this.read()); // the hash
    });
}

export default hash;
