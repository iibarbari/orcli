#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package.json');
const init = require('../commands/init');

program
  .version(pkg.version)
  .command('init')
  .description('Init')
  .action(init.set)
  .parse(process.argv);
