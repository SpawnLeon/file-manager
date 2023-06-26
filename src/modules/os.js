import os from 'node:os';

function printSystemInfo(option) {
  switch (option) {
    case '--EOL':
      const eol = os.EOL;
      const visibleEOL = eol === '\n' ? 'LF' : 'CRLF';
      console.log(visibleEOL);
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`CPU Count: ${cpus.length}`);
      cpus.forEach((cpu, i) => {
        console.log(`CPU ${i}:`);
        console.log(` Model: ${cpu.model}`);
        console.log(` Speed: ${cpu.speed / 10} GHz`);
      });
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log('Invalid option');
  }
}

export default printSystemInfo;
