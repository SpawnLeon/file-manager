import readline from 'node:readline';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import getArguments from './modules/cli/args.js';


const args = getArguments();
const username = args.username;

console.log(`Welcome to the File Manager, ${username}!`);


