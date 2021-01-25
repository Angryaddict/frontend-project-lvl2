/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import getData from '../src/getData.js';

import diff from '../src/diff.js';

test('getData relative path', () => {
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

test('getData absolute path', () => {
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

  expect(getData('/home/gene/frontend-project-lvl2/__fixtures__/testFile1.json')).toEqual(file1Data);
  expect(getData('/home/gene/frontend-project-lvl2/__fixtures__/testFile2.json')).toEqual(file2Data);
});

test('diff', () => {
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
