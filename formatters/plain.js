function open(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
}
export default function plain(tree) {
  const iter = (interTree, acc) => {
    const result = interTree
      .map((node) => {
        if ('children' in node) {
          return `${iter(node.children, `${acc}${node.name}.`)}`;
        }
        if (node.status === 'changed') {
          return `Property '${acc}${node.name}' was updated. From ${open(node.oldValue)} to ${open(node.value)}`;
        }
        if (node.status === 'deleted') {
          return `Property '${acc}${node.name}' was removed`;
        }
        if (node.status === 'added') {
          return `Property '${acc}${node.name}' was added with value: ${open(node.value)}`;
        }
        return undefined;
      })
      .filter((node) => node !== undefined)
      .join('\n');
    return result;
  };
  return iter(tree, '');
}
