/* eslint-disable import/extensions */
import diff from './src/diff.js';
import format from './formatters/index.js';

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  return format(formatName)(diff(filepath1, filepath2));
}
