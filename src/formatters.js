function open(obj, tab) {
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    const mapped = keys.map((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return `    ${'    '.repeat(tab)}${key}: ${open(obj[key], tab + 1)}`;
      }
      return `    ${'    '.repeat(tab)}${key}: ${obj[key]}`;
    });
    return `{\n${mapped.join('\n')}\n${'    '.repeat(tab)}}`;
  }
  return obj;
}

const map = {
  changed: (nod, depth) => `  - ${nod.name}: ${open(nod.oldValue, depth + 1)}\n  ${'    '.repeat(depth)}+ ${nod.name}: ${open(nod.value, depth)}`,
  added: (nod, depth) => `  + ${nod.name}: ${open(nod.value, depth + 1)}`,
  deleted: (nod, depth) => `  - ${nod.name}: ${open(nod.value, depth + 1)}`,
  unchanged: (nod, depth) => `    ${nod.name}: ${open(nod.value, depth + 1)}`,
};

export default function stylish(tree) {
  function iter(interTree, initDepth) {
    return interTree
      .map((node) => {
        if ('children' in node) {
          return `${'    '.repeat(initDepth)}    ${node.name}: {\n${iter(node.children, initDepth + 1)}\n    ${'    '.repeat(initDepth)}}`;
        }
        return `${'    '.repeat(initDepth)}${map[node.status](node, initDepth)}`;
      })
      .join('\n');
  }
  return `{\n${iter(tree, 0)}\n}`;
}
