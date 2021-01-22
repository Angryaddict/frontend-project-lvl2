import fs from 'fs';
import path from 'path';
import process from 'process';

export default function getData(filepath) {
  const absPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absPath);
  const parcedData = JSON.parse(data);
  return parcedData;
}
