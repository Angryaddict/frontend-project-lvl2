/* eslint-disable import/extensions */

import _ from 'lodash';
import getData from './getData.js';

export default function diff(filepath1, filepath2) {
  const o1 = getData(filepath1);
  const o2 = getData(filepath2);
  function compare(obj1, obj2) {
    const merged = { ...obj1, ...obj2 };
    const objKeys = _.sortBy(Object.keys(merged));
    const result = objKeys.reduce((acc, key) => {
      if (key in obj1 && key in obj2) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          return [...acc, { name: key, children: compare(obj1[key], obj2[key]) }];
        }
        if (obj1[key] === obj2[key]) {
          return [...acc, { name: key, status: 'unchanged', value: obj1[key] }];
        }
        if (obj1[key] !== obj2[key]) {
          return [
            ...acc,
            {
              name: key,
              status: 'changed',
              value: obj2[key],
              oldValue: obj1[key],
            },
          ];
        }
      }
      if (key in obj1 && !(key in obj2)) {
        return [...acc, { name: key, status: 'deleted', value: obj1[key] }];
      }
      if (!(key in obj1) && key in obj2) {
        return [...acc, { name: key, status: 'added', value: obj2[key] }];
      }
      return acc;
    }, []);
    return result;
  }
  return compare(o1, o2);
}
