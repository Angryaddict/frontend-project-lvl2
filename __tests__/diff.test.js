// eslint-disable-next-line import/extensions
import getData from '../src/getData.js';

test('getData', () => {
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

  expect(getData('files/file1.json')).toEqual(file1Data);
  expect(getData('files/file2.json')).toEqual(file2Data);
});
