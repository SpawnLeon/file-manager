import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

async function cat(filePath) {
  const absolutePath = resolve(filePath);

  const readStream = createReadStream(absolutePath, { encoding: 'utf8' });

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

}

export default cat;
