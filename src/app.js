import os from 'node:os';
import readline from 'node:readline';
import { EXIT_MESSAGE, GREAT_MESSAGE, PROMPT_MESSAGE } from './const.js';
import getArguments from './modules/cli/args.js';
import { add, cat, cd, cp, ls, mv, rm, rn } from './modules/file-system/index.js';
import hash from './modules/hash.js';
import printSystemInfo from './modules/os.js';
import compress from './modules/zip/compress.js';
import decompress from './modules/zip/decompress.js';

const args = getArguments();
const username = args.username || 'Guest';

console.log(GREAT_MESSAGE(username));

let currentDirectory = os.homedir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: PROMPT_MESSAGE(currentDirectory),
});

rl.prompt();

process.on('SIGINT', () => {
  console.log(EXIT_MESSAGE(username));
  process.exit();
});
rl.on('close', () => {
  console.log(EXIT_MESSAGE(username));
  process.exit();
});

rl.on('line', async (input) => {
  const [command, ...args] = input.split(' ');
  try {
    switch (command) {
      case '.exit':
        process.kill(process.pid, 'SIGINT');
        break;

      case 'ls':
        const data = await ls(currentDirectory);
        const formattedData = data.map(({ name, type }) => ({
          Name: name,
          Type: type,
        }));
        console.table(formattedData);
        break;

      case 'cd':
        currentDirectory = await cd(args[0], currentDirectory);
        rl.setPrompt(PROMPT_MESSAGE(currentDirectory));
        break;

      case 'up':
        currentDirectory = await cd('..', currentDirectory);
        rl.setPrompt(PROMPT_MESSAGE(currentDirectory));
        break;

      case 'cat':
        await cat(currentDirectory + '/' + args[0], rl.prompt.bind(rl));

        break;

      case 'add':
        await add(currentDirectory + '/' + args[0]);
        break;

      case 'rn':
        await rn(args[0], args[1], currentDirectory);
        break;

      case 'cp':
        await cp(args[0], args[1], currentDirectory);
        break;

      case 'mv':
        await mv(args[0], args[1], currentDirectory);
        break;

      case 'rm':
        await rm(args[0], currentDirectory);
        break;

      case 'os':
        printSystemInfo(args[0]);
        break;

      case 'hash':
        await hash(args[0], currentDirectory);
        break;

      case 'compress':
        await compress(args[0], args[1], currentDirectory);
        break;

      case 'decompress':
        await decompress(args[0], args[1], currentDirectory);
        break;

      default:
        console.log('Invalid input');
    }
    rl.setPrompt(PROMPT_MESSAGE(currentDirectory));
  } catch (e) {
    console.log('Operation failed');

  }

  rl.prompt();
});


