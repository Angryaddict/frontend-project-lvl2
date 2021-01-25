#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import diff from '../src/diff.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2));
  });
program.parse();
