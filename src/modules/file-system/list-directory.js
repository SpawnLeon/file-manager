import { promises as fs } from 'node:fs';
import { join } from 'node:path';

async function listDirectory(currentDirectory) {
  const contents = await fs.readdir(currentDirectory);
  const statsPromises = contents.map(name => fs.stat(join(currentDirectory, name)));
  const stats = await Promise.all(statsPromises);

  const data = contents.map((name, index) => {
    let type;
    if (stats[index].isDirectory()) {
      type = 'directory';
    } else if (stats[index].isFile()) {
      type = 'file';
    } else {
      type = 'unknown';
    }

    return {
      name,
      type,
    };
  });

  data.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === 'directory' ? -1 : 1;
  });

  return data;
}

export default listDirectory;
