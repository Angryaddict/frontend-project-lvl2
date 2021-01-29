// eslint-disable-next-line import/extensions
import getData from './getData.js';

export default function diff(filepath1, filepath2) {
  const o1 = getData(filepath1);
  const o2 = getData(filepath2);
  function compare(obj1, obj2) {
    const merged = { ...obj1, ...obj2 };
    const objKeys = Object.keys(merged).sort();
    const result = objKeys.reduce((acc, key) => {
      const node = {};
      node.name = key;
      if (key in obj1 && key in obj2) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          node.children = compare(obj1[key], obj2[key]);
          acc.push(node);
          return acc;
        }
        if (obj1[key] === obj2[key]) {
          node.status = 'unchanged';
          node.value = obj1[key];
        }
        if (obj1[key] !== obj2[key]) {
          node.status = 'changed';
          node.value = obj2[key];
          node.oldValue = obj1[key];
        }
      }
      if (key in obj1 && !(key in obj2)) {
        node.status = 'deleted';
        node.value = obj1[key];
      }
      if (!(key in obj1) && key in obj2) {
        node.status = 'added';
        node.value = obj2[key];
      }
      acc.push(node);
      return acc;
    }, []);
    return result;
  }
  return compare(o1, o2);
}
