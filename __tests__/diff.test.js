/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import getData from '../src/getData.js';

import diff from '../src/diff.js';

test('getData relative path json', () => {
  const file1Data = {
    car: 'mazda',
    engine: 2,
    user: 'Eugeny',
    checkengine: false,
  };
  const file2Data = {
    engine: 25,
    checkengine: true,
    country: 'japan',
  };

  expect(getData('__fixtures__/testFile1.json')).toEqual(file1Data);
  expect(getData('__fixtures__/testFile2.json')).toEqual(file2Data);
});
test('getData relative path yaml', () => {
  const file1Data = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const file2Data = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  expect(getData('__fixtures__/file1.yaml')).toEqual(file1Data);
  expect(getData('__fixtures__/file2.yaml')).toEqual(file2Data);
});

test('diff json', () => {
  const str = `{
 - car: mazda
 - checkengine: false
 + checkengine: true
 + country: japan
 - engine: 2
 + engine: 25
 - user: Eugeny
}`;
  expect(diff('__fixtures__/testFile1.json', '__fixtures__/testFile2.json')).toEqual(str);
});

test('diff yaml', () => {
  const str = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  expect(diff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(str);
});
