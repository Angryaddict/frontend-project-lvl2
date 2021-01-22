import getData from './getData.js';

export default function diff(filepath1, filepath2) {
  const obj1 = getData(filepath1);
  const obj2 = getData(filepath2);
  const merged = { ...obj1, ...obj2 };
  const objKeys = Object.keys(merged).sort();
  const result = objKeys.reduce((acc, key) => {
    if (key in obj1 && key in obj2) {
      if (obj1[key] === obj2[key]) {
        acc[`  ${key}`] = obj1[key];
        return acc;
      }
      if (obj1[key] !== obj2[key]) {
        acc[`- ${key}`] = obj1[key];
        acc[`+ ${key}`] = obj2[key];
        return acc;
      }
    }
    if (key in obj1 && !(key in obj2)) {
      acc[`- ${key}`] = obj1[key];
      return acc;
    }
    acc[`+ ${key}`] = obj2[key];
    return acc;
  }, {});
  const arr = Object.entries(result);
  const str = arr.map(([key, value]) => `${key}: ${value}`).join('\n');
  return str;
}
