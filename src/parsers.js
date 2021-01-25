import yaml from 'js-yaml';

export default function parce(data, filepath) {
  if (filepath.endsWith('yaml')) {
    return yaml.load(data);
  }
  return JSON.parse(data);
}
