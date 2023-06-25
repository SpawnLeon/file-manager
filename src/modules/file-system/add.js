import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

async function add(fileName) {
  const filePath = resolve(fileName);
  await fs.writeFile(filePath, '');
}

export default add;
