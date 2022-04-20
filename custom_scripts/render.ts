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
let member = {};
let network = {};

if (argv.settings) {
  try {
    settings = JSON.parse(argv.settings);
  } catch (err) {
    console.log();
    console.log('Warning: Parsing settings has failed.');
    console.log();
  }
}
if (argv.network) {
  try {
    network = JSON.parse(argv.network);
  } catch (err) {
    console.log();
    console.log('Warning: Parsing network has failed.');
    console.log();
  }
}

if (argv.member) {
  try {
    member = JSON.parse(argv.member);
  } catch (err) {
    console.log();
    console.log('Warning: Parsing member has failed.');
    console.log();
  }
}

const engine = new Liquid();
engine.parseAndRender(fileContent, { v: 'Liquid', settings, member, network }).then(console.log)