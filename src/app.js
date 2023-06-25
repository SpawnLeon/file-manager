import readline from 'node:readline';
import os from 'node:os';
import getArguments from './modules/cli/args.js';
import changeDirectory from './modules/file-system/change-directory.js';


const args = getArguments();
const username = args.username || 'Guest';

console.log(`Welcome to the File Manager, ${username}!`);


let currentDirectory = os.homedir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${currentDirectory}> `
});

rl.prompt();

rl.on('line', async (input) => {
  const [command, ...args] = input.split(' ');

  switch(command) {

    case 'cd':
      currentDirectory = await changeDirectory(args[0]);
      rl.setPrompt(`${currentDirectory}> `);
      break;

    default:
      console.log('Unknown command');
  }

  rl.prompt();
});


