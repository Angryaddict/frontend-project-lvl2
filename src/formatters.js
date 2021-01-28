/* eslint-disable import/extensions */
import diff from './diff.js';

function open(obj, tab) {
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    const mapped = keys.map((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        console.log(obj[key], tab);
        return `${'    '.repeat(tab)}    ${key}: {\n${open(obj[key], tab + 1)}@\n    ${'    '.repeat(tab)}}`;
      }
      console.log('res', obj[key], tab);
      return `\n    ${'  * '.repeat(tab + 1)}${key}: ${obj[key]}\n${'    '.repeat(tab + 1)}`;
    });

    return `!{${mapped.join('\n')}}!`;
  }
  return obj;
}
export default function stylish(tree) {
  function iter(interTree, depth) {
    return interTree
      .map((node) => {
        const map = {
          changed: `  - ${node.name}: ${open(node.oldValue, depth)}\n  ${'    '.repeat(depth)}+ ${node.name}: ${open(
            node.value,
            depth
          )}`,
          added: `  + ${node.name}: ${open(node.value, depth)}`,
          deleted: `  - ${node.name}: ${open(node.value, depth)}`,
          unchanged: `    ${node.name}: ${open(node.value, depth)}`,
        };
        if ('children' in node) {
          return `${'    '.repeat(depth)}    ${node.name}: {\n${iter(node.children, depth + 1)}\n    ${'    '.repeat(
            depth
          )}}`;
        }
        return `${'    '.repeat(depth)}${map[node.status]}`;
      })
      .join('\n');
  }
  return iter(tree, 0);
}
const dif = diff('__fixtures__/file1.json', '__fixtures__/file2.json');
console.log(stylish(dif));
