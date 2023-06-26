import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

function cat(filePath, cb) {
  const absolutePath = resolve(filePath);

  const readStream = createReadStream(absolutePath, { encoding: 'utf8' });

  readStream.on('data', (chunk) => {
    console.log(chunk);
  });
  readStream.on('error', (err) => {
    console.log('Operation failed');
  });
  readStream.on('end', (err) => {
    cb();
  });

}

export default cat;
