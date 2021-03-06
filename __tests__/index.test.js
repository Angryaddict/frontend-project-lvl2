/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import genDiff from '../index.js';

const strPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const strStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;
const strJson = '[{"name":"common","children":[{"name":"follow","status":"added","value":false},{"name":"setting1","status":"unchanged","value":"Value 1"},{"name":"setting2","status":"deleted","value":200},{"name":"setting3","status":"changed","value":null,"oldValue":true},{"name":"setting4","status":"added","value":"blah blah"},{"name":"setting5","status":"added","value":{"key5":"value5"}},{"name":"setting6","children":[{"name":"doge","children":[{"name":"wow","status":"changed","value":"so much","oldValue":""}]},{"name":"key","status":"unchanged","value":"value"},{"name":"ops","status":"added","value":"vops"}]}]},{"name":"group1","children":[{"name":"baz","status":"changed","value":"bars","oldValue":"bas"},{"name":"foo","status":"unchanged","value":"bar"},{"name":"nest","status":"changed","value":"str","oldValue":{"key":"value"}}]},{"name":"group2","status":"deleted","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","status":"added","value":{"fee":100500,"deep":{"id":{"number":45}}}}]';
test('stylish json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(strStylish);
});
test('plain json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(strPlain);
});
test('json json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(strJson);
});

test('stylish yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(strStylish);
});
test('plain yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toEqual(strPlain);
});
test('json yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(strJson);
});
