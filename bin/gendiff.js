#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
    .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');
program.parse();