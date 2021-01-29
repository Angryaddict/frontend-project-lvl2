/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default function format(type) {
  if (type === 'plain') {
    return plain;
  }
  if (type === 'json') {
    return json;
  }
  return stylish;
}
