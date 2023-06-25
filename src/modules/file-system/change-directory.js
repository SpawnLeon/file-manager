import { promises as fs } from 'node:fs';
import path from 'node:path';

async function changeDirectory(dir, currentDirectory='/') {
  const newPath = path.resolve(currentDirectory, dir);

  try {
    await fs.access(newPath);
    currentDirectory = newPath;
    return currentDirectory;
  } catch (error) {
    throw new Error('No such file or directory');
  }
}

export default changeDirectory;
