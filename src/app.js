import readline from 'node:readline';
import os from 'node:os';
import { EXIT_MESSAGE, PROMPT_MESSAGE } from './const.js';
import getArguments from './modules/cli/args.js';
import changeDirectory from './modules/file-system/change-directory.js';
import listDirectory from './modules/file-system/list-directory.js';

const args = getArguments();
const username = args.username || 'Guest';

console.log(`Welcome to the File Manager, ${username}!`);

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
        const data = await listDirectory(currentDirectory);
        const formattedData = data.map(({ name, type }) => ({
          Name: name,
          Type: type
        }));
        console.table(formattedData)
        break;
      case 'cd':
        currentDirectory = await changeDirectory(args[0]);
        rl.setPrompt(PROMPT_MESSAGE(currentDirectory));
        break;

      default:
        console.log('Invalid input');
    }
  } catch (e) {
    console.log('Operation failed');
    // TODO: remove
    console.error(e);
  }


  rl.prompt();
});


