import { test, expect } from 'jest';
// eslint-disable-next-line import/extensions
import getData from '../src/getData.js';

test('getData', () => {
  const file1Data = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  expect(getData('../files/file1')).toEqual(file1Data);
});
