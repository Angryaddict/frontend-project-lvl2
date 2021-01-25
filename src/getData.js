/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import process from 'process';
import parce from './parsers.js';

export default function getData(filepath) {
  const absPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absPath);
  const parcedData = parce(data, filepath);
  return parcedData;
}
