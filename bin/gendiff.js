#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Command } from 'commander';
import diff from '../src/diff.js';
import stylish from '../src/formatters.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    if (options.format === 'stylish') {
      console.log(stylish(diff(filepath1, filepath2)));
    }
  });
program.parse();
