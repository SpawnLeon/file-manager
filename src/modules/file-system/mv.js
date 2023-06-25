import { createReadStream, createWriteStream, promises as fs } from 'node:fs';
import { basename, resolve } from 'node:path';

async function mv(sourcePath, targetDirectory, cwd = process.cwd()) {

  const fileName = basename(sourcePath);
  const absoluteSourcePath = resolve(cwd, sourcePath);
  const absoluteDestPath = resolve(cwd, targetDirectory, fileName);

  const readable = createReadStream(absoluteSourcePath);
  const writable = createWriteStream(absoluteDestPath);

  readable.pipe(writable);
  readable.on('end', async () => {
    await fs.unlink(absoluteSourcePath);
  });

}

export default mv;
