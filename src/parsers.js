import yaml from 'js-yaml';

export default function parce(data, filepath) {
  if (filepath.endsWith('yml')) {
    return yaml.load(data);
  }
  return JSON.parse(data);
}
