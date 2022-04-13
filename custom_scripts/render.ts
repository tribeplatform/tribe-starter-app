const { Liquid } = require('liquidjs');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

if (!argv.head && !argv.body) {
  console.log('You must sepcify using --head or --body which scripts to be rendered.');
  process.exit(1);
}

const filename = argv.head ? 'head.liquid' : 'body.liquid';
const buffer = fs.readFileSync(`${__dirname}/${filename}`);

const fileContent = buffer.toString();

let settings = {};
try {
  settings = JSON.parse(argv.settings);
} catch (err) {
  console.log();
  console.log('Warning: Setting was not parsed.');
  console.log();
}

const engine = new Liquid();
const tpl = engine.parse(fileContent);
engine.render(tpl, { v: 'Liquid', settings }).then(console.log);
