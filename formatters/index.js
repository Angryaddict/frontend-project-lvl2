/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';

export default function format(type) {
  if (type === 'plain') {
    return plain;
  }
  return stylish;
}
